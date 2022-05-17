import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import "dotenv/config";

const opt = {
  secretOrKey: process.env.AUTH0_HS256_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  issuer: "http://personaje.ort/",
  algorithms: ["HS256"],
};

export const jwtStrategy = new Strategy(opt, (jwt_payload, done) => {
  if (!jwt_payload) {
    done(true);
  } else {
    done(null, jwt_payload);
  }
});

export const Authenticate = (req, res, next) => {
  passport.authenticate(jwtStrategy, (err, user) => {
    console.log(user);
    if (err) res.status(401).send({ message: 'Unauthorized' });
    if (!user) res.status(401).send({ message: 'Unauthorized' });
    else {
      next();
    }
  })(req, res, next);
};