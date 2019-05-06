var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();


router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	
	userModel.getAll(function(results){
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('mHome/index', data);
	});
});

router.get('/profile', function(req, res){

	userModel.get(req.session.uid, function(result){

		if(result != ""){
			res.render('mHome/profile', result);
		}else{
			res.redirect('/mHome');
		}
	});
});

router.get('/edit', function(req, res){

	userModel.get(req.session.uid, function(result){

		if(result != ""){
			res.render('mHome/edit', result);
		}else{
			res.redirect('/home/userlist');
		}
	});
});

router.get('/places', function(req, res)
{

res.render('places/index');
	
});

router.get('/places/coxsbazar', function(req, res)
{

res.render('places/coxsbazar');
	
});


router.post('/places/coxsbazar', function(req, res)
{
var user = {
		dest: req.body.dest,
		date: req.body.date,
		seats: req.body.quantity,
		contactnum: req.body.phone,
		username: req.session.un
	};
	userModel.tinsert(user, function(status)
	{

		if(status)
		{
			res.redirect('/mHome/');
		}
		else
		{
			res.redirect('/mHome');
		}
		

});
	
});

router.post("/edit", function(req, res){

	var user = {
		id: req.session.uid,
		uname: req.body.uname,
		password: req.body.password,
		type: "user"
	};

	userModel.update(user, function(status){

		if(status){
			res.redirect('/mHome/profile');
		}else{
			res.redirect('/mHome/edit:'+req.params.id);
		}
	});
});

module.exports = router;