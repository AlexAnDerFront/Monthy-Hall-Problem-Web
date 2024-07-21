<?php

if(isset($_POST['jsWin' ]) && isset($_POST['jsLose'])) {
    $jsWin= $_POST['jsWin'];
    $jsLose = $_POST['jsLose'];
  }

echo "jsWin: ". $jsWin. " ";
echo "jsLose: ". $jsLose. " ";

$myfile = fopen("total-score.txt", "a");
fwrite($myfile, $jsWin . "-" . $jsLose . PHP_EOL);
fclose($myfile); 


$db = new SQLite3('mysqlitedb.db');

$db->exec('CREATE TABLE gameData (win INT, lose INT)'); // erstellt Tabelle
$db->exec("INSERT INTO gameData (win) VALUES ('" . $jsWin . "')");
$db->exec("INSERT INTO gameData (lose) VALUES ('" . $jsLose . "')");

$result = $db->query('SELECT * FROM gameData');
var_dump($result->fetchArray());
 ?>
