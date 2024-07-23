<?php
// use http request to POST Js Data to PHP variables
if(isset($_POST['jsWins' ]) && isset($_POST['jsLoses'])) {
  $id = $_POST['id'];
  $jsWins = $_POST['jsWins'];
  $jsLoses = $_POST['jsLoses'];
  $jsNumSwitch = $_POST['jsNumSwitch'];
  $jsTotalGames = $_POST['jsTotalGames'];
  $jsWS = $_POST['jsWS'];
  $jsLS = $_POST['jsLS'];
  $jsWnS = $_POST['jsWnS'];
  $jsLnS = $_POST['jsLnS'];
  }
echo $jsTotalGames;
echo $jsWS;
echo $jsLS;
echo $jsWnS;
echo $jsLnS;
/* $totalGames = file_get_contents('total-games.txt');
$newTotal = $totalGames + 1;
file_put_contents('total-games.txt', $newTotal); */

// write to databse
$db1 = new SQLite3('singleGames.db');

$db1->exec('CREATE TABLE gameData (id TEXT, wins INT, loses INT, numSwitch INT, WS INT, LS INT, WnS INT, LnS INT)'); // erstellt Tabelle
$db1->exec("INSERT INTO gameData (id, wins, loses, numSwitch, WS, LS, WnS, LnS) VALUES ('$id', '$jsWins', '$jsLoses', '$jsNumSwitch', '$jsWS', '$jsLS', '$jsWnS', '$jsLnS')"); // schreibt in tabelle


 ?>
