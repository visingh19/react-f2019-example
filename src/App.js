import React from 'react';
import logo from './logo.svg';
import './App.css';





class LeftBar extends React.Component {

  renderList() {
    const listIcons = ['fa fa-cog', 'fa fa-home'];
    const listItems = listIcons.map((listIcons) =>
    <li><i class={listIcons}>a</i></li>
  );
    return (<ul>{listItems}</ul>);
  }


  render() {
    return (
        <div className="left-nav-col">
          <div>logo placeholder</div>
          <div class="left-col-contents">
            {this.renderList()}
          </div>

        </div>
      );
  }
}













////////// APP ///////////////



//ES6 Class status. My main grid.
class App extends React.Component {

  //construction for assigning any initial state
  constructor(props) {
    super(props);
    //expanded is 'have we zoomed in on one post?'
    this.state = {
      expanded: 'false'
    }
  }


  //render function
  render () {
    return (

      <div className="App">

      <LeftBar />




        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.

            Hello!!!! <i class="fa fa-cog"></i> something
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
