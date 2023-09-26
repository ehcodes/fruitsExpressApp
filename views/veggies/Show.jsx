const React = require("react");

const ShowVeggie = ({veggie}) => {
  return (
    <div>
      <h1>{veggie.name.toUpperCase()}</h1>
      <p>
        The {veggie.name} is {veggie.color}
      </p>
      <p>
        {veggie.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </p>
    </div>
  );
};

module.exports = ShowVeggie;
