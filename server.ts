const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')


// export const collections: { users?: mongoDB.Collection } = {}

//Middleware
app.use(morgan('dev'))
app.use(express.json())

//Connect to DB
// mongoose.connect("mongodb://localhost:27017/client-mgmt",
// {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => console.log("connected to the database"))
//     .catch((err: any) => console.log("Could NOT connect to the database:", err));

mongoose.connect("mongodb://127.0.0.1:27017/client-mgmt",
{useNewUrlParser: true, useUnifiedTopology: true}, 
    (err: any) => {
        if(err){
            console.log(err)
        } else {
            console.log("Connected to the Database")
        }
    }
);


//Routes
app.use("/authentication", require("./routes/authRouter.ts"))
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) //req.user

//Error Handling
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})


//Listen for Port
app.listen(9000, () => {
    console.log(`Server is listening on PORT: 9000`)
})
