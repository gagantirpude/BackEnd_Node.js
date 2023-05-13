import { error } from "console";
import express from "express";
import mongoose from "mongoose";
import path from "path";


const app = express();

app.set("view engine", "ejs");


mongoose.connect("mongodb://127.0.0.1:27017", {
 dbName: "backend",
})
 .then(() => console.log("Database Connected"))
 .catch((error) => console.log(error))


//Structure 
const myShema = mongoose.Schema({
 email: { type: String, required: true },
 password: { type: String, required: true },
})

//Create a collection
const User = mongoose.model("User", myShema);

//! Middleware 
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

// Array
const users = [];

// app.get("/home", (req, res) => {
//  // res.send("Hello World!");
//  const location = path.resolve();
//  const fileSand = path.join(location, "./public/index.html");
//  console.log(path.join(location, "./public/index.html"));
//  res.sendFile(fileSand);
// });


//! For Views Folder
app.get("/", (req, res) => {
 res.render("index");
});

//with this api we use for data insert with mongoose create function
app.get("/add", async (req, res) => {
 await User.create({
  email: "aryan@gmail.com",
  password: "1255@PW"
 })
 console.log("Data Inserted"),
  res.send("Data Inserted")
});


//
app.get("/success", (req, res) => {
 res.render("success");
})


// //! For Views Folder
app.post("/contact", async (req, res) => {
 const { email, password } = req.body;
 await User.create({ email, password });
 // console.log(`${massage} data inserted in Database`);
 res.redirect("/success");

});

app.get('/users', (req, res) => {
 res.json({
  User,
 })
})

// //* For Public Folder
// app.get("/pub", (req, res) => {
// app.use(express.static(path.join(path.resolve(), "public")));
//  const location = path.resolve();
//  res.sendFile("index.html");
// });


app.listen(3000, () => {
 console.log("Server Working");
});
