const debug = require('debug')('openidconnect');
const Issuer = require('openid-client').Issuer;
const OIDCStrategy = require('openid-client').Strategy;
const passport = require('passport');

/**
 * Instantiate an OpenID issuer
 */
const openid = new Issuer({
  issuer: process.env.ISSUER,
  authorization_endpoint: process.env.AUTH_URL,
  token_endpoint: process.env.TOKEN_URL,
  userinfo_endpoint: process.env.USER_URL,
  jwks_uri: process.env.CERT_URL,
});

/**
 * Set the client details accordingly
 */
const client = new openid.Client({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uris: [process.env.CALLBACK_URL],
});

debug(openid);
debug(client);

/**
 * The isAuthenticated function.
 * It just checks if the req.user property is set,
 * otherwise sends a 401 HTTP status
 */
passport.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(401).send('Unauthorized');
}

/**
 * Deserializes user from the session
 */
passport.deserializeUser((profile, done) => {
  debug('Deserialize User');
  debug(profile);
  return done(null, profile);
})

/**
 * Serializes user to the session
 */
passport.serializeUser((profile, done) => {
  debug('Serialize User');
  debug(profile);
  return done(null, profile);
});

/**
 * Use the OpenID Connect strategy
 */
passport.use('oidc', new OIDCStrategy(client, 
  (tokenSet, userInfo, done) => {
    // Normally you would check for a user in your database
    // or create one, if it doesn't exist yet

    // Just debugs the response from the OpenID Connect provider
    debug(tokenSet);
    debug(userInfo);

    // As this is only a mockup, it calls the done() callback function
    // without any further checks
    return done(null, userInfo);
}));

module.exports = passport;