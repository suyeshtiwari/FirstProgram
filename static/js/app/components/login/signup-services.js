angular.module(
        'SignupServiceModule',
        []
    )
    .factory(
    'signupService', ['$http', '$q', 'constant', function($http, $q, constant){
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

            verifyOtpForMobile: function(dataJson) {
                return $http.post(constant.sigUpUrl, dataJson)
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

            uploadDocument: function(dataJson) {
                return $http.post(constant.uploadDocUrl, dataJson)
                    .then(
                        function(response){
                            return response.data;
                        },
                        function(errResponse){
                            console.error('Upload document failed.');
                            return $q.reject(errResponse);
                        }
                    );
                },

            setProfileDetails: function(dataJson) {
                return $http.post(constant.profileDetailsUrl, dataJson)
                    .then(
                        function(response){
                            return response.data;
                        },
                        function(errResponse){
                            console.error('Upload document failed.');
                            return $q.reject(errResponse);
                        }
                    );
                }
            }
        }
    ]
);