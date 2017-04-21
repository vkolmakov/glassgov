const Employee = require('../models/employee')
const R = require('ramda')

function randomLessThan(n) {
  return Math.floor(Math.random() * n)
}

exports.get = (req, res) => {
  Employee.find({}, function(err, es) {
    res.json(es)
  })
}

exports.getFeatured = (req, res) => {
  Employee.find({}, function(err, es) {
    const start = randomLessThan(es.length - 3)
    res.json(R.slice(start, start + 3, es))
  })
}
