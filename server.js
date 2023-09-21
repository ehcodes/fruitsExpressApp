// places every kvp in our .env into a javascript object called process.env
require("dotenv").config();

const express = require("express");
const app = express();

const jsxViewEngine = require("jsx-view-engine");
app.set("view engine", "jsx");
app.engine("jsx", jsxViewEngine());

const mongoose = require("mongoose");

// parses incoming requests
app.use(express.urlencoded({ extended: false }));

// middleware - necessary to access posted form data
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// IMPORTING MODELS
const Fruit = require("./models/fruitSchema.js");
const Veggie = require("./models/veggieSchema.js");

// EXPRESS ROUTES
// fruits route will render the Index.jsx component
app.get("/fruits", (req, res) => {
  Fruit.find({}).then((allFruits) => {
    res.render("fruits/Index", {
      fruits: allFruits,
    });
  });
});

// renders form to add a new fruit
app.get("/fruits/new", function (req, res) {
  res.render("fruits/New");
});

// Delete - will go over in future class
// Update - will go over in future class

app.post("/fruits", async function (req, res) {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  try {
    const newFruit = await Fruit.create(req.body);
    console.log(newFruit);
    return res.redirect("/fruits");
  } catch (err) {
    res.send(`error in adding ${newFruit.name}`);
    console.error(err);
  }
});

app.get("/fruits/:id", async function (req, res) {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {
      fruit: foundFruit,
    });
    console.log(foundFruit);
  } catch (err) {
    res.send(err);
    console.error(err);
  }
});

app.get("/veggies", (req, res) => {
  Fruit.find({}).then((allVeggies) => {
    res.render("veggies/IndexVeggie", {
      veggies: allVeggies,
    });
  });
});

// renders form to add a new fruit
app.get("/veggies/new", function (req, res) {
  res.render("veggies/NewVeggie");
});

// Delete - will go over in future class
// Update - will go over in future class

// Send data to mdb via post request
app.post("/veggies", async function (req, res) {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  try {
    const newVeggie = await Veggie.create(req.body);
    console.log(newVeggie);
    return res.redirect("/veggies");
  } catch (err) {
    res.send(`error in adding new veggie`);
    console.error(err);
  }
});

app.get("/veggies/:id", async function (req, res) {
  try {
    const foundVeggie = await Veggie.findById(req.params.id);
    res.render("veggies/Show", {
      veggie: foundVeggie,
    });
    console.log(foundVeggie);
  } catch (err) {
    res.send(err);
    console.error(err);
  }
});

app.listen(localPort, () => {
  console.log(`listening on port 3000`);
  console.log(`http://localhost:3000/`);
});
