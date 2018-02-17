angular.module(
        'CommonServiceModule',
        []
    )
    .factory(
    'commonService', ['$http', '$q', 'constant', function($http, $q, constant){
        return {
        	
//        	public static SimpleDateFormat SQL_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
//        	public static SimpleDateFormat SQL_TIMESTAMP_FORMAT = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
//        	public static SimpleDateFormat FACEBOOK_DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");            
        	
        	//Check valid date format - dd/MM/yyyy , dd-MM-yyyy, MM/dd/yyyy, mm-dd-yyyy
        	isValidDate: function (date){
				var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);
			    if (matches == null) 
			    	return false;
			    else
			    	return true;
			},
			
			//check valid date format - yyyy-MM-dd, yyyy-dd-MM, yyyy/MM/dd, yyyy/dd/MM
			isValidDate1: function (date){
				var matches = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/.exec(date);
			    if (matches == null) 
			    	return false;
			    else
			    	return true;
			},
			
			//YYYY-MM-DD
			getFormattedDate: function (dateTime){
				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() +1
				var day = dateTime.getDate();
				if(month < 10){
					month = "0"+month;
				}
				if(day < 10){
					day = "0"+day;
				}
			    	return month+"/"+day+"/"+year;
			},
			
			//check valid date format - yyyy-MM-dd, yyyy-dd-MM, yyyy/MM/dd, yyyy/dd/MM
			isValidDate2: function (date){
				var matches = /^(\d{4})[-](\d{1,2})[-](\d{1,2})$/.exec(date);
			    if (matches == null) 
			    	return false;
			    else
			    	return true;
			},
        	
        	//Convert date from dd/MM/yyyy to yyyy-MM-dd format
        	convertDate1: function(date){ //date give format - dd/MM/yyyy
            	var arr = date.split("/");
            	if(arr[0].length == 1){
            		arr[0] = '0'+arr[0];
            	}
            	var formatDate = arr[2] + "-" + arr[0] + "-" + arr[1];
            	return formatDate;
            },
            
          //Convert date from dd MMM yyyy to yyyy-MM-dd to  format
            convertDate2: function(date) {
				var arr = date.split(" ");
				var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				for(var j=0;j<months.length;j++){
				    if(arr[1]==months[j]){
				    	arr[1]=months.indexOf(months[j])+1;
				     }                      
				} 
				if(arr[1]<10){
					arr[1]='0'+arr[1];
				}                        
				var formatDate = arr[2] + "-" + arr[1] + "-" + arr[0];
				return formatDate;
            },
            
            //Convert data to facebook format dd/MM/yyyy for DOB on profile page.
            convertDate3: function(date) {
				var arr = date.split(" ");
				var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				for(var j=0;j<months.length;j++){
				    if(arr[1]==months[j]){
				    	arr[1]=months.indexOf(months[j])+1;
				     }                      
				} 
				if(arr[1]<10){
					arr[1]='0'+date[1];
				}                        
				var formatDate = arr[0] + "/" + arr[1] + "/" + arr[2];
				return formatDate;
            },
            
            //Convert date from dd/mm/yyyy to dd MMM yyyy format
            convertDate4: function (input) {
			    var pattern = /(.*?)\/(.*?)\/(.*?)$/;
			    var result = input.replace(pattern,function(match,p1,p2,p3){
			    	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			    	return (p2<10?"0"+p2:p2) + " " + months[(p1-1)] + " " + p3;
			    });
			    return result;
			}
        
          }
    	}
    ]
);