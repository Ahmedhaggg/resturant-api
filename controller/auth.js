const User = require('../model/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if (!user) { 
        res.status(400).json({message: "This email isn't used"})
    }
    const match =  await bcrypt.compare(password, user.password);
    
    if (match) {
        const token = jwt.sign({email, _id: user._id}, process.env.JWTSECRET, { expiresIn: '7d' })
        return res.status(200).json({
            token,
            _id: user._id,
            email: user.email,
            profileImage: user.profileImg,
            role: user.role
        })
    }
    res.status(400).json({message: "Password is wrong"})
}

exports.signup = async (req, res, next) => {
    let { firstName, lastName, email, password, phoneNumber } = req.body;
    const isUser = await User.findOne({email});
    if (isUser) {
        return res.status(400).json({message: "This Email is used"})
    }
    let hashPassword = await bcrypt.hash(password, 10)
    if (!hashPassword) {
        return res.status(500).json({message: "something went wrong"})
    }
    password = hashPassword;
    let newUser = new User({firstName, lastName, email, password, phoneNumber});
    const save = await newUser.save()
    if (!save) {
        return res.status(400).json({message: save}) 
    }
    res.status(200).json({message: "User created Successfully"})
}