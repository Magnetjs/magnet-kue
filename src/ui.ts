import * as kue from 'kue'
import { Module } from 'magnet-core/module'
import * as basicAuth from 'basic-auth-connect'

export default class KueUI extends Module {
  log: any
  config: any
  app: any

  async setup () {
    if (!this.config.ui) return

    if (this.config.ui.basicAuth) {
      this.app.express.use(
        basicAuth(
          this.config.ui.basicAuth.username,
          this.config.ui.basicAuth.password
        )
      )
    }

    if (this.config.ui.title) {
      kue.app.set('title', this.config.ui.title)
    }

    this.app.express.use(kue.app)
  }
}
