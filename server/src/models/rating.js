const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = require('./employee')


const ratingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: String,
  value: Number,
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
}, { timestamps: true })


ratingSchema.post('save', function(rating) {
  Employee.findById(rating.employee, function(err, employee) {
    const oldAverage = employee.rating
    const newRatingValue = rating.value
    const newCount = employee.ratingsCount + 1

    const newAverage = oldAverage + ((newRatingValue - oldAverage) / newCount)

    employee.rating = newAverage
    employee.ratingsCount = newCount
    employee.save()
  })
})

const ModelClass = mongoose.model('rating', ratingSchema)

module.exports = ModelClass
