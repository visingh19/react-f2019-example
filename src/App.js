import React from 'react';
import { Grid, Image } from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import placeholder from './placeholder_100.png';




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
    // console.log('mouse enter, this is:', this, this.props.icon, this.props.link);
    this.setState({selected: true});
  }

  handleMouseLeave = () => {
    // console.log('mouse leave, this is:', this, this.props.icon, this.props.link)
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
    // console.log(this.state.searchText)
    // console.log(event.target.value)
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


class NewsColumnContainer extends React.Component {
  constructor(props) {
    super(props);
    // state init here
    // have we clicked on something to open up the new side bar.
    this.state = {
      expanded: false
    }
  }

  // we're going to fill the columns here using flexbox.
  // We also need to include one "post your current status / thoughts" default panel.

  // is it one column with wrapping or two separate columns that we split posts into...?

  // all component items go into news-columns for posts
  render () {
    return ( 
      <div className="news-columns">

      <YourStatusBox />
      <NewsInfoBox />
      <NewsInfoBox />
      <NewsInfoBox />
      <NewsInfoBox />


      </div>
    );
  }

}

class YourStatusBox extends React.Component {
  constructor(props) {
    super(props);
    // state init here
    this.state = {
      statusText: ''
    }
  }

  // maintain one source of truth for react, bind?
  updateStatusText = (event) => {
    // console.log(this.state.statusText)
    // console.log(event.target.value)
    this.setState({statusText: event.target.value})
    event.preventDefault();
  }



  //this is a special box for posting your thoughts specifically

  render () {
    return ( 
      <div className="your-status-box news-item-box">
        <YourIcon iconSrc={logo} />
        <textarea className="your-status-textarea" type="text" placeholder="What are you thinking?"
          value={this.state.statusText} onChange={this.updateStatusText}/>
        <div className="your-status-box-options">
          <i className="fa fa-camera"></i>
          <i className="fa fa-video-camera"></i>
          <i className="fa fa-plus"></i>

          <span className="share-btn">Share ></span>
        </div>

      </div> 
    );
  }

}

// returns an icon floated left based on the img src provided as a prop
function YourIcon(props) {
  return (
    <img src={props.iconSrc} className="your-newspost-icon" alt="icon" />
  );
}

function Icon(props) {
  return (
    <img src={props.iconSrc} className="newspost-icon" alt="icon" />
  );
}





////////////////////////////////////////////////////////////////
////////////// BASIC POST INFO BOX /////////////////////////////
////////////////////////////////////////////////////////////////



//the only 'state' here is # of likes/comments/your comment.

// props: iconSrc, name, time
//  media to be loaded?
//  # of likes, comments
//  comments to be loaded
class NewsInfoBox extends React.Component {
  constructor(props) {
    super(props);
    // state init here

  }

  // this is a generic info box template
  // contains the following data:
  //  poster name, poster profile, main content (video, picture, etc) - done
  //  main content click needs to trigger sidebar expansion (TODO)
  //  'how far has it spread' bar (# of likes, comments, share button)
  //  'your comment box', some other comments - at least 5 distinct components?

  render () {
    return ( 
      <div className="news-item-box">
      <PosterInfo iconSrc={placeholder} name="Potato" time="7 minutes ago"/>
      <div>I am main content.</div>
      <PostSocials hearts={17} comments={5}/>
      </div> 
    );
  }
}

// Takes a iconSrc, name, and time prop.
function PosterInfo (props) {
  return (
      <div className="poster-info">
        <Icon iconSrc={props.iconSrc}/>
        <div className="poster-label">
          <span className="name-label">{props.name}</span>
          <br/>
          <span className="time-label">{props.time}</span>
        </div>
        <i className="fa fa-ellipsis-v poster-options"></i>
      </div>
    );
}

// takes # of likes, comments, and comments to be loaded as input.
// likes & comments will be modified, so they're state.
class PostSocials extends React.Component {
  constructor(props) {
    super(props);
    // state init here

    this.state = {
      liked: false,
      commented: false,
      hearts: this.props.hearts,
      comments: this.props.comments
    }

  }

  // ES6 binding syntax. fxn = () => {}
  updateHeart = (event) => {
    if (this.state.liked == false) {
      this.setState({hearts: this.state.hearts + 1});
    }
    else {
      this.setState({hearts: this.state.hearts - 1});
    }
    
    this.setState({liked: !this.state.liked});
  }

  updateComment = (event) => {
    if (this.state.commented == false) {
      this.setState({comments: this.state.comments + 1});
    }
    else {
      this.setState({comments: this.state.comments - 1});
    }
    
    this.setState({commented: !this.state.commented});
  }

  render () {
    const isLiked = this.state.liked;
    const isCommented = this.state.commented;

    return (
      
      <div> All Socials.


        <div className="network-spread-info">
          <span onClick={this.updateHeart} className="network-likes"><i className={isLiked ? 'fa fa-heart red':'fa fa-heart-o'}></i> {this.state.hearts}</span>
          <span onClick={this.updateComment} className="network-comments"><i className={isCommented ? "fa fa-comment lightblue" : "fa fa-comment-o"}></i> {this.state.comments}</span>

          <span className="network-share">Share <i className="fa fa-share"></i></span>
        </div>
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

        <NewsSearchBar />

        <NewsColumnContainer />

      </div> 
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
