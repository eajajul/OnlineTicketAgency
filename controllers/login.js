var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

//ROUTES
router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
			
		var user = {
			uname: req.body.uname,
			password: req.body.password
		};
          //var type="";
		userModel.validate(user, function(result){
			if(result != ""){
				req.session.un = req.body.uname;
				req.session.uid = result.id;
				req.session.type=result.type;
				//var type=result.type;
				//console.log(type);

				if (result.type=="user")
				 {
				 	res.redirect('/mHome');
				 }
				 else
				 {
                    res.redirect('/home');
				 }

				
			}else{
				res.redirect('/login');
			}		
		});
		//console.log(results);
});

module.exports = router;







