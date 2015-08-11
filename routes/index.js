var express = require('express');
var router = express.Router();
var querystring=require("querystring");
var UserService=require("User");
var User=require("../node_modules/User/User");
var Article=require("../node_modules/Article/Article");
var ArticleDAO=require("Article");

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


		var userService=new UserService();
		var user=new User(username,password);
		console.log("checking...");
		var callback=function(err,result){
			console.log("callback doing...");
			console.log(result);
			if(err){
				console.log("err");
			}else{
				var one=result[0];
				console.log("user.getPassword() "+user.getPassword());
				if(one){
					if(one.password == user.getPassword()){
						req.session.uid=username;
						console.log("login done");
						res.render("loginDone");
					}else{
						console.log("password wrong");
						res.render("login");
					}
				}else{
					console.log("no user");
					res.render("login");
				}
			}
		}
		userService.checkUser(user,callback);

})
router.get("/addArticle",function(req,res,next){
	res.render("addArticle");
})
router.post("/addArticle",function(req,res,next){
	var title=req.body.title;
	var content=req.body.content;

	var articleDAO=new ArticleDAO();
	var article=new Article(title,content);
	console.log("adding...");
	var callback=function(err,result){
		if(err){
			console.log("err");
		}else{
			console.log(result);
			console.log("&&&&&&&&&&&&");
			res.render("addArticle");
		}
	}
	articleDAO.addArticle(article,callback);
})
router.get("/logout",function(req,res,next){
	req.session.uid=null;

	res.redirect("/login");
})

module.exports = router;
