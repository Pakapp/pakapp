angular.module('app')

   .factory('Farms', function($firebaseArray, $firebaseObject, FirebaseUrl) {

    var ref = new Firebase(FirebaseUrl + 'farms');
    var farms = $firebaseArray(ref);

    return farms;

  })

   .factory('Packages', function($firebaseArray, $firebaseObject, FirebaseUrl) {

    var ref = new Firebase(FirebaseUrl + 'packages');
    var packages = $firebaseArray(ref);

    return packages;

  });
