const R = require('ramda')
const dateFns = require('date-fns')

const Rating = require('../models/rating')
const User = require('../models/user')

const matchRatingWithUser = users => rating => {
  const user = users.find(R.compose(R.equals(rating.user), R.prop('_id')))
  const username = user ? user.email.split('@')[0] : 'Unknown user'
  return Object.assign({}, R.prop('_doc', rating), { user: username })
}

const compareRecordsByCreatedDate = (r1, r2) =>
      dateFns.compareDesc(new Date(r1.createdAt), new Date(r2.createdAt))

exports.get = (req, res) => {
  const employee = req.params.id
  Rating.find({ employee }, function(err, rs) {
    User.find({}, function(err, us) {
      res.json(rs.map(matchRatingWithUser(us)).sort(compareRecordsByCreatedDate))
    })
  })
}

exports.post = (req, res) => {
  const userId = req.user._id
  const r = Object.assign({}, req.body, { employee: req.params.id, user: userId })
  const rating = new Rating(r)

  rating.save(function () {
    res.status(200).json(r)
  })
}

exports.getRatingStatus = (req, res) => {
  const user = req.user._id
  const employee = req.params.id
  Rating.find({ user, employee }, function(err, rs) {
    res.status(200).json(!R.isEmpty(rs))
  })
}
