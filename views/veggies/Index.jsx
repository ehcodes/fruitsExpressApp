const React = require("react");
const Default = require("../layouts/Default.jsx");

const IndexVeggie = ({ veggies }) => {
  return (
    <Default title={"Veggie Index"}>
      <div>
        <nav>
          <a href="/veggies/new">Add a Veggie</a>
        </nav>
        <ul>
          {veggies.map((veggie) => {
            return (
              <li key={veggie.id}>
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
    </Default>
  );
};
module.exports = IndexVeggie;
