
const { validationResult } = require('express-validator')
const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Token } = require('../models/token')




exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ msg: "This email is not valid" });
        }
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            return res.json({ msg: "This password is not valid" });
        }
          console.log(process.env.REFRESH_TOKEN_SECRET)
        const accessToken = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            process.env.ACCESS_TOKEN_SECRET,{expiresIn:'24h'}
          
        )

        const refreshToken = jwt.sign(
             { userId: user.id, isAdmin: user.isAdmin },
            process.env.REFRESH_TOKEN_SECRET
          ,{expiresIn:'60d'}
        )


        const token = await Token.findOne({userId:user.id});
        if(token){ await token.deleteOne()}
        await new Token({
            userId:user.id,
            accessToken,
            refreshToken
        }).save();
      
       user.passwordHash = undefined;

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(505).json({ error: error.message })
    }

}

exports.register = async function (req, res) {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsMessage = errors.array().map((error) => ({
            feild: error.path,
            message: error.msg,
        }))
        console.log(errorsMessage)
        return res.status(400).json({ type: "error", count: errorsMessage.length, errors: errorsMessage, })
    }

    try {
        let user = User({
            ...req.body,
            passwordHash: bcrypt.hashSync(req.body.password, 8),
        })
        user = await user.save()
        return res.json(user)
    } catch (error) {
        return res.status(500).json({ type: error.name, message: error.message })
    }



}











exports.forgotPassword = async function (req, res) {

}
exports.verifyPasswordOtp = async function (req, res) {

}
exports.resetPassword = async function (req, res) {

}
