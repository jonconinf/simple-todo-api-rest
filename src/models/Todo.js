const mongoose = require('mongoose');
const hidden = require('mongoose-hidden')({ defaultHidden: { _id: true, __v: true } });

const todoSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  userUid: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  completedAt: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

todoSchema.plugin(hidden)

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;