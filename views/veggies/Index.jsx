const React = require("react");

const IndexVeggie=({veggies})=> {
  return (
    <div>
      <nav>
        <a href="/veggies/new">Create a New Veggie</a>
      </nav>
      <h1>Veggies Index (MongoDB)</h1>
      <ul>
        {veggies.map((veggie, i) => {
          return (
            <li>
              The <a href={`/veggies/${veggie.id}`}>{veggie.name}</a>
              {` is ${veggie.color} and `}
              {veggie.readyToEat
                ? `it is ready to eat`
                : `it is not ready to eat`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
module.exports = IndexVeggie;
