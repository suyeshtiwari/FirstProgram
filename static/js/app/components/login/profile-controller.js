angular.module(
		'ProfileControllerModule',
		[
			]
)
.controller(
		'profileController',
		[
			'$scope',
			'constant',
			'$http',
			'signupService',
			'uploadService',
			'profileService',
			'commonService',
			'bookingService',
			function($scope, constant, $http, signupService, uploadService, profileService, commonService,bookingService) {

				$scope.userDetails = {
						"id": "",
						"emailId": "",
						"firstName": "",
						"lastName": "",
						"phoneNumber": "",
						"active": false,
						"emailVerified": false,
						"mobileVerified": false,
						"kycVerified": false,
						"createDt": "",
						"rejected": false,
						"status": false,
						"dob":"",
						"birthMonth" : "",
						"birthYear" : "",
						"birthDate" : "",
						"gender" : "",
						"location" : "",
						"others" : ""
				};

				$scope.uploadFile = function(element){
					if(element.files.length > 0) {
						console.log('file is ' );
						console.dir(element.files[0]);
						var uploadUrl = constant.uploadDocUrl;
						var documentType = "govtID";
						bookingService.uploadFileToUrl(element.files[0], uploadUrl).then(
								function(responseData) {
									//Implement exception checking in response
									if(responseData != undefined && responseData.message != undefined && responseData.message.length > 0){
										console.log(responseData);
										$scope.imageUrl = responseData.message[0]+'?access_token='+localStorage.getItem('accessToken');
									}
								},
								function(errorResponse){
									console.error('Upload failed.');
								});
					}else{
						alert('could not upload file.');
					}
				};

				$scope.logout = function(){
					localStorage.removeItem('accessToken');
					localStorage.removeItem('previousurl');
					location.hash = "#/login";
				}

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

				$scope.updateProfile = function() {
					console.log("Access token : " + localStorage.getItem('accessToken'));
					console.log("Phone number : " + localStorage.getItem('phoneNumber'));
					if(!commonService.isValidDate($scope.userDetails.dob)){
						$scope.userDetails.dob = commonService.convertDate3($scope.userDetails.dob); 
					}

					var dataJson = {
							"dob": $scope.userDetails.dob, 
							"emailId": $scope.userDetails.emailId,
							"firstName": $scope.userDetails.firstName,
							"lastName": $scope.userDetails.lastName,
							"gender": $scope.userDetails.gender,
							"location" : $scope.userDetails.location,
							"others" : $scope.userDetails.others,
							"phoneNumber": $scope.userDetails.phoneNumber,
							"profession": $scope.userDetails.profession,
							"professionfield": $scope.userDetails.professionfield,
							"company": $scope.userDetails.company,
							"qualification": $scope.userDetails.qualification
							//"profileImage": "filename",
					}; 
					profileService.updateUserDetails(dataJson).then(
							function(responseData) {
								//Implement exception checking in response
								if(responseData.userDetails != undefined){
									console.log(responseData);
									$scope.userDetails.id = responseData.userDetails.accountVerification.accountDto.id;
									$scope.userDetails.emailId = responseData.userDetails.accountVerification.accountDto.emailId;
									$scope.userDetails.firstName = responseData.userDetails.accountVerification.accountDto.firstName;
									$scope.userDetails.lastName = responseData.userDetails.accountVerification.accountDto.lastName;
									$scope.userDetails.phoneNumber = responseData.userDetails.accountVerification.accountDto.phoneNumber;
									$scope.userDetails.active = responseData.userDetails.accountVerification.accountDto.active;
									$scope.userDetails.dob = responseData.userDetails.accountVerification.accountDto.dob;
									$scope.userDetails.gender = responseData.userDetails.accountVerification.accountDto.gender;
									$scope.userDetails.location = responseData.userDetails.accountVerification.accountDto.location;
									$scope.userDetails.others = responseData.userDetails.accountVerification.accountDto.others;
									$scope.userDetails.emailVerified = responseData.userDetails.accountVerification.emailVerified;
									$scope.userDetails.mobileVerified = responseData.userDetails.accountVerification.mobileVerified;
									$scope.userDetails.kycVerified = responseData.userDetails.accountVerification.kycVerified;
									$scope.userDetails.createDt = responseData.userDetails.accountVerification.createDt;
									$scope.userDetails.rejected = responseData.userDetails.accountVerification.rejected;
									$scope.userDetails.status = responseData.status;
									$scope.userDetails.docImagePathFront = responseData.userDetails.accountVerification.frontImagePath;
									$scope.imageUrl = $scope.userDetails.docImagePathFront+'?access_token='+localStorage.getItem('accessToken');
									//if($scope.userDetails.emailVerified && $scope.userDetails.mobileVerified && $scope.userDetails.kycVerified){
									location.hash = "#/space";
									//}
								}
								else if(responseData != undefined){
									console.log(responseData);
									location.hash = "#/";
								}
							},
							function(errorResponse){
								console.error('Error while storting profile details.')
							}
					)
				};

				$scope.init = function () {
					var accessToken = localStorage.getItem('accessToken');
					if(!(accessToken == undefined || accessToken == null || accessToken == "")){
						profileService.getUserDetails().then(
								function(responseData) {
									//Implement exception checking in response
									if(responseData.userDetails != undefined){
										console.log(responseData);
										$scope.userDetails.id = responseData.userDetails.accountVerification.accountDto.id;
										$scope.userDetails.emailId = responseData.userDetails.accountVerification.accountDto.emailId;
										$scope.userDetails.firstName = responseData.userDetails.accountVerification.accountDto.firstName;
										$scope.userDetails.lastName = responseData.userDetails.accountVerification.accountDto.lastName;
										$scope.userDetails.phoneNumber = responseData.userDetails.accountVerification.accountDto.phoneNumber;
										$scope.userDetails.active = responseData.userDetails.accountVerification.accountDto.active;
										$scope.userDetails.dob = responseData.userDetails.accountVerification.accountDto.dob;
										$scope.userDetails.gender = responseData.userDetails.accountVerification.accountDto.gender;
										$scope.userDetails.location = responseData.userDetails.accountVerification.accountDto.location;
										$scope.userDetails.profession = responseData.userDetails.accountVerification.accountDto.profession;
										$scope.userDetails.company = responseData.userDetails.accountVerification.accountDto.company;
										$scope.userDetails.others = responseData.userDetails.accountVerification.accountDto.others;
										$scope.userDetails.emailVerified = responseData.userDetails.accountVerification.emailVerified;
										$scope.userDetails.mobileVerified = responseData.userDetails.accountVerification.mobileVerified;
										$scope.userDetails.kycVerified = responseData.userDetails.accountVerification.kycVerified;
										$scope.userDetails.createDt = responseData.userDetails.accountVerification.createDt;
										$scope.userDetails.rejected = responseData.userDetails.accountVerification.rejected;
										$scope.userDetails.status = responseData.status;
										$scope.userDetails.docImagePathFront = responseData.userDetails.accountVerification.frontImagePath;
										$scope.imageUrl = $scope.userDetails.docImagePathFront+'?access_token='+localStorage.getItem('accessToken');
										//$scope.finalImageUrl = url($scope.imageUrl);

										if($scope.userDetails.emailVerified && $scope.userDetails.mobileVerified && $scope.userDetails.kycVerified){
											location.hash = "#/space";
										}
									}
								},
								function(errorResponse){
									console.error('Error while storting profile details.')
								}
						)
					}
				};
			}
			]
);