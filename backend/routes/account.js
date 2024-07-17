// backend/routes/account.js
const express = require('express');

const router = express.Router();

const { Account } = require('../db');

const { authMiddleware }  = require('../middleware');

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
          return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: account.balance });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
});
router.post("/transfer", authMiddleware, async (req, res) => {
    try {
      const { amount, to } = req.body;
    console.log(req.body.amount);
    console.log(req.body.to);
      console.log('Transfer Request:', { userId: req.userId, amount, to });
  
      if (!amount || !to) {
        return res.status(400).json({ message: "Invalid request data" });
      }
  
      const account = await Account.findOne({ userId: req.userId });
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
  
      if (account.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
  
      const toAccount = await Account.findOne({ userId: to });
      if (!toAccount) {
        return res.status(400).json({ message: "Invalid recipient account" });
      }
  
      await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
  
      res.json({ message: "Transfer successful" });
    } catch (error) {
      console.error("Transfer Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;