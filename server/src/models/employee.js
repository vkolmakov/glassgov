const mongoose = require('mongoose')
const Schema = mongoose.Schema


const employeeSchema = new Schema({
  name: String,
  title: String,
  department: String,
  salary: Number,
  rating: Number,
  photo: String,
  ratingsCount: Number,
})

const ModelClass = mongoose.model('employee', employeeSchema)

module.exports = ModelClass
