if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Requires:
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//DataBase:
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//Routers:
const indexRouter = require('./routes/index')
const studentsRouter = require('./routes/students')
const systemRouter = require('./routes/system')

//Configs:
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

//Log In:
app.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', {layout: 'layouts/layout', error})
})

//app.post('/login', (req, res) => {
//  const password = req.body.password;  
//  if (password === "1997") {
//    req.session.authenticated = true;
//    res.redirect('/students');
//  } else {
//    const errorMessage = encodeURIComponent('סיסמה שגויה, נסה שנית...');
//        res.redirect(`/login?error=${errorMessage}`);
//  }
//})
//
//function isAuthenticated(req, res, next) {
//  if (req.session.authenticated) {
//      return next();
//  }
//  res.redirect('/login');
//}

// Logout route
app.get('/logout', (req, res) => {
  req.session.authenticated = false;
  res.redirect('/login');
});

//Routers Config:
app.use('/', indexRouter)
app.use('/students', isAuthenticated, studentsRouter)
app.use('/cours', isAuthenticated, systemRouter)

//Hosting
app.listen(process.env.PORT, () => {
  console.log("PORT IS RUNING");
  
})
