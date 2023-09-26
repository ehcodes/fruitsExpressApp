const React = require("react");

const Show =({fruit})=> {
  return (
    <div>
      <h1>{fruit.name.toUpperCase()}</h1>
      <p>
        The {fruit.name} is {fruit.color}
      </p>
      <p>
        {fruit.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </p>
    </div>
  );
}

module.exports = Show;
