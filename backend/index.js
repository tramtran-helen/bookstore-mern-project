import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"
import cors from "cors"

const app = express()



//Middleware
app.use(express.json()) //convert the data in the body of the client's request into JS object to use
app.use(cors())



//First HTTP Route
app.get('/', (req, res) => {
    console.log(req)
    res.status(234).send("Welcome to Bookstore MERN Stack Project!")
})



//Connect to the database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
    console.log(`App is listening through port: ${PORT}`)}) //only show this if connected successfully to database
  })
  .catch((err) => {
    console.log(err)
  })



//Route to save a new book (POST: create a new item)
app.post('/books', async (req, res) => {
  //check if the client sends enough info
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({message: 'Please send all the required information, including author, title, and publish year'})
    }
    
    //create new book
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    }

    const book = await Book.create(newBook)
    //send new book
    return res.status(200).send(book)

  } catch(err) {
    console.log(err.message)
    res.status(500).send({message: err.message})
  }
})



//Route to get all books from DB
app.get('/books', async (req, res) => {
  try{
    const books = await Book.find({}) //Filter nothing, means getting all books back
    return res.status(200).json({
      count: books.length,
      data: books
    })
  } catch(err) {
    console.log(err.message)
    res.status(500).send({message: err.message})
  }
})



//Route to get one book by id
app.get('/books/:id', async(req, res) => {
  try{
    const {id} = req.params
    const book = await Book.findById(id)
    return res.status(200).json(book)
  } catch(err) {
    console.log(err.message)
    res.status(500).send({message: err.message})
  }
})



//Route to update a book (update/replace an existing item)
app.put('/books/:id', async(req, res) => {
  try{
    if(
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({message: 'Send all required fields, including title, author, and publish year'})
    }
    const {id} = req.params
    const result = await Book.findByIdAndUpdate(id, req.body)
    if (!result) {
      return res.status(404).json({message: 'Book not found'})
    } else {
      return res.status(200).send({message: 'Book updated successfully'})
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).send({message: err.message})
  }
})



//Route for deleting a book
app.delete('/books/:id', async (req, res) => {
  try{
    const {id} = req.params
    const result = await Book.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({message: 'Book not found'})
    } else {
      return res.status(200).send({message: 'Book deleted successfully'})
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).send({message: err.message})
  }
})




