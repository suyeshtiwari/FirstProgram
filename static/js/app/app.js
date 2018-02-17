'use strict';

//var $nwookHost = "http://ec2-13-126-176-192.ap-south-1.compute.amazonaws.com:8888";
//var $nwookHost = "http://13.126.176.192:8888";
var $nwookHost = "13.126.183.178";
var $nwookBookingHost = "13.126.183.178";
var $nwookPaymentHost = "13.126.133.7";
var $nwookAdminHost = "35.154.162.94";

var $phoneNumber;

angular.module(
        'nwook',
        [
			'ngRoute',
			'NwookComponentsModule',
			//'NwookConstantsModule'
        ]
    ).config(
        [
            '$routeProvider',
            function ($routeProvider) {
                $routeProvider.
	            when('/', {
	            		controller: 'spaceController',
	                templateUrl: 'templates/index.html'
	            }).
	            when('/welcome', {
	                controller: 'signupController',
	                templateUrl: 'templates/welcome.html'
	            }).
	            when('/verify-otp', {                            
	                controller: 'signupController',
	                templateUrl: 'templates/verify-otp.html'
	            }).
	            when('/verification-step', {
	                controller: 'signupController',
	                templateUrl: 'templates/verification-step.html'
	            }).
	            when('/verification-step-login', {
	                controller: 'profileController',
	                templateUrl: 'templates/verification-step.html'
	            }).
	            when('/login', {
	                controller: 'loginController',
	                templateUrl: 'templates/login.html'
	            }).
	            when('/logout', {
	                controller: 'loginController',
	                templateUrl: 'templates/login.html'
	            }).
	            when('/login-otp', {                            
	                controller: 'loginController',
	                templateUrl: 'templates/verify-otp.html'
	            }).
				when('/profile', {
	                controller: 'profileController',
	                templateUrl: 'templates/profile.html'
	            }).
				when('/space', {
					controller: 'spaceController',
					templateUrl: 'templates/space.html'
				}).
				when('/search', {
					controller: 'spaceController',
					templateUrl: 'templates/search-results.html'
				}).
				when('/reset-password', {
	                controller: 'resetPasswordController',
	                templateUrl: 'templates/reset-password.html'
	            }).
	            when('/change-password', {
	                controller: 'changePasswordController',
	                templateUrl: 'templates/setup-password.html'
	            }).
	            when('/booking', {
	                controller: 'bookingController',
	                templateUrl: 'templates/booking-engine.html'
	            }).
	            when('/checkout', {
	                controller: 'bookingController',
	                templateUrl: 'templates/checkout.html'
	            }).
	            when('/booking-list', {
	                controller: 'bookingController',
	                templateUrl: 'templates/booking-list.html'
	            }).
	            when('/package-list', {
	                controller: 'bookingController',
	                templateUrl: 'templates/package-list.html'
	            }).
	            when('/package-details', {
	                controller: 'bookingController',
	                templateUrl: 'templates/package-details.html'
	            }).
	            when('/booking-details', {
	                controller: 'bookingController',
	                templateUrl: 'templates/booking-details.html'
	            }).
	            when('/wallet-info', {
	                controller: 'walletController',
	                templateUrl: 'templates/wallet-info.html'
	            }).
	            otherwise({
	                redirectTo: '/'
	            });
            }
        ]
    )
    .constant('constant', {
    		"sendOtpUrl"		: "http://"+$nwookHost+":8889/api/uniqueCode/generate",
		"sigUpUrl"			: "http://"+$nwookHost+":8889/api/signup",
		"uploadDocUrl"		: "http://"+$nwookHost+":8889/api/uploadverificationdoc",
		"loginUrl"			: "http://"+$nwookHost+":8889/api/login",
		"getUserDetailsUrl"	: "http://"+$nwookHost+":8889/api/userDetails",
		"changePasswordUrl"	: "http://"+$nwookHost+":8889/api/changePassword",
		"resetPasswordUrl"	: "http://"+$nwookHost+":8889/api/resetPassword",
		"updateUserDetailsUrl" : "http://"+$nwookHost+":8889/api/updateCustomerDetails",
		"bookingDetailsUrl"	: "http://"+$nwookBookingHost+":8888/api/booking/grid",
		"confirmBookingUrl"	: "http://"+$nwookBookingHost+":8888/api/booking/confirm",
		"captureBookingUrl"	: "http://"+$nwookBookingHost+":8888/api/booking/capture",
		"getUserBookingsUrl"	: "http://"+$nwookBookingHost+":8888/api/booking/get",
		"getWalletBalanceUrl"	: "http://"+$nwookPaymentHost+":8890/api/wallet/getWallet",
		"cancelBookingUrl"	: "http://"+$nwookBookingHost+":8888/api/booking/cancel/",
		"spacesearchurl":"http://"+$nwookAdminHost+":8080/api/space/search",
		"spacedetailurl":"http://"+$nwookAdminHost+":8080/api/user/space",
		"packagedetailurl":"http://"+$nwookBookingHost+":8888/api/package",
		"packagecheckoutdetailsurl":"http://"+$nwookBookingHost+":8888/api/package/checkout",
		"packagebookingurl":"http://"+$nwookBookingHost+":8888/api/package/booking",
		"cancelPackageBookingUrl":"http://"+$nwookBookingHost+":8888/api/package/cancel/",
		"packagebookingdetail":"http://"+$nwookBookingHost+":8888/api/package/booking/",
		"addmoneywalleturl":"http://"+$nwookBookingHost+":8888/api/wallet/add",
		"addmoneypaymentcaptureurl":"http://"+$nwookBookingHost+":8888/api/wallet/capture",
		"getaddmoneystatusurl":"http://"+$nwookBookingHost+":8888/api/wallet/",
		"checkbookingstatusurl":"http://"+$nwookBookingHost+":8888/api/booking/get/",
		"completeUserDetailurl":"http://"+$nwookHost+":8889/api/userCompleteDetails",
		"getUserPackageBookingsUrl":"http://"+$nwookBookingHost+":8888/api/package/get",
		"getSpaceIdNameMapUrl":"http://"+$nwookAdminHost+":8080/api/user/space/spaceIdName"
		});