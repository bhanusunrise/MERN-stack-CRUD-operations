const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const userModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json()); // Ensure Express can parse JSON

mongoose.connect("mongodb://127.0.0.1:27017/crud");

app.get('/', (req, res) => {
    userModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  UserModel.create({ name, email, age: parseInt(age, 10) }) // Ensure age is a number
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log("Server is running");
});

