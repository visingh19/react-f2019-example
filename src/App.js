import React from 'react';
import logo from './logo.svg';
import './App.css';





class LeftBar extends React.Component {

  
  handleMouseEnter = () => {
    console.log('mouse enter, this is:', this);
  }

  handleMouseLeave = () => {
    console.log('mouse leave, this is:', this)
  }

  renderList() {
    const listIcons = ['fa fa-home', 'fa fa-calendar', 'fa fa-envelope', 'fa fa-user', 'fa fa-cog'];
    const listItems = listIcons.map((listIcons, index) =>
      <li key={index} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <i class={listIcons}></i>
        </li>
    );
    return (<ul>{listItems}</ul>);
    }


  render() {
    return (
        <div className="left-nav-col">
          <div><img src={logo} className="App-logo Logo-small" alt="logo" /></div>
          <div class="left-col-contents">
            {this.renderList()}
          </div>
          <div class="left-nav-signout"><i class="fa fa-sign-out"></i></div>
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
