angular.module(
        'LoginControllerModule',
        [
        ]
    )
    .controller(
        'loginController',
        [
            '$scope',
            'constant',
            '$http',
            'loginService',
            'uploadService',
            '$location',
            function($scope, constant, $http, loginService, uploadService,$location) {

            	$scope.firstName;
            	$scope.lastName;
            	$scope.emailId;
            	$scope.phNumber;
            	$scope.accesstoken;
            	$scope.status;
            	$scope.countryCode = "+91";

            	$scope.sendLoginOTP = function() {
            		localStorage.setItem('formattedPhoneNumber', $scope.phNumber);
					$scope.phoneNumber = $scope.phNumber.replace("-", "").replace("-", ""); 
					$phoneNumber = $scope.countryCode+$scope.phoneNumber;
					localStorage.setItem('phoneNumber',$phoneNumber);
					
					var dataJson = {
						"otpType": "MOBILE",
						"smsAction": "OTP_LOGIN",
						"to": $phoneNumber
					};
					loginService.getOtpForMobile(dataJson).then(
						function(responseData) {
							//Implement exception checking in response
							if(responseData != undefined){
								console.log(responseData);
								location.hash = "#/login-otp";
							}
						},
						function(errorResponse){
							console.error('Error while getting OTP from server.');
							alert(errorResponse.data.message);
							if(errorResponse.data.message == 'Not valid User. Please signup.'){
								location.hash = "#/welcome";
							}
						}
					)
        		};
        		
        		$scope.loginUsingPassword = function() {
        			localStorage.setItem('formattedPhoneNumber', $scope.phNumber);
					$scope.phoneNumber = $scope.phNumber.replace("-", "").replace("-", ""); 
					$phoneNumber = $scope.countryCode+$scope.phoneNumber;
					localStorage.setItem('phoneNumber',$phoneNumber);
					var dataJson = {
						"loginCredentialTypeEnum": "PASSWORD",
						//implement password encryption - check with backend
						"password" : $scope.password,
						"userName": $phoneNumber
					};
					loginService.loginUsingPassword(dataJson).then(
						function(responseData) {
							//Implement exception checking in response
							if(responseData != undefined){
								console.log(responseData);
								localStorage.setItem('accessToken',responseData.access_token);
								$scope.status = responseData.status;
								if(localStorage.getItem("previousurl") == null){
									if(responseData.accountDetailsResponseDto == undefined
											|| responseData.accountDetailsResponseDto.emailVerified == false
											|| responseData.accountDetailsResponseDto.phoneVerified == false
											|| responseData.accountDetailsResponseDto.kycVerified == false){
										location.hash = "#/profile";
									}else{
										location.hash = "#/";
									}
								}else{
									location.hash = "#"+localStorage.getItem("previousurl");
								}
							}
						},
						function(errorResponse){
							console.error('Password does not match. Kindly re-enter your password.');
							alert(errorResponse.data.message);
							if(errorResponse.data.message == 'Not valid User. Please signup.'){
								location.hash = "#/welcome";
							}
						}
					)
        		};

        		$scope.verifyOTP = function() {
        			var dataJson = {
    					"loginCredentialTypeEnum": "OTP",
    					"password" : $scope.otp,
    					"userName": $phoneNumber
    				};
					loginService.loginUsingOTP(dataJson).then(
						function(responseData) {
							//Implement exception checking in response
							if(responseData != undefined){
								console.log(responseData);
								localStorage.setItem('accessToken',responseData.access_token);
								$scope.status = responseData.status;
								if(localStorage.getItem("previousurl") == null){
									if(responseData.accountDetailsResponseDto == undefined
											|| responseData.accountDetailsResponseDto.emailVerified == false
											|| responseData.accountDetailsResponseDto.phoneVerified == false
											|| responseData.accountDetailsResponseDto.kycVerified == false){
										location.hash = "#/profile";
									}else{
										location.hash = "#/";
									}
								}else{
									location.hash = "#"+localStorage.getItem("previousurl");
								}
							}
						},
						function(errorResponse){
							console.error('OTP does not match. Kindly re-enter your OTP.');
						}
					)
        		};
        		
        		$scope.logout = function(){
        			localStorage.removeItem('accessToken');
        			localStorage.removeItem('previousurl');
        			location.hash = "#/login";
        		}
        		
        		$scope.init = function () {
        			$phoneNumber = localStorage.getItem('phoneNumber');
					$scope.phNumber = localStorage.getItem('formattedPhoneNumber');
		        };
		        
		        if($location.$$url == "/logout"){
		       	 	localStorage.removeItem('accessToken');
		        }
		        
		        console.log(localStorage.getItem('accessToken'));
		        
		        //to clear local storage on browser closing for login flow
		        //$(window).unload(function(){
		        	//  localStorage.clear();
		        //});
        	}
    ]
);