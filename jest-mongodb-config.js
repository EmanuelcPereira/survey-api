module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '5.7.0',
      skipMD5: true
    },
    autoStart: false,
    instance: {
      dbName: 'jest'
    }
  }
}
