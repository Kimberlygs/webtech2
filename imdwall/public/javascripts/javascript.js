
$(document).ready(function()
{ 

	//var mysql = require('mysql')
	

	var client = new Faye.Client('https://damp-springs-7512.herokuapp.com/faye'); 
		client.subscribe('/subscribe', function(message) { 
		
			var toBerichten = "<div id='message' class='Questioncss vote'><h1>" 
							  + message.name + " asks:</h1><p class='message'>"
	                          + message.question  + "</p></div>";

	        var toModerator = "<div id='message' class='Questioncss'><h1>" 
							  + message.name + " asks:</h1><p class='message'>"
	                          + message.question  + "</p><a href='#' class='delete'>Delete</a></div>";
	      
			 $("#leftSide").append(toBerichten);
			 $("#leftSideQuestion").append(toModerator);
			
		});

		$(".vote").on("click",function()
		{
			    var current = $(this);
			    var currentId = 0;
			    currentId +=1;
			    currentId++;
			    console.log(currentId);
			    console.log(current);
				var fontsize = $(this).find(".message").css("fontSize");
				fontsize  = parseInt(fontsize) + 2 + "px";
				current.find(".message").css("fontSize", fontsize );
			

		}); 

		$('#leftSide').on('click','.messagesid',function(){

			
			var id = $(this).innerText;

			var submit = $.ajax({
				type: "POST",
				url: "/deleteDate/" + id,
				dataType:"json",
				error: function(xhr){
        			alert("it did not work");
    			},

				success: function(response){
					if(JSON.stringify(response) == true){
						alert("it worked");
				}
			}

		});

			
		});

			/*var currentDelete = $(this).find(".delete");
			$(this).parent().slideUp();
			$(this).parent().remove();
			
			//alert("er is geklikt" + currentDelete)*/


	$("#submitQuestion").on("click",function(event){ 
		var question = $('#questionField').val(); 
		var name = $('#nameField').val();

		event.preventDefault();

		var submit = $.ajax({
				data: {name:name,question:question},
				type: "POST",
				url: "/insertDate",
				dataType: "json",
				error: function(response){
        			alert("it did not work");
    			},
				success: function(response){
					if(JSON.stringify(response) == true){
						client.publish('/subscribe', {question : question, name : name});
					}
				}


		});

	});

			 


});