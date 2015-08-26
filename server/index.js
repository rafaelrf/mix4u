if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
        Tasks = new Mongo.Collection('tasks');
    });

    Meteor.methods({
        addTask: function(text) {
            // Make sure the user is logged in before inserting a task
            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }

            Tasks.insert({
                text: text,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            });
        },
        deleteTask: function(taskId) {
            Tasks.remove(taskId);
        },
        setChecked: function(taskId, setChecked) {
            Tasks.update(taskId, {
                $set: {
                    checked: setChecked
                }
            });
        }
    });
}
