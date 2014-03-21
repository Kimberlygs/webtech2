<?php

	include_once("include_files.php");


?><!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Terr'Appke</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
	<link href="css/style.css" rel="stylesheet" type="text/css">
	<link href='http://fonts.googleapis.com/css?family=Lato:100,300,400,900,100italic,300italic,400italic' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'>
	
</head>

<body>
	
	<div class="row">
  <div class="col-md-8">
  <h1 id="variableText"></h1>
	<p class="tekst">Ga je binnenkort verder studeren en wil jij net als ons niets liever doen dan knappe websites, mobile apps en webapplicaties bouwen? </p>
	<p class="tekst">Dan ben jij een perfecte kandidaat voor onze opleiding <u>Interactive Multimedia Design</u>. </p>
	<p class="tekst">Kom mee een terraske doen aan onze <u>Creative Gym</u> en neem meteen een kijkje in onze opleiding aan de Thomas More hogeschool in Mechelen</p>
	<p class="tekst">Laat je email adres achter en we mailen de exacte datum, locatie en tijdstip naar je door.</p>
  
  </div>
  <div class="col-md-4">
  <canvas id="icoontje">
  </canvas>
    <div id="weather">

	</div>
	
	<div id="overzicht">
	</div>
	<form id="SchrijfIn" action="" method="post">
	<input type="email" placeholder="je@emailadres.com" name="email">
	<input type="submit" value="Inschrijven" name="inschrijven" class="btn btn-default">
	
	</form>
  
  </div>
	</div>
</body>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script src="js/script.js"></script>
		<script src="js/skycons.js"></script>

</html>