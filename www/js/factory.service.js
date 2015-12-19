angular.module('app')

  .factory('Packages', function($firebaseArray, $firebaseObject, FirebaseUrl) {

    var ref = new Firebase(FirebaseUrl + 'packages');
    var packages = $firebaseArray(ref);

    return packages;

  })

   .factory('Farms', function($firebaseArray, $firebaseObject, FirebaseUrl) {

    var ref = new Firebase(FirebaseUrl + 'farms');
    var farms = $firebaseArray(ref);

    return farms;

  });
