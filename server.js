require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

// parses incoming requests
app.use(express.urlencoded({ extended: false }));

const jsxViewEngine = require("jsx-view-engine");
app.set("view engine", "jsx");
app.engine("jsx", jsxViewEngine());

const methodOverride = require("method-override");
app.use(methodOverride('_method'));

// middleware - necessary to access posted form data
app.use((req, res, next) => {
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
app.get("/fruits/", async (req, res) => {
  try {
    const allFruits = await Fruit.find();
    res.render("fruits/Index", { fruits: allFruits });
  } catch (error) {
    console.error(error);
  }
});

// renders form to add a new fruit
app.get("/fruits/new", function (req, res) {
  res.render("fruits/New");
});

// Delete - will go over in future class
app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/fruits");
  } catch (err) {
    console.error(err);
  }
});

// Update - will go over in future class

app.post("/fruits", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  try {
    const newFruit = await Fruit.create(req.body);
    return res.redirect("/fruits");
  } catch (err) {
    res.send(`error in adding ${newFruit.name}`);
    console.error(err);
  }
});

app.get("/fruits/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {
      fruit: foundFruit,
    });
  } catch (err) {
    res.send(err);
    console.error(err);
  }
});

app.get("/veggies", (req, res) => {
  Veggie.find({}).then((allVeggies) => {
    res.render("veggies/Index", {
      veggies: allVeggies,
    });
  });
});

// renders form to add a new fruit
app.get("/veggies/new", function (req, res) {
  res.render("veggies/New");
});

// Delete - will go over in future class
// Update - will go over in future class

// Send data to mdb via post request
app.post("/veggies", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  try {
    const newVeggie = await Veggie.create(req.body);
    return res.redirect("/veggies");
  } catch (err) {
    res.send(`error in adding new veggie`);
    console.error(err);
  }
});

app.get("/veggies/:id", async (req, res) => {
  try {
    const foundVeggie = await Veggie.findById(req.params.id);
    res.render("veggies/Show", {
      veggie: foundVeggie,
    });
  } catch (err) {
    res.send(err);
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log(`listening on port 3000`);
  console.log(`http://localhost:3000/`);
});
