export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/survey-api',
  port: process.env.PORT || 5051,
  jwtSecret: process.env.JWT_SECRET || 'adgharfgr3456245tgadfg435t'
}
