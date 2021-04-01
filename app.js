const express = require("express");
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors')
const path = require('path')

const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(cors())


env.config();
// mongobb connection
const mongooseOption = {
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
// mongoose.connect(`mongodb+srv://01116748280m:01116748280m@cluster0.raph6.mongodb.net/resturant?retryWrites=true&w=majority`, mongooseOption, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("mongoose connected")
//     }
// })

mongoose.connect(`mongodb+srv://travels:AhmedHaggag@12345@cluster0.u5klm.mongodb.net/resturant?retryWrites=true&w=majority`,mongooseOption, (err) => {
    if (err) 
        console.log(err)
    else
        console.log("mongoose connected")
})

// import routes
const authRouter = require('./routes/auth')
const productsRouter = require('./routes/products')

// using routes
const jwt = require('jsonwebtoken');
app.post('/', (req, res, next) => {
    const token = jwt.sign({name: "ahmed"}, "secrettttt is", {expiresIn: 60 * 60});
    res.status(200).json({token})
})
app.post('/test', (req, res, next) => {
    const verify =  jwt.verify(req.headers['authorization'], "secrettttt is")
    res.status(200).json({verify});
})
app.use('/api/', authRouter)
app.use('/api/products/', productsRouter)
app.listen(3000, () => console.log("server is running"))