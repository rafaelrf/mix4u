
if (Meteor.isClient) {
Tasks = new Mongo.Collection('tasks');

    angular.module('mix4u', ['angular-meteor']);

    angular.module('mix4u').controller('AppController', ['$scope', '$meteorCollection',
        function($scope, $meteor) {

            $scope.tasks = $scope.$meteorCollection(Tasks,true);

            $scope.addTask = function(newTask) {
                $scope.tasks.push({
                    text: newTask,
                    createdAt: new Date()
                });
            };

        }
    ]);

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

    Meteor.methods({
        addTask: function(text) {
            // Make sure the user is logged in before inserting a task
            if (!Meteor.userId()) {
                throw new Meteor.Error("not-authorized");
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

