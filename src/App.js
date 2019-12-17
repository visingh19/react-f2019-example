import React from 'react';
import logo from './logo.svg';
import './App.css';




class LeftBarNavItem extends React.Component {
  //construction for assigning any initial state
  constructor(props) {
    super(props);
    //selected only works for hovering for now :C
    this.state = {
      selected: false
    }
  }

  // binding to 'this' syntax 
  handleMouseEnter = () => {
    console.log('mouse enter, this is:', this, this.props.icon, this.props.link);
    this.setState({selected: true});
  }

  handleMouseLeave = () => {
    console.log('mouse leave, this is:', this, this.props.icon, this.props.link)
    this.setState({selected: false});
  }


  render() {
    var listClass = ""
    if (this.state.selected) {
      listClass = 'selected'
    }
    else { //not selected
      listClass = '';
    }

    return (
      <li className={listClass} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <a href={this.props.link}><i className={this.props.icon}></i></a>
      </li>
    );
  }

}


class LeftBar extends React.Component {


  renderList() {
    const listIcons = ['fa fa-home', 'fa fa-calendar', 'fa fa-envelope', 'fa fa-user', 'fa fa-cog'];
    const listLinks = ['/home', '/calendar', '/inbox', '/profile', '/settings']
    const listItems = listIcons.map((listIcons, index) =>
      <LeftBarNavItem key={index} icon={listIcons} link={listLinks[index]} />
    );
    return (<ul>{listItems}</ul>);
    }


  render() {
    return (
        <div className="left-nav-col">
          <div><img src={logo} className="App-logo Logo-small" alt="logo" /></div>
          <div className="left-col-contents">
            {this.renderList()}
          </div>
          <div className="left-nav-signout"><i className="fa fa-sign-out"></i></div>
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

            Hello!!!! <i className="fa fa-cog"></i> something
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
