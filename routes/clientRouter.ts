export {};
const express = require("express");
const clientRouter = express.Router();
const Client = require('../models/client.ts');
import { NextFunction } from "express";
import { IRequest, IResponse } from "../interfaces/expressInterfaces";
import { IClient } from '../interfaces/IClient';

//GET all Clients
clientRouter.get("/", (req: IRequest, res: IResponse, next: NextFunction) => {
    Client.find((err: any, clients: Array<IClient>) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(clients)
    })
  });

//Add new Client
clientRouter.post("/", (req: IRequest, res: IResponse, next: NextFunction) => {
    console.log(`req.body: ${req.body}`)
    req.body.user = req.user._id
    console.log(`req.body.user: ${req.body.user}, req.user._id: ${req.user._id}`)
    const newClient = new Client(req.body)
    console.log(`newClient: ${newClient}`)
    newClient.save((err: any, savedClient: IClient) => {
        console.log(`savedClient: ${savedClient}`)
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedClient)
    })
    console.log(`res: ${res}`)
  });

//GET Clients by UserId  
clientRouter.get("/user", (req: IRequest, res: IResponse, next: NextFunction) => {
    Client.find({ user: req.user._id }, (err: any, clients: Array<IClient>) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(clients)
    })
  });

//GET ONE Client
//A user can GET a client that isn't theirs if they have the ID
clientRouter.get("/:clientId", (req: IRequest, res: IResponse, next: NextFunction) => {
    Client.find({_id: req.params.clientId},
      (err: any, client: any) => {
        console.log("Client:", client)
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(client)
      })
  });

//Delete Client
clientRouter.delete("/:clientId", (req: IRequest, res: IResponse, next: NextFunction) => {
    Client.findOneAndDelete(
      { _id: req.params.clientId, user: req.user._id },
      (err: any, deletedClient: IClient) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully delete client: ${deletedClient.firstName} ${deletedClient.lastName}`)
      }
    )
  });

//Update Client
clientRouter.put("/:clientId", (req: IRequest, res: IResponse, next: NextFunction) => {
    Client.findOneAndUpdate(
      { _id: req.params.clientId, user: req.user._id},
      req.body, 
      { new: true },
      (err: any, updatedClient: IClient) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedClient)
      }
    )
  })  


  
module.exports = clientRouter

