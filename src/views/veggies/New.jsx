const React = require("react");
const Default = require("../layouts/Default.jsx");

const NewVeggie = () => {
  return (
    <Default title={"Add a New Veggie"}>
      <form action="/veggies" method="POST">
        Name: <input type="text" name="name" />
        <br />
        Color: <input type="text" name="color" />
        <br />
        Is Ready To Eat: <input type="checkbox" name="readyToEat" />
        <br />
        <input type="submit" name="" value="Create Veggie" />
      </form>
    </Default>
  );
};

module.exports = NewVeggie;
