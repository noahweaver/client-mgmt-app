export {};
import { NextFunction } from "express";
import { IRequest, IResponse } from "../interfaces/expressInterfaces";

const express = require("express");
const invoiceRouter = express.Router();
const Invoice = require('../models/invoice.ts');

//GET all client invoices
invoiceRouter.get("/client/:clientId", (req: IRequest, res: IResponse, next: NextFunction) => {
    Invoice.find(
      { clientId: req.params.clientId },
      (err: any, invoices: any) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(invoices)
    })
  });

//GET all user invoices 
invoiceRouter.get("/user/:userId", (req: IRequest, res: IResponse, next: NextFunction) => {
  Invoice.find(
    { userId: req.params.userId },
    (err: any, invoices: any) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(invoices)
  })
});

// Add new invoice
invoiceRouter.post('/:clientId', (req: IRequest, res: IResponse, next: NextFunction) => {
  console.log("req.body", req.body);
    req.body.userId = req.user._id
    req.body.clientId = req.params.clientId
    const newInvoice = new Invoice(req.body)
    console.log("newInvoice:", newInvoice)
    newInvoice.save(
      (err: any, newInvoice: any) => {
        if(err){
          console.dir(err)
          res.status(500)
          return next(err)
        }
      return res.status(201).send(newInvoice)
    })
  });

//GET one invoice by ID
invoiceRouter.get("/:invoiceId", (req: IRequest, res: IResponse, next: NextFunction) => {
  Invoice.find(
    { _id: req.params.invoiceId },
    (err: any, invoice: any) => {
      if(err){
        res.status(500)
        return next(err);
      }
      return res.status(200).send(invoice);
    }
  )
})

//Update invoice (only by user)
invoiceRouter.put('/:invoiceId', (req: IRequest, res: IResponse, next: NextFunction) => {
  Invoice.findByIdAndUpdate(
    // do I need to include clientId?
    { _id: req.params.invoiceId, user: req.user._id },
    req.body,
    { new: true },
    (err: any, updatedInvoice: any) => {
      if(err) {
        console.log("Error")
        res.status(500)
        return next(err)
      }
      return res.send(updatedInvoice)
    }
  )
})

//Delete invoice
invoiceRouter.delete('/:invoiceId', (req: IRequest, res: IResponse, next: NextFunction) => {
  Invoice.findOneAndDelete(
    // do I need to include clientId?
    { _id: req.params.invoiceId, user: req.user._id },
    (err: any, deletedInvoice: any) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted ${deletedInvoice.invoiceName}`)
    }
  )
})


module.exports = invoiceRouter;