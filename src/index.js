import requireAll from 'require-all';
import fs from 'mz/fs';
import kue from 'kue';
import Base from 'magnet-core/dist/base';
import defaultConfig from './config/kue';

export default class MagnetKue extends Base {
  async setup() {
    this.kueConfig = Object.assign(defaultConfig, this.config.kue, this.options);
    let queues = {};
    try {
      const folderPath = `${process.cwd()}/server/job_queues`;
      await fs.exists(folderPath);
      queues = requireAll(folderPath);
    } catch (err) {
      this.log.warn(err);
    }

    this.app.queue = kue.createQueue(this.kueConfig);

    // https://github.com/Automattic/kue#error-handling
    this.app.queue.on('error', (err) => {
      this.log.error(err);
    });

    // https://github.com/Automattic/kue#unstable-redis-connections
    this.app.queue.watchStuckJobs(this.kueConfig.watchStuckJobsInterval);

    for (let key of Object.keys(queues)) {
      let queue = queues[key].default || queues[key];
      let name = queue.name || key;
      let processArgs = [name];
      if (queue.concurrency) {
        processArgs.push(queue.concurrency);
      }

      if (queue.process) {
        processArgs.push(async (data, ctx, done) => {
          try {
            done(null, await queue.process.call(this, this.app, data, ctx));
          } catch (err) {
            done(err);
          }
        });
      } else {
        this.log.warn(`No process for ${name}`);
      }

      this.app.queue.process.apply(this.app.queue, processArgs);
    }
  }

  async start() {
    if (this.kueConfig.listen) {
      kue.app.listen(this.kueConfig.listen);
    }
  }

  async teardown() {
    return new Promise((resolve, reject) => {
      this.app.queue.shutdown(this.kueConfig.listen, (err, result) => {
        this.app.log.error( 'Kue shutdown result: ', arguments);

        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }
}
