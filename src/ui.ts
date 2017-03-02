import * as kue from 'kue'
import { Module } from 'magnet-core/module'
import * as basicAuth from 'basic-auth-connect'

import defaultConfig from './config/kue'

export default class KueUI extends Module {
  async setup () {
    const config = this.prepareConfig('kue', defaultConfig)

    if (!config.ui) return

    if (config.ui.basicAuth) {
      this.app.express.use(
        basicAuth(
          config.ui.basicAuth.username,
          config.ui.basicAuth.password
        )
      )
    }

    if (config.ui.title) {
      kue.app.set('title', config.ui.title)
    }

    this.app.express.use(kue.app)
  }
}
