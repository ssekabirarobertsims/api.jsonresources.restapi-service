"use strict";
debugger;
const express = require("express");
const router = express.Router();

router.use("/", require("./handler/photo.resources.handler.controller"));
router.use("/", require("./handler/posts.resources.handler.controller"));
router.use("/", require("./handler/texts.resources.handler.controller"));
router.use("/", require("./handler/users.resources.handler.controller"));

module.exports = router;
