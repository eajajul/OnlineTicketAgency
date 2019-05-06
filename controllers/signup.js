var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();


router.get('/', function(req, res){
	res.render('signup/index');
});

router.post('/', function(req, res){

	var user = {
		uname: req.body.uname,
		password: req.body.password,
		type: 'user'
	};

	userModel.insert(user, function(status)
	{

		if(status)
		{
			console.log(status);
			res.redirect('/mHome');
		}
		else
		{
			res.redirect('/signup');
		}
	});
});

module.exports = router;