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
    useUnifiedTopology: true 
}
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
app.use('/api/', authRouter)
app.use('/api/products/', productsRouter)
app.listen(3000, () => console.log("server is running"))