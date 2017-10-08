const argv = require('yargs').argv;
const bodyParser = require('body-parser');
const express = require('express');
const debug = require('debug')('openidconnect');
const hbs = require('express-handlebars');
const log = require('morgan');
const path = require('path');
const session = require('express-session');

require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

const passport = require('./lib/passport');

const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(log('tiny'));

app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.get('/auth/callback', passport.authenticate('oidc', {
  failureRedirect: '/',
  successRedirect: '/success',
}));
app.get('/auth', passport.authenticate('oidc'));
app.get('/success', passport.isAuthenticated, (req, res) => res.json(req.user));
app.get('/', (req, res) => res.render('login'));

app.listen(process.env.PORT || 3000, () => {
  debug(`App listening on port ${process.env.PORT || 3000}`);
});

