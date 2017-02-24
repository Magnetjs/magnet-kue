import * as kue from 'kue'
import { Module } from 'magnet-core/module'
import defaultConfig from './config/kue'

export default class MagnetKue extends Module {
  kueConfig: any

  async setup () {
    this.kueConfig = Object.assign(defaultConfig, this.config.kue, this.options)

    if (this.kueConfig.magnet) {
      this.kueConfig.redis = {
        createClientFactory: this.app[this.kueConfig.magnet]
      }
    }

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
            if (err) { this.log.error(err) }
          })
        })
      })
    }
  }

  async teardown () {
    return new Promise((resolve, reject) => {
      this.app.kue.shutdown(this.kueConfig.shutdownTimeout, (err, result) => {
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
