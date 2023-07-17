const passport = require('passport');
const JwtStrategy = require('passport-jwt/lib/strategy');
const LocalStrategy = require('passport-local').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;
const UserModel = require('../models/user');

let config = require('./config');


module.exports = () => {
    passport.use(
        'local',
        new LocalStrategy(async (username, password, done) => {

            try {
                console.log("====> Local Strategy")

                let user = await UserModel.findOne({ username: username });
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }

                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }

                user.passport = "";
                user.salt = "";
                console.log("===> LoacalStrategy User.findOne")

                return done(null, user);

            } catch (error) {
                return done(error);
            }
        }));

        passport.use(
            'tokencheck',
            new JwtStrategy(
                {
                    secretOrKey: config.SECRETKEY,
                    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
                },
                async (token, done) => {
                    try {
                        console.log(token);
                        return done(null, token);
                    } catch (error) {
                        console.log(error);
                        done(error);
                        
                    }
                }
            )
        )
};