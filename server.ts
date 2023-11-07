// import { connect } from "./helpers/redis";
import { reqErrorHandler } from "./helpers/utils";

const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
// const passport = require('passport');
// const session = require("express-session");
const cookieParser = require("cookie-parser");
// const RedisStore = require('connect-redis')(session);
// const redisConnection = connect();


/**
 * parses req body
 * @type {createServer.NextHandleFunction}
 */
const bodyParser = express.json({
  inflate: false, // delegate to nginx?
  limit: "500kb",
});

// pre request middlewares 
app.use([bodyParser, cors()]);
app.use(morgan(":method :url :status :response-time ms"));
app.use(cookieParser());
// app.use(
//   session({
//     secret: "secret-key",
//     resave: false,
//     saveUninitialized: false,
//     store: new RedisStore({ client: redisConnection }),
//     cookie: {
//       maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
//     },
//   })
// );
// app.use(passport.initialize()),
// app.use(passport.session()),
//request
app.get("/", (req: any, res: any) => {
  return res.json({ msg: "success" });
});
app.use(require("./routes"));

// post request middlewares bla bla bla
app.use("/", reqErrorHandler);

app.listen(5000, '0.0.0.0', () => {
  console.log(`Server running on port: ${5000}`);
});
