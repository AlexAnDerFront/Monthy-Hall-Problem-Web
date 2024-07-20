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