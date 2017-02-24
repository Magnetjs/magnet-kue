import * as kue from 'kue'
import * as express from 'express'
import { Module } from 'magnet-core/module'
import * as basicAuth from 'basic-auth-connect'

import defaultConfig from './config/kue'

export default class KueUI extends Module {
  async setup () {
    const config = this.prepareConfig('kue', defaultConfig)

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
