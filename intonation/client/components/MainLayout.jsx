MainLayout = React.createClass({
  mixins:[ReactMeteorData],
  getMeteorData() {
    console.log(!Meteor.user());
    return {
      userStatus: !Meteor.user(),
    };

  },
  render() {
    console.log(this.props.info);
    return (
      <div id = "mainlayout">
        <header><Navigationbar info = {this.props.info} /></header>
        <main>
          {this.props.content}</main>
      </div>
    );
  }
});
