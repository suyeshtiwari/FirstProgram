angular.module(
        'ResetPasswordServiceModule',
        []
    )
    .factory(
    'resetPasswordService', ['$http', '$q', 'constant', function($http, $q, constant){
        return {
        	resetPasswordOTP: function(dataJson) {
	            return $http.post(constant.sendOtpUrl, dataJson)
	                .then(
	                    function(response){
	                        return response.data;
	                    },
	                    function(errResponse){
	                        console.error('Error received while sending OTP');
	                        return $q.reject(errResponse);
	                    }
	                );
	            },
            
            resetPassword: function(dataJson) {
                return $http.post(constant.resetPasswordUrl, dataJson)
                    .then(
                        function(response){
                            return response.data;
                        },
                        function(errResponse){
                            console.error('Reset password failed.');
                            return $q.reject(errResponse);
                        }
                    );
                }
            }
        }
    ]
);