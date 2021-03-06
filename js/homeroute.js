'use strict';

var mapaddress = "";


var application = angular.module('App', ['ui.router', 'ui.bootstrap', 'chart.js']);

	application.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    	 
        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
	        .state('login', {
	            url: '/login',
	            templateUrl: './views/login.html',
	            controller: 'logincontroller'
	        })
	        .state('/', {
	            url: '/',
	            templateUrl: './views/home.html'
	        })
	         .state('customerHome', {
	            url: '/customerHome',
	            templateUrl: './views/customerHomepage.html',
	            controller: 'customercontroller'
	        })
	         .state('logoutlandingpage', {
	            url: '/logoutlandingpage',
	            templateUrl: './views/logoutlandingpage.html',
	            controller: 'logoutlandingpagecontroller'
	        })
	         .state('logout', {
	            url: '/logout',
	            templateUrl: './views/logoutmodal.html'
	        })
	         .state('inquire', {
	            url: '/inquire',
	            templateUrl: './views/inquire.html',
	            controller: 'inquirecontroller'
	        })
	         .state('contact', {
	            url: '/contact',
	            templateUrl: './views/contact.html',
	            controller: 'contactcontroller'
	        })
	         .state('admin', {
	            url: '/admin',
	            templateUrl: './views/adminlogin.html',
	            controller: 'admincontroller'
	        })
	         .state('adminhome', {
	            url: '/adminhome',
	            templateUrl: './views/adminhomepage.html',
	            controller: 'adminhomecontroller'
	        })
	        .state('signup', {
	            url: '/signup',
	            templateUrl: './views/register.html',
	            controller: 'registercontroller'
	         })
	         .state('adminhostelryroute', {
	            url: '/adminhostelryroute',
	            templateUrl: './views/adminhostelry.html',
	            controller: 'adminhostelrycontroller' 
	         })
	         .state('usersadmin', {
	            url: '/usersadmin',
	            templateUrl: './views/adminusers.html',
	            controller: 'adminuserscontroller'
	         })
	         .state('hostelryuser', {
	            url: '/hostelryuser',
	            templateUrl: './views/hostelryuserlogin.html',
	            controller: 'hostelryusercontroller'
	         })
	         .state('hostelryuserhome', {
	            url: '/hostelryuserhome',
	            templateUrl: './views/hostelryuserhome.html',
	            controller: 'hostelryhomecontroller'
	         })
	         .state('userhostelry', {
	            url: '/userhostelry',
	            templateUrl: './views/userhostelry.html',
	            controller: 'userhostelrycontroller'
	         })
	         .state('adminreservations', {
	            url: '/adminreservations',
	            templateUrl: './views/adminreservation.html',
	            controller: 'adminreservationscontroller'
	         })
	         .state('adminrooms', {
	            url: '/adminrooms',
	            templateUrl: './views/adminroomspage.html',
	            controller: 'adminroomscontroller'
	         })
	         .state('compare', {
	            url: '/compare',
	            templateUrl: './views/compare.html',
	            controller: 'comparecontroller'
	         })
	         .state('hostelryprofile', {
	            url: '/hostelryprofile',
	            templateUrl: './views/hostelryprofile.html',
	            controller: 'hostelryprofilecontroller'
	         })
	         .state('hprint', {
	            url: '/hprint',
	            templateUrl: './views/hprint.html',
	            controller: 'hprintcontroller'
	         })
	         .state('cprint', {
	            url: '/cprint',
	            templateUrl: './views/cprint.html',
	            controller: 'userhostelrycontroller'
	         });

    }
]);

	application.controller('registercontroller', ['$scope', '$http', function($scope, $http) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
			});
				$scope.formData = {};
				$scope.userform = "";

	        	$scope.register = function() {
	        		$(".loading").fadeIn("slow");
	        		$http({
	        			method: 'POST',
	        			url: './services/loginsubmit.php',
	        			data: $scope.formData
	        		}).then(function(response) {
	        			console.log(response);
	        			if(response.data.empty == true) {
	        				$scope.userform = "Please fill the form.";
	        			} else if(response.data.emailError == true) {
	        				$scope.userform = "Invalid Email.";
	        			} else if(response.data.validation == true) {
	        				$scope.userform = "Username already exists.";	
	        			} else if(response.data.validateUsername == true) {
	        				$scope.userform = "Username must be more than 5 characters.";
	        			} else if(response.data.validateage == true) {
	        				$scope.userform = "Invalid age.";
	        			} else if(response.data.validatePassword == true) {
	        				$scope.userform = "Password must be more than 5 characters.";
	        			} else if(response.data.registerSuccess == false) {
	        				$scope.userform = "Registration Successful.";
	        				$scope.formData = {};
	        			} else if(response.data.registerSuccess == true) {
	        				$scope.userform = "Registration Failed";
	        			}
	        		});
	        	}
	        }]);

	application.controller('logincontroller', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope) {
		$scope.loginData = {};
		$scope.loginUser = "";
		$scope.login = function() {
			$http({
				method: 'POST',
				url: './services/loginservice.php',
				data: $scope.loginData
			}).then(function(response) {
				console.log(response);
				if(response.data.UsernameLogin == true) {
					$scope.loginUser = "Invalid username or password.";
				} else {	
					$location.path('/customerHome');		
				}
			});
		}
	}]);

	application.controller('customercontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$http({
				method: 'GET',
				url: './services/checkSession.php',
			}).then(function(response) {
				console.log(response);
				if(response.data.userSession == false) {
					$location.path('/login');
					$scope.loginUser = "Invalid username or password.";
				} else {
					$location.path('/customerHome');
				}
			});

			$scope.viewreservedrooms = function() {
				$http({
					method: 'GET',
					url: './services/viewreservedroomservice.php'
				}).then(function(response) {
					$scope.userviewreservedrooms = response.data;
					console.log("Reserved Rooms");
					console.log($scope.userviewreservedrooms);
				});
			}

			$scope.autoDeleteReservation = function() {
				$http.post("./services/autodeletereservationservice.php").then(function(response) {

				});
			}

			$scope.autoDeleteReservation();

			$scope.logoutfunction = function() {
				$http({
					method: 'GET',
					url: './services/logout.php'
				}).then(function(response) {
					if(response.data.logoutmessage == true) {
						$location.path('/logoutlandingpage');
					}
				});
			}

			$scope.userhostelryroute = function() {
				$location.path('/userhostelry');
			}

			
	}]);

	application.controller('homecontroller', ['$scope', '$http', function($scope, $http) {

	}]);

	application.controller('inquirecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {

	}]);

	application.controller('contactcontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {

	}]);

	application.controller('logoutlandingpagecontroller', ['$scope', '$http', '$location', '$route', function($scope, $route, $http, $location) {

	}]);

	application.controller('admincontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
			});
		$scope.loginData = {};
		$scope.loginUser = "";
		$scope.loginadmin = function() {
			$http({
				method: 'POST',
				url: './services/adminlogin.php',
				data: $scope.loginData
			}).then(function(response) {
				console.log(response);
				if(response.data.login == false) {
					$scope.loginUser = "Invalid username or password.";
				} else {	
					$location.path('/adminhome');		
				}
			});
		}
	}]);

	application.controller('adminhomecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
			});
		$http({
				method: 'GET',
				url: './services/adminhome.php',
			}).then(function(response) {
				console.log(response);
				if(response.data.adminsession == false) {
					$location.path('/admin');
					$scope.loginUser = "Invalid username or password.";
				} else {
					$location.path('/adminhome');
				}
			});

			$scope.autoDeleteReservation = function() {
				$http.post("./services/autodeletereservationservice.php").then(function(response) {

				});
			}
			$scope.autoDeleteReservation();

			$scope.adminlogout = function() {
				$http({
					method: 'GET',
					url: './services/adminlogout.php',
				}).then(function(response) {
					console.log(response);
					if(response.data.logoutmessage == true) {
						$location.path('/admin');
					}
				});
			}

			$scope.reservationlabel = [];
			$scope.reservationdata = [];
			$scope.resoption = {
				scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                };

			$http({
				method: 'GET',
				url: './services/reservationchart.php'
			}).then(function(response) {
				for(var i=0; i < response.data.length; i++) {
					$scope.reservationlabel.push(response.data[i].reservation_status);
					$scope.reservationdata.push(response.data[i].rescount);
				}
				console.log($scope.reservationdata);
			});

			$scope.hlabel = [];
			$scope.hcount = [];

			$http({
				method: 'GET',
				url: './services/accountcharts.php'
			}).then(function(response) {
				for(var i=0; i < response.data.length; i++) {
					$scope.hlabel.push(response.data[i].hostelry_name);
					$scope.hcount.push(response.data[i].hcount);
				}
				
			});

			$scope.rlabel = [];
			$scope.rdata = [];
			$scope.roption = {
				scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                };

			$http({
				method: 'GET',
				url: './services/roomschart.php'
			}).then(function(response) {
				for(var i=0; i < response.data.length; i++) {
					$scope.rlabel.push(response.data[i].hostelry_name);
					$scope.rdata.push(response.data[i].rcount);
				}
				
			});
	}]);

	application.controller('adminhostelrycontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
			$(document).ready(function() {
				$(".loading").fadeOut("slow");
			});
		$http({
				method: 'GET',
				url: './services/adminhome.php',
			}).then(function(response) {
				console.log(response);
				if(response.data.adminsession == false) {
					$location.path('/admin');
					$scope.loginUser = "Invalid username or password.";
				} else {
					$location.path('/adminhostelryroute');
				}
			});

			$scope.adminlogout = function() {
				$http({
					method: 'GET',
					url: './services/adminlogout.php',
				}).then(function(response) {
					console.log(response);
					if(response.data.logoutmessage == true) {
						$location.path('/admin');
					}
				});
			}

			$scope.adminhostelryform = {};
			$scope.adminhostelryresponse = "";
			$scope.hostelrytable = [];

			$scope.adminhostelryaddquery = function() {
				console.log($scope.adminhostelryform);
				$http({
					method: 'POST',
					url: './services/adminhostelryadd.php',
					data: $scope.adminhostelryform
				}).then(function(response) {
					console.log(response);
					if(response.data.emptyform == true) {
						$scope.adminhostelryresponse = "Please fill in all the fields.";
					} else if(response.data.validateusername == true) {
						$scope.adminhostelryresponse = "Username is already in use.";
					} else if(response.data.usernamelength == true) {
						$scope.adminhostelryresponse = "Username must be more than 5 characters";
					} else if(response.data.passwordlength == true) {
						$scope.adminhostelryresponse = "Password must be more than 5 characters.";
					} else if(response.data.querysuccess == true) {
						$scope.adminhostelryresponse = "Error";
					} else if(response.data.querysuccess == false) {
						$scope.hostelrytable.push({
							'hostelry_id': response.data.id,
							'hostelry_name': $scope.adminhostelryform.hostelryname,
							'hostelry_type': $scope.adminhostelryform.hostelrytype,
							'hostelry_description': $scope.adminhostelryform.hostelrydescription,
							'hostelry_address': $scope.adminhostelryform.address,
							'hostelry_username': $scope.adminhostelryform.hostelryusername,
							'hostelry_password': $scope.adminhostelryform.hostelrypassword
						}); 
						$scope.adminhostelryresponse = "Saved.";
						$scope.adminhostelryform = {};
					}
				});
			}

			

			$scope.adminhostelrytable = function() {
				$http({
					method: 'GET',
					url: './services/adminhostelrytable.php'
				}).then(function(response) {

					for(var i=0; i < response.data.length; i++) {
						$scope.hostelrytable.push(response.data[i]);
					}
 
					console.log($scope.hostelrytable);
				});
			}

			$scope.deletehostelrytable = function(hostelryid) {
				$http({
					method: 'POST',
					url: './services/adminhostelrytablefunction.php',
					data: {'hostelrytableid': hostelryid}
				}).then(function(response) {
					console.log(response);
					location.reload();	
				});
			}

			$scope.updateid = "";
			$scope.updatename = "";
			$scope.updatetype = "";
			$scope.updatedescription = "";
			$scope.updateaddress = "";
			$scope.updateusername = "";
			$scope.updatepassword = "";

			$scope.updatehostelry = function(hostelryid) {
				$scope.updateid = hostelryid;

				$http({
					method: 'POST',
					url: './services/hostelryupdateservice.php',
					data: {'hostelryidupdate': hostelryid}
				}).then(function(response) {
					console.log(response.data[0].hostelry_name);
					$scope.updatename = response.data[0].hostelry_name;
					$scope.updatetype = response.data[0].hostelry_type;
					$scope.updatedescription = response.data[0].hostelry_description;
					$scope.updateaddress = response.data[0].hostelry_address;
					$scope.updateusername = response.data[0].hostelry_username;
					$scope.updatepassword = response.data[0].hostelry_password;

					
				});
			}

			$scope.submitupdate = function() {
				$http({
					method: 'POST',
					url: './services/modalupdateservice.php',
					data: {'hostelryidmodal': $scope.updateid, 'hostelrynamemodal': $scope.updatename, 'hostelrytypemodal': $scope.updatetype, 'hostelrydescriptionmodal': $scope.updatedescription, 'hosaddress': $scope.updateaddress, 'hostelryusernamemodal': $scope.updateusername, 'hostelrypasswordmodal': $scope.updatepassword}
				}).then(function(response) {
					console.log(response);
					location.reload();
				});
			}

			$scope.adminhostelrytable();

	}]);

	application.controller('adminuserscontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
			});
		$http({
				method: 'GET',
				url: './services/adminhome.php',
			}).then(function(response) {
				console.log(response);
				if(response.data.adminsession == false) {
					$location.path('/admin');
					$scope.loginUser = "Invalid username or password.";
				} else {
					$location.path('/usersadmin');
				}
			});

			$scope.adminlogout = function() {
				$http({
					method: 'GET',
					url: './services/adminlogout.php',
				}).then(function(response) {
					console.log(response);
					if(response.data.logoutmessage == true) {
						$location.path('/admin');
					}
				});
			}

			$scope.usersadminupdateform = {};

			$scope.usersadminupdate = function(usersid) {

				$http({
					method: 'POST',
					url: './services/usersadminupdateservice.php',
					data: {'usersadminid': usersid}
				}).then(function(response) {
					$scope.usersadminupdateform = response.data[0];
					console.log($scope.usersadminupdateform);
				});
			}

			$scope.usersadmindelete = function(usersid) {
				$http({
					method: 'POST',
					url: './services/usersamindeleteservice.php',
					data: {'usersadminid': usersid}
				}).then(function(response) {
					location.reload();
				});

			}

			$scope.usersadminaccount = [];

			$scope.usersadmintable = function() {
				$http({
					method: 'GET',
					url: './services/usersadmintableservice.php',
				}).then(function(response) {

					
					for(var i=0; i < response.data.length; i++) {
						$scope.usersadminaccount.push(response.data[i]);
					}
					console.log($scope.usersadminaccount);
				});
			}

			$scope.usersadminmodalupdate = function() {
				$http({
					method: 'POST',
					url: './services/usersadminmodalupdateservice.php',
					data: $scope.usersadminupdateform
				}).then(function(response) {
					location.reload();
				});
			}

			$scope.adminadduserform = {};
			$scope.adminadduserformessage = "";
			$scope.adminadduserformessageshow = true;
			$scope.adminadduserformessagealert = "";

			$scope.adminadduser = function() {
				
						$http({
					method: 'POST',
					url: './services/adminaddduserservices.php',
					data: $scope.adminadduserform
				}).then(function(response) {
					
					if(response.data.usernameexist == true) {
						$scope.adminadduserformessage = "Username is already in use.";
						$scope.adminadduserformessageshow = false;
						$scope.adminadduserformessagealert = "alert-danger";
					} else if(response.data.usernamelength == true) {
						$scope.adminadduserformessage = "Username must be more than 5 characters";
						$scope.adminadduserformessageshow = false;
						$scope.adminadduserformessagealert = "alert-danger";
					} else if(response.data.passwordlength == true) {
						$scope.adminadduserformessage = "Password must be more than 5 characters";
						$scope.adminadduserformessageshow = false;
						$scope.adminadduserformessagealert = "alert-danger";
					} else if(response.data.emailcorrect == true) {
						$scope.adminadduserformessage = "Please enter a valid email address";
						$scope.adminadduserformessageshow = false;
						$scope.adminadduserformessagealert = "alert-danger";
					} else if(response.data.querysuccess == false) {
						console.log(response);
						$scope.adminadduserformessageshow = false;
						$scope.adminadduserformessagealert = "alert-success";
						$scope.adminadduserformessage = "Registration successful.";
						$scope.usersadminaccount.push({
							'customer_id': response.data.customer_id,
							'firstname': $scope.adminadduserform.firstname,
							'middlename': $scope.adminadduserform.middlename,
							'lastname': $scope.adminadduserform.lastname,
							'age': $scope.adminadduserform.age,
							'gender': $scope.adminadduserform.gender,
							'address': $scope.adminadduserform.address,
							'nationality': $scope.adminadduserform.nationality,
							'username': $scope.adminadduserform.username,							
							'customer_password': $scope.adminadduserform.password,
							'user_email': $scope.adminadduserform.email
						});
					}
				});
				
			
			}

			$scope.usersadmintable();



	}]);

	application.controller('hostelryusercontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		
		$scope.hostelryuserform = {};
		$scope.hostelryusersuccess = "";

		$scope.hostelryuserlogin = function() {
			$http({
				method: 'POST',
				url: './services/hostelryusersessionlogin.php',
				data: $scope.hostelryuserform
			}).then(function(response) {
				if(response.data.UsernameLogin == true) {
					$scope.hostelryusersuccess = "Invalid username or password.";
				} else {
					$location.path('/hostelryuserhome');
				}
			});
		}

	}]);

	application.controller('hostelryhomecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {

			$http({
				method: 'GET',
				url: './services/hostelryusersession.php',
			}).then(function(response) {
				console.log(response);

				if(response.data.userSession == false) {
					$location.path('/hostelryuser');
				} else {
					$location.path('/hostelryuserhome');
				}
			});
			
			$scope.autoDeleteReservation = function() {
				$http.post("./services/autodeletereservationservice.php").then(function(response) {

				});
			}

			$scope.autoDeleteReservation();

			$scope.hostelryusersroomtable = [];

			$http({
				method: 'GET',
				url: './services/hostelryuserstableservice.php'
			}).then(function(response) {
				for(var i=0; i < response.data.length; i++) {
					$scope.hostelryusersroomtable.push(response.data[i]);
				}
			});

			$scope.hostelryhomelogout = function() {
				$http({
					method: 'GET',
					url: './services/adminlogout.php',
				}).then(function(response) {
					console.log(response);
					if(response.data.logoutmessage == true) {
						$location.path('/hostelryuser');
					}
				});
			}

			$scope.hostelryuseraddroomform = {};
			$scope.hostelryuserformsuccess = "";

			$scope.hostelryuseraddroom = function() {
				$http({
					method: 'POST',
					url: './services/hostelryuseraddservice.php',
					data: $scope.hostelryuseraddroomform
				}).then(function(response) {
					if(response.data.hostelryuserroomexist == true) {
						$scope.hostelryuserformsuccess = "The room already exists.";
					} else {
						location.reload();
						console.log("THis is some data");
						console.log(response);
					}
				});
			}

			$scope.hostelryusersdelete = function(hostelryid) {
				$http({
					method: 'POST',
					url: './services/hostelryusersdeleteservices.php',
					data: {'id': hostelryid}
				}).then(function(response) {
					location.reload();
				});
			}

			$scope.hostelryuserstableshow = false;
			$scope.hostelryuserupdateshow = true;
			$scope.hostelryyusersupdateform = {};

			$scope.tableupdatebutton = function(roomid) {
				$scope.hostelryuserstableshow = true;
				$scope.hostelryuserupdateshow = false;
				$http({
					method: 'POST',
					url: './services/hostelryusersupdateroomsservice.php',
					data: {'id': roomid}
				}).then(function(response) {
					$scope.hostelryyusersupdateform = response.data[0];
					console.log($scope.hostelryyusersupdateform);
				});
			}

			$scope.hostelryusersupdateroomsform = function() {
				$http({
					method: 'POST',
					url: './services/updateroom.php',
					data: $scope.hostelryyusersupdateform
				}).then(function(response) {
					location.reload();
				});
			}

			$scope.closeupdate = function() {
				$scope.hostelryuserstableshow = false;
				$scope.hostelryuserupdateshow = true;
				$scope.hostelryyusersupdateform = {};
			}

			$scope.viewreservationform = {};

			$scope.viewreservationtable = function() {
				$http({
					method: 'GET',
					url: './services/viewreservationservice.php'
				}).then(function(response) {
					$scope.viewreservationform = response.data;
					console.log("Reserved Here");
					console.log($scope.viewreservationform);
				});
			}

			$scope.deletereservation = function(reservationid) {
				$http({
					method: 'POST',
					url: './services/deletereservationservices.php',
					data: {'id': reservationid}
				}).then(function(response) {
					location.reload();
				});
			}

			$scope.reservationcode = {};
			$scope.searchform = false;
			$scope.codeform = true;

			$scope.searchreservationcode = function() {
				$http({
					method: 'POST',
					url: './services/searchreservationcodeservice.php',
					data: $scope.reservationcode
				}).then(function(response) {
					$scope.reservationcode = response.data[0];
					$scope.searchform = true;
					$scope.codeform = false;
				});
			}

			$scope.closesearchreservationcode = function() {
				$scope.reservationcode = {};
				$scope.searchform = false;
				$scope.codeform = true;
			}

			$scope.confirmreservationcode = function() {
				$http({
					method: 'POST',
					url: './services/confirmreservationcodeservice.php',
					data: $scope.reservationcode
				}).then(function(response) {
					location.reload();
				});
			}

			$scope.rlabel = [];
			$scope.rdata = [];
			$scope.roption = {
				scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                };

			$http({
					method: 'GET',
					url: './services/reservestatus.php',
				}).then(function(response) {
					for(var i=0; i < response.data.length; i++) {
						$scope.rlabel.push(response.data[i].reservation_status);
						$scope.rdata.push(response.data[i].rescount);
					}
					console.log($scope.rlabel);
				});

			$scope.rslabel = [];
			$scope.rsdata = [];
			$scope.rsoption = {
				scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                };

			$http({
					method: 'GET',
					url: './services/roomreservationscount.php',
				}).then(function(response) {
					for(var i=0; i < response.data.length; i++) {
						$scope.rslabel.push(response.data[i].room_name);
						$scope.rsdata.push(response.data[i].rescount);
					}
				});



	}]);

	application.controller('userhostelrycontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {


		//Datepicker

		$scope.today = function() {
		    $scope.dt = new Date();
		  };
		  $scope.today();

		  $scope.clear = function() {
		    $scope.dt = null;
		  };

		  $scope.inlineOptions = {
		    customClass: getDayClass,
		    minDate: new Date(),
		    showWeeks: true
		  };

		  $scope.dateOptions = {
		    dateDisabled: disabled,
		    formatYear: 'yy',
		    maxDate: new Date(2020, 5, 22),
		    minDate: new Date(),
		    startingDay: 1
		  };

		  // Disable weekend selection
		  function disabled(data) {
		    var date = data.date,
		      mode = data.mode;
		    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
		  }

		  $scope.toggleMin = function() {
		    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
		    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
		  };

		  $scope.toggleMin();

		  $scope.open1 = function() {
		    $scope.popup1.opened = true;
		  };

		  $scope.open2 = function() {
		    $scope.popup2.opened = true;
		  };

		  $scope.setDate = function(year, month, day) {
		    $scope.dt = new Date(year, month, day);
		  };

		  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		  $scope.format = $scope.formats[0];
		  $scope.altInputFormats = ['M!/d!/yyyy'];

		  $scope.popup1 = {
		    opened: false
		  };

		  $scope.popup2 = {
		    opened: false
		  };

		  var tomorrow = new Date();
		  tomorrow.setDate(tomorrow.getDate() + 1);
		  var afterTomorrow = new Date();
		  afterTomorrow.setDate(tomorrow.getDate() + 1);
		  $scope.events = [
		    {
		      date: tomorrow,
		      status: 'full'
		    },
		    {
		      date: afterTomorrow,
		      status: 'partially'
		    }
		  ];

		  function getDayClass(data) {
		    var date = data.date,
		      mode = data.mode;
		    if (mode === 'day') {
		      var dayToCheck = new Date(date).setHours(0,0,0,0);

		      for (var i = 0; i < $scope.events.length; i++) {
		        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

		        if (dayToCheck === currentDay) {
		          return $scope.events[i].status;
		        }
		      }
		    }

		    return '';
		  }

		//End Datepicker
		

		$scope.pageSize = 10;
		$scope.currentPage = 1;

		$scope.pageSizer = 10;
		$scope.currentPager = 1;

		$scope.pageSizec = 10;
		$scope.currentPagec = 1;

		$http({
				method: 'GET',
				url: './services/checkSession.php',
			}).then(function(response) {
				console.log(response);
				if(response.data.userSession == false) {
					$location.path('/login');
					$scope.loginUser = "Invalid username or password.";
				} else {
					$location.path('/userhostelry');
				}
			});

			$scope.logoutfunction = function() {
				$http({
					method: 'GET',
					url: './services/logout.php'
				}).then(function(response) {
					if(response.data.logoutmessage == true) {
						$location.path('/logoutlandingpage');
					}
				});
			}

			$('#buttonprint').click(function(events) {
				$('.print').wordExport();
			});

			$scope.hostelryviewlist = {};

			$scope.hostelrylist = function() {
				$http({
					method: 'GET',
					url: './services/hostelrygetlistservice.php'
				}).then(function(response) {
					$scope.hostelryviewlist = response.data;
					console.log(response);
				});
			}

			// $scope.reserve = function() {
			// 	$http({
			// 		method: 'POST',
			// 		url: './services/userreserveservice.php',
			// 		data: 
			// 	}).then(function(response) {

			// 	});
			// }

			$scope.hostelryreservemodal = "";
			$scope.hostelryrooms = [];
			$scope.reservebuttoncancel = true;
			$scope.selectedroomshow = true;
			$scope.tableshow = false;
			$scope.roomnumber = "";


			$scope.hostelrygettableservice = function(hostelryid, hostelryname) {
				$scope.hostelryreservemodal = hostelryname;
				$scope.hostelryrooms = [];
				$http({
					method: 'POST',
					url: './services/hostelrygetroomsservice.php',
					data: {'hostelryroomsid': hostelryid}
				}).then(function(response) {
					for(var i=0; i < response.data.length; i++) {
						$scope.hostelryrooms.push(response.data[i]);
					}
				});
			}

			$scope.selecthostelryname = "";
			$scope.roomidreserve = "";

			$scope.roomidreserve = [];

			// $('.datepicker').datepicker({
			//     startDate: '-3d',
			//     dateFormat: 'mm-dd-yy'
			// }).val();

			$scope.selecthostelryroom = function(roomnid, roomname, roomnumber) {
				$scope.reservebuttoncancel = false;
				$scope.roomidreserve = roomnid;
				$scope.tableshow = true;
				$scope.selectedroomshow = false;
				$scope.selecthostelryname = roomname;
				$scope.roomnumber = roomnumber;

				$http({
						method: 'POST',
						url: './services/getroomphotos.php',
						data: {'roomid': roomnid}
					}).then(function(response) {
						$scope.roomphotosuser = response.data;
						console.log("qweqweqeqeqweqeqweqwe");
						console.log($scope.roomphotosuser);
					});
			}

			$scope.cancelbutton = function() {
				$scope.reservebuttoncancel = true;
				$scope.roomidreserve = "";
				$scope.roomnumber = "";
				$scope.tableshow = false;
				$scope.hostelryreservemodal = "";
				$scope.selectedroomshow = true;
			}

			$scope.reserveroom = function(reservationDate) {
				$http({
					method: 'POST',
					url: './services/userroomreservationservice.php',
					data: {'hostelryroomsid': $scope.roomidreserve, 'reservationDate': reservationDate} 
				}).then(function(response) {
					location.reload();
				});
			}

			$scope.userviewreservedrooms = {};

			$scope.viewreservedrooms = function() {
				$http({
					method: 'GET',
					url: './services/viewreservedroomservice.php'
				}).then(function(response) {
					$scope.userviewreservedrooms = response.data;
					console.log("Reserved Rooms");
					console.log($scope.userviewreservedrooms);
				});
			}

			$scope.cancenreserve = function(resid) {
				$http({
					method: 'POST',
					url: './services/cancelres.php',
					data: {'resid': resid}
				}).then(function(response) {
					location.reload();
				});	
			}

			$scope.viewrooms = function(hostelryid) {

        	$http({
					method: 'POST',
					url: './services/getaddressservice.php',
					data: {'hosid': hostelryid}
				}).then(function(response) {
					  $scope.addressmap = response.data[0].hostelry_address;
				});	
			}

			$scope.closerooms = function() {
				$scope.addressmap = "";
			}

			$scope.codelabel = "";
			$scope.roomnamelabel = "";

			$scope.code = function(codelabel, roomnamelabel) {
				$scope.codelabel = codelabel;
				$scope.roomnamelabel = roomnamelabel;
			}

			$('#printreservation').click(function(events) {
				$('.codeprint').wordExport();
			});

			// $('#reservationbutton').click(function(events) {
			// 	$('.reservationprint').wordExport();
			// });

			$scope.hostelrylist();
			
	}]);

