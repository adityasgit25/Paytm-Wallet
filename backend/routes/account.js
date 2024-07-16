// backend/routes/account.js
const express = require('express');

const router = express.Router();

const { Account } = require('../db');

const { authMiddleware }  = require('../middleware');

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});
router.post("/transfer", authMiddleware, async (req, res) => {
    console.log(req.userId);
    console.log(req.amount);
    const {amount, to} = req.body;
    const account = await Account.findOne({
        userId: req.userId
    });
    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    const toAccount = await Account.findOne({
        userId: to 
    })
    if (!toAccount) {
        return  res.status(400).json({
            message:"Invalid Account"
        })
    } 
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })
    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.json({
        message: "Transfer successful"
    })

    res.json({
        message: "Transfer successful"
    })

});

module.exports = router;