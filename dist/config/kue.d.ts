declare var _default: {
    watchStuckJobsInterval: number;
    removeOnComplete: boolean;
    shutdownTimeout: number;
    redis: {
        host: string;
        port: number;
    };
    ui: {
        listen: number;
        title: string;
        express: {};
        basicAuth: {
            username: string;
            password: string;
        };
    };
};
export default _default;
