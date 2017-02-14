import kue from 'kue'
import express from 'express'
import Base from 'magnet-core/base'
import basicAuth from 'basic-auth-connect'
import defaultConfig from './config/kue'

export default class KueUI extends Base {
  async setup () {
    const config = Object.assign(defaultConfig, this.config.kue, this.options)

    if (!config.ui) return

    const app = express(config.ui.express)

    if (config.ui.basicAuth) {
      app.use(
        basicAuth(
          config.ui.basicAuth.username,
          config.ui.basicAuth.password
        )
      )
    }

    if (config.ui.title) {
      kue.app.set('title', config.ui.title)
    }

    app.use(kue.app)
    app.listen(config.ui.listen, () => {
      this.log.info(`Kue UI server started at port ${config.ui.listen}`)
    })
  }
}
