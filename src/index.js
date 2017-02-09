// import requireAll from 'require-all'
// import fs from 'mz/fs'
import kue from 'kue'
import Base from 'magnet-core/base'
import defaultConfig from './config/kue'

export default class MagnetKue extends Base {
  async setup () {
    this.kueConfig = Object.assign(defaultConfig, this.config.kue, this.options)

    this.app.kue = kue.createQueue(this.kueConfig)

    // https://github.com/Automattic/kue#error-handling
    this.app.kue.on('error', (err) => {
      this.log.error(err)
    })

    // https://github.com/Automattic/kue#unstable-redis-connections
    this.app.kue.watchStuckJobs(this.kueConfig.watchStuckJobsInterval)

    if (this.kueConfig.removeOnComplete) {
      this.app.kue
      .on('job complete', (id, result) => {
        kue.Job.get(id, (err, job) => {
          if (err) {
            this.log.error(err)
            return
          }
          job.remove((err) => {
            if (err) {
              this.log.error(err)
              return
            }
            this.log.info('removed completed job #%d', job.id)
          })
        })
      })
    }

    // let queues = {}
    // try {
    //   const folderPath = `${process.cwd()}/server/job_queues`
    //   await fs.exists(folderPath)
    //   queues = requireAll(folderPath)
    // } catch (err) {
    //   this.log.warn(err)
    // }

    // for (let key of Object.keys(queues)) {
    //   let queue = queues[key].default || queues[key]
    //   let name = queue.name || key
    //   let processArgs = [name]
    //   if (queue.concurrency) {
    //     processArgs.push(queue.concurrency)
    //   }
    //
    //   if (queue.process) {
    //     processArgs.push(async (data, ctx, done) => {
    //       try {
    //         done(null, await queue.process.call(this, this.app, data, ctx))
    //       } catch (err) {
    //         done(err)
    //       }
    //     })
    //   } else {
    //     this.log.warn(`No process for ${name}`)
    //   }
    //
    //   this.app.kue.process.apply(this.app.kue, processArgs)
    // }
  }

  async teardown () {
    return new Promise((resolve, reject) => {
      this.app.kue.shutdown(this.kueConfig.shuwtdownTimeout, (err, result) => {
        if (err) {
          this.app.log.error(err)
          reject(err)
          return
        }

        resolve(result)
      })
    })
  }
}
