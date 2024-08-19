import { readFile, stat } from 'fs/promises';   // imports fs module "read file" for reading files and "stat" for for gettinmg stats asynchronously
import sqlite3 from 'sqlite3';
import fs, { writeFile } from 'fs';
import http from 'http';

Bun.serve({                                      // creates a Bun server

  /** @param { Request } request */              // receives a request
  async fetch(request) {                         // handels incomming http requests     
    const url = new URL(request.url);            // creates a url object from the request

    if (url.pathname == '/' || url.pathname == '/index.php') {              // if the request is for the index.php file
      const file = await readFile('./index.php', { encoding: 'utf-8' });
      const hasher = new Bun.CryptoHasher("md5");
      hasher.update((new Date().getTime + Math.ceil(Math.random() * 100000)).toString());  // hasher is asignted a random integer like in index.php
      return new Response(file.replace("<?php echo md5(date('Y-m-d HH:ii:ss') . rand(0,100000))  ?>", hasher.digest("hex")), {  // new response object is returned with content type text/html        
        headers: {
          'content-type': 'text/html'
        }
      });
    }

    if (await stat('.' + url.pathname).catch(() => false)) {        // server checks if a file exists in the requested path useing stat 
      const extension = url.pathname.split('.').at(-1);             // gets the extension is extracted to determine the content type

      const map = {                                                   // maps extension to the content type
        'js': 'application/javascript',
        'css': 'text/css',
        'jpeg': 'image/jpeg',
      }

      console.log(`${request.method} ${url.pathname}`); // logs the request
      // saves data from http request in variables in server.js
      if (request.method === 'POST' && url.pathname === '/save.php') {
        // if the request is for the save.php file
        const formData = await request.formData();

        const id = formData.get('id');
        const jsWins = formData.get('jsWins');
        const jsLoses = formData.get('jsLoses');
        const jsNumSwitch = formData.get('jsNumSwitch');
        const jsWS = formData.get('jsWS');
        const jsLS = formData.get('jsLS');
        const jsWnS = formData.get('jsWnS');
        const jsLnS = formData.get('jsLnS');

        console.log({ id, jsWins, jsLoses, jsNumSwitch, jsWS, jsLS, jsWnS, jsLnS });

        const databasePath = 'singleGames.db';

        // Connect to the SQLite database
        let db = new sqlite3.Database(databasePath, (err) => {
          if (err) {
            console.error('Connection failed:', err.message);
          } else {
            console.log('Connected to the SQLite database.');
          }
        });
        // Insert data into the table
        db.run("INSERT INTO gameData (id, wins, loses, numSwitch, WS, LS, WnS, LnS) VALUES ($id, $jsWins, $jsLoses, $jsNumSwitch, $jsWS, $jsLS, $jsWnS, $jsLnS)", {
          $id: id,
          $jsWins: jsWins,
          $jsLoses: jsLoses,
          $jsNumSwitch: jsNumSwitch,
          $jsWS: jsWS,
          $jsLS: jsLS,
          $jsWnS: jsWnS,
          $jsLnS: jsLnS
        })
        
        const query = db.get(`
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
          gameData;`, (err, rows) => {
            writeFile('data.json', JSON.stringify(rows), (err) => {
              if (err) {
                console.error(err);
              }
            })
            
          })
        // Close the database connection 
        db.close((err) => {
          if (err) {
            console.error('Error closing the database:', err.message);
          } else {
            console.log('Database connection closed.');
          }
        });
        return new Response("Data received and processed", {
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      return new Response(await readFile('.' + url.pathname), {     // new response object is returned with the content type header
        headers: {
          'content-type': map[extension]
        }
      });
    }

    return new Response("Hello, World!");                           // default response
  }
})