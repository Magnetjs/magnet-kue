"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kue = require("kue");
const module_1 = require("magnet-core/module");
const basicAuth = require("basic-auth-connect");
class MagnetKueUI extends module_1.Module {
    get moduleName() { return 'kue'; }
    get defaultConfig() { return __dirname; }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config.ui)
                return;
            if (this.config.ui.basicAuth) {
                this.app.express.use(basicAuth(this.config.ui.basicAuth.username, this.config.ui.basicAuth.password));
            }
            if (this.config.ui.title) {
                kue.app.set('title', this.config.ui.title);
            }
            this.app.express.use(kue.app);
        });
    }
}
exports.default = MagnetKueUI;
//# sourceMappingURL=ui.js.map