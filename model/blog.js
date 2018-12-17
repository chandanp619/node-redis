var mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    'title':String,
    'content':String,
    'date':Date,
    'status':String
  });

  var BlogModel = mongoose.model('blogModel',BlogSchema,'blog');
  module.exports = BlogModel;