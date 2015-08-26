if (Meteor.isClient) {
    Tasks = new Mongo.Collection('tasks');


    angular.module('mix4u', ['angular-meteor']);

    angular.module('mix4u').controller('AppController', ['$scope', '$meteorCollection',
        function($scope, $meteor) {

            $scope.tasks = $scope.$meteorCollection(function() {
                return Tasks.find($scope.getReactively('query'), {
                    sort: {
                        createdAt: -1
                    }
                })
            });

            $scope.addTask = function(newTask) {
                $meteor.call('addTask', newTask);
            };

            $scope.deleteTask = function(task) {
                $meteor.call('deleteTask', task._id);
            };

            $scope.setChecked = function(task) {
                $meteor.call('setChecked', task._id, !task.checked);
            };
            $scope.$watch('hideCompleted', function() {
                if ($scope.hideCompleted)
                    $scope.query = {
                        checked: {
                            $ne: true
                        }
                    };
                else
                    $scope.query = {};
            });
            $scope.incompleteCount = function() {
                return Tasks.find({
                    checked: {
                        $ne: true
                    }
                }).count();
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
