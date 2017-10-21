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
**CAUTION:** Never commit your secret keys in your git repo!

## DEBUG
Debugging may be turned on by setting the `DEBUG` environment variable to `openidconnect`:
```bash
$ DEBUG=openidconnect npm start
```
Another possibility would be to add this combination to your `.env` file to automatically load it during testing.

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
* **v1.0.0** Initial version