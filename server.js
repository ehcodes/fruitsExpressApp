const express = require("express");
const app = express();

const jsxViewEngine = require("jsx-view-engine");
app.set("view engine", "jsx");
app.engine("jsx", jsxViewEngine());

const localPort = 3000;
// commenting out for now since we're using jsx
// const docType = `<!DOCTYPE html>`;

const siteAddress = `http://localhost:3000/`;
const fruits = require("./models/fruits.js");
const veggies = require("./models/veggies.js");

// /fruits route will render the Index.jsx component
app.get('/fruits', function(req, res){
  res.render('Index', { fruits: fruits });
});
  
app.get('/fruits/new', function(req, res){
  res.render('New');
}); 

app.get("/fruits/:indexOfFruitsArray", function (req, res) {
  res.render("Show", {
    //second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray],
    //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  });
});
  
app.get('/veggies', function(req, res){
  res.render('IndexVeggie', { veggies: veggies });
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
