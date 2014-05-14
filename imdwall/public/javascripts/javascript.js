
$(document).ready(function()
{ 		

	var currentVoteUp = 0;
	
	var client = new Faye.Client('https://damp-springs-7512.herokuapp.com/faye'); 
		client.subscribe('/subscribe', function(message) { 
		
			var toBerichten = "<div id='message' class='slideInDown'><h1>" 
							  + message.name + " asks:</h1><p class='message'>"
	                          + message.question  + "</p><p class='voteup glyphicon glyphicon-chevron-up'>Vote up</p><p class='upvotes'></p>"
	                          + "<p class='votedown glyphicon glyphicon-chevron-down'>voteDown</p>"
	                          +"<p id='downvotes'></p><p class='delete glyphicon glyphicon-remove'>delete</p></div>";
				
						
	        
			 $("#leftSide").append(toBerichten);
			
		});

		//delete an item without database
		/*$('.delete').on("click",function(){

			var currentDelete = $(this).find(".delete");
			$(this).parent().slideUp();
			$(this).parent().remove();
			
			//alert("er is geklikt" + currentDelete);
			
		});*/
		// end delete

		$(".voteup").on("click",function()
		{
			    var current = $(this).find('.voteup');
				var currentmessageVote = $(this).next("#votes");
			    currentVoteUp++;
			    

			    currentmessageVote.html(currentVoteUp);


		}); 

		$(".votedown").on("click",function()
		{
			    
			    var current = $(this).find('.votedown');
				var currentmessageVote = $(this).next("#votes");
				currentVoteUp--;
			    currentmessageVote.html(currentVoteUp);

		}); 


		$('#leftSide').on('click','.delete',function(){

			
			var id = $(this).attr('data-delete');
			$("p.messagesid").addClass('.Questioncss');
			
			
			var submit = $.ajax({
				type: "POST",
				url: "/deleteDate/" + id,
				dataType:"json",
				error: function(xhr){
        			alert("it did not work");
    			},

				success: function(response){
					
						var deletemessage = $(this).parent('#messages');
						alert("it worked");
						deletemessage.parent().slideUp();
						deletemessage.parent().remove();	
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