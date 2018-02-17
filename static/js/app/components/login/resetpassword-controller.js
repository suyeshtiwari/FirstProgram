angular.module(
		'ResetPasswordControllerModule',
		[
			]
)
.controller(
		'resetPasswordController',
		[
			'$scope',
			'constant',
			'$http',
			'resetPasswordService',
			'bookingService',
			function($scope, constant, $http, resetPasswordService,bookingService) {

				$scope.phNumber;
				$scope.otp;
				$scope.password;
				$scope.confirmPassword;


				$scope.resetPasswordOTP = function() {

					$scope.countryCode = "+91";
					$scope.phoneNumber = $scope.phNumber.replace("-", "").replace("-", "");
					$phoneNumber = $scope.countryCode+$scope.phoneNumber;

					var dataJson = {
							"otpType": "MOBILE",
							"smsAction": "RESET_PASSWORD",
							"to": $phoneNumber
					};

					resetPasswordService.resetPasswordOTP(dataJson).then(
							function(responseData) {
								if(responseData != undefined){
									console.log(responseData);
									alert('please enter otp send on your mobile');
								}
							},
							function(errorResponse){
								console.error('Error while getting OTP from server.')
								alert(errorResponse.data.message);
								if(errorResponse.data.message == 'Not valid User. Please signup.'){
									location.hash = "#/welcome";
								}
							}
					)
				};

				$scope.logout = function(){
					localStorage.removeItem('accessToken');
					localStorage.removeItem('previousurl');
					location.hash = "#/login";
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


				$scope.resetPassword = function() {

					$scope.countryCode = "+91";
					$scope.phoneNumber = $scope.phNumber.replace("-", "").replace("-", "");
					$phoneNumber = $scope.countryCode+$scope.phoneNumber;

					var dataJson = {
							"phoneNumber": $phoneNumber,
							"uniqueCode": $scope.otp,
							"newPassword":$scope.password,
							"confirmPassword": $scope.confirmPassword
					};

					resetPasswordService.resetPassword(dataJson).then(
							function(responseData) {
								//Implement exception checking in response
								if(responseData != undefined){
									console.log(responseData);
									alert(responseData.message);
									location.hash = "#/";
								}
							},
							function(errorResponse){
								alert(errorResponse.data.message);
								if(errorResponse.data.message == 'Not valid User. Please signup.'){
									location.hash = "#/welcome";
								}
								console.error('Error while reseting Password.')
							}
					)
				};
			}
			]
);