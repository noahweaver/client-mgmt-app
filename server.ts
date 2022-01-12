const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

//Interface Imports
import { IRequest, IResponse } from "./interfaces/expressInterfaces"
import { NextFunction } from "express"



// export const collections: { users?: mongoDB.Collection } = {}

//Middleware
app.use(morgan('dev'))
app.use(express.json())

//Connect to DB
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
app.use("/api/client", require("./routes/clientRouter"))


//Error Handling
app.use((err: any, req: IRequest, res: IResponse, next: NextFunction) => {
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
