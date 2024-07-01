//server.js
const express = require("express")
const mongoose = require("mongoose")
const User = require("./serverUser");
const Books = require("./serverUser")
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
            password:password
        })
        res.send({status:"ok", data:"User Created"})
    }
    catch(err){res.send({status:"err", data: err})
    }
})

app.post("/LogIn", async (req, res) =>{
    const {name} = req.body
    
    try{
        const user = await User.findOne({name: name});

        if(!user){
            return res.send({ status: "error", data: "User not found"});
        }

        res.send({ status: "ok", data: true});
    }catch (error) {
        res.status(500).send({ status: "error", data: "Server error"});
    }
})

app.get("/GetA1", async (req, res) =>{
    try{
        const Book = await Books.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
})