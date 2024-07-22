<?php
// use http request to POST Js Data to PHP variables
if(isset($_POST['jsWins' ]) && isset($_POST['jsLoses'])) {
    $id = $_POST['id'];
    $jsWins= $_POST['jsWins'];
    $jsLoses = $_POST['jsLoses'];
    $jsNumSwitch = $_POST['jsNumSwitch'];
    $jsWS = $_POST['jsWS'];
    $jsLS = $_POST['jsLS'];
    $jsWnS = $_POST['jsWnS'];
    $jsLnS = $_POST['jsLnS'];
  }

/* $totalGames = file_get_contents('total-games.txt');
$newTotal = $totalGames + 1;
file_put_contents('total-games.txt', $newTotal); */

// write to databse
$db1 = new SQLite3('singleGames.db');

$db1->exec('CREATE TABLE gameData (id TEXT, wins INT, loses INT, numSwitch INT)'); // erstellt Tabelle
$db1->exec("INSERT INTO gameData (id, wins, loses, numSwitch) VALUES ('$id', '$jsWins', '$jsLoses', '$jsNumSwitch')"); // schreibt in tabelle

$db2 = new SQLite3('gameStats.db');
$db2->exec('CREATE TABLE gameStats (Total Games INT, WS INT, LS INT, WnS INT, LnS INT)'); // erstellt Tabelle

$result = $db2->query('SELECT Total Games, WS, LS, WnS, LnS FROM gameStats');
$colum = $result->fetch_assoc();
    
// Save the values into PHP variables
$totalGames = $colum["Total Games"] + 1;
$ws = $colum["WS"] + $jsWS;
$ls = $colum["LS"] + $jsLS;
$wns = $colum["WnS"] + $jsWnS;
$lns = $colum["LnS"] + $jsLnS;
$db2->exec("UPDATE gameStats (Total Games, WS, LS, WnS, LnS) VALUES ('$totalGames', '$ws', '$ls', '$wns', '$lns')"); // schreibt in tabelle

 ?>
