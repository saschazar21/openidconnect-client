# OpenID Connect client
This is a demo implementation for testing OpenID Connect providers.  
I recommend reading the [OpenID Connect 1.0 Core](http://openid.net/specs/openid-connect-core-1_0.html#rnc) spec for more information.

After a successful authentication, the user should be presented with his/her user profile data. If authentication fails, the user gets redirected to the home page.

## Prerequisites
* [Node.js](https://nodejs.org/en/download/) >= v6
* `npm` (included in Node.js), or [yarn](https://yarnpkg.com)

## Install
* `git clone https://github.com/saschazar21/openidconnect-client`
* `cd openidconnect-client`
* `npm install` or `yarn`

## Preparation
Make sure the needed environment variables listed in `.env.sample` are properly set according to your desired OpenID Connect provider.  
Either set them by copying the `.env.sample` file to `.env` and appending values to the listed variable keys or set them manually in the console:
```bash
$ ISSUER=... AUTH_URL=... CERT_URL=... (etc...) npm start
```
### Sample configuration

A sample configuration of the necessary URLs in your `.env` file would look like the following:

```bash
ISSUER=http://localhost:3000
AUTH_URL=http://localhost:3000/auth
CERT_URL=http://localhost:3000/certs
TOKEN_URL=http://localhost:3000/token
CALLBACK_URL=https://home.dev:3001/auth/callback
USER_URL=http://localhost:3000/me
```

All but `CALLBACK_URL` of the above URLs are affecting the client's requests to the provider, therefore please check your current provider configuration. The `CALLBACK_URL` must be equal to your client's settings at the provider and point to a route in your client configuration (the URL the provider will redirect authenticated requests to).

**CAUTION:** Never commit your secret keys in your git repo!

### HTTPS support

If you have a valid `key` & `cert` file path set in your `.env` file, the application automatically boots up an HTTPS-enabled server. Using this configuration, you'll have to explicitly use the `https://` prefix, as there is no automatic redirect from `http://` while the server is running.

## DEBUG
Debugging may be turned on by setting the `DEBUG` environment variable to `openidconnect`:
```bash
$ DEBUG=openidconnect npm start
```
Another possibility would be to add this combination to your `.env` file to automatically load it during testing.

## Known issues
* ~~`fragment` response mode not working~~ - this has been fixed by @panva using [PR #1](https://github.com/saschazar21/openidconnect-client/pull/1) and released in **v1.4.0**.

## Contribution
Contributors welcome. While this project might just be here for testing you are free to fork it and create pull requests, if you fixed a bug or think an enhancement should be part of this project.

## Credits
* **@tj, @dougwilson et al** for [Express](https://github.com/expressjs/express) and related modules.
* **@jaredhanson** for [Passport](https://github.com/jaredhanson/passport)
* **@panva** for [openid-client](https://github.com/panva/node-openid-client)
* **@motdotla** for [dotenv](https://github.com/motdotla/dotenv)

## License
MIT

## Version history
* **v1.4.0** Parsing fragment response mode now working, thanks to **@panva**: [PR #1](https://github.com/saschazar21/openidconnect-client/pull/1)
* **v1.3.0** HTTP request logs are more verbose now, discovered `fragment` response mode issue, added RESPONSE_MODE env & POST route config
* **v1.2.0** Enhanced environment variables to support different response types out of the box
* **v1.1.0** Enhanced the setup to also support HTTPS when `key` and `cert` are present
* **v1.0.0** Initial version