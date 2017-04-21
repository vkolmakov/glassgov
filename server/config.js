module.exports = {
  secret: process.env.SECRET || 'supersecret',
  mongoAddress: process.env.MONGODB_URI || 'mongodb://localhost:glassgov/glassgov',
}
