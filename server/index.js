
if (Meteor.isServer) {
Tasks = new Mongo.Collection('tasks');
    Meteor.startup(function() {
        // code to run on server at startup
    });
}