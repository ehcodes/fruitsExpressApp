const React = require("react");
const Default = require("../layouts/Default.jsx");

const Edit = ({ fruit }) => {
  return (
    <Default title={`Edit ${fruit.name}`}>
      <nav>
        <a href={`/fruit/${fruit.id}`}>Return to {fruit.name}</a>
      </nav>
      <form>
        Name: <input type="text" name="name" defaultValue={fruit.name} />
        <br />
        Color: <input type="text" name="color" defaultValue={fruit.color} />
        <br />
        Is Ready To Eat:
        {fruit.readyToEat ? (
          <input type="checkbox" name="readyToEat" defaultChecked />
        ) : (
          <input type="checkbox" name="readyToEat" />
        )}
        <br />
        <input type="submit" value="Submit Changes" />
      </form>
    </Default>
  );
};

module.exports = Edit;
