'use strict'

/* global wiki */

// ------------------------------------
// Microsoft Account
// ------------------------------------

const WindowsLiveStrategy = require('passport-windowslive').Strategy

module.exports = (passport, conf) => {
  passport.use('windowslive',
    new WindowsLiveStrategy({
      clientID: conf.clientId,
      clientSecret: conf.clientSecret,
      callbackURL: conf.callbackURL
    }, function (accessToken, refreshToken, profile, cb) {
      wiki.db.User.processProfile(profile).then((user) => {
        return cb(null, user) || true
      }).catch((err) => {
        return cb(err, null) || true
      })
    }
    ))
}
