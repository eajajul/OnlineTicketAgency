//DECLARATION
var express  		= require('express');
var login 			= require('./controllers/login');
var signup			= require('./controllers/signup');
var home 			= require('./controllers/home');
var mHome 			= require('./controllers/mHome');
var logout 			= require('./controllers/logout');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var app 			= express();


//CONFIGURATION
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use('/login', login);
app.use('/signup', signup);
app.use('/home', home);
app.use('/mHome', mHome);
app.use('/logout', logout);
app.use('/assets', express.static('ext'))

//ROUTES
app.get('/', (req, res)=> res.render('landing/landing'));


//SERVER STARTUP
app.listen(4000, function(){
	console.log('server started at 3000...');
});

