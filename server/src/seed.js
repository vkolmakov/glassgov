const mongoose = require('mongoose')
const Rx = require('rxjs/Rx')
const R = require('ramda')
const axios = require('axios')

const config = require('./config')

const Employee = require('./models/employee')
const Rating = require('./models/rating')
const User = require('./models/user')

const ratings = [
  { text: `I've seen better`, value: 2.0 },
  { text: 'Much amaze', value: 5.0 },
  { text: `I'm Ben!`, value: 4.0 },
  { text: `I've seen better`, value: 2.0 },
  { text: 'So best', value: 5.0 },
  { text: `Yes!`, value: 4.0 },
  { text: `It doesn't represent me, so just don't air!`, value: 4.0 },
  { text: `No!`, value: 1.0 },
  { text: `He's all burned up`, value: 5.0 },
  { text: `Solid.`, value: 4.0 },
  { text: `I'm out of ideas here.`, value: 2.0 },
  { text: 'Ducks!', value: 5.0 },
  { text: `Ducks and wildcats!`, value: 4.0 },
]

function randomLessThan(n) {
  return Math.floor(Math.random() * n)
}

function getRandomFrom(xs) {
  return xs[randomLessThan(xs.length)]
}


const generateUsers = function* () {
  let count = 0

  const names = ['user', 'chicago', 'desert_rose', 'paddy', 'cat', 'cole']
  const domains = ['example.com', 'user.net', 'morestuff.com']

  while (true) yield {
    email: [`${getRandomFrom(names)}${count++}`, getRandomFrom(domains)].join('@'),
    password: 'verystrongpassword',
  }
}

function insertEmployee(employee) {
  return new Promise((res, rej) => {
    employee.save(function (err, e) {
      res(e._id)
    })
  })
}

function insertRating(rating) {
  return new Promise((res, rej) => {
    rating.save(function (err, r) {
      res()
    })
  })
}

function insertUser(user) {
  return new Promise((res, rej) => {
    user.save(function (err, u) {
      res(u._id)
    })
  })
}

function employees$() {
  const capitalizeWord = R.compose(
    R.join(''),
    R.juxt([R.compose(R.toUpper, R.head), R.tail]))

  const capitalizeSentence = R.compose(
    R.join(' '),
    R.map(capitalizeWord),
    R.split(/\s+/))

  const stripPunctuation = R.replace(/[^\w\s]|_/g, '')

  const processText = R.compose(
    capitalizeSentence,
    stripPunctuation,
    R.toLower)

  const parseEmployee = rawData => ({
    name: processText(rawData[8]),
    title: processText(rawData[9]),
    department: processText(rawData[10]),
    salary: parseInt(rawData[11], 10),
    ratingsCount: 0,
    rating: 0,
  })

  const sortBySalaryAsc = R.sortBy(
    R.compose(Number, R.prop(11)))

  const sortBySalaryDesc = R.compose(
    R.reverse, sortBySalaryAsc)

  const requestData = () =>
        axios.get('https://data.cityofchicago.org/api/views/xzkq-xp2w/rows.json?accessType=DOWNLOAD')
        .then(R.identity, console.error)

  return Rx.Observable.fromPromise(requestData())
    .map(R.compose(R.prop('data'), R.prop('data'))) // ha!
    .map(sortBySalaryDesc)
    .flatMap(data => Rx.Observable.from(data))
    .take(100)
    .map(parseEmployee)
}

function populateDatabase() {
  const userId$ = Rx.Observable.from(generateUsers())
        .take(100)
        .map(u => new User(u))
        .flatMap(insertUser)

  const employeeId$ = employees$()
        .map(e => new Employee(e))
        .flatMap(insertEmployee)

  const ratings$ = employeeId$
        .zip(userId$, (eid, uid) => [eid, uid])
        .map(([employeeId, userId]) => R.mergeAll([getRandomFrom(ratings), { employee: employeeId, user: userId }]))
        .map(r => new Rating(r))
        .flatMap(insertRating)


  return ratings$.subscribe(
    R.identity,
    console.error,
    () => console.log('done!')
  )
}

function dropDatabase() {
  return Promise.all([Employee.remove({}),
                      Rating.remove({}),
                      User.remove({})])
}

mongoose.connect(config.mongoAddress)
  .then(dropDatabase)
  .then(() => console.log('Dropped the database'))
  .then(populateDatabase)
