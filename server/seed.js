const mongoose = require('mongoose')
const Rx = require('rxjs/Rx')
const R = require('ramda')

const config = require('./config')

const Employee = require('./models/employee')
const Rating = require('./models/rating')
const User = require('./models/user')

const employees = [
  { name: 'Philip J. Fry', title: 'Delivery Boy', department: 'Planet Express Crew', salary: 30000, rating: 0, photo: 'https://pbs.twimg.com/profile_images/806313367052976129/CketiJDK.jpg', ratingsCount: 0 },
  { name: 'Turanga Leela', title: 'Captain', department: 'Planet Express Crew', salary: 50000, rating: 0, photo: 'https://geekygirlfilmblog.files.wordpress.com/2014/04/turanga_leela_314.png', ratingsCount: 0 },
  { name: 'Bender Bending Rodrigez', title: 'Industrial Robot', department: 'Planet Express Crew', salary: 30000, rating: 0, photo: 'http://idaconcpts.com/wp-content/uploads/bender-smoking.jpg', ratingsCount: 0 },
  { name: 'Amy Wong', title: 'Intern', department: 'Planet Express Crew', salary: 0, rating: 0, photo: 'https://upload.wikimedia.org/wikipedia/it/1/12/Amy_wong_-_futurama.png', ratingsCount: 0 },
  { name: 'Hermes Conrad', title: 'Bureaucrat and Accountant', department: 'Planet Express', salary: 50000, rating: 0, photo: 'http://vignette1.wikia.nocookie.net/futurama/images/9/95/Hermes_Conrad.png/revision/latest?cb=20090809214221&path-prefix=it', ratingsCount: 0 },
]

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

mongoose.connect(config.mongoAddress)

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

function populateDatabase() {
  const userId$ = Rx.Observable.from(generateUsers())
        .take(employees.length)
        .map(u => new User(u))
        .flatMap(insertUser)

  const employeeId$ = Rx.Observable.from(employees)
        .map(e => new Employee(e))
        .flatMap(insertEmployee)

  const ratings$ = employeeId$
        .zip(userId$, (eid, uid) => [eid, uid])
        .map(([employeeId, userId]) => R.mergeAll([getRandomFrom(ratings), { employee: employeeId, user: userId }]))
        .do(console.log)
        .map(r => new Rating(r))
        .flatMap(insertRating)


  ratings$.subscribe(
    R.identity,
    R.identity,
    () => console.log('done!')
  )
}

setTimeout(populateDatabase, 1000)
