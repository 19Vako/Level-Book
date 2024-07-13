//server.js
const express = require("express")
const mongoose = require("mongoose")
const { BooksA1, BooksA2, BooksB1, BooksB2, BooksC1, BooksC2, User, AllBooks } = require("./serverUser");
const cors = require("cors");

require("./serverUser")

const app = express();
app.use(cors());
app.use(express.json())

const mongoURL = "mongodb+srv://frymendzordan:rPyULAdW1YhHjELk@cluster0.uiznyg9.mongodb.net/Level_Book?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
    console.log("DB is connect!")
})
.catch((err) =>{
    console.log(err)
})

app.listen(5001, () =>{
    console.log("Server is started")
})

app.get("/", (req, res) =>{
    res.send({status: "Started"})
})

app.post("/register", async (req, res) =>{
    const {name, password} = req.body
    const existedUsers = await User.findOne({name: name})
    if(existedUsers){
        return res.send({data: "User already exist !!"})
    }
    try{
        await User.create({
            name:name,
            password:password,
        })
        res.send({status:"ok", data:"User Created"})
    }
    catch(err){res.send({status:"err", data: err})
    }
})

app.post("/LogIn", async (req, res) =>{
    const {name} = req.body;

    try{
        const user = await User.findOne({name: name});

        if(!user){
            return res.send({ status: "error", data: "User not found"});
        }

        res.json(user)

    }catch (error) {
        res.status(500).send({ status: "error", data: "Server error"});
    }
})

app.post("/LibraryAdd", async(req, res) =>{
    const { userId, book } = req.body
    
    try{
        const existBook = await User.findOne({_id: userId, library: book})
        
        if(!existBook){
            const library = await User.updateOne(
            {_id: userId},
            {$push: {library: book}}
            );

          if(library.modifiedCount === 0){
            res.status(404).send({ status: "error",   data: "User not found" })
          }else {
            res.status(200).send({ status: "success", data: "Book added to library" });
        }
      }else{
        res.status(200).send({status: "Exist", data: "Book exist in library"})
      }
    
 
    }catch (err) {res.status(500).send({ status: "error", data: "Server error"});}
})  

app.get("/Search", async (req, res) => {
    const { book } = req.query;
    
    if (!book) {
        return res.status(400).send({
            status: "error",
            message: "Book query parameter is required"
        });
    }

    console.log(`Searching for books starting with: ${book}`);

    try {
        // Sanitize the input to prevent Regex Denial of Service (ReDoS)
        const sanitizedBook = book.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`^${sanitizedBook}`, 'i');
        
        console.log(`Using regex: ${regex}`)

        const books = await AllBooks.find({ namebook: regex }).sort({ namebook: 1 });
        
        console.log(`Found books:`, books);

        res.status(200).send({
            status: "success",
            data: books
        });
    } catch (err) {
        console.error('Error fetching books:', err.message);

        res.status(500).send({
            status: "error",
            message: "Server error",
            error: err.message
        });
    }
});

app.get("/GetA1", async (req, res) =>{
    try{
        const Book = await BooksA1.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
})

app.get("/GetA2", async (req, res) => {
    try{
        const Book = await BooksA2.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
})

app.get("/GetB1", async (req, res) => {
    try{
        const Book = await BooksB1.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
})

app.get("/GetB2", async (req, res) => {
    try{
        const Book = await BooksB2.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
})

app.get("/GetC1", async (req, res) => {
    try{
        const Book = await BooksC1.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
})

app.get("/GetC2", async (req, res) => {
    try{
        const Book = await BooksC2.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
})


