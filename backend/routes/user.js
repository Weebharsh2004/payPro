const express = require('express');
const z = require('zod');
const jwt = require('jsonwebtoken'); // Import jwt module
const {User, Account}=require('../db')
const JWT_SECRET = require('../config');
const router = express.Router();
const middleware = require('../middleware/middleware')

const userSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6),
});

const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(6),
});

const updateBody=z.object({
    password:z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
});


router.post('/signup', async (req, res) => {
    const { success } = userSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            msg: "Incorrect inputs",
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username,
    });

    if (existingUser) {
        return res.status(411).json({
            msg: "User already exists",
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    await Account.create({
        userId:user._id,
        balance: 1 + Math.random()*10000
    })

    const userId = user._id;

    const token = jwt.sign({
        userId: userId,
    }, JWT_SECRET);

    res.json({
        msg: "User created successfully",
        token: token,
    });
});

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            msg: "Incorrect Inputs",
        });
    }

    const ans = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });

    if (!ans) {
        res.status(411).json({
            msg: "Error while logging in",
        });

        return;
    }

    const token = jwt.sign({
        userId: ans._id,
    }, JWT_SECRET);

    res.json({
        token: token,
    });
});

router.put('/',middleware,async (req,res,next)=>{
    const {success}=updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            msg: 'Error updating'
        });

        return;
    }

    await User.updateOne(req.body,{
        _id:req.userId
    })

    res.json({
        msg:"success updating"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
