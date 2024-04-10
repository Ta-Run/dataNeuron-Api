import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "../models/todos.model.js";
import { Count } from "../models/counter.model.js";

const addTodo = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;

    // Find an existing todo for the same category
    let existingTodo = await Todo.findOne({ category });
    await Count.findOneAndUpdate({}, { $inc: { addTodoCount: 1 } });

    if (existingTodo) {
        // Update the existing todo
        existingTodo.title = title;
        existingTodo.description = description;
        await existingTodo.save();
        return res.status(200).json({ success: true, message: 'Todo updated successfully', data: existingTodo });
    } else {
        // Create a new todo
        const newTodo = new Todo({
            title,
            description,
            category
        });
        await newTodo.save();
        return res.status(201).json({ success: true, message: 'Todo created successfully', data: newTodo });
    }
});

const updateTodo = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    const todoId = req.params.todoId; // Assuming todoId is passed as a URL parameter

    try {
        // Find an existing todo for the specified category and ID
        let existingTodo = await Todo.findOne({ _id: todoId, category });

        if (existingTodo) {
            // Update the existing todo
            existingTodo.title = title;
            existingTodo.description = description;
            await existingTodo.save();
            return res.status(200).json({ success: true, message: 'Todo updated successfully', data: existingTodo });
        } else {
            // If no existing todo is found, return an error
            return res.status(404).json({ success: false, message: 'Todo not found for the specified category and ID' });
        }
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error("Error updating todo:", error.message);
        return res.status(500).json({ success: false, message: 'Failed to update todo', error: error.message });
    }
});

const getTodo = asyncHandler(async (req, res) => {
    try {
        const data = await Todo.find();
        return res.status(200).json({ message: "Success", result: data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const getTodoCounts = asyncHandler(async (req, res) => {
    try {
        const counts = await Count.findOne();
        return res.status(200).json({ success: true, data: counts });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});


const getCategories = async (req, res) => {
    try {
      // Retrieve categories from the enum property of the schema
      const categories = Todo.schema.path('category').enumValues;
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  };
export { addTodo, getTodo, updateTodo, getTodoCounts,getCategories };
