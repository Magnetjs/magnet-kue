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
const module_1 = require("magnet-core/module");
const kue = require("kue");
class MagnetKue extends module_1.Module {
    get moduleName() { return 'kue'; }
    get defaultConfig() { return __dirname; }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.config = Object.assign(defaultConfig, this.config.kue, this.options)
            if (this.config.magnet) {
                this.config.redis = {
                    createClientFactory: this.app[this.config.magnet]
                };
            }
            this.app.kue = kue.createQueue(this.config);
            // https://github.com/Automattic/kue#error-handling
            this.app.kue.on('error', (err) => {
                this.log.error(err);
            });
            // https://github.com/Automattic/kue#unstable-redis-connections
            this.app.kue.watchStuckJobs(this.config.watchStuckJobsInterval);
            if (this.config.removeOnComplete) {
                this.app.kue
                    .on('job complete', (id, result) => {
                    kue.Job.get(id, (err, job) => {
                        if (err) {
                            this.log.error(err);
                            return;
                        }
                        job.remove((err) => {
                            if (err) {
                                this.log.error(err);
                            }
                        });
                    });
                });
            }
        });
    }
    teardown() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.app.kue.shutdown(this.config.shutdownTimeout, (err, result) => {
                    if (err) {
                        this.app.log.error(err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
}
exports.default = MagnetKue;
//# sourceMappingURL=index.js.map