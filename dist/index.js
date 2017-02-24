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
const kue_1 = require("./config/kue");
class MagnetKue extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.kueConfig = Object.assign(kue_1.default, this.config.kue, this.options);
            if (this.kueConfig.magnet) {
                this.kueConfig.redis = {
                    createClientFactory: this.app[this.kueConfig.magnet]
                };
            }
            this.app.kue = kue.createQueue(this.kueConfig);
            // https://github.com/Automattic/kue#error-handling
            this.app.kue.on('error', (err) => {
                this.log.error(err);
            });
            // https://github.com/Automattic/kue#unstable-redis-connections
            this.app.kue.watchStuckJobs(this.kueConfig.watchStuckJobsInterval);
            if (this.kueConfig.removeOnComplete) {
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
                this.app.kue.shutdown(this.kueConfig.shutdownTimeout, (err, result) => {
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