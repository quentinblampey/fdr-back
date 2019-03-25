/* eslint-disable indent */
const lo = require("lodash");
const mongoose = require("mongoose");
const Promise = require("bluebird");

/**
 * @typedef {Object} DBOptions - Options for db connection
 * @property {string} [user=] username
 * @property {string} [password=] password
 * @property {string} host Host
 * @property {Number} port port
 * @property {string} database database name
 */

module.exports = {
  Connection: () => {
    mongoose.Promise = Promise;

    mongoose.connection.on("error", err => {
      console.log(err);
    });

    mongoose.connection.once("open", () => {
      console.log("Database connection is ready");
    });

    mongoose.connection.once("disconnected", () => {
      console.log("Database disconnected");
    });

    return {
      /**
       * Open connection to database
       * @param {DBOptions} options Options de connexions (voir doc mongoose)
       * @return {Promise} Mongoose connection
       */
      async open(options) {
        if (!lo.isPlainObject(options)) {
          throw new Error("options is required and must be an object");
        }
        let user = !lo.isEmpty(options.user)
          ? `${options.user}:${options.password}@`
          : "";
        let uri = `mongodb://${user}${options.host}:${options.port}/${
          options.database
        }`;
        await mongoose.connect(uri);
      },
      /**
       * @return {Promise} Promise
       */
      async close() {
        await mongoose.disconnect();
      }
    };
  }
};
