angular.module(
        'ChangePasswordServiceModule',
        []
    )
    .factory(
    'changePasswordService', ['$http', '$q', 'constant', function($http, $q, constant){
        return {
            changePassword: function(dataJson) {
                return $http.post(constant.changePasswordUrl, dataJson, {
                	params: { access_token: localStorage.getItem('accessToken')}
                })
                    .then(
                        function(response){
                            return response.data;
                        },
                        function(errResponse){
                            console.error('Change Password failed.');
                            return $q.reject(errResponse);
                        }
                    );
                }
            }
        }
    ]
);