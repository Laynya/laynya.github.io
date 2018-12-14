<?php
	$score=$_POST['score'];
	$user=$_POST['user'];
	$s_date=date( "Y/m/d-H:i", time());
	
	$text=$score.",".$user.",".$s_date.",\n";

	//log.txtにスコアを保存
	$fp = fopen("./record.txt", "a");
	fwrite($fp, $text);
	fclose($fp);
?>
