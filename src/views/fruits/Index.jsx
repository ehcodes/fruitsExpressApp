const React = require("react");
const Default = require("../layouts/Default.jsx");

const Index = ({ fruits }) => {
  return (
    <Default title={"Fruits Index Page"}>
      <nav>
        <a href="/fruits/new">Create a New Fruit</a>
      </nav>
      <ul>
        {fruits.map((fruit) => {
          return (
            <li key={fruit.id}>
              <a href={`/fruits/${fruit.id}`}>{fruit.name}</a>
              {` is ${fruit.color} and `}
              {fruit.readyToEat
                ? `it is ready to eat`
                : `it is not ready to eat`}
              <form
                action={`/fruits/${fruit.id}?_method=DELETE`}
                method="POST"
              >
                <input type="submit" value="DELETE" />
              </form>
              <a href={`/fruits/${fruit.id}/edit`}>Edit This Fruit</a>
            </li>
          );
        })}
      </ul>
    </Default>
  );
};

module.exports = Index;
