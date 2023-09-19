const React = require("react");

class IndexVeggie extends React.Component {
  render() {
    const { veggies } = this.props;
    return (
      <div>
        <h1>Veggies Index Page</h1>
        <ul>
          {veggies.map((veggie, i) => {
            return (
              <li>
                <a href={`/veggies/${i}`}>{veggie.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
module.exports = IndexVeggie;
