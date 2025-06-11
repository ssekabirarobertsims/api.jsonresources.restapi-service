"use strict";

const express = require("express");
const router = express.Router();

router.use("/", require("../middleware/jwt/jwt.middleware.controller"), require("./handler/photo.resources.handler.controller"));
router.use("/", require("../middleware/jwt/jwt.middleware.controller"), require("./handler/posts.resources.handler.controller"));
router.use("/", require("../middleware/jwt/jwt.middleware.controller"), require("./handler/texts.resources.handler.controller"));
router.use("/", require("../middleware/jwt/jwt.middleware.controller"), require("./handler/users.resources.handler.controller"));

module.exports = router;
