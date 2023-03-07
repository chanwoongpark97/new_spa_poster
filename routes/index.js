const express = require("express");
const postsRouter = require("./posts");
const commentsRouter = require("./comments");
const usersRouter = require("./users");
const authRouter = require("./auth")

const router = express.Router();

router.use('/', [postsRouter, commentsRouter]);
router.use('/signup', [usersRouter]);
router.use('/login', [authRouter]);
// router.use('/comments', commentsRouter);

module.exports = router;