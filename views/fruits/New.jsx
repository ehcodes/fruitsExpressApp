const React = require('react');

const New = ()=>{
  return (
    <div>
        <h1>New Fruit page</h1>
        {/* 
        action = server route
        method = HTTP verb 
        */}
        <form action="/fruits" method="POST">
          Name: <input type="text" name="name" /><br/>
          Color: <input type="text" name="color" /><br/>
          Is Ready To Eat: <input type="checkbox" name="readyToEat" /><br/>
          <input type="submit" name="" value="Create Fruit"/>
        </form>
    </div>
  );
}

module.exports = New;