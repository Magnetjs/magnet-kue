export default {
  watchStuckJobsInterval: 1000,
  removeOnComplete: true,
  shutdownTimeout: 5000,
  ui: {
    listen: 3000,
    title: '',
    express: {},
    basicAuth: {
      username: '',
      password: ''
    }
  },
  redis: {
    host: 'localhost',
    port: 6379
  }
}
