Navigationbar = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    console.log(!Meteor.user());
    return {
      userStatus: !Meteor.user()
    };
  },
  handleClick(event){
    event.preventDefault();
    Meteor.logout();
  },
  render() {
    var userStatus = true;
    if (!Meteor.user()) {

      var listelement = <li id="right"></li>
      console.log("no user logged in!");
    } else {

      var listelement1 = <li id="right">
        <a href={FlowRouter.path('/app')}>App Page</a>
      </li>
      var listelement2 = <li id="right">
        <a href = "#" onClick = {this.handleClick}>Logout</a>

      </li>

    }
    console.log(this.props.info);

    return (

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
          <li id="logo">
            <img src="http://i.imgur.com/KQ8IGLu.png"></img>
          </li>
            <li className="active Homebutton" id="title">
              <a href="/">
                Intonation</a>
            </li>

            {listelement1}
            <li id="right">
              <a href="/about">About</a>
            </li>
            {listelement2}
          </ul>
        </div>
      </nav>
    )
  }
})
