const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')
const Employee = require('./controllers/employee')
const Rating = require('./controllers/rating')

const requireAuth = passport.authenticate('jwt', { session: false })

const requireSignin = passport.authenticate('local', { session: false })

module.exports = (app) => {
  app.post('/api/signin', requireSignin, Authentication.signin)
  app.post('/api/signup', Authentication.signup)

  app.get('/api/employees', Employee.get)
  app.get('/api/featured', Employee.getFeatured)
  app.get('/api/ratings/:id', Rating.get)
  app.post('/api/ratings/:id', requireAuth, Rating.post)
  app.get('/api/rating-status/:id', requireAuth, Rating.getRatingStatus)
}
