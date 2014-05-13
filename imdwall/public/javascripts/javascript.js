
$(document).ready(function()
{ 		



	var client = new Faye.Client('https://damp-springs-7512.herokuapp.com/faye'); 
		client.subscribe('/subscribe', function(message) { 
		
			var toBerichten = "<div id='message' class='vote'><h1>" 
							  + message.name + " asks:</h1><p class='message'>"
	                          + message.question  + "</p></div>";

	        
			 $("#leftSide").append(toBerichten);
			
		});

		//delete an item without database
		$('.delete').on("click",function(){

			var currentDelete = $(this).find(".delete");
			$(this).parent().slideUp();
			$(this).parent().remove();
			
			//alert("er is geklikt" + currentDelete);
			
		});
		// end delete

		$(".voteup").on("click",function()
		{
			    var current = $(this);
				var fontsize = $(this).find(".message").css("fontSize");
				fontsize  = parseInt(fontsize) + 2 + "px";
				current.find(".message").css("fontSize", fontsize );
			

		}); 

		$('#leftSide').on('click','.messagesid',function(){

			
			var id = $(this).text;
			$("p.messagesid").addClass('.Questioncss');


			var submit = $.ajax({
				type: "POST",
				url: "/deleteDate/" + id,
				dataType:"json",
				error: function(xhr){
        			alert("it did not work");
    			},

				success: function(response){
					
						alert("it worked");
						/*var currentDelete = $(this).find(".messagesid");
						$(this).parent().slideUp();
						$(this).parent().remove();*/
			
				//alert("er is geklikt" + currentDelete)
					
				}

		});

			
		});

			


	$("#submitQuestion").on("click",function(event){ 
		var question = $('#questionField').val(); 
		var name = $('#nameField').val();

		event.preventDefault();

		var submit = $.ajax({
				data: {name:name,question:question},
				type: "POST",
				url: "/insertData",
				dataType: "json",
				error: function(response){
        			alert("it did not work");
        			

    			},
				success: function(response){
					
				client.publish('/subscribe', {question : question, name : name});
				}


		});

	});

			 


});