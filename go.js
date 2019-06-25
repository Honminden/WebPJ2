const express = require('express');
const path = require('path');
const app = express();

app
    .use(express.static(path.join(__dirname, 'build')))
    .get('/img/:fileName', (req, res) =>
    {
        res.sendFile(path.join(__dirname, 'build', 'img', req.param('fileName')));
    })
    .get('/artworks', (req, res) =>
    {
        switch (req.query.aim)
        {
            case 'hot':
                dbDo('SELECT * FROM artworks ORDER BY view DESC LIMIT 3', rows => res.json(rows));
                break;
            case 'new':
                dbDo('SELECT * FROM artworks ORDER BY timeReleased DESC LIMIT 3', rows => res.json(rows));
                break;
            default:

        }
    })
    .get('/*', (req, res) =>
    {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
    .listen(1919);

console.log("serving in :1919");

// database
const sqlite3 = require('sqlite3').verbose();

function dbDo(sql, callback)
{
    let db = new sqlite3.Database('./webpj2.db', (err) =>
    {
        if (err)
        {
            return console.error(err.message);
        }
        console.log('connect to sqlite3 db');
    });

    db.all(sql, [], (err, rows) =>
    {
        if (err)
        {
            throw err;
        }
        callback(rows);
        console.log('sql executed');
    });

    db.close((err) =>
    {
        if (err)
        {
            return console.error(err.message);
        }
        console.log('close sqlite3 db');
    });
}
