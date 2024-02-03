const express = require('express');
const router= express.Router();
const useRouter=require('./user');
const accountRouter=require('./accounts');

router.use("/user",useRouter)
router.use("/account",accountRouter);

module.exports = router;