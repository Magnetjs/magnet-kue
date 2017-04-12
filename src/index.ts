import { Module } from 'magnet-core/module'
import * as kue from 'kue'

export default class MagnetKue extends Module {
  log: any
  config: any
  app: any

  get moduleName () { return 'kue' }
  get defaultConfig () { return __dirname }

  async setup () {
    // this.config = Object.assign(defaultConfig, this.config.kue, this.options)

    if (this.config.magnet) {
      this.config.redis = {
        createClientFactory: this.app[this.config.magnet]
      }
    }

    this.app.kue = kue.createQueue(this.config)

    // https://github.com/Automattic/kue#error-handling
    this.app.kue.on('error', (err) => {
      this.log.error(err)
    })

    // https://github.com/Automattic/kue#unstable-redis-connections
    this.app.kue.watchStuckJobs(this.config.watchStuckJobsInterval)

    if (this.config.removeOnComplete) {
      this.app.kue
      .on('job complete', (id, result) => {
        kue.Job.get(id, (err, job) => {
          if (err) {
            this.log.error(err)
            return
          }
          job.remove((err) => {
            if (err) { this.log.error(err) }
          })
        })
      })
    }
  }

  async teardown () {
    return new Promise((resolve, reject) => {
      this.app.kue.shutdown(this.config.shutdownTimeout, (err, result) => {
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
