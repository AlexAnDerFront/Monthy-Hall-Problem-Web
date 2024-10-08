<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="goat.jpeg">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script defer src="script.js"></script>
  <title>Monthy Hall Problem</title>
  <meta name="game-id" class="game-id" content="<?php echo md5(date('Y-m-d HH:ii:ss') . rand(0,100000))  ?>" >
</head>

<body>
  <h1>Chose the right door to win!</h1>
  <h1 id="wins"></h1>
  <h1 id="loses"></h1>

  <button id="door1">Door 1</button>
  <button id="door2">Door 2</button>
  <button id="door3">Door 3</button>
  <div id="dialog1" class="dialog">
    <div class="dialog-content">
      <p>Here is a Goat, do you want to reconsider your choice?</p>
      <button class="dialogButton"> close </button>
    </div>
  </div>
  <div id="dialog2" class="dialog">
    <div class="dialog-content">
      <p>You won a Brand New Car!</p>
      <button class="dialogButton" id="restart1" onclick="restartGame()">restart</button>
    </div>
  </div>
  <div id="dialog3" class="dialog">
    <div class="dialog-content">
      <p>You Lost :-C. You won a goat tough :P </p>
      <button class="dialogButton" onclick="restartGame()">restart</button>
    </div>
  </div>
<br>
<a href="stats1.php" >Distribution of Games Stats</a>
<br>
<a href="stats2.php" >Winrates</a>

</body>

</html>