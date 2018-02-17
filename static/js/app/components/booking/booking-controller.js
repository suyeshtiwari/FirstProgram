angular
.module('BookingControllerModule', [])
.controller(
		'bookingController',
		[
			'$scope',
			'constant',
			'$http',
			'bookingService',
			'$window',
			'commonService',
			'$location',
			function($scope, constant, $http, bookingService, $window, commonService,$location) {

				var slotsArray = JSON.parse(localStorage
						.getItem('slotsAvailableArray'));
				var spaceId = JSON.parse(localStorage
						.getItem('spaceId'));
				var spaceStartTime = JSON.parse(localStorage
						.getItem('spaceStartTime'));
				var spaceEndTime = JSON.parse(localStorage
						.getItem('spaceEndTime'));
				var uniqueId = localStorage.getItem('uniqueId');
				
				
				$scope.backLink = {
						"spaceId":spaceId,
						"uniqueId":uniqueId,
						"bookingType":$location.search()["bookingType"]
				}
				
				$scope.slotsAvailableArray = [];
				if(slotsArray != null){
					$scope.slotsAvailableArray = slotsArray;
					$scope.engineBookingType = localStorage.getItem('engineBookingType');
				}

				$scope.bookingDetails = {
						"bookingType" : $location.search()["bookingType"],
						"startDate": "",
						"endDate": "",
						"spaceId": spaceId,
						"units" : 1,
						"coffeeCount" : 0,
						"printCount" : 0,
						"isInternetRequired" : false,
						"paymentMode" : ""
				}

				var dateTime = new Date(Date.now()).toLocaleString();
				var array = dateTime.split(",");
				var todayDate = array[0];
				if(localStorage.getItem('startDate') !== 'undefined'){
					$scope.bookingDetails.startDate = localStorage.getItem('startDate');
				}
				else{
					$scope.bookingDetails.startDate = commonService.convertDate4(todayDate);
					localStorage.setItem('startDate', $scope.bookingDetails.startDate);
				}

//				if(!commonService.isValidDate2($scope.bookingDetails.startDate)){
//				$scope.bookingDetails.startDate = commonService.convertDate1(todayDate);
//				}

				$scope.walletBalance = "0";
				$scope.bookingList = [];
				$scope.packageBookingList = [];
				$scope.bookingAmount = 0;
				var rzp1 = null;
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
				}

				$scope.createSlotsAvailableArray = function() {
					$scope.slotsAvailable = [];
					for (var i = 1; i < 64; i++) {
						$scope.slotsAvailable[i] = false;
					}
					for (var i = 0; i < $scope.slotsAvailableArray.length; i++) {
							if ($scope.slotsAvailableArray[i].startTime == "08:00")
								$scope.slotsAvailable[1] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "08:15")
								$scope.slotsAvailable[2] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "08:30")
								$scope.slotsAvailable[3] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "08:45")
								$scope.slotsAvailable[4] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "09:00")
								$scope.slotsAvailable[5] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "09:15")
								$scope.slotsAvailable[6] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "09:30")
								$scope.slotsAvailable[7] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "09:45")
								$scope.slotsAvailable[8] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "10:00")
								$scope.slotsAvailable[9] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "10:15")
								$scope.slotsAvailable[10] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "10:30")
								$scope.slotsAvailable[11] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "10:45")
								$scope.slotsAvailable[12] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "11:00")
								$scope.slotsAvailable[13] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "11:15")
								$scope.slotsAvailable[14] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "11:30")
								$scope.slotsAvailable[15] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "11:45")
								$scope.slotsAvailable[16] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "12:00")
								$scope.slotsAvailable[17] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "12:15")
								$scope.slotsAvailable[18] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "12:30")
								$scope.slotsAvailable[19] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "12:45")
								$scope.slotsAvailable[20] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "13:00")
								$scope.slotsAvailable[21] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "13:15")
								$scope.slotsAvailable[22] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "13:30")
								$scope.slotsAvailable[23] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "13:45")
								$scope.slotsAvailable[24] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "14:00")
								$scope.slotsAvailable[25] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "14:15")
								$scope.slotsAvailable[26] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "14:30")
								$scope.slotsAvailable[27] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "14:45")
								$scope.slotsAvailable[28] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "15:00")
								$scope.slotsAvailable[29] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "15:15")
								$scope.slotsAvailable[30] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "15:30")
								$scope.slotsAvailable[31] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "15:45")
								$scope.slotsAvailable[32] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "16:00")
								$scope.slotsAvailable[33] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "16:15")
								$scope.slotsAvailable[34] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "16:30")
								$scope.slotsAvailable[35] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "16:45")
								$scope.slotsAvailable[36] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "17:00")
								$scope.slotsAvailable[37] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "17:15")
								$scope.slotsAvailable[38] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "17:30")
								$scope.slotsAvailable[39] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "17:45")
								$scope.slotsAvailable[40] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "18:00")
								$scope.slotsAvailable[41] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "18:15")
								$scope.slotsAvailable[42] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "18:30")
								$scope.slotsAvailable[43] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "18:45")
								$scope.slotsAvailable[44] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "19:00")
								$scope.slotsAvailable[45] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "19:15")
								$scope.slotsAvailable[46] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "19:30")
								$scope.slotsAvailable[47] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "19:45")
								$scope.slotsAvailable[48] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "20:00")
								$scope.slotsAvailable[49] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "20:15")
								$scope.slotsAvailable[50] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "20:30")
								$scope.slotsAvailable[51] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "20:45")
								$scope.slotsAvailable[52] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "21:00")
								$scope.slotsAvailable[53] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "21:15")
								$scope.slotsAvailable[54] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "21:30")
								$scope.slotsAvailable[55] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "21:45")
								$scope.slotsAvailable[56] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "22:00")
								$scope.slotsAvailable[57] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "22:15")
								$scope.slotsAvailable[58] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "12:30")
								$scope.slotsAvailable[59] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "22:45")
								$scope.slotsAvailable[60] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "23:00")
								$scope.slotsAvailable[61] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "23:15")
								$scope.slotsAvailable[62] = $scope.slotsAvailableArray[i].available;
							else if ($scope.slotsAvailableArray[i].startTime == "23:30")
								$scope.slotsAvailable[63] = $scope.slotsAvailableArray[i].available;
					}
					
					setTimeout(function(){
						$(".gridblock").unbind('click')
						$(".gridblock").click(function() {
							gridHelper($(this))
						});
						$(".gridblock").mouseenter(function(){
							gridMouseEnterHelper($(this))
						});
					});
				};
				$scope.createSlotsAvailableArray();

				$scope.getWalletBalance = function() {
					console.log("Access token : "
							+ localStorage.getItem('accessToken'));
					bookingService
					.getWalletBalance()
					.then(
							function(responseData) {
								if (responseData != undefined) {
									$scope.walletBalance = responseData.totalAmount;
									console
									.log(responseData);
								}
							},
							function(errorResponse) {
								console
								.error('Error while retrieving wallet balance.');
							})
				};
				$scope.getWalletBalance();
				
				
				$scope.calculateBookingAmount = function(){
					$scope.createSelectedSlotArray();
				}

				$scope.createSelectedSlotArray = function() {
					$scope.slotsSelectedArray = [];
					$scope.bookingAmount = 0;
					console.log('start time window : ' + window.startTime);
					console.log('end time window : ' + window.endTime);
					for (var i = 0; i < $scope.slotsAvailableArray.length; i++) {
						if (($scope.slotsAvailableArray[i].startTime >= window.startTime)
								&& ($scope.slotsAvailableArray[i].startTime < window.endTime)) {
							$scope.slotsSelectedArray
							.push($scope.slotsAvailableArray[i].dateSlotAvailabilities[0].slotId);
							$scope.bookingAmount += $scope.slotsAvailableArray[i].dateSlotAvailabilities[0].slotPrice;
						}
					}
					$scope.bookingAmount = parseInt($scope.bookingDetails.units) * parseInt($scope.bookingAmount);
				};

				$scope.getBookingGridDetails = function() {
					$scope.bookingAmount = 0;
					console.log("Access token : "
							+ localStorage.getItem('accessToken'));
					localStorage.setItem('startDate', $scope.bookingDetails.startDate);
					var date = "";
					if(!commonService.isValidDate2($scope.bookingDetails.startDate)){
						date = commonService.convertDate2($scope.bookingDetails.startDate);
						date = date.replace(/['"]+/g, '')
					}
					var dataJson = {
							"bookingType" : $scope.bookingDetails.bookingType,
							"startDate" : date,
							"startTime":"08:00",
							"endTime":"23:30",
							"endDate" : date,
							"spaceId" : $scope.bookingDetails.spaceId,
							"units" : $scope.bookingDetails.units,
							"uniqueId":uniqueId
					};
					bookingService
					.getBookingGridDetails(dataJson)
					.then(
							function(responseData) {
								if (responseData != undefined) {
									console
									.log(responseData);
									var head= document.getElementsByTagName('head')[0];
					      			var script= document.createElement('script');
									  
					      			//script.type= 'text/javascript';
					      			//script.src= 'js/lib/page-functionality.js';
					      			//head.appendChild(script);
//									document.getElementsByClassName("endTime")[0].value = "00:00";
//									document.getElementsByClassName("startTime")[0].value = "00:00";
//									var slots = document.getElementsByClassName("gridblock");
//									angular.forEach(slots, function (ele){
//										if(ele.className.indexOf('hoverGrid') != -1 || ele.className.indexOf('endBlock') != -1){
//											console.log(ele.className);
//											ele.className= 'gridblock text-center ng-scope';
//										}
//									});
									$scope.spaceGridDetails = responseData;
									$scope.slotsAvailableArray = $scope.spaceGridDetails.slotsDateWise;
									$scope.createSlotsAvailableArray();
								}
							},
							function(errorResponse) {
								console
								.error('Error while retrieving slot details.');
							})
				};

				var arr = {
						"amount" : 0,
						"authKey" : "",
						"channelId" : 1,
						"nwookOrderId" : "",
						"pgId" : 1,
						"pgTransactionId" : "",
						"walletTransactionType" : "",
						"bookingId" : "",
						"bookingType":""
				};

				$scope.logout = function(){
					localStorage.removeItem('accessToken');
					localStorage.removeItem('previousurl');
					location.hash = "#/login";
				}

				var options = {
						"key" : "rzp_test_EwfhQMfVEAlpbL",
						"amount" : 0, // 2000 paise = INR 20
						"name" : "Merchant Name",
						"description" : "Purchase Description",
						/* "image" : "/your_logo.png", */
						"handler" : function(response) {
							console.log('Performing payment ...');
							arr.pgTransactionId = response.razorpay_payment_id;
							//bookingService.doPayment()
							/* alert(response.razorpay_payment_id); */
							var url = constant.captureBookingUrl;
							$
							.ajax(
									{
										type : 'POST',
										url : url,
										data : JSON
										.stringify(arr),
										contentType : 'application/json',
										"beforeSend" : function(
												request) {
											request
											.setRequestHeader(
													"access_token",
													localStorage
													.getItem('accessToken'));
										}
									}).done(function() {
										console.log( "success" );
										document.getElementById('bookingBtn').click();
									})
									.fail(function() {
//										document.getElementById('refresh').click();
										consloe.log( "error" );
									})
									.always(function() {
										console.log("complete" );
									});
						},
						"prefill" : {
							"name" : "",
							"email" : ""
						},
						"notes" : {
							"order_id" : Math.floor(Math.random() * 20),
							"booking_id" : "",
							"booking_type":""
						},
						"theme" : {
							"color" : "#F37254"
						}
				};

				$scope.checkBookingStatus = function() {
					var datajson = {
							"orderId" : options.notes.order_id,
							"bookingId" : options.notes.booking_id,
							"bookingtype":options.notes.booking_type,
							"authKey" : localStorage.getItem('accessToken')
					};

					bookingService
					.checkBookingStatus(datajson)
					.then(
							function(responseData) {
								console.log(responseData);
								if (typeof (responseData.userBookings) != "undefined") {
									if(responseData.userBookings[0].bookingStatus == 'BOOKED'){
										alert('Booking confirmed.');
										$window.location.href = '#/booking-list';
									}
								}
							},
							function(errorResponse) {
								console
								.error('Error while performing booking.');
							})

				};

				$scope.doPayment = function() {
					rzp1.open();
				};

				$scope.doBooking = function() {
					var authKey = localStorage.getItem('accessToken');
					if(authKey == null){
						localStorage.setItem("previousurl",$location.$$url);
						$window.location.href = '#/login';
					}else{
						$scope.createSelectedSlotArray();
						var date = "";
						if(!commonService.isValidDate2($scope.bookingDetails.startDate)){
							date = commonService.convertDate2($scope.bookingDetails.startDate);
							date = date.replace(/['"]+/g, '');
						}
						var datajson = {
								"amountToBePaid" : $scope.bookingAmount,
								"authKey" : localStorage.getItem('accessToken'),
								"bookingAmount" : $scope.bookingAmount,
								"bookingSeatCount" : $scope.bookingDetails.units,
								"bookingType" : $location.search()["bookingType"],
								"discount" : 0,
								"endDate" : date,
								"endTime" : window.endTime,
								"promoCode" : "",
								"slotIds" : $scope.slotsSelectedArray,
								"spaceId" : spaceId,
								"startDate" : date,
								"startTime" : window.startTime,
								"paymentMode":$scope.bookingDetails.paymentMode
						};
						bookingService
						.doBooking(datajson)
						.then(
								function(responseData) {
									if (typeof (responseData.userBookings) != "undefined") {
										if (responseData.userBookings.length == 1) {
											if (responseData.userBookings[0].bookingStatus == 'BOOKED') {
												alert('Booking confirmed.');
												$window.location.href = '#/booking-list';
												//navigate to booking confirmation page.
											} else {
												if (typeof (responseData.userBookings[0].paymentGatewayDto) != "undefined") {
													//$scope.bookingResponsePending = responseData.userBookings[0].paymentGatewayDto;
													options.key = responseData.userBookings[0].paymentGatewayDto.key;
													options.amount = responseData.userBookings[0].paymentGatewayDto.amount;
													options.notes.order_id = responseData.userBookings[0].paymentGatewayDto.nwookOrderId;
													options.notes.booking_id = responseData.userBookings[0].paymentGatewayDto.bookingId;
													options.prefill.email=responseData.userBookings[0].paymentGatewayDto.email;
													options.prefill.name=responseData.userBookings[0].paymentGatewayDto.name;
													options.notes.booking_type=responseData.userBookings[0].paymentGatewayDto.bookingType;

													arr.amount = responseData.userBookings[0].paymentGatewayDto.amount;
													arr.authKey = localStorage
													.getItem('accessToken');
													arr.channelId = responseData.userBookings[0].paymentGatewayDto.channelId;
													arr.nwookOrderId = responseData.userBookings[0].paymentGatewayDto.nwookOrderId;
													arr.pgId = responseData.userBookings[0].paymentGatewayDto.pgId;
													arr.pgTransactionId = responseData.userBookings[0].paymentGatewayDto.pgTransactionId;
													arr.walletTransactionType = responseData.userBookings[0].paymentGatewayDto.walletTransactionType;
													arr.bookingId = responseData.userBookings[0].paymentGatewayDto.bookingId;
													rzp1 = new Razorpay(options);
													rzp1.open();
												}
											}
										}
									}
									$scope.bookingAmount = 0;
									console.log(responseData);
								},
								function(errorResponse) {
									console
									.error('Error while performing booking.'+errorResponse);
									alert(errorResponse.data.message);
									
								})
					}
				};
				
				$scope.getBookingDetails = function() {
					var authKey = localStorage.getItem('accessToken');
					if(authKey == null){
						localStorage.setItem("previousurl",$location.$$url);
						$window.location.href = '#/login';
					}else{
						var dataJson = {
								'bookingId' : $location.search()["bookingId"]
						}
						bookingService
						.getUserBooking(dataJson)
						.then(
								function(responseData) {
									if (responseData != undefined) {
										console
										.log(responseData);
										$scope.bookingList = responseData.userBookings;
									}
								},
								function(errorResponse) {
									console
									.error('User bookings could not be retireved.');
								})
					}
				};
				
				$scope.spaceIdNameData = {};
				
				$scope.getSpaceIdNameMap = function() {
					bookingService
					.getSpaceIdNameMap()
					.then(
							function(responseData) {
								if (responseData != undefined) {
									console
									.log(responseData);
									
									angular.forEach(responseData.message, function (value){
										$scope.spaceIdNameData[value.spaceId] = value.spaceName;
									});
									console.log($scope.spaceIdNameData);
								}
							},
							function(errorResponse) {
								console
								.error('User package bookings could not be retireved.');
							})
				};
				
				$scope.getSpaceIdNameMap();
					
				$scope.getPackageDetails = function() {
					var authKey = localStorage.getItem('accessToken');
					if(authKey == null){
						localStorage.setItem("previousurl",$location.$$url);
						$window.location.href = '#/login';
					}else{
						var dataJson = {
								'bookingId' : $location.search()["bookingId"]
						}
						bookingService
						.getUserPackageBookings(dataJson)
						.then(
								function(responseData) {
									if (responseData != undefined) {
										console
										.log(responseData);
										$scope.packageBookingList = responseData.userBookings;
									}
								},
								function(errorResponse) {
									console
									.error('User package bookings could not be retireved.');
								})
					}
				};
				
				$scope.getAllUserPackageBookings = function() {
					var authKey = localStorage.getItem('accessToken');
					if(authKey == null){
						localStorage.setItem("previousurl",$location.$$url);
						$window.location.href = '#/login';
					}else{
						bookingService
						.getAllUserPackageBookings()
						.then(
								function(responseData) {
									if (responseData != undefined) {
										console
										.log(responseData);
										$scope.packageBookingList = responseData.userBookings;
										 
										setTimeout(function(){var table = $('#packageBookingList').DataTable(
											{
												responsive: true,
											 "info":     false,
											 "bInfo":false,
											 "bLengthChange": false
											}
										)})
									}
								},
								function(errorResponse) {
									console
									.error('User package bookings could not be retireved.');
								})
					}
				};

				$scope.getAllUserBookings = function() {
					var authKey = localStorage.getItem('accessToken');
					if(authKey == null){
						localStorage.setItem("previousurl",$location.$$url);
						$window.location.href = '#/login';
					}else{
						bookingService
						.getAllUserBookings()
						.then(
								function(responseData) {
									if (responseData != undefined) {
										console
										.log(responseData);
										$scope.bookingList = responseData.userBookings;
										 
										setTimeout(function(){var table = $('#bookingList').DataTable(
											{
												responsive: true,
											 "info":     false,
											 "bInfo":false,
											 "bLengthChange": false
											}
										)})
									}
								},
								function(errorResponse) {
									console
									.error('User bookings could not be retireved.');
								})
					}
				};
				
				
				$scope.reloadBookingPage = function(){
					$window.location.reload();
				}

				$scope.cancelUserBooking = function(bookingId,bookingType,packageName) {
					var datajson = {
							"authKey" : "",
							"bookingId" : bookingId,
							"bookingType": bookingType,
							"packageName":packageName
					}
					bookingService
					.cancelUserBooking(datajson)
					.then(
							function(responseData) {
								if (responseData != undefined) {
									console
									.log(responseData);
									if(responseData.userBookings[0].bookingStatus == "CANCELLED"){
										alert('Booking has been canceled');
										$window.location.reload();
									}
								}
							},
							function(errorResponse) {
								console
								.error('User bookings cancellation failed.');
								if(errorResponse.data != undefined || errorResponse.data.message != undefined)
									alert(errorResponse.data.message);
							})
				};

				$scope.decreaseSeatCount = function () {
					if($scope.bookingDetails.units > 0){
						$scope.bookingDetails.units -= 1;
					}
					else{
						$scope.bookingDetails.units=0;
					}
					$scope.getBookingGridDetails();
				};
				$scope.increaseSeatCount = function () {
					if($scope.bookingDetails.units >= 0){
						$scope.bookingDetails.units += 1;
					}
					else{
						$scope.bookingDetails.units=0;
					}
					$scope.getBookingGridDetails();
				};
				$scope.decreaseCoffeeCount = function () {
					if($scope.bookingDetails.coffeeCount > 0){
						$scope.bookingDetails.coffeeCount -= 1;
					}
					else{
						$scope.bookingDetails.coffeeCount=0;
					}
				};
				$scope.increaseCoffeeCount = function () {
					if($scope.bookingDetails.coffeeCount >= 0){
						$scope.bookingDetails.coffeeCount += 1;
					}
					else{
						$scope.bookingDetails.coffeeCount=0;
					}
				};
				$scope.decreasePrintCount = function () {
					if($scope.bookingDetails.printCount > 0){
						$scope.bookingDetails.printCount -= 1;
					}
					else{
						$scope.bookingDetails.printCount=0;
					}
				};
				$scope.increasePrintCount = function () {
					if($scope.bookingDetails.printCount >= 0){
						$scope.bookingDetails.printCount += 1;
					}
					else{
						$scope.bookingDetails.printCount=0;
					}
				};

				$scope.checkoutPackage = function() {

					var authKey = localStorage.getItem('accessToken');
					if(authKey == null){
						localStorage.setItem("previousurl",$location.$$url);
						$window.location.href = '#/login';
					}else{
						$scope.packagetnc = {

						}

						packageId = $location.search()["packageId"];
						startDate = $location.search()["startDate"];
						var dataJson = {
								'packageId':packageId,
								'startDate':startDate
						};

						bookingService.getPackageCheckoutDetails(dataJson).then(
								function(responseData) {
									if(responseData != undefined){
										console.log(responseData);
										$scope.packagecheckoutdetails = {};
										if(responseData != undefined && responseData.message != undefined){
											console.log(responseData);
											$scope.packagecheckoutdetails = responseData.message;
										}
									}
								},
								function(errorResponse){
									console.error('Error while retrieving space filter details.');
								}
						)
					}

				};

				$scope.backTospaceDetail = function() {
					$window.location.href = '#/space?spaceId='+$location.search()["spaceId"]+'&bookingType='+$location.search()["bookingType"];
				};

				$scope.packageDetails = function(bookingId){
					var dataJson = {
							'bookingId':bookingId
					};
					bookingService.fetchPackageDetails(dataJson).then(
							function(responseData) {
								if(responseData != undefined){
									console.log(responseData);
									if(responseData.message != undefined){
										if(responseData.message.packageName != undefined)
											$scope.packageInfo = responseData.message;
										else
											$scope.packageInfo = {};
									}
								}
							},
							function(errorResponse){
								console.error('Error while retrieving space filter details.');
							}
					)
				}

				$scope.bookPackage = function(packageId){
					if($scope.packagetnc.checked == true){
						packageId = $location.search()["packageId"];
						startDate = $location.search()["startDate"];
						var dataJson = {
								'packageId':packageId,
								'startDate':startDate,
								'finalPaybleAmount':$scope.packagecheckoutdetails.finalPaybleAmount,
								'bookingType':$location.search()["bookingType"]
						};
						bookingService.bookPackage(dataJson).then(
								function(responseData) {
									if(responseData != undefined){
										console.log(responseData);
										if (typeof (responseData.userBookings) != "undefined") {
											if (responseData.userBookings.length == 1) {
												if (responseData.userBookings[0].bookingStatus == 'BOOKED') {
													alert('Booking confirmed.');
													$window.location.href = '#/package-list';
												} else {
													if (typeof (responseData.userBookings[0].paymentGatewayDto) != "undefined") {
														//$scope.bookingResponsePending = responseData.userBookings[0].paymentGatewayDto;
														options.key = responseData.userBookings[0].paymentGatewayDto.key;
														options.amount = responseData.userBookings[0].paymentGatewayDto.amount;
														options.notes.order_id = responseData.userBookings[0].paymentGatewayDto.nwookOrderId;
														options.notes.booking_id = responseData.userBookings[0].paymentGatewayDto.bookingId;
														options.prefill.email=responseData.userBookings[0].paymentGatewayDto.email;
														options.prefill.name=responseData.userBookings[0].paymentGatewayDto.name;
														options.notes.booking_type=responseData.userBookings[0].paymentGatewayDto.bookingType;

														arr.amount = responseData.userBookings[0].paymentGatewayDto.amount;
														arr.bookingType=responseData.userBookings[0].paymentGatewayDto.bookingType;
														arr.authKey = localStorage
														.getItem('accessToken');
														arr.channelId = responseData.userBookings[0].paymentGatewayDto.channelId;
														arr.nwookOrderId = responseData.userBookings[0].paymentGatewayDto.nwookOrderId;
														arr.pgId = responseData.userBookings[0].paymentGatewayDto.pgId;
														arr.pgTransactionId = responseData.userBookings[0].paymentGatewayDto.pgTransactionId;
														arr.walletTransactionType = responseData.userBookings[0].paymentGatewayDto.walletTransactionType;
														arr.bookingId = responseData.userBookings[0].paymentGatewayDto.bookingId;
														rzp1 = new Razorpay(options);
														rzp1.open();
													}
												}
											}
										}
										$scope.bookingAmount = 0;
										console.log(responseData);

									}
								},
								function(errorResponse){
									console.error('Error while retrieving space filter details.');
								}
						)
					}else{
						alert('Please accept terms and conditions.');
					}
				}
			} ]);