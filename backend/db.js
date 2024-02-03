const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://ronin2004:Harsh2004@cluster0.xvv4ezm.mongodb.net/paytm')

const userSchema= new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    password:String,
})

const bankSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User= mongoose.model('User',userSchema)
const Account= mongoose.model('Account',bankSchema);

module.exports = { User, Account };