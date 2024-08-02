//server.js
const express = require("express")
const mongoose = require("mongoose")
const { BooksA1, BooksA2, BooksB1, BooksB2, BooksC1, BooksC2, User, AllBooks } = require("./serverUser");
const cors = require("cors");
const bodyParser = require('body-parser');
const sharp = require('sharp');


const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const mongoURL = "mongodb+srv://frymendzordan:rPyULAdW1YhHjELk@cluster0.uiznyg9.mongodb.net/Level_Book?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
    console.log("DB is connect!")
})
.catch((err) =>{
    console.log(err)
});

app.listen(5001, () =>{
    console.log("Server is started")
});



app.get("/", (req, res) =>{
    res.send({status: "Started"})
});
app.post("/SignUp", async (req, res) =>{
    const {name, password} = req.body
    const existedUsers = await User.findOne({name: name})
    if(existedUsers){
        return res.send({data: "User already exist !!"})
    }
    try{
        await User.create({
            name:name,
            password:password,
            userPhoto: '',
        })
        res.send({status:"ok", data:"User Created"})
    }
    catch(err){res.send({status:"err", data: err})
    }
});
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
});






app.post("/AddUserPhoto", async (req, res) => {
    const { userId, photo } = req.body;

    try {
        // Декодируем строку Base64
        const imageBuffer = Buffer.from(photo, 'base64');

        // Логирование размера изображения перед сжатием
        console.log(`Original image size: ${imageBuffer.length / 1024} KB`);

        // Сжимаем изображение
        const compressedImageBuffer = await sharp(imageBuffer)
            .resize(800)  // Пример изменения размера
            .toBuffer();

        // Логирование размера изображения после сжатия
        console.log(`Compressed image size: ${compressedImageBuffer.length / 6024} KB`);

        const compressedImageBase64 = compressedImageBuffer.toString('base64');

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { userPhoto: compressedImageBase64 } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error updating user photo:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});







app.get('/getUser/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const userPhoto = user.userPhoto; // предполагаем, что это base64 строка

        res.status(200).json({ success: true, user: { ...user._doc, userPhoto } });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});





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
        }
        else {
            res.send({ status: 'exist', data: "Book already in your library" });
        }


    }catch (err) {res.status(500).send({ status: "error", data: "Server error"});}
});  
app.post("/FindBookFromLibrary", async (req, res) => {
    const { userId, book } = req.body;

    try {
        // Найти пользователя по userId и вернуть только поле library
        const user = await User.findOne({ _id: userId, library: book });

        if(user){
            res.status(200).send({status: "success", data: "book finded"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Ошибка сервера" });
    }
}); 



app.post("/FindInFavorite", async (req, res) => {
    const { userId, book } = req.body;

    try {
        const user = await User.findOne({_id: userId, favorite: book});
        if (user) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});
app.post("/AddToFavorite", async (req, res) => {
    const { userId, book } = req.body

    try{
        const existBook = await User.findOne({_id: userId, favorite: book})
        
        if(!existBook){
            await User.updateOne(
            { _id: userId },
            { $push: {favorite: book}}
            )
            res.status(200).send({ message: "Book added to favorites" });
        } else {
            res.send({ status: "exist", data: "Book already in your favirite"})
        }
        
    }
    catch(err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
});



app.post("/AddToReading", async (req, res) => {
    const { userId, book } = req.body;
    try {
        await User.updateOne(
            { _id: userId },
            { $pull: { readingNow: { namebook: book.namebook }}}
        );
        const readingNow = await User.updateOne(
            { _id: userId },
            { $push: { readingNow: { $each: [book], $position: 0 } } }
        );
        if(readingNow) {
            res.status(200).send({ status: "success", data: "Book added to readingNow" });
        }
    } 
    catch (err) {
        console.error("Server error:", err);
        res.status(500).send({ status: "error", data: "Server error" });
    }
});
app.post("/GetFavoriteBooks", async (req, res) => {
    const { userId } = req.body;

    try {
        // Найти пользователя по userId и вернуть только поле favorite
        const user = await User.findOne({ _id: userId }, { favorite: 1 });

        if (!user) {
            return res.status(404).send({ message: "Пользователь не найден" });
        }

        // Отправить массив favorite обратно клиенту
        res.send({ favoriteBooks: user.favorite });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Ошибка сервера" });
    }
}); 




app.post("/RemoveFromFavorite", async (req,res) => {
    const { userId, book } = req.body;

    try {
        const deleteBook = await User.updateOne(

            {_id: userId},
            {$pull: { favorite: { namebook: book.namebook }}}
        )

        if(deleteBook){
        res.status(200).send({ status: "success", data: "Book deleted from favorite"})
        }
    }
    catch (err) {
        res.status(500).send({ status: "error", data: "Server error"})
    }
})

app.post("/DeleteFromLibrary", async (req, res) => {
    const { userId, book } = req.body;

    try {
        const deleteBook = await User.updateOne(

            {_id: userId},
            {$pull: { library: { namebook: book.namebook }}}
        )

        if(deleteBook){
        res.status(200).send({ status: "success", data: "Book deleted from library"})
        }
    }
    catch (err) {
        res.status(500).send({ status: "error", data: "Server error"})
    }
    
});

app.post("/DeleteReadingBook", async (req, res) => {
    const { userId, book } = req.body;

    try {
        const deleteBook = await User.updateOne(
            {_id: userId},
            {$pull: { readingNow: { namebook: book }}}
        )
        
        if(deleteBook){
            res.status(200).send({ status: "success", data: "Book deleted"})
        }
    } 
    catch (err) {
        res.status(500).send({ status: "error", data: "Server error"})
    }
});

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
});

app.get("/GetA2", async (req, res) => {
    try{
        const Book = await BooksA2.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
});

app.get("/GetB1", async (req, res) => {
    try{
        const Book = await BooksB1.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
});

app.get("/GetB2", async (req, res) => {
    try{
        const Book = await BooksB2.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
});

app.get("/GetC1", async (req, res) => {
    try{
        const Book = await BooksC1.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
});

app.get("/GetC2", async (req, res) => {
    try{
        const Book = await BooksC2.find({});
        res.json(Book)
    }
    catch (err){
        res.status(500).send(err)
    }
});