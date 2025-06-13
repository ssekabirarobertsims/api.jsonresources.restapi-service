"use strict";

const express = require("express");
const router = express.Router();

// Apply JWT authentication middleware to all resource routes
// Each handler manages a specific resource type (photos, posts, texts, users)
router.use("/", require("../middleware/jwt/jwt.middleware.controller"), require("./handler/photo.resources.handler.controller"));
router.use("/", require("../middleware/jwt/jwt.middleware.controller"), require("./handler/posts.resources.handler.controller"));
router.use("/", require("../middleware/jwt/jwt.middleware.controller"), require("./handler/texts.resources.handler.controller"));
router.use("/", require("../middleware/jwt/jwt.middleware.controller"), require("./handler/users.resources.handler.controller"));

// Export the router to be used in the main application
module.exports = router;
