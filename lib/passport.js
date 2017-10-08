const debug = require('debug')('openidconnect');
const OIDCStrategy = require('passport-openidconnect').Strategy;
const passport = require('passport');

const config = {
  issuer: process.env.ISSUER,
  authorizationURL: process.env.AUTH_URL,
  tokenURL: process.env.TOKEN_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  userInfoURL: process.env.USER_URL,
};

passport.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(401).send('Unauthorized');
}

passport.deserializeUser((profile, done) => {
  debug('Deserialize User');
  debug(profile);
  return done(null, profile);
})

passport.serializeUser((profile, done) => {
  debug('Serialize User');
  debug(profile);
  return done(null, profile);
});

passport.use('oidc', new OIDCStrategy(config, 
  (iss, sub, profile, accessToken, refreshToken, done) => {
    debug(`iss: ${iss}`);
    debug(`sub: ${sub}`);
    debug(profile);
    debug(`token: ${accessToken}`);
    debug(`refresh token: ${refreshToken}`);
    return done(null, profile);
}));

module.exports = passport;