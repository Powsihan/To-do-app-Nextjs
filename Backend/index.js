const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routers/task.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://powsipowsihan07:I57ec4gy0ZjB4ejA@todoapp.erpvrbk.mongodb.net/To-Do-App?retryWrites=true&w=majority&appName=Todoapp"
  )
  .then(() => {
    console.log("Database Successfully connected !");
    app.listen(3000, () => {
      console.log("Server running from port 3000");
    });
  })
  .catch(() => {
    console.log("Connection Failed !");
  });


  app.get("/",(req,res)=>{
    res.send("Heloo ToDo")
  });


  app.use('/api/tasks',router);