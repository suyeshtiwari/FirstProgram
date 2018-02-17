angular.module(
        'LoginServiceModule',
        []
    )
    .factory(
    'loginService', ['$http', '$q', 'constant', function($http, $q, constant){
        return {

            getOtpForMobile: function(dataJson) {
                return $http.post(constant.sendOtpUrl, dataJson)
                    .then(
                        function(response){
                            return response.data;
                        },
                        function(errResponse){
                            console.error('Error received while getting OTP');
                            return $q.reject(errResponse);
                        }
                    );
                },

              loginUsingOTP: function(dataJson) {
                return $http.post(constant.loginUrl, dataJson)
                    .then(
                        function(response){
                            return response.data;
                        },
                        function(errResponse){
                            console.error('OTP verification failed.');
                            return $q.reject(errResponse);
                        }
                    );
                },

            loginUsingPassword: function(dataJson) {
                return $http.post(constant.loginUrl, dataJson)
                    .then(
                        function(response){
                            return response.data;
                        },
                        function(errResponse){
                            console.error('Error occured while login ....');
                            return $q.reject(errResponse);
                        }
                    );
                }
            }
        }
    ]
);