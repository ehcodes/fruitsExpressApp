const React = require("react");
const Default = require("../layouts/Default.jsx");

const ShowVeggie = ({veggie}) => {
  return (
    <Default title={veggie.name.toUpperCase()}>
      <p>
        The {veggie.name} is {veggie.color}
      </p>
      <p>
        {veggie.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </p>
    </Default>
  );
};

module.exports = ShowVeggie;
