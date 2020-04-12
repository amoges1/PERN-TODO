// npm i cors (cross domain interaction), pg (postgress)
const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //access to req.body

//ROUTES//

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        //$1 refers to description first entry in array
        //RETURNING * returns more information, but rows are enough
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])   
        
        res.json(newTodo.rows[0])
    } catch (err) {
        console.log(err.message);   
    }
})
//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})
//get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0]) 
    } catch (err) {
        console.error(err.message);
    }
})
//update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body
        //RETURNING * is not necessary
        const todo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]) 
        res.json("Todo is updated!") 
    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo is deleted!")
    } catch (err) {
        console.error(err.message);   
    }
})

app.listen(5000 , () => {
    console.log("server has started on port 5000");
})