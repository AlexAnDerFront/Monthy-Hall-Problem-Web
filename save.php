<?php
// use http request to POST Js Data to PHP variables
if(isset($_POST['jsWin' ]) && isset($_POST['jsLose'])) {
    $id = $_POST['id'];
    $jsWin= $_POST['jsWin'];
    $jsLose = $_POST['jsLose'];
    $jsNumSwitch = $_POST['jsNumSwitch'];
  }

echo "jsWin: ". $jsWin. " ";
echo "jsLose: ". $jsLose. " ";

$myfile = fopen("total-score.txt", "a");
fwrite($myfile, $jsWin . "-" . $jsLose . PHP_EOL);
fclose($myfile); 

// connect to database
$db = new SQLite3('mysqlitedb.db');

$db->exec('CREATE TABLE gameData (id TEXT, win INT, lose INT, numSwitch BOOLEAN)'); // erstellt Tabelle
$db->exec("INSERT INTO gameData (id, win, lose, numSwitch) VALUES ('$id', '$jsWin', '$jsLose', '$jsNumSwitch')");

$result = $db->query('SELECT * FROM gameData');
var_dump($result->fetchArray());
 ?>
