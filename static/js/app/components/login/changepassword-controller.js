angular.module(
		'ChangePasswordControllerModule',
		[
			]
)
.controller(
		'changePasswordController',
		[
			'$scope',
			'constant',
			'$http',
			'changePasswordService',
			'bookingService',
			function($scope, constant, $http, changePasswordService,bookingService) {

				$scope.currentPassword;
				$scope.password;
				$scope.confirmPassword;

				$scope.changePassword = function() {
					var dataJson = {
							"currentPassword": $scope.currentPassword,
							"newPassword": $scope.password,
							"confirmPassword": 	$scope.confirmPassword
					};

					var accessToken = localStorage.getItem('accessToken');
					if(!(accessToken == undefined || accessToken == null || accessToken == "")){
						changePasswordService.changePassword(dataJson).then(
								function(responseData) {
									//Implement exception checking in response
									if(responseData != undefined){
										console.log(responseData);
										location.hash = "#/";
									}
								},
								function(errorResponse){
									console.error('Error while changing Password.')
								}
						)
					}
					else{
						location.hash('#/login');
					}
				};

				$scope.completeuserdetails = "";

				$scope.completeUserDetail = function(){
					var authKey = localStorage.getItem('accessToken');
					if(authKey != null){
						bookingService
						.completeUserDetail()
						.then(
								function(responseData) {
									if (responseData != undefined && responseData.phoneNumber != undefined) {
										console
										.log(responseData);
										$scope.completeuserdetails = responseData;
									}
								},
								function(errorResponse) {
									console
									.error('Not able to fetch user details.');
								})
					}
				};

				$scope.logout = function(){
					localStorage.removeItem('accessToken');
					localStorage.removeItem('previousurl');
					location.hash = "#/login";
				}
			}
			]
);