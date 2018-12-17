var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {

  mongoose.connect('');
  var dataBlog = [
    {'title':'Sample Blog One','content':'1 Sample content goes here.', 'date':new Date().toString(),'status':'published'},
    {'title':'Sample Blog Two','content':'2 Sample content goes here.', 'date':new Date().toString(),'status':'published'},
    {'title':'Sample Blog three','content':'3 Sample content goes here.', 'date':new Date().toString(),'status':'published'},
    {'title':'Sample Blog Four','content':'4 Sample content goes here.', 'date':new Date().toString(),'status':'published'}
  ];

  const BlogSchema = new mongoose.Schema({
    'title':String,
    'content':String,
    'date':Date,
    'status':String
  });

  var BlogModel = mongoose.model('blogModel',BlogSchema,'blog');
  BlogModel.insertMany(dataBlog,function(err,data){
    if(err) console.log(err);

  });

  res.render('insertBlog', { title: 'Insert Blog' });
});


module.exports = router;
