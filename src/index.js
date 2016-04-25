import requireAll from 'require-all';
import fs from 'mz/fs';
import kue from 'kue';
import Base from 'magnet-core/dist/base';
import defaultConfig from './config/kue';

export default class MagnetKue extends Base {
  async setup() {
    let config = Object.assign(defaultConfig, this.config.kue);
    let queues = {};
    try {
      const folderPath = `${process.cwd()}/server/job_queues`;
      await fs.exists(folderPath);
      queues = requireAll(folderPath);
    } catch (err) {
      this.log.warn(err);
    }

    this.app.queue = kue.createQueue(config);

    for (let key of Object.keys(queues)) {
      let queue = queues[key].default || queues[key];
      let name = queue.name || key;
      let processArgs = [name];
      if (queue.concurrency) {
        processArgs.push(queue.concurrency);
      }

      if (queue.process) {
        processArgs.push(async (data, done) => {
          try {
            done(null, await queue.process.call(this, this.app, data));
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
}
