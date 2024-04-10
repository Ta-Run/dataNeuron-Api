
import mongoose, { Schema, mongo } from "mongoose";


const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['morning', 'evening', 'night', 'workLife', 'study', 'hobbies', 'gym'] },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const Todo = mongoose.model('Todo', todoSchema);



