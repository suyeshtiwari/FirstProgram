angular.module('WalletControllerModule', []).controller(
		'walletController',
		[
			'$scope',
			'constant',
			'$http',
			'bookingService',
			'$window',
			'commonService',
			'$location',
			function($scope, constant, $http, bookingService, $window,
					commonService, $location) {
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

				var options = {
						"key" : "rzp_test_EwfhQMfVEAlpbL",
						"amount" : 0, // 2000 paise = INR 20
						"name" : "Merchant Name",
						"description" : "Purchase Description",
						/* "image" : "/your_logo.png", */
						"handler" : function(response) {
							console.log('Performing payment ...');
							arr.pgTransactionId = response.razorpay_payment_id;
							var url = constant.addmoneypaymentcaptureurl;
							$
							.ajax(
									{
										context: this,
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
										document.getElementById('refresh').click();
									})
									.fail(function() {
										document.getElementById('refresh').click();
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
							"booking_id" : ""
						},
						"theme" : {
							"color" : "#F37254"
						}
				};


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

				$scope.logout = function(){
					localStorage.removeItem('accessToken');
					localStorage.removeItem('previousurl');
					location.hash = "#/login";
				}

				$scope.doPayment = function() {
					rzp1.open();
				};

				$scope.getAddMoneyStatus = function() {
					var datajson = {
							"orderId" : options.notes.order_id,
							"bookingId" : options.notes.booking_id,
							"authKey" : localStorage.getItem('accessToken')
					};
					bookingService
					.getAddMoneyStatus(datajson)
					.then(
							function(responseData) {
								if (responseData.message != undefined && responseData.message.walletTransactionType != undefined) {
									alert(responseData.message.refundableCredit+' is successfuly added to wallet.');
								}else{
									alert(responseData.message.refundableCredit+' was not added to wallet. Please try again.');
								}
								console.log(responseData);
							},
							function(errorResponse) {
								console
								.error('Error while checking add money to wallet status.');
							})
							$scope.getWalletBalance();

				};


				$scope.walletBalance = 0;

				$scope.wallet = {

				}

				$scope.getWalletBalance = function() {
					var authKey = localStorage.getItem('accessToken');
					console.log("Access token : " + authKey);
					if(authKey == null){
						localStorage.setItem("previousurl",$location.$$url);
						$window.location.href = '#/login';
					}else{
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
					}
				};

				$scope.getWalletBalance();

				$scope.addBalance = function() {
					var date = "";
					var datajson = {
							"amount" : $scope.wallet.amount,
							"authKey" : localStorage.getItem('accessToken')
					};
					bookingService
					.addBalance(datajson)
					.then(
							function(responseData) {
								if (responseData.message != undefined && responseData.message.key != undefined) {
									options.key = responseData.message.key;
									options.amount = responseData.message.amount;
									options.notes.order_id = responseData.message.nwookOrderId;
									options.notes.booking_id = responseData.message.bookingId;
									options.prefill.email=responseData.message.email;
									options.prefill.name=responseData.message.name;

									arr.amount = responseData.message.amount;
									arr.authKey = localStorage.getItem('accessToken');
									arr.channelId = responseData.message.channelId;
									arr.nwookOrderId = responseData.message.nwookOrderId;
									arr.pgId = responseData.message.pgId;
									arr.walletTransactionType = responseData.message.walletTransactionType;
									arr.bookingId = responseData.message.bookingId;
									arr.pgTransactionId = responseData.message.pgTransactionId;
									rzp1 = new Razorpay(options);
									rzp1.open();
								}
								$scope.bookingAmount = 0;
								console.log(responseData);
							},
							function(errorResponse) {
								console
								.error('Error while performing booking.');
							})
				};

			} ]);