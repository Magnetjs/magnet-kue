export default {
  watchStuckJobsInterval: 1000,
  removeOnComplete: true,
  shutdownTimeout: 5000,

  // Set client
  // magnet: 'ioredis', // Get from this.app.ioredis

  // or

  // https://github.com/Automattic/kue#redis-connection-settings
  redis: {
    host: 'localhost',
    port: 6379
  },

  ui: {
    listen: 3000,
    title: '',
    express: {},
    basicAuth: {
      username: '',
      password: ''
    }
  }
}
