const debug = require('debug')('openidconnect');
const Issuer = require('openid-client').Issuer;
const OIDCStrategy = require('openid-client').Strategy;
const passport = require('passport');

const openid = new Issuer({
  issuer: process.env.ISSUER,
  authorization_endpoint: process.env.AUTH_URL,
  token_endpoint: process.env.TOKEN_URL,
  userinfo_endpoint: process.env.USER_URL,
  jwks_uri: process.env.CERT_URL,
});

const client = new openid.Client({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uris: [process.env.CALLBACK_URL],
});

debug(openid);
debug(client);

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

passport.use('oidc', new OIDCStrategy(client, 
  (tokenSet, userInfo, done) => {
    debug(tokenSet);
    debug(userInfo);
    return done(null, userInfo);
}));

module.exports = passport;