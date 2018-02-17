angular.module(
		'SpaceControllerModule',
		[
			]
)
.controller(
		'spaceController',
		[
			'$scope',
			'constant',
			'$http',
			'bookingService',
			'commonService',
			'$location',
			'$window',
			function($scope, constant, $http, bookingService, commonService,$location,$window) {

				$scope.spaceDetails = {
						"spaceId": "",
						"spaceName": "",
						"address": "",
						"units":1,
						"startTime":"08:00",
						"endTime":"23:30",
						"price":"",
						"startDate":"",
						"uniqueId":""
				};
				$scope.spaceDetails.selectedDate;
				$scope.slotsAvailableArray=[];
				$scope.getBookingGridDetails = function(spaceId, bookingType,uniqueId) {
					var dateTime = new Date(Date.now());
					var todayDate = commonService.getFormattedDate(dateTime);
					$scope.spaceDetails.startDate = commonService.convertDate1(todayDate);
					if(!commonService.isValidDate2($scope.spaceDetails.startDate)){
						$scope.spaceDetails.startDate = commonService.convertDate1(todayDate);
					}
					console.log("Access token : " + localStorage.getItem('accessToken'));
					var dataJson = {
							"bookingType": bookingType,
							"startDate": $scope.spaceDetails.startDate,
							"startTime": $scope.spaceDetails.startTime,
							"endDate": $scope.spaceDetails.startDate,
							"endTime": $scope.spaceDetails.endTime,
							"spaceId": spaceId,
							"units": $scope.spaceDetails.units,
							"uniqueId":uniqueId
					};
					
					localStorage.setItem('uniqueId', uniqueId);

					bookingService.getBookingGridDetails(dataJson).then(
							function(responseData) {
								if(responseData != undefined){
									console.log(JSON.stringify(responseData));
									$scope.spaceGridDetails = responseData;
									localStorage.setItem('slotsAvailableArray', JSON.stringify($scope.spaceGridDetails.slotsDateWise));
									localStorage.setItem('spaceId', JSON.stringify($scope.spaceGridDetails.spaceId));
//									localStorage.setItem('spaceStartTime', JSON.stringify($scope.spaceGridDetails.spaceStartTime));
//									localStorage.setItem('spaceEndTime', JSON.stringify($scope.spaceGridDetails.spaceEndTime));
									localStorage.setItem('startDate', JSON.stringify(commonService.convertDate4(todayDate)));
									localStorage.setItem('engineBookingType', responseData.bookingType);
									location.hash = "#/booking?bookingType="+responseData.bookingType;
								}
							},
							function(errorResponse){
								console.error('Error while retrieving booking details.');
							}
					)

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


				$scope.bookPackage = function() {
					//TODO
					var authKey = localStorage.getItem('accessToken');
					if(authKey == null){
						localStorage.setItem("previousurl",$location.$$url);
						$window.location.href = '#/login';
					}else {
						$scope.selectedPackage.startDate = commonService.convertDate2($('#datetimepicker input').val());
						if($scope.selectedPackage.packageId == undefined){
							alert('Please select package.');
						}else{
							$window.location.href = '#/checkout?packageId=' + $scope.selectedPackage.packageId+'&spaceId='+$location.search()["spaceId"]+'&bookingType='+$location.search()["bookingType"]+'&startDate='+$scope.selectedPackage.startDate;
						}
					}
				}
				
				
				$scope.filterPackage = function(){
					spaceId = $location.search()["spaceId"];
					bookingType = $location.search()["bookingType"];
					uniqueId = $location.search()["uniqueId"];
					var dataJson = {
							'spaceId':spaceId,
							'bookingType':bookingType,
							'uniqueId':uniqueId,
							'startDate':commonService.convertDate2($scope.selectedPackage.startDate)
					};

					bookingService.getPackageDetail(dataJson).then(
							function(responseData) {
								if(responseData !== undefined){
									console.log(responseData);
									if(responseData != undefined && responseData.message != undefined){
										console.log(responseData);
										$scope.packageList = responseData.message;
									}
								}
							},
							function(errorResponse){
								console.error('Error while retrieving space filter details.');
							}
					)
				}

				$scope.loadSpace = function() {
					$scope.selectedPackage = {
						"startDate":''
					};
					
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1; //January is 0!

					var yyyy = today.getFullYear();
					if(dd<10){
					    dd='0'+dd;
					} 
					if(mm<10){
					    mm='0'+mm;
					} 
					var today = yyyy+'-'+mm+'-'+dd;

					spaceId = $location.search()["spaceId"];
					bookingType = $location.search()["bookingType"];
					uniqueId = $location.search()["uniqueId"];
					var dataJson = {
							'spaceId':spaceId,
							'bookingType':bookingType,
							'uniqueId':uniqueId,
							'startDate':today
					};

					bookingService.getPackageDetail(dataJson).then(
							function(responseData) {
								if(responseData !== undefined){
									console.log(responseData);
									$scope.packageList = [];
									if(responseData != undefined && responseData.message != undefined){
										console.log(responseData);
										$scope.packageList = responseData.message;
									}
								}
							},
							function(errorResponse){
								console.error('Error while retrieving space filter details.');
							}
					),

					bookingService.getSpaceDetail(dataJson).then(
							function(responseData) {
								if(responseData != undefined){
									console.log(responseData);
									$scope.bookingTypeSpaceMap = {};
									if(responseData != undefined && responseData.message != undefined){
										if(responseData.message.spaceResponses != undefined){
											$scope.bookingTypeSpaceMap = responseData.message.spaceResponses;
											console.log('====='+$scope.bookingTypeSpaceMap);
										}
									}
								}
							},
							function(errorResponse){
								console.error('Error while retrieving space filter details.');
							}
					)
				}

				$scope.get = function(name){
					if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
						return decodeURIComponent(name[1]);
				}

				

				$scope.selectedbookingtype='';	

				$scope.searchlisting = function(){
					$scope.fetchHomePageDetails(localStorage.getItem('selectedbookingtype'));
				}							

				$scope.fetchHomePageDetails = function(bookingtype) {
					var list = [];
					$scope.selectedbookingtype=bookingtype;
					list.push(bookingtype);
					var dataJson = {
							"bookingTypeAvailable":list
					}
					localStorage.setItem('selectedbookingtype',$scope.selectedbookingtype);
					bookingService.getSpaceFilter(dataJson).then(
							function(responseData) {
								if(responseData != undefined){
									console.log(responseData);
									//$scope.bookingtypes = [];
									$scope.spaceList = [];
									if(responseData != undefined && responseData.message != undefined
											&& responseData.message.spaceFacetsResponse != undefined
											&& responseData.message.spaceFacetsResponse.facetResponseMap != undefined){
										if(responseData.message.spaceFacetsResponse.facetResponseMap["bookingtype"] != undefined
												&& responseData.message.spaceFacetsResponse.facetResponseMap["bookingtype"].facets.length > 0){

											angular.forEach(responseData.message.spaceFacetsResponse.facetResponseMap["bookingtype"].facets, function (value){
												//$scope.bookingtypes.push(value);

											});
											//$scope.bookingtypes.sort();
											if(responseData.message.spaceResponses != undefined){
												$scope.spaceList = responseData.message.spaceResponses[bookingtype];
												console.log($scope.spaceList);
											}
										}
									}
								}
							},
							function(errorResponse){
								console.error('Error while retrieving space filter details.');
							}
					)
				}


				$scope.search = function() {
					var dataJson = {
							"searchText": ""
					};

					bookingService.getSpaceFilter(dataJson).then(
							function(responseData) {
								if(responseData != undefined){
									console.log(responseData);
									$scope.bookingtypes = [];
									$scope.spaceList = [];
									console.log($scope.records);
									if(responseData != undefined && responseData.message != undefined
											&& responseData.message.spaceFacetsResponse != undefined
											&& responseData.message.spaceFacetsResponse.facetResponseMap != undefined){
										if(responseData.message.spaceFacetsResponse.facetResponseMap["bookingtype"] != undefined
												&& responseData.message.spaceFacetsResponse.facetResponseMap["bookingtype"].facets.length > 0){
											angular.forEach(responseData.message.spaceFacetsResponse.facetResponseMap["bookingtype"].facets, function (value){
												$scope.bookingtypes.push(value);
											});
$scope.bookingtypes.sort();
											if(responseData.message.spaceResponses != undefined){
												$scope.spaceList = responseData.message.spaceResponses[$scope.bookingtypes[0].label];
												$scope.selectedbookingtype=$scope.bookingtypes[0].label;
												console.log($scope.spaceList);
											}
										}
									}
								}
							},
							function(errorResponse){
								console.error('Error while retrieving space filter details.');
							}
					)
				};
			}
			]
);