import { Module } from 'magnet-core/module';
export default class MagnetKue extends Module {
    kueConfig: any;
    setup(): Promise<void>;
    teardown(): Promise<{}>;
}
