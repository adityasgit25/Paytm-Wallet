// backend/routes/index.js
const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

// This is basically the root route on top of which user and account routes are built.....

//-----------

// These both below routes we are building above "/api/v1" route, and then just mounting!
// So basically it is saying that, any request starting with /user will be handled by userRouter. 
router.use("/user", userRouter);

// ~lly, if the route starting from /account, that request will be handled by the accountRouter.
router.use("/account", accountRouter);

module.exports = router;