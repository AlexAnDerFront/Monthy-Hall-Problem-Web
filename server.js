const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function consoleLog(text) {
  console.log(text);
}

app.post('/updateData', (req, res) => {
  const { id, jsWins, jsLoses, jsNumSwitch, jsWS, jsLS, jsWnS, jsLnS } = req.body;

  consoleLog(jsWS);
  consoleLog(jsLS);
  consoleLog(jsWnS);
  consoleLog(jsLnS);

  const db = new sqlite3.Database('singleGames.db');

  db.run(`INSERT INTO gameData (id, wins, loses, numSwitch, WS, LS, WnS, LnS) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [id, jsWins, jsLoses, jsNumSwitch, jsWS, jsLS, jsWnS, jsLnS], 
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error inserting data');
      } else {
        res.send('Data inserted successfully');
      }
    }
  );

  db.close();
});

app.get('/getData', (req, res) => {
  const db = new sqlite3.Database('singleGames.db');

  const query = `
    SELECT
      COUNT(*) AS total_games,
      SUM(CASE WHEN WS = 1 AND numSwitch = 1 THEN 1 ELSE 0 END) AS WS,
      SUM(CASE WHEN LS = 1 AND numSwitch = 1 THEN 1 ELSE 0 END) AS LS,
      SUM(CASE WHEN WnS = 1 AND numSwitch = 0 THEN 1 ELSE 0 END) AS WnS,
      SUM(CASE WHEN LnS = 1 AND numSwitch = 0 THEN 1 ELSE 0 END) AS LnS,
      CAST(SUM(CASE WHEN WS = 1 AND numSwitch = 1 THEN 1 ELSE 0 END) AS FLOAT) /
        NULLIF(SUM(CASE WHEN (WS = 1 OR LS = 1) AND numSwitch = 1 THEN 1 ELSE 0 END), 0) AS WinrateSwitch,
      CAST(SUM(CASE WHEN WnS = 1 AND numSwitch = 0 THEN 1 ELSE 0 END) AS FLOAT) /
        NULLIF(SUM(CASE WHEN (WnS = 1 OR LnS = 1) AND numSwitch = 0 THEN 1 ELSE 0 END), 0) AS WinratenoSwitch
    FROM gameData
  `;

  db.get(query, (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching data');
    } else {
      res.json(row);

      fs.writeFile('data.json', JSON.stringify(row), (err) => {
        if (err) {
          consoleLog("Error creating JSON file");
        } else {
          consoleLog("JSON file created successfully");
        }
      });
    }
  });

  db.close();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});