import { Router } from "express";
import { addTodo,getTodo ,updateTodo,getTodoCounts} from "../controller/todos.controller.js";


const todo = Router()

todo.route("/addTodo").post(addTodo);
todo.route("/getTodo").get(getTodo);
todo.route("/updateTodo/:todoId").put(updateTodo);
todo.route("/countApi").get(getTodoCounts);


export default todo