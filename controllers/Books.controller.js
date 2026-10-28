import mongoose from "mongoose";
import Book from "../models/books.model.js";

export const getPaginatedBooks = async(req,res)=>{
    const {limit,page} = req.query
    const sanitizedLimit = limit<1?10:limit;
    const sanitizedPage = page<1?0:(page-1)*sanitizedLimit;
    try {
        const books = await Book.find().sort({_id:-1}).skip(sanitizedPage).limit(sanitizedLimit);
        if(!books){
            return res.status(404).json({message:"no books found"});
        }
        return res.status(200).json({metadata: {
            currentPage: page,
            totalRecords: books.length,
        }, books});
    } catch (error) {
        console.log("cannot fetch books",error);
        return res.status(500).json({message:"error fetching books"});
    }
}

export const addBook = async(req,res)=>{
    const {title, category, author} = req.body;
    if(!title || !category || !author) return res.status(400).json({message:"all fields are required"});

    try {
        const newBook = await Book.create({
        title,
        author,
        category,
    });
    if(!newBook) return res.status(401).json({message:"book not added"});
    return res.status(201).json({message:"book added successfully", book: newBook});
    } catch (error) {
        return res.status(500).json({message:"cannot create book"})
    }
}

export const updateAvailabilityStatus = async(req,res)=>{
    const {status} = req.body;
    const {id} = req.params;
    if(!id || !status) return res.status(400).json({message:"id and status are required"});

    const book = await Book.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {availability: status}, {new: true});

    if(!book) return res.status(404).json({message:"book not found"});

    return res.status(200).json({message:"book availability updated successfully", book});
}