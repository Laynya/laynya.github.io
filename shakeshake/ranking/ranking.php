<?php
	// CSV ファイルを読み込み、$data配列に格納
	$handle = fopen("./record.txt", "r");
	while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
		$data[] = array( 'score'=>$row[0] ,'user'=>$row[1], 's_date'=>$row[2] );
	}
	fclose($handle);

	$n = 0;

	// 列方向の配列を得る
	foreach ($data as $key => $row) {
		$score[$key]   = $row['score'];
		$user[$key] = $row['user'];
		$s_date[$key] = $row['s_date'];
	}

	// データを スコアの昇順にソートする
	array_multisort($score, SORT_DESC, $user, SORT_DESC, $s_date, SORT_DESC, $data);

?>

<html>
	<head>
	</head>
	<body>	
	<table border="3">
	<thead>
	<tr><th>順位</th><th>スコア</th><th>名前</th><th>日時</th></tr>
	<thead>
	<tbody>
	<?php foreach($data as $row): ?>
		<tr>
		<?php	$n++;
                        echo "<td>", $n, "</td>";
			foreach($row as $cel):
		?>
			<td><?= $cel ?></td>
		<?php endforeach; ?>
		</tr>
	<?php endforeach; ?>
	</tbody>
	</table>
	</body>
</html>
