const React = require("react");

const Index =()=> {
  return (
    <div>
      <nav>
        <a href="/fruits/new">Create a New Fruit</a>
      </nav>
      <h1>Fruits Index (MongoDB)</h1>
      <ul>
        {this.props.fruits.map((fruit) => {
          return (
            <li>
              The <a href={`/fruits/${fruit.id}`}>{fruit.name}</a> is{" "}
              {fruit.color}{` and `}
              {fruit.readyToEat
                ? `it is ready to eat`
                : `it is not ready to eat`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

module.exports = Index;
