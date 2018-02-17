angular.module(
		'SignupControllerModule',
		[
			]
)
.controller(
		'signupController',
		[
			'$scope',
			'constant',
			'$http',
			'signupService',
			'uploadService',
			'profileService',
			function($scope, constant, $http, signupService, uploadService, profileService) {

				$scope.firstName;
				$scope.lastName;
				$scope.emailId;
				$scope.phNumber;
				$scope.countryCode = "+91";
				$scope.otp;

				$scope.logout = function(){
					localStorage.removeItem('accessToken');
					localStorage.removeItem('previousurl');
					location.hash = "#/login";
				};


				$scope.sendOTP = function() {
					localStorage.setItem('formattedPhoneNumber', $scope.phNumber);
					$scope.phoneNumber = $scope.phNumber.replace("-", "").replace("-", ""); 
					$phoneNumber = $scope.countryCode+$scope.phoneNumber;
					localStorage.setItem('phoneNumber',$phoneNumber);

					var dataJson = {
							"otpType": "MOBILE",
							"smsAction": "OTP_SIGNUP",
							"to": $phoneNumber
					};

					signupService.getOtpForMobile(dataJson).then(
							function(responseData) {
								//Implement exception checking in response
								if(responseData != undefined){
									console.log(responseData);
									alert('please enter otp send on your mobile');
									//location.hash = "#/verify-otp";
								}
							},
							function(errorResponse){
								console.error('Error while getting OTP from server.')
							}
					)
				};

				$scope.verifyOTP = function() {
					var dataJson = {
							"phoneNumber": $phoneNumber,
							"uniqueCode": $scope.otp
					};

					signupService.verifyOtpForMobile(dataJson).then(
							function(responseData) {
								//Implement exception checking in response
								if(responseData != undefined && responseData.status != undefined && responseData.status == true){
									console.log(responseData);
									localStorage.setItem('accessToken',responseData.message.access_token);
									location.hash = "#/verification-step";
								}else{
									alert('Please provide correct OTP');
								}
							},
							function(errorResponse){
								console.error(errorResponse);
								if(errorResponse.data != undefined && errorResponse.data.message == 'Account already present.Please login.'){
									location.hash="#/login";
								}
								alert(errorResponse.data.message);
							}
					)
				};

				$scope.uploadFile = function(){
					var front = $scope.myFile;
					var back = $scope.myFile1;
					console.log('file is ' );
					console.dir(front);
					console.dir(back);
					var uploadUrl = constant.uploadDocUrl;
					var documentType = "govtID";
					uploadService.uploadFileToUrl(front, back, uploadUrl).then(
							function(responseData) {
								//Implement exception checking in response
								if(responseData != undefined){
									console.log(responseData);
								}
							},
							function(errorResponse){
								console.error('Upload failed.');
							});
				};

				$scope.completeRegt = function() {
					var dataJson = {
							"firstName": $scope.firstName,
							"lastName": $scope.lastName,
							"emailId": $scope.emailId
					};
					profileService.updateUserDetails(dataJson).then(
							function(responseData) {
								//Implement exception checking in response
								if(responseData != undefined){
									console.log(responseData);
									location.hash = "#/profile";
								}
							},
							function(errorResponse){
								console.error('Update user details failed. Please retry.');
							}
					)
				};

				$scope.getUserDetails = function(){
					var accessToken = localStorage.getItem('accessToken');
					if(!(accessToken == undefined || accessToken == null || accessToken == "")){
						profileService.getUserDetails().then(
								function(responseData) {
									//Implement exception checking in response
									if(responseData != undefined){
										console.log(responseData);
										$scope.emailId = responseData.userDetails.accountVerification.accountDto.emailId;
										$scope.firstName = responseData.userDetails.accountVerification.accountDto.firstName;
										$scope.lastName = responseData.userDetails.accountVerification.accountDto.lastName;
									}
								},
								function(errorResponse){
									console.error('Error while storting profile details.')
								}
						)
					}
				};

				$scope.init = function () {
					$phoneNumber = localStorage.getItem('phoneNumber');
					$scope.phNumber = localStorage.getItem('formattedPhoneNumber');
				};

//				//to clear local storage for signup flow
//				$(window).unload(function(){
//				localStorage.clear();
//				});

			}
			]
);