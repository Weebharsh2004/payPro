const express= require('express');
const z=require('zod');
const router=express.Router();
const authMiddleware=require('../middleware/middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const acc = await Account.findOne({ userId: req.userId });

        if (!acc) {
            throw new Error("Account not found");
        }

        res.status(200).json({
            balance: acc.balance,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});


router.post("/transfer", authMiddleware, async (req, res) => {
    let session; // Define session outside the try block

    try {
        session = await mongoose.startSession();
        await session.startTransaction();

        const { amount, to } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            throw new Error("Insufficient balance");
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            throw new Error("Invalid account");
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Transfer successful"
        });
    } catch (error) {
        if (session) {
            await session.abortTransaction();
        }

        res.status(500).json({
            success: false,
            message: "Transfer failed",
            error: error.message
        });
    } finally {
        if (session) {
            session.endSession();
        }
    }
});


module.exports=router