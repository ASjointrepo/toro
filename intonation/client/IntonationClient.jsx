// This code is executed on the client only
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

Meteor.subscribe("tasks");

Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    //ReactDOM.render(<App />, document.getElementById("render-target"));
});
