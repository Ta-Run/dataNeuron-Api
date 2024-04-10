import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/apiError.js"
import {Todo} from "../models/todos.model.js"
// import { ApiResponse } from "../utils/apiResponse.js";


const addTodo = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;

    // Find an existing todo for the same category
    let existingTodo = await Todo.findOne({ category });

    if (existingTodo) {
        // Update the existing todo
        existingTodo.title = title;
        existingTodo.description = description;
        await existingTodo.save();
        res.status(200).json({ success: true, message: 'Todo updated successfully', data: existingTodo });
    } else {
        // Create a new todo
        const newTodo = new Todo({
            title,
            description,
            category
        });
        await newTodo.save();
        res.status(201).json({ success: true, message: 'Todo created successfully', data: newTodo });
    }
});


const getTodo=asyncHandler(async (req, res) => {
    
    try {
        
        const data = await Todo.find()

         res.status(200).json({
            message:"Success",
            result:data
         })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            
         })
    }
});




export { addTodo,getTodo }