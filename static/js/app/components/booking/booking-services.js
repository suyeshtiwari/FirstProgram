angular.module(
		'BookingServiceModule',
		[]
)
.factory(
		'bookingService', ['$http', '$q', 'constant', function($http, $q, constant){
			return {

				getBookingGridDetails: function(dataJson) {
					return $http.post(constant.bookingDetailsUrl, dataJson,{
						//params: { access_token: localStorage.getItem('accessToken')}
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Booking details not available for selected space. Please select other space.');
								return $q.reject(errResponse);
							}
					);
				},

				doBooking: function(dataJson) {
					return $http.post(constant.confirmBookingUrl, dataJson,{
						//params: { access_token: localStorage.getItem('accessToken')}
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Booking failed.');
								return $q.reject(errResponse);
							}
					);
				},
				
				getSpaceIdNameMap: function() {
					return $http.get(constant.getSpaceIdNameMapUrl,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Space name url map listing failed.');
								return $q.reject(errResponse);
							}
					);
				},
				
				getUserBooking: function(dataJson) {
					return $http.get(constant.getUserBookingsUrl+"?bookingId="+dataJson['bookingId'],{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Booking listing failed.');
								return $q.reject(errResponse);
							}
					);
				},
				
				getUserPackageBookings: function(dataJson) {
					return $http.get(constant.getUserPackageBookingsUrl+"?bookingId="+dataJson['bookingId'],{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('package Booking listing failed.');
								return $q.reject(errResponse);
							}
					);
				},
				
				
				getAllUserPackageBookings: function() {
					return $http.get(constant.getUserPackageBookingsUrl,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('package Booking listing failed.');
								return $q.reject(errResponse);
							}
					);
				},

				getAllUserBookings: function() {
					return $http.get(constant.getUserBookingsUrl,{
						//params: { access_token: localStorage.getItem('accessToken')}
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Booking listing failed.');
								return $q.reject(errResponse);
							}
					);
				},

				cancelUserBooking: function(datajson) {
					var url = constant.cancelBookingUrl + datajson.bookingId + "/";
					if(datajson.packageName != undefined && datajson.packageName.length > 0){
						url = constant.cancelPackageBookingUrl + datajson.bookingId + "/";
					}
					return $http.post(url,datajson,{
						//params: { bookingId: datajson.bookingId},
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Booking cancellation failed.');
								return $q.reject(errResponse);
							}
					);
				},

				getWalletBalance: function() {
					return $http.get(constant.getWalletBalanceUrl,{
						//params: { access_token: localStorage.getItem('accessToken')}
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('balance fetch failed.');
								return $q.reject(errResponse);
							}
					);
				},


				getSpaceFilter: function(datajson) {
					var url = constant.spacesearchurl;
					return $http.post(url,datajson,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('not able to fetch space filters.');
								return $q.reject(errResponse);
							}
					);
				},
				getSpaceDetail: function(datajson) {
					var url = constant.spacedetailurl + '?spaceId='+datajson['spaceId']+'&bookingType='+datajson['bookingType']+'&uniqueId='+datajson['uniqueId'];
					return $http.get(url,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Booking cancellation failed.');
								return $q.reject(errResponse);
							}
					);
				},
				getPackageDetail: function(datajson) {
					var url = constant.packagedetailurl + '?spaceId='+datajson['spaceId']+'&bookingType='+datajson['bookingType']+'&startDate='+datajson['startDate'];
					if(datajson['packageId'] != undefined){
						url = url + "&packageId="+datajson['packageId'];
					}		
					return $http.get(url,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Package details call failed.');
								return $q.reject(errResponse);
							}
					);
				},
				getPackageCheckoutDetails: function(datajson) {
					var url = constant.packagecheckoutdetailsurl + '?packageId='+datajson['packageId']+'&startDate='+datajson['startDate'];
					return $http.get(url,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Package checkout details call failed.');
								return $q.reject(errResponse);
							}
					);
				},
				bookPackage: function(datajson) {
					return $http.post(constant.packagebookingurl,datajson,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Package checkout details call failed.');
								return $q.reject(errResponse);
							}
					);
				},
				fetchPackageDetails: function(datajson) {
					var url = constant.packagebookingdetail+datajson['bookingId'];
					return $http.get(url,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Package fetch call failed.');
								return $q.reject(errResponse);
							}
					);
				},
				addBalance: function(datajson) {
					return $http.post(constant.addmoneywalleturl,datajson,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Wallet add money request call failed.');
								return $q.reject(errResponse);
							}
					);
				},
				getAddMoneyStatus: function(datajson) {
					var url = constant.getaddmoneystatusurl+datajson['orderId']+"/"+datajson['bookingId'];
					return $http.get(url,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Wallet get add money status request call failed.');
								return $q.reject(errResponse);
							}
					);
				},
				checkBookingStatus: function(datajson) {
					var url = constant.checkbookingstatusurl+datajson['bookingId']+"/"+datajson['bookingtype'];
					return $http.get(url,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Check booking status call failed.');
								return $q.reject(errResponse);
							}
					);
				},
				completeUserDetail: function(datajson) {
					var url = constant.completeUserDetailurl+'?access_token='+localStorage.getItem('accessToken');
					return $http.get(url,{
						headers: {
							'access_token': localStorage.getItem('accessToken')}
					})
					.then(
							function(response){
								return response.data;
							},
							function(errResponse){
								console.error('Not able to fetch user details.');
								return $q.reject(errResponse);
							}
					);
				},
				
				uploadFileToUrl : function(front, uploadUrl){
			        var fd = new FormData();
			        fd.append('front', front);
			        //fd.append('back', file);
			        return $http.post(uploadUrl, fd, {
			            transformRequest: angular.identity,
			            headers: {'Content-Type': undefined},
			            params: { access_token: localStorage.getItem('accessToken')}
			        })
			        .then(
							function(response){
								console.log('file uploaded successfully.'+response);
								return response.data;
							},
							function(errResponse){
								 console.error('file upload failed.');
								return $q.reject(errResponse);
							}
					);
			    }
			}
		}
		]
);