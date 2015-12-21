angular.module('app')
  .factory('Auth', function($firebaseAuth, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);

    var Auth = {
      auth: $firebaseAuth(ref),
      ref:  ref
    };
    return Auth;
  })

  .factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){

    var usersRef = new Firebase(FirebaseUrl+'users');
    var users = $firebaseArray(usersRef);

    var Users = {

      getProfile: function(uid){
          return $firebaseObject(usersRef.child(uid));
      },

      getArrProfile: function(uid){
        return $firebaseArray(usersRef.child(uid));
      },

      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },

      ref:function(uid){
        return usersRef.child(uid);
      },
      objRef: $firebaseObject(usersRef),
      arrRef: $firebaseArray(usersRef),
      all: users,
      userRef: usersRef,

      getGravatar: function(uid){
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      }
    };

    return Users;
  });

