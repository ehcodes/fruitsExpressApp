const express = require("express");
const app = express();

const jsxViewEngine = require("jsx-view-engine");
app.set("view engine", "jsx");
app.engine("jsx", jsxViewEngine());

// parses incoming requests
app.use(express.urlencoded({ extended: false }));

// middleware - necessary to access posted form data
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

const localPort = 3000;

const siteAddress = `http://localhost:3000/`;
const fruits = require("./models/fruits.js");
const veggies = require("./models/veggies.js");

// fruits route will render the Index.jsx component
app.get("/fruits", function (req, res) {
  res.render("Index", { fruits: fruits });
});

// renders form to add a new fruit
app.get("/fruits/new", function (req, res) {
  res.render("New");
});

// Delete
// Update

// Create data via a post request
app.post("/fruits", (req, res) => {
  //if checked, req.body.readyToEat is set to 'on'
  if (req.body.readyToEat === "on") {
    // rewritten to match existing data
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  fruits.push(req.body);
  // redirect user to the fruits route
  res.redirect('/fruits');
});

app.get("/fruits/:indexOfFruitsArray", function (req, res) {
  res.render("Show", {
    //second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray],
    //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  });
});

app.get("/veggies", function (req, res) {
  res.render("IndexVeggie", { veggies: veggies });
});

app.get("/veggies/:indexOfVeggiesArray", function (req, res) {
  res.render("ShowVeggie", {
    veggie: veggies[req.params.indexOfVeggiesArray],
  });
});

app.listen(localPort, () => {
  console.log(`listening on port ${localPort}`);
  console.log(siteAddress);
});