application.filter('startFrom', function() {
	return function(data, start) {
		return data.slice(start);
	}
});

	application.controller('adminreservationscontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
			});
		$http({
				method: 'GET',
				url: './services/adminhome.php',
			}).then(function(response) {
				console.log(response);
				if(response.data.adminsession == false) {
					$location.path('/admin');
					$scope.loginUser = "Invalid username or password.";
				} else {
					$location.path('/adminreservations');
				}
			});

			$scope.adminlogout = function() {
				$http({
					method: 'GET',
					url: './services/adminlogout.php',
				}).then(function(response) {
					console.log(response);
					if(response.data.logoutmessage == true) {
						$location.path('/admin');
					}
				});
			}

			$scope.reservationtableform = [];

			$scope.reservationtable = function() {
				$http({
					method: 'GET',
					url: './services/adminreservationservice.php'
				}).then(function(response) {
					$scope.reservationtableform = response.data;
				});
			}

			$scope.deletereservationtable = function(reservationid) {
				$http({
					method: 'POST',
					url: './services/adminreservationdeleteservice.php',
					data: {'reservationid': reservationid}
				}).then(function(response) {
					location.reload();
				});
			}

			$scope.reservationupdatemodalhide = false;
			$scope.reservationchangeroomhide = true;
			$scope.selectedhostelry = true;
			$scope.reservationmodalid = "";
			$scope.reservationmodalroom = "";
			$scope.changeroomdisable = false;
			$scope.canceldisable = true;
			$scope.rroomschange = true;

			$scope.reservationmopal = function(reservationidzxc) {
				$http({
					method: 'POST',
					url: './services/reservationupdatemodalservice.php',
					data: {'reservationidzxc': reservationidzxc}
				}).then(function(response) {
					$scope.reservationmodalid = response.data[0].reservation_id;
					$scope.reservationmodalroom = response.data[0].room_name;
				});
			}

			$scope.changeroomreservation = [];
			$scope.changemodalsize = "modal-md";
			$scope.modalhostelrytable = false;
			$scope.modalroomtable = true;

			$scope.changeroombutton = function() {
				$scope.reservationupdatemodalhide = true;
				$scope.reservationchangeroomhide = false;
				
				$scope.changeroomdisable = true;
				$scope.canceldisable = false;
				$scope.changemodalsize = "modal-lg";
				$http({
					method: 'GET',
					url: './services/getallhostelryservice.php'
				}).then(function(response) {
					console.log(response);
					$scope.changeroomreservation = response.data;
				});
			}

			$scope.amdminroomchange = [];

			$scope.selectchangehostelry = function(hostelryselected) {
				$http({
					method: 'POST',
					url: './services/editroomselectedhostelry.php',
					data: {'hostelryselected': hostelryselected}
				}).then(function(response) {
					console.log(response);
					$scope.amdminroomchange = response.data;
				});
				$scope.reservationchangeroomhide = true;
				$scope.selectedhostelry = false;
			}

			$scope.rchangereservation = [];
			$scope.rchangereservationform = [];

			$scope.rselectroom = function(roomadinid, roomnumber, roomadminname, roomadmintpe, roomadmincapacity, roomadminrpice) {
				$scope.rchangereservation.push({
					'roomadinid': roomadinid,
					'roomnumber': roomnumber,
					'roomadminname': roomadminname,
					'roomadmintpe': roomadmintpe,
					'roomadmincapacity': roomadmincapacity,
					'roomadminrpice': roomadminrpice
				});
				$scope.rroomschange = false;
				$scope.modalhostelrytable = true;
				$scope.rchangereservationform = $scope.rchangereservation[0];
			}

			$scope.cancelbutton = function() {
				$scope.reservationchangeroomhide = true;
				$scope.changeroomdisable = false;
				$scope.canceldisable = true;
				$scope.reservationupdatemodalhide = false;
				$scope.reservationchangeroomhide = true;
				$scope.selectedhostelry = true;
				$scope.changeroomdisable = false;
				$scope.canceldisable = true;
				$scope.changemodalsize = "modal-md";
				$scope.rroomschange = true;
			}

			$scope.closeupdatemodal = function() {
				$scope.reservationmodalid = "";
				$scope.reservationmodalroom = "";
				$scope.reservationupdatemodalhide = false;
				$scope.reservationchangeroomhide = true;
				$scope.selectedhostelry = true;
				$scope.changeroomdisable = false;
				$scope.canceldisable = true;
				$scope.changemodalsize = "modal-md";
				$scope.rroomschange = true;
			}

			$('.datepicker').datepicker({
			    startDate: '-3d'
			});

			$scope.reservationtable();

	}]);

	application.controller('adminroomscontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
			});
		$http({
				method: 'GET',
				url: './services/adminhome.php',
			}).then(function(response) {
				console.log(response);
				if(response.data.adminsession == false) {
					$location.path('/admin');
					$scope.loginUser = "Invalid username or password.";
				} else {
					$location.path('/adminrooms');
				}
			});

			$scope.adminlogout = function() {
				$http({
					method: 'GET',
					url: './services/adminlogout.php',
				}).then(function(response) {
					console.log(response);
					if(response.data.logoutmessage == true) {
						$location.path('/admin');
					}
				});
			}

	}]);

	application.controller('comparecontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$(document).ready(function() {
				$(".loading").fadeOut("slow");
			});

		$scope.pageSize = 10;
		$scope.currentPage = 1;

		$scope.pageSizeq = 10;
		$scope.currentPageq = 1;

		$scope.pageSizeone = 10;
		$scope.currentPageone = 1;

		$scope.pageSizetwo = 10;
		$scope.currentPagetwo = 1;

		$http({
				method: 'GET',
				url: './services/checkSession.php',
			}).then(function(response) {
				console.log(response);
				if(response.data.userSession == false) {
					$location.path('/login');
					$scope.loginUser = "Invalid username or password.";
				} else {
					$location.path('/compare');
				}
			});

			$scope.logoutfunction = function() {
				$http({
					method: 'GET',
					url: './services/logout.php'
				}).then(function(response) {
					if(response.data.logoutmessage == true) {
						$location.path('/logoutlandingpage');
					}
				});
			}

			$scope.hostelryform = [];

			$scope.gethostelry = function() {
				$http({
					method: 'GET',
					url: './services/gethostelries.php'
				}).then(function(response) {
					$scope.hostelryform = response.data;
					console.log(response.data);
				});
			}

			$scope.viewreservedrooms = function() {
				$http({
					method: 'GET',
					url: './services/viewreservedroomservice.php'
				}).then(function(response) {
					$scope.userviewreservedrooms = response.data;
				});
			}

			$scope.roomoneform = [];

			$scope.roomone = function(id) {
				$http({
					method: 'POST',
					url: './services/gethostelryroomview.php',
					data: {'id': id}
				}).then(function(response) {
					$scope.roomoneform = response.data;
				});
			}

			$scope.closeone = function() {
				$scope.roomoneform = [];
			}

			$scope.roomtwoform = [];

			$scope.roomtwo = function(id) {
				$http({
					method: 'POST',
					url: './services/gethostelryroomview.php',
					data: {'id': id}
				}).then(function(response) {
					$scope.roomtwoform = response.data;
				});
			}

			$scope.closetwo = function() {
				$scope.roomtwoform = [];
			}

			$scope.selectoneform = {};

			$scope.selectone = function(type, desc, cap, price) {
				$scope.selectoneform = {
					'type': type,
					'desc': desc,
					'cap': cap,
					'price': price
				};
			}

			$scope.selecttwoform = {};

			$scope.selecttwo = function(type, desc, cap, price) {
				$scope.selecttwoform = {
					'type': type,
					'desc': desc,
					'cap': cap,
					'price': price
				};
			}

			$scope.gethostelry();

	}]);

	application.controller('hostelryprofilecontroller', ['$scope', '$http', '$location', 'fileUpload', function($scope, $http, $location, fileUpload) {

			$http({
				method: 'GET',
				url: './services/hostelryusersession.php',
			}).then(function(response) {
				console.log(response);

				if(response.data.userSession == false) {
					$location.path('/hostelryuser');
				} else {
					$location.path('/hostelryprofile');
				}
			});
			2
			$scope.roomtable = [];

			$http({
				method: 'GET',
				url: './services/tablerooms.php',
			}).then(function(response) {
				$scope.roomtable = response.data;
				console.log(response);
			});

			$scope.name = "sample";

			$scope.uploadFile = function(){
		        var file = $scope.myFile;
		        console.log('file is ' );
		        console.dir(file);

		        var uploadUrl = "./services/savephotohostelry.php";
		        var text = $scope.name;
		        fileUpload.uploadFileToUrl(file, uploadUrl, text);
		        
		    }

		    $scope.roomName = "";
		    $scope.roomphotos = [];

		    $scope.roomphotomodal = function(roomid) {
		    	$scope.roomName = roomid;
		    	$http({
					method: 'POST',
					url: './services/getroomphotos.php',
					data: {'roomid': roomid}
				}).then(function(response) {
					$scope.roomphotos = response.data;
				});
		    }

		    $scope.uploadroomphoto = function() {

		          var filer = $scope.myFileprof;
		        console.log('file is ' );
		        console.dir(filer);

		        var uploadUrlr = "./services/saveroomphoto.php";
		        var text = $scope.roomName;
		        fileUpload.uploadFileToUrl(filer, uploadUrlr, text);
		    }

	    $scope.photoform = {};

	    $scope.profilephoto = function() {
	    	$http.get("./services/viewprofilephoto.php").then(function(response) {
	    		$scope.photoform = response.data[0];
	    		console.log($scope.photoform);
	    	});
	    }

	    $scope.hostelryhomelogout = function() {
				$http({
					method: 'GET',
					url: './services/adminlogout.php',
				}).then(function(response) {
					console.log(response);
					if(response.data.logoutmessage == true) {
						$location.path('/hostelryuser');
					}
				});
			}

		$scope.infoform = {};

		$scope.hostelryinfo = function() {
			$http({
					method: 'GET',
					url: './services/hostelryinfoservice.php',
				}).then(function(response) {
					$scope.infoform = response.data[0];
				});
		}

		$scope.updateinfo = function() {
			$http({
					method: 'POST',
					url: './services/updateinfoservice.php',
					data: $scope.infoform
				}).then(function(response) {
					location.reload();
				});
		}

		$scope.deleteroomphotos = function(roomphotoid) {
			$http({
					method: 'POST',
					url: './services/deleteroomphoto.php',
					data: {'roomphotoid': roomphotoid}
				}).then(function(response) {
					location.reload();
				});
		}

		$scope.hostelryinfo();
		$scope.profilephoto();

	}]);

	application.directive('fileModel', ['$parse', function ($parse) {
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
}]);

application.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, roomid){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('roomid', roomid);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         }).then(function(response) {
         	console.log(response);
         	location.reload();
         });
     };
 }]);



	application.controller('hprintcontroller', ['$scope', '$http', '$location', function($scope, $http, $location) {

			$http({
				method: 'GET',
				url: './services/hostelryusersession.php',
			}).then(function(response) {
				console.log(response);

				if(response.data.userSession == false) {
					$location.path('/hostelryuser');
				} else {
					$location.path('/hprint');
				}
			});

			$scope.hostelryhomelogout = function() {
				$http({
					method: 'GET',
					url: './services/adminlogout.php',
				}).then(function(response) {
					console.log(response);
					if(response.data.logoutmessage == true) {
						$location.path('/hostelryuser');
					}
				});
			}

			$scope.backHome = function() {
				$location.path('/hostelryuserhome');
			}

	}]);

