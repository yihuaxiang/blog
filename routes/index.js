var express = require('express');
var router = express.Router();
var querystring=require("querystring");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/login",function(req,res,next){
	res.render("login");
})
router.post("/login",function(req,res,next){
	var username=req.body.username;
	var password=req.body.password;

	if(username == password){
		req.session.uid=username;
		res.render("loginDone");
	}else{
		res.render("login");
	}
})
router.get("/logout",function(req,res,next){
	req.session.uid=null;

	res.redirect("/login");
})

module.exports = router;
