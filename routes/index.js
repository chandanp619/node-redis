var express = require('express');
var router = express.Router();
var redis = require("redis");
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {

  
var client = redis.createClient();
client.on("error", function (err) {
  console.log("Error " + err);
});


client.get("Blogs", function(err, reply) {
  var XBlogsData = reply.replace("\n","");
 if(reply == null){

      var BlogModel = require('../model/blog');
      BlogModel.find({},function(err,blogsXData){
          if(err) console.log(err);
          XBlogsData = blogsXData;
        client.set('Blogs',blogsXData.toString());
      });
 }
console.log(XBlogsData);
 res.render('index', { title: 'Express',blogs:XBlogsData });
});
//client.quit();

  
});


module.exports = router;
