const React = require("react");
const Default = require("../layouts/Default.jsx");

const Index = ({fruits}) => {
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
              {`is ${fruit.color} and `}
              {fruit.readyToEat ? (
                <span>it is ready to eat</span>
              ) : (
                <span> it is not ready to eat </span>
              )}
              {/* Your Delete Form Goes Here  It's incomplete we will fix below*/}
              <form
                action={`/fruits/${fruit._id}?_method=DELETE`}
                method="POST"
              >
                <input type="submit" value="DELETE" />
              </form>
            </li>
          );
        })}
      </ul>
    </Default>
  );
};

module.exports = Index;
