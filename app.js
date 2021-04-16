const express = require("express");
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

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
const categoriesRouter = require('./routes/category')
const orderRouter = require('./routes/order')
// using routes

const mongooseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    age: {
        type: String,
        required: true
    }
})
const Person = mongoose.model("person", mongooseSchema)
app.post('/creat', async (req, res, next) => {
    try {
        let newPerson = new Person({name: "ahmed", age: 20})
        let save = await newPerson.save()
        
            console.log("save")
            console.log(save)
    } catch (error) {
        console.log("from catch")
        console.log(error)
    }
})
app.post('/get', async (req, res) => {
    try {
        let update = await Person.find({id: "60786f6v88b28d011b4fc0649"})
        if (update) {
            console.log(update)
            console.log("from update")
        } else {
            console.log("no update")
        }
    } catch (error) {
        console.log("from catch")
    }
})
app.put('/put', async (req, res) => {
    try {
        let update = await Person.findByIdAndUpdate("60786f688b28d011b4fc0648", {name: "ali"}, {new: true})
        if (update) {
            console.log(update)
            console.log("from update")
        } else {
            console.log("no update")
            console.log(update)
        }
    } catch (error) {
        console.log("from catch")
    }
})
app.delete('/delete', async (req, res) => {
    
    let deleteing = await Person.deleteMany();
    console.log(deleteing)
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/', authRouter)
app.use('/api/products/', productsRouter)
app.use('/api/categories/', categoriesRouter)
app.use('/api/orders/', orderRouter)
app.listen(3000, () => console.log("server is running"))