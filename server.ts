const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
//Interface Imports
import { IRequest, IResponse } from "./interfaces/expressInterfaces"
import { NextFunction } from "express"
const port = process.env.PORT || 9000;
const path = require('path')

//Middleware
app.use(morgan('dev'))
app.use(express.json())

//Connect to DB
mongoose.connect(process.env.MONGODB_URI,
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
app.use("/api", expressJwt({ secret: process.env.SECRET || "dog bassinet hardwood toenail", algorithms: ['HS256'] })) //req.user
app.use("/api/client", require("./routes/clientRouter"))
app.use("/api/invoice", require("./routes/invoiceRouter"))

//Error Handling
app.use((err: any, req: IRequest, res: IResponse, next: NextFunction) => {
    console.error(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req: IRequest, res: any) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

//Listen for Port
app.listen(port, () => {
    console.log(`Server is listening on PORT: 9000`)
})
