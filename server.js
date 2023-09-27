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
app.use(methodOverride("_method"));

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

// IMPORTING FRUIT MODEL
const Fruit = require("./models/fruitSchema.js");

// ROUTES
app.get("/fruits/", async (req, res) => {
  try {
    const allFruits = await Fruit.find();
    res.render("fruits/Index", { fruits: allFruits });
  } catch (error) {
    console.error(error);
  }
});

app.get("/fruits/new", function (req, res) {
  res.render("fruits/New");
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

app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", { fruit: foundFruit });
  } catch (err) {
    console.error(err);
    res.send({ msg: err.message });
  }
});

// post data to db
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

// Update existing fruit via id lookup
app.put("/fruits/:id", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  try {
    await Fruit.findByIdAndUpdate(req.params.id, req.body)
    return res.redirect(`/fruits/${req.params.id}`);
  } catch (err) {
    res.send(`error in adding new fruit`);
    console.error(err);
  }
});

// Delete existing fruit via id lookup
app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/fruits");
  } catch (err) {
    console.error(err);
  }
});

// IMPORTING VEGGIE MODELS
const Veggie = require("./models/veggieSchema.js");

// ROUTES
app.get("/veggies", (req, res) => {
  Veggie.find({}).then((allVeggies) => {
    res.render("veggies/Index", {
      veggies: allVeggies,
    });
  });
});

app.get("/veggies/new", function (req, res) {
  res.render("veggies/New");
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

app.get("/veggies/:id/edit", async (req, res) => {
  try {
    const foundVeggie = await Veggie.findById(req.params.id);
    res.render("veggies/Edit", { veggie: foundVeggie });
  } catch (err) {
    console.error(err);
    res.send({ msg: err.message });
  }
});

// post data to db
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

// Update existing veggie via id lookup
app.put("/veggies/:id", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  try {
    await Veggie.findByIdAndUpdate(req.params.id, req.body)
    return res.redirect(`/veggies/${req.params.id}`);
  } catch (err) {
    res.send(`error in adding new veggie`);
    console.error(err);
  }
});

// Delete existing veggie via id lookup
app.delete("/veggies/:id", async (req, res) => {
  try {
    await Veggie.findByIdAndRemove(req.params.id);
    res.redirect("/veggies");
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log(Date())
  console.log(`listening on port 3000`);
  console.log(`http://localhost:3000/`);
});
