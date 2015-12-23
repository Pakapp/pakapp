// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/social/menu.html",
      controller: 'appCtrl',
            resolve: {
        auth: function($state, Users, Auth){
            return Auth.auth.$requireAuth().catch(function(){
              console.log('no auth');
              $state.go('login');
            });
        },
        profile: function(Users, Auth, $state){
          return Auth.auth.$requireAuth()
                  .then(function(auth){
                    return Users.getProfile(auth.uid).$loaded()
                      .then(function (profile) {
                          return profile;
                      })
                      .catch(function(){
                          $state.go('login');
                      });
                      // if (profile) {
                      //   console.log(profile);
                      //   return profile;
                      // } 
                      // else {
                      //   $state.go('login');
                      // }
                    });
        }         
      }
    })

    .state('app.home', {
      url: '/',
      views: {
        'menuContent' :{
          templateUrl: "templates/social/feed.html",
        }
      }
      // resolve: {
      //   auth: function($state, Users, Auth){
      //       return Auth.auth.$requireAuth().catch(function(){
      //         console.log('no auth');
      //         $state.go('login');
      //       });
      //   },
      //   profile: function(Users, Auth, $state){
      //     return Auth.auth.$requireAuth()
      //             .then(function(auth){
      //               return Users.getProfile(auth.uid).$loaded()
      //                 .then(function (profile) {
      //                     return profile;
      //                 })
      //                 .catch(function(){
      //                     $state.go('login');
      //                 });
      //                 // if (profile) {
      //                 //   console.log(profile);
      //                 //   return profile;
      //                 // } 
      //                 // else {
      //                 //   $state.go('login');
      //                 // }
      //               });
      //   }         
      // }
    })

    .state('start', {
      url: "/start",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/start-fullscreen.html"
        }
      }
    })

    .state('fgrid', {
      url: "/fgrid",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/friend-grid.html"
        }
      }
    })

    .state('flist', {
      url: "/flist",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/friends.html"
        }
      }
    })

    .state('newpost', {
      url: "/newpost",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/new-post.html"
        }
      }
    })

    .state('email', {
      url: "/email",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/send-email.html"
        }
      }
    })    

    .state('profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/profile.html",
        }
      }
    })

    .state('timeline', {
      url: "/timeline",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/timeline.html",
        }
      }
    })

    .state('editprofile', {
      url: "/editprofile",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/profile-edit.html",
        }
      }
    })

    .state('profiletwo', {
      url: "/profiletwo",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/profile2.html",
        }
      }
    })

    .state('profilethree', {
      url: "/profilethree",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/profile3.html",
        }
      }
    })

    .state('news', {
      url: "/news",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/news.html",
        }
      }
    })

    .state('viewpost', {
      url: "/viewpost",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/view-post.html",
        }
      }
    })

    .state('viewposttwo', {
      url: "/viewposttwo",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/view-post-2.html",
        }
      }
    })

    .state('invite', {
      url: "/invite",
      views: {
        'menuContent' :{
          templateUrl: "templates/social/social-invite-friend.html",
        }
      }
    })

    .state('login', {
      url: "/login",
      controller: 'authCtrl',
      templateUrl: "templates/social/login.html",
    })

    .state('signup', {
      url: "/signup",
      views: {
        'menuContent' :{
          controller: 'appCtrl',
          templateUrl: "templates/social/signup.html",
        }
      }
    })

    // .state('feed', {
    //     url: '/feed',
    //     views: {
    //       'menuContent' :{
    //         templateUrl: "templates/social/feed.html",
    //       }
    //     },
    //     controller: 'appCtrl',
    //     resolve: {
    //       auth: function($state, Users, Auth){
    //         return Auth.auth.$requireAuth().catch(function(){
    //           $state.go('login');
    //         });
    //       },
    //       profile: function(Users, Auth,$state){
    //         return Auth.auth.$requireAuth().then(function(auth){
    //           return Users.getProfile(auth.uid).$loaded().then(function (profile) {
    //             if (profile) {
    //               console.log(profile);
    //               return profile;
    //             } else {
    //               $state.go('login');
    //             }
    //           });
    //         });
    //       }
    //     }
    // })
    
    .state('app.logout', {
        url: '/logout',
        templateUrl: "templates/social/login.html",
        // resolve: {
        //   auth: function ($state, Users, Auth) {
        //     return Auth.auth.$unauth()
        //       .then(function()
        //       {
        //         $state.go('login', null, {reload: true});
        //       })
        //       .catch(function () {
        //         $state.go('login', null, {reload: true});
        //       }
            
        //     , function (error) {
        //       $state.go('login', null, {reload: true});
        //       return;
        //     });
        //   }
        // }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/');
})

 .constant('FirebaseUrl', 'https://pakapp.firebaseio.com/');

