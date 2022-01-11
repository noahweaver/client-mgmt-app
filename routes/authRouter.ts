export {}
const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.ts')
const jwt = require('jsonwebtoken')


//req type should be Request, res type should be Response
    //this is throwing errors that need to be worked through
        //res.status(500) is looking for default type: number.


        
//Signup
authRouter.post("/signup", (req: any, res: any, next: any) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err: any, user: object) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error("That username is already taken"))
        }
        const newUser = new User(req.body)
        newUser.save((err: any, savedUser: any) => {
            if(err){
                res.status(500)
                return next(err)
            }
                                // payload,            // secret
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        return res.status(201).send({ token, user: savedUser.withoutPassword() })
        })
    })
})
  
//Login
authRouter.post("/login", (req: any, res: any, next: any) => {
User.findOne({ username: req.body.username.toLowerCase() }, (err: any, user: any) => {
    if(err){
        res.status(500)
        return next(err)
    }
    if(!user){
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
    }
    user.checkPassword(req.body.password, (err: any, isMatch: boolean) => {
        if(err){
            res.status(403)
            return next(new Error("Username or Password are incorrect"))
        }
        if(!isMatch){
            res.status(403)
            return next(new Error("Username or Password are incorrect"))
        }
    const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
    return res.status(200).send({ token, user: user.withoutPassword() })
    })
})
})
  

module.exports = authRouter