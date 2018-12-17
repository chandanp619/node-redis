var express = require('express');
var router = express.Router();
var redis = require("redis");
/* GET home page. */
router.get('/', function(req, res, next) {

  
var client = redis.createClient();
client.on("error", function (err) {
  console.log("Error " + err);
});
client.set('status',"Success", redis.print);
client.set('status',"Success 111", redis.print);
client.get("status", function(err, reply) {
  // reply is null when the key is missing
  console.log(reply);
});
client.quit();

  res.render('index', { title: 'Express' });
});


module.exports = router;
