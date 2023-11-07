// const Redis = require("ioredis");
// import { Redis as RedisClass } from "ioredis";

// // redis instance
// let redisConnection: typeof Redis.Redis;

// // TODO test
// /**
//  * returns true if mongo connection has been established
//  * note: found "valid" statuses defined in redis.connect fn
//  * @returns {boolean}
//  */
// const isConnected = () => !!redisConnection && ["connecting", "connect", "ready"].includes(redisConnection.status);

// /**
//  * opens pg connection
//  */
// export const connect = (): RedisClass | undefined => {
//   const redisConfig = {port: 6379, host: "127.0.0.1", username: null, password: null, key_prefix: "" };
//   if (!redisConfig) return;

//   // return if already connected
//   if (isConnected()) return redisConnection;

//   redisConnection = new Redis({
//     port: redisConfig.port,
//     host: redisConfig.host,
//     username: redisConfig.username,
//     password: redisConfig.password,
//     keyPrefix: redisConfig.key_prefix,
//     connectTimeout: 1000,
//     maxLoadingRetryTime: 1000,
//   });

//   if (!isConnected()) throw new Error("Unable to connect to Redis");
//   return redisConnection;
// };

// /**
//  * closes pg connection
//  */
// export const close = async () => {
//   if (!isConnected()) return;
// };
