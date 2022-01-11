export {}
const mongoose = require('mongoose')
// const Schema = mongoose.Schema
import { Schema, Document } from 'mongoose'
const bcrypt = require('bcrypt')

export interface IUser extends Document {
    username: string,
    password: string,
    comparePassword: (password: string) => Promise<Boolean>,
    // validatePassword(password: string): boolean,
}

export const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//method that runs before the save
//pre-save hook to encrypt user passwords on signup
userSchema.pre<IUser>('save', function (next) {
    const user = this
    if(!user.isModified("password")) return next()
    bcrypt.hash(user.password, 10, (err: any, hash: string) => {
      if(err) return next(err)
      user.password = hash
      next()
    })
})
  
// method to check encrypted password on login
userSchema.methods.checkPassword = function(passwordAttempt: any, callback: any){
    bcrypt.compare(passwordAttempt, this.password, (err: any, isMatch: boolean) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}
  
// method to remove user's password for token/sending the response
userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)