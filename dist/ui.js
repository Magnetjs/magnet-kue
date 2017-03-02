"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const kue = require("kue");
const module_1 = require("magnet-core/module");
const basicAuth = require("basic-auth-connect");
const kue_1 = require("./config/kue");
class KueUI extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.prepareConfig('kue', kue_1.default);
            if (!config.ui)
                return;
            if (config.ui.basicAuth) {
                this.app.express.use(basicAuth(config.ui.basicAuth.username, config.ui.basicAuth.password));
            }
            if (config.ui.title) {
                kue.app.set('title', config.ui.title);
            }
            this.app.express.use(kue.app);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KueUI;
//# sourceMappingURL=ui.js.map