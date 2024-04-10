import { Router } from "express";
import { addTodo,getTodo } from "../controller/todos.controller.js";


const todo = Router()

todo.route("/addTodo").post(addTodo);
todo.route("/getTodo").get(getTodo);



export default todo