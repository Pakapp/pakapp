angular.module('app')

.controller('authCtrl', function($scope, $timeout, $state, Users, $filter, Auth) {

    $scope.users  = Users;
  $scope.auth   = Auth;

    //Register with facebook
    $scope.registerFB = function(){
      $scope.auth.ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          $scope.users.userRef.child('facebook:'+authData.facebook.id).set({
            firstname:        authData.facebook.cachedUserProfile.first_name,
            lastname:         authData.facebook.cachedUserProfile.last_name,
            profile_image:    authData.facebook.profileImageURL,
            gender:           authData.facebook.cachedUserProfile.gender,
            date_of_birth:    authData.facebook.cachedUserProfile.birthday,
            locale:           authData.facebook.cachedUserProfile.locale,
            fb_locationID:    authData.facebook.cachedUserProfile.location.id,
            fb_location_name: authData.facebook.cachedUserProfile.location.name,
            join:             $filter('date')(new Date(), 'yyyy-MM-dd'),
          });
          $state.go('app.home');
        }
      }, {
        scope: "email,user_likes,user_birthday,user_location" // the permissions requested
      });
    }

})


.controller('appCtrl', function($scope, $timeout, $state, Users, $filter, Auth, Farms, Packages, profile, FirebaseUrl) {

  var appCtrl = this;
  $scope.goto = function(state){
      $state.go(state);
  };

  $scope.users  = Users;
  $scope.auth   = Auth;
  $scope.packages = Packages;
  $scope.farms = Farms;
  $scope.profile = profile;

  console.log($scope.packages);

  console.log($scope.profile);


    $scope.subscribe = function(pid){
      $scope.users.userRef.child($scope.profile.$id).child('subscriptions').child(pid).set(true);
    }


    $scope.logout = function(){
      var ref = new Firebase(FirebaseUrl);
      ref.unauth();
      $state.go('login', null, {reload: true});
    }

})

