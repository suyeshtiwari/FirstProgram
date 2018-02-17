angular.module(
        'ProfileServiceModule',
        []
    )
    .factory(
    'profileService', ['$http', '$q', 'constant', function($http, $q, constant){
        return {
            
        	updateUserDetails: function(dataJson) {
                return $http.post(constant.updateUserDetailsUrl, dataJson, {
                	params: { access_token: localStorage.getItem('accessToken')}
                })
                    .then(
                        function(response){
                            return response.data;
                        },
                        function(errResponse){
                            console.error('User details update failed. Please retry.');
                            return $q.reject(errResponse);
                        }
                    );
                },
                
              getUserDetails: function() {
                    return $http.get(constant.getUserDetailsUrl, {
                    	params: { access_token: localStorage.getItem('accessToken')}
                    })
                        .then(
                            function(response){
                                return response.data;
                            },
                            function(errResponse){
                                console.error('Profile not available.');
                                return $q.reject(errResponse);
                            }
                        );
               }
                
            }
        }
    ]
);