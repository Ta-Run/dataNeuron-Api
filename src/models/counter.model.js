
import mongoose, { Schema, mongo } from "mongoose";


const counterSchema = new mongoose.Schema({
    addTodoCount: { type: Number, default: 0 },
    updateTodoCount: { type: Number, default: 0 }
  });

export const Count = mongoose.model('Count', counterSchema);



