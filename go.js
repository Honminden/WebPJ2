const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'build')));

app.use(cookieParser());
app.use(session(
    {
        secret: "114514senpai",
        cookie: {},
        resave: false,
        saveUninitialized: true
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app
    .get('/img/:fileName', (req, res) =>
    {
        res.sendFile(path.join(__dirname, 'build', 'img', req.param('fileName')));
    })
    .get('/sign', (req, res) =>
    {
        console.log(req.query);
        switch (req.query.aim)
        {
            case 'check':
                req.session.reload(err =>
                {
                    if (!req.session.signed)
                    {
                        req.session.signed =
                            {
                                signed: false,
                                userID: -1
                            };
                    }
                    if (!err)
                    {
                        res.json(req.session.signed)
                    }
                });
                break;
            case 'in':
                dbDo(`SELECT * FROM users WHERE name="${req.query.name}"`, rows =>
                {
                    if (rows[0])
                    {
                        let id = rows[0].userID;
                        dbDo(`SELECT * FROM users WHERE password="${req.query.password}" AND userID=${id}`, rows =>
                        {
                            if (rows[0])
                            {
                                res.json({state: "Successful"});
                                req.session.signed =
                                    {
                                        signed: true,
                                        userID: id
                                    };
                                req.session.save();
                            }
                            else
                            {
                                res.json({state: "Failed"});
                            }
                        },  () => res.json({state: "Failed"}));
                    }
                    else
                    {
                        res.json({state: "Failed"});
                    }
                }, () => res.json({state: "Failed"}));
                break;
            case 'out':
                req.session.signed =
                    {
                        signed: false,
                        userID: -1
                    };
                req.session.save();
                break;
            default:
        }
    })
    .post('/users', (req, res) =>
    {
        console.log(req.body);
        switch (req.body.aim)
        {
            case 'new':
                if (validate(req.body))
                {
                    dbDo('SELECT * FROM users ORDER BY userID DESC LIMIT 1', rows =>
                    {
                        let id;
                        if (rows[0])
                        {
                            id = rows[0].userID + 1;
                        }
                        else
                        {
                            id = 1;
                        }
                        let name = req.body.name;
                        let email = req.body.email;
                        let password = req.body.password;
                        let tel = req.body.phone;
                        let address = req.body.address;
                        console.log(`${id}, ${name}, ${email}, ${password}, ${tel}, ${address}`);
                        dbDo(`INSERT INTO users VALUES (${id}, ${name}, ${email}, ${password}, ${tel}, ${address}, 0)`, ()=>res.json({state: "Signed"}), () => res.json({state: "Error"}));

                    }, () => res.json({state: "Error"}));
                }
                break;
            default:
        }
    })
    .get('/artworks', (req, res) =>
    {
        console.log(req.query);
        switch (req.query.aim)
        {
            // Home
            case 'hot':
                dbDo('SELECT * FROM artworks ORDER BY view DESC LIMIT 3', rows => res.json(rows), () => res.json({title: "Nothing Found!"}));
                break;
            case 'new':
                dbDo('SELECT * FROM artworks ORDER BY timeReleased DESC LIMIT 3', rows => res.json(rows), () => res.json({title: "Nothing Found!"}));
                break;
            // Search
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
            // Item
            case 'id':
                req.query.id = Number.parseInt(req.query.id);
                dbDo(`SELECT view FROM artworks WHERE artworkID=${req.query.id} LIMIT 1`, (rows)=>
                {
                    let view = rows[0].view + 1;
                    dbDo(`UPDATE artworks SET view = ${view} WHERE artworkID=${req.query.id}`, ()=>
                    {
                        console.log("View updated");
                    })
                });
                dbDo(`SELECT * FROM artworks WHERE artworkID=${req.query.id} LIMIT 1`, rows => res.json(rows), () => res.json({title: "Nothing Found!"}));
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

//session
function validate(body)
{
    return true;
}

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
