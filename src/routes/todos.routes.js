import { Router } from "express";
import { addTodo,getTodo ,updateTodo,getTodoCounts,getCategories} from "../controller/todos.controller.js";


const todo = Router()

todo.route("/addTodo").post(addTodo);
todo.route("/getTodo").get(getTodo);
todo.route("/updateTodo/:todoId").put(updateTodo);
todo.route("/countApi").get(getTodoCounts);
todo.route("/getCategories").get(getCategories);


export default todo