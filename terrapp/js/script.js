

navigator.geolocation.getCurrentPosition(success, error);
		

        function success(position)
        {

            var apiKey = 'a9c3db137a6029fb8ab4e0f70377c116';
            var url = 'https://api.forecast.io/forecast/';
            var lati = position.coords.latitude;
            var longi = position.coords.longitude;
            var data;

            $.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?", function(data) {

                    console.log(data);

			localStorage.setItem('weer',data.currently.temperature);
			var farenheit = localStorage.getItem('weer');
			var tussen = parseFloat(farenheit);
			var graden = (tussen - 32) * (5/9);
			localStorage.setItem('graden', graden);
			
		
              $('#weather').html(Math.round(graden) + "&deg;");
        
			  
				var iconWeather = data.currently.icon;
			  
				var skycons = new Skycons({"color":"white"} );
				skycons.add("icoontje",iconWeather);
				skycons.play();
			
				// variabele text voor het weer 
				localStorage.setItem('cloud',data.currently.cloudCover);
				localStorage.setItem('humidity',data.currently.humidity);
				var cloud = localStorage.getItem('cloud');
				var humidity = localStorage.getItem('humidity');
				
				if( 
					(graden > 20) && 
					(humidity < 0.10) && 
					(cloudcover < 0.10))
					{
				
					$('#variableText').text("een passie voor het web & apps? Kom dan met ons gezellig van het mooie weer genieten. Vergeet je zonnebril niet");
					$('.row').addClass("goedWeer");
					
				}else if((graden>20) && (cloudcover >0.50))
				{
					$('#variableText').text("Kom met ons van het warme weer genieten");
					$('body').addClass("middelmatigWeer");
						
				}else {
				
					$('#variableText').text("Nu is het niet het goede weer om een terrasje te doen");
					$('body').addClass("slechtWeer");
				}

            });
        }

        function error(err) 
        {
          console.warn('ERROR(' + err.code + '): ' + err.message);
          $("#warning").text("Het was ongemogelijk uw geolocatie te bepalen");
        };
		