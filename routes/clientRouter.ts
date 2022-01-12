export {};
const express = require("express");
const clientRouter = express.Router();
const Client = require('../models/client.ts');
import { NextFunction } from "express";
import { IRequest, IResponse } from "../interfaces/expressInterfaces"

//GET all Clients
clientRouter.get("/", (req: IRequest, res: IResponse, next: NextFunction) => {
    Client.find((err: any, clients: any) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(clients)
    })
  })
//GET ONE Client

//GET Clients by UserId

//Add new Client
clientRouter.post("/", (req: IRequest, res: IResponse, next: NextFunction) => {
    console.log(`req.body: ${req.body}`)
    req.body.user = req.user._id
    console.log(`req.body.user: ${req.body.user}, req.user._id: ${req.user._id}`)
    const newClient = new Client(req.body)
    console.log(`newClient: ${newClient}`)
    newClient.save((err: any, savedClient: any) => {
        console.log(`savedClient: ${savedClient}`)
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedClient)
    })
    console.log(`res: ${res}`)
  });

//Update Client

//Delete Client


module.exports = clientRouter

