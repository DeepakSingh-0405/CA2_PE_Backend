import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRouter from './routes/books.route.js'

const app = express();
const PORT = 3000;
dotenv.config();
app.use(express.json());

try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("db connected");
} catch (error) {
    console.log("db connection failed", error);
}

app.use('/api/books', bookRouter);


app.listen(PORT, ()=>{
    console.log("Server listening on port ", PORT);
})