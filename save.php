<?php

function consoleLog($text) {
  file_put_contents('/dev/stdout', $text . PHP_EOL);
}


// use http request to POST Js Data to PHP variables
if(isset($_POST['jsWins' ]) && isset($_POST['jsLoses'])) {
  $id = $_POST['id'];
  $jsWins = $_POST['jsWins'];
  $jsLoses = $_POST['jsLoses'];
  $jsNumSwitch = $_POST['jsNumSwitch'];
  $jsWS = $_POST['jsWS'];
  $jsLS = $_POST['jsLS'];
  $jsWnS = $_POST['jsWnS'];
  $jsLnS = $_POST['jsLnS'];
  }

  consoleLog($jsWS);
  consoleLog($jsLS);
  consoleLog($jsWnS);
  consoleLog($jsLnS);

// write to databse
$db1 = new SQLite3('singleGames.db');

$db1->exec("INSERT INTO gameData (id, wins, loses, numSwitch, WS, LS, WnS, LnS) VALUES ('$id', '$jsWins', '$jsLoses', '$jsNumSwitch', '$jsWS', '$jsLS', '$jsWnS', '$jsLnS')"); // schreibt in tabelle

// Path to your SQLite database file
$databasePath = 'singleGames.db';

try {
    // Create (connect to) SQLite database in the specified path
    $pdo = new PDO('sqlite:' . $databasePath);

    // Set error mode to exceptions
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Your query
    $query = "
    SELECT
        COUNT(*) AS total_games,
        SUM(CASE WHEN WS = 1 AND numSwitch = 1 THEN 1 ELSE 0 END) AS WS,
        SUM(CASE WHEN LS = 1 AND numSwitch = 1 THEN 1 ELSE 0 END) AS LS,
        SUM(CASE WHEN WnS = 1 AND numSwitch = 0 THEN 1 ELSE 0 END) AS WnS,
        SUM(CASE WHEN LnS = 1 AND numSwitch = 0 THEN 1 ELSE 0 END) AS LnS,
        -- Calculate WinrateSwitch
        CAST(SUM(CASE WHEN WS = 1 AND numSwitch = 1 THEN 1 ELSE 0 END) AS FLOAT) / 
        NULLIF(SUM(CASE WHEN (WS = 1 OR LS = 1) AND numSwitch = 1 THEN 1 ELSE 0 END), 0) AS WinrateSwitch,
        -- Calculate WinratenoSwitch
        CAST(SUM(CASE WHEN WnS = 1 AND numSwitch = 0 THEN 1 ELSE 0 END) AS FLOAT) / 
        NULLIF(SUM(CASE WHEN (WnS = 1 OR LnS = 1) AND numSwitch = 0 THEN 1 ELSE 0 END), 0) AS WinratenoSwitch
    FROM
        gameData;
    ";

    // Execute the query
    $stmt = $pdo->query($query);

    // Fetch the results
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($result);
    $jsonData = json_encode($result);
    $filePath = 'data.json';

    if (file_put_contents($filePath, $jsonData)) {
        consoleLog("JSON file created successfully");
  } else {
    consoleLog("Error creating JSON file");
  }

} catch (PDOException $e) {
    // Handle errors
    echo "Connection failed: " . $e->getMessage();
}
 ?>
