const
  mongoose = require('mongoose'),
  taskSchema = new mongoose.Schema({
    list: {type: mongoose.Schema.Types.ObjectId, ref: 'List'},
    body: String,
    description: String,
    completed: {type:Boolean, default: false}
  })

const Task = mongoose.model('Task', taskSchema)
module.exports = Task
