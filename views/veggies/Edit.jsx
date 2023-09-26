const React = require("react");
const Default = require("../layouts/Default.jsx");

const Edit = ({ veggie }) => {
  return (
    <Default title={`Edit ${veggie.name}`}>
      <nav>
        <a href={`/fruit/${veggie.id}`}>Return to {veggie.name}</a>
      </nav>
      <form>
          Name: <input type="text" name="name" defaultValue={veggie.name}/><br/>
          Color: <input type="text" name="color"  defaultValue={veggie.color}/><br/>
          Is Ready To Eat:
              { veggie.readyToEat? <input type="checkbox" name="readyToEat" defaultChecked />: <input type="checkbox" name="readyToEat"/> }
          <br/>
          <input type="submit" value="Submit Changes"/>
      </form>
    </Default>
  );
};

module.exports = Edit;
