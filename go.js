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
        console.log(req.query);
        switch (req.query.aim)
        {
            case 'hot':
                dbDo('SELECT * FROM artworks ORDER BY view DESC LIMIT 3', rows => res.json(rows), () => res.json({title: "Nothing Found!"}));
                break;
            case 'new':
                dbDo('SELECT * FROM artworks ORDER BY timeReleased DESC LIMIT 3', rows => res.json(rows), () => res.json({title: "Nothing Found!"}));
                break;
            case 'search':
                if (req.query.t || req.query.d || req.query.a)
                {
                    req.query.t = req.query.t === 'true';
                    req.query.d = req.query.d === 'true';
                    req.query.a = req.query.a === 'true';
                    req.query.p = Number.parseInt(req.query.p);
                    dbDo(`SELECT * FROM artworks WHERE 
                             ${(req.query.t) ? 'title LIKE "%' + req.query.s + '%"' : 'false'} OR 
                             ${(req.query.d) ? 'description LIKE "%' + req.query.s + '%"' : 'false'} OR 
                             ${(req.query.a) ? 'artist LIKE "%' + req.query.s + '%"' : 'false'}
                             ORDER BY ${(req.query.o)} DESC LIMIT 5 offset ${5 * (req.query.p - 1)}`, rows => res.json(rows),  () => res.json({title: "Nothing Found!"}));
                }
                else
                {
                    res.json({title: "Please choose at least one option!"})
                }
                break;
            case 'id':
                req.query.id = Number.parseInt(req.query.id);
                dbDo(`SELECT * FROM artworks WHERE artworkID=${req.query.id} LIMIT 1`, rows => res.json(rows), () => res.json({title: "Nothing Found!"}));
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

function dbDo(sql, callback, error = (err) => {throw err})
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
            error(err);
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
