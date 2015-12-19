angular.module('app.controllers', [])

.controller('appCtrl', function($scope, $timeout, $state, Users, $filter, Auth, Farms, Packages) {

  $scope.goto = function(state){
      $state.go(state);
  };

  $scope.users  = Users;
  $scope.auth   = Auth;
  $scope.packages = Packages;
  $scope.farms = Farms;

  $scope.user = {
          email: '',
          password: '',
          firstname:'',
          lastname:'',
          b_day:'',
          b_month:'',
          b_year:''
        }
  //Register with facebook
    $scope.registerFB = function(){
      $scope.auth.ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          $scope.users.userRef.child('fb'+authData.facebook.id).set({
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
          $state.go('app.feed');
        }
      }, {
        scope: "email,user_likes,user_birthday,user_location" // the permissions requested
      });

    }


    $scope.login = function (){
      Auth.auth.$authWithPassword(authCtrl.user).then(function (auth){
        $state.go('home');
      }, function (error){
        authCtrl.error = error;
      });
    };;

})
