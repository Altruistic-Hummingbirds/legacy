angular.module('app.map', [])

.controller('MapController', ['$scope', 'ServerInteraction', function ($scope, ServerInteraction) {
  // methods to be used inside map.html
  $scope.user = {};
  $scope.user.id = ServerInteraction.storage.id;
  $scope.user.userName = ServerInteraction.storage.name;
  $scope.user.userPic = ServerInteraction.storage.picture;
  $scope.user.latitude = '';
  $scope.user.longitude = '';

  $scope.locationCheck = function () {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    } else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
    var startPos;
    var geoSuccess = function (position) {
      startPos = position;
      
      $scope.user.latitude = startPos.coords.latitude;
      $scope.user.longitude = startPos.coords.longitude;
      console.log($scope.user);

      socket.emit('userData', $scope.user);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }
  $scope.setOthersLocations = function () {
    ServerInteraction.getUserLocations().then(function(locations){
      //something to drop markers based on locations and formatting
      //if marker is currently present for specific user
        //remove marker
      //place new marker at new location
      //possibly an ng-repeat event that places new markers for users;
      //<marker position={{location.lat, location.long}}></marker>
    })
  }

  socket.on('serverData', function (data) {
    
  })

// setInterval($scope.locationCheck, 2000);

}]);
