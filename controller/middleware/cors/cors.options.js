"use strict";
const cors = require("cors");

module.exports = {
  origin: (origin, callback) => {
    if (["*"].indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
