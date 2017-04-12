import * as kue from 'kue'
import { Module } from 'magnet-core/module'
import * as basicAuth from 'basic-auth-connect'

export default class MagnetKueUI extends Module {
  log: any
  config: any
  app: any

  get moduleName () { return 'kue' }
  get defaultConfig () { return __dirname }

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
