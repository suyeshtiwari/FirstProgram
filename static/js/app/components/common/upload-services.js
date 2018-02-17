angular.module(
        'UploadServiceModule',
        []
    )

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])

.service('uploadService', ['$http', function ($http) {
    this.uploadFileToUrl = function(front, uploadUrl){
        var fd = new FormData();
        fd.append('front', front);
        //fd.append('back', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            params: { access_token: localStorage.getItem('accessToken')}
        })
        .success(function(){
            console.log('file uploaded successfully.');
        })
        .error(function(){
            console.error('file upload failed.');
        });
    }
}]);