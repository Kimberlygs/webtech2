<?php

	if(!empty($_POST))
	{
		$file= fopen("emailAdres.txt","a+");
		
		fwrite($file, $_POST['email'] . ",");
		
		fclose($file);
	
	}
?>