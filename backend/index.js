import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"

const app = express()

app.get('/', (req, res) => {
    console.log(req)
    res.status(234).send("Welcome to Bookstore MERN Stack Project!") //First HTTP Route
})

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
    console.log(`App is listening through port: ${PORT}`)}) //Only show this if connected successfully to database
  })
  .catch((error) => {
    console.log(error)
  })