var express = require('express');
const { createItem, deleteItem, readItem } = require('./Controller/operations');
var app = express()


//moderator
app.use(express.json());



//api requests these requests will be directed to Controller which controls the whole application 
app.post("/add", createItem);
app.get("/read/:key", readItem);
app.delete("/delete/:key", deleteItem)



app.listen(3000, function () {
    console.log("App started at port 3000!!!")
})