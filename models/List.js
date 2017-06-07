const
  mongoose = require('mongoose'),
  listSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
  })

const List = mongoose.model('List', listSchema)
module.exports = List
