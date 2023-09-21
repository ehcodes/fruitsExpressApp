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

const localPort = 3000;

const siteAddress = `http://localhost:3000/`;

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// IMPORTING MODELS
const Fruit = require("./models/fruit.js");
const veggies = require("./models/veggies.js");

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

app.get("/veggies", function (req, res) {
  res.render("veggies/IndexVeggie", { veggies: veggies });
});

// renders form to add a new fruit
app.get("/veggies/new", function (req, res) {
  res.render("veggies/NewVeggie");
});

// Delete - will go over in future class
// Update - will go over in future class

// Create data via a post request
app.post("/veggies", (req, res) => {
  //if checked, req.body.readyToEat is set to 'on'
  if (req.body.readyToEat === "on") {
    // rewritten to match existing data
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  veggies.push(req.body);
  // redirect user to the fruits route
  res.redirect("/veggies");
});

app.get("/veggies/:indexOfVeggiesArray", function (req, res) {
  res.render("veggies/ShowVeggie", {
    veggie: veggies[req.params.indexOfVeggiesArray],
  });
});

app.listen(localPort, () => {
  console.log(`listening on port ${localPort}`);
  console.log(siteAddress);
});
