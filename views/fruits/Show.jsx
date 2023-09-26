const React = require("react");

const Show =({fruit})=> {
  return (
    <Default title={fruit.name.toUpperCase()}>
      <p>
        The {fruit.name} is {fruit.color}
      </p>
      <p>
        {fruit.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </p>
    </Default>
  );
}

module.exports = Show;
