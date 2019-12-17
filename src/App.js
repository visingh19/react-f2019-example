import React from 'react';
import { Grid, Image } from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';




///////// LEFT BAR COMPONENTS //////////////

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




///////////// MAIN FEED COMPONENTS (double column scroll bar) //////////



class NewsSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }


  // maintain one source of truth for react
  handleChange = (event) => {
    console.log(this.state.searchText)
    console.log(event.target.value)
    this.setState({searchText: event.target.value})
    event.preventDefault();
  }

  render () {
    return (
      // needs to contain a search icon on the left and be fixed position on page
      // Because react elements are independent components, making it fixed w/ respect to viewport is bad
      // So we'll just have it 'float' and take up 90% of the width of wherever it's put
      <div className="newsfeed-search-container">
        <i className="fa fa-search"></i>
        <input className="newsfeed-searchbox" type="text" value={this.state.searchText} onChange={this.handleChange} placeholder="Search in social..." />
      </div>
      );
  }


}






//NewsFeed contains a search bar and two column feed that can be clicked on.
class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    // state init here
  }


  render () {
    return (
     
      <div className="news-feed">
      // Search Box
      <NewsSearchBar />

      // Two Column Scroll

      test</div> 
    );
  }


}



////////// APP MAIN CONTAINER ///////////////


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

        <NewsFeed />


      
      </div>
    );
  }


  renderOld () {
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
