const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models").userModel;

// 要留意係return function
module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        // console.log(user);
        if (err) {
          console.log("Cannot match the jwt key");
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          console.log("else return");
          done(null, false);
        }
      });
    })
  );
};
