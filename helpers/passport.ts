// import { createNewUser, getUserByEmail } from "../dao/user";

// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");

// const { googleAuth } = require('../config/firestore');

// /**
//  * initialize the passport strategy. In this case our google strategy.
//  */
// export const initializePassportStrategy = () => {
//   if (!googleAuth?.clientId) return;

//   /**
//    * To determine what data will be shopd in the session. In this case whole user object
//    */
//   passport.serializeUser((user: any, done: any) => {
//     return done(null, user);
//   });

//   /**
//    * The fetched user object is attached with req.user
//    */
//   passport.deserializeUser((user: any, done: any) => {
//     return done(null, user);
//   });

//   /**
//    * Authentication strategy with every callback function which receives profile object.
//    * It contains all the required information of logged in user
//    */
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: googleAuth.clientId,
//         clientSecret: googleAuth.clientSecret,
//         callbackURL: googleAuth.callbackURL,
//         scope: ["profile", "email"],
//       },
//       async (accessToken: any, refreshToken: any, profile: any, done: any) => {
//         // auth code goes here........
//         const user = await getUserByEmail(profile._json.email);
//         if(!user)
//           await createNewUser({ parentEmail: profile._json.email, parentName: profile._json.name });
//         return done(null, profile);
        
//       }
//     ) as any
//   );
// };
