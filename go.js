const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};

app.use(express.static(path.join(__dirname, 'build'), options));

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
    .get('/CAPCHA/:num', (req, res) =>
    {
        res.sendFile(path.join(__dirname, 'build', 'CAPCHA', req.param('num')));
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
                                userID: -1,
                                user: null
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
                                res.json({state: "Successful", user: rows[0]});
                                req.session.signed =
                                    {
                                        signed: true,
                                        userID: id,
                                        user: rows[0]
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
                        userID: -1,
                        user: null
                    };
                req.session.save();
                break;
            case 'up':
                if (validate(req.query))
                {
                    let name = decodeURIComponent(req.query.name);
                    console.log(`SELECT * FROM users WHERE name LIKE "${name}"`);
                    dbDo(`SELECT * FROM users WHERE name LIKE "${name}"`, rows =>
                    {
                        if (rows[0])
                        {
                            res.json({state: "The same Username exists!"});
                        }
                        else
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
                                let [name, email, password, tel, address] =
                                    [req.query.name, req.query.email, req.query.password, req.query.phone, req.query.address]
                                        .map(i => decodeURIComponent(i));
                                console.log(`${id}, ${name}, ${email}, ${password}, ${tel}, ${address}`);
                                dbDo(`INSERT INTO users VALUES (${id}, "${name}", "${email}", "${password}", "${tel}", "${address}", 0)`, ()=>res.json({state: "Signed"}), () => res.json({state: "Error"}));

                            }, () => res.json({state: "Invalid"}));
                        }
                    }, () => res.json({state: "Error"}));

                }
                else
                {
                    res.json({state: "Invalid"});
                }
                break;
            case 'deposit':
                dbDo(`SELECT * FROM users WHERE userID="${req.query.userID}"`, rows =>
                {
                    if (rows[0])
                    {
                        dbDo(`UPDATE users SET balance = balance + ${req.query.deposit} WHERE userID=${req.query.userID}`, ()=>
                        {
                            res.json({state: "Successful", user: rows[0]});
                            console.log("Deposit" + req.query.deposit);
                        }, () => res.json({state: "Failed"}))
                    }
                    else
                    {
                        res.json({state: "Failed"});
                    }
                }, () => res.json({state: "Failed"}));
                break;
            case 'addToCart':
                dbDo('SELECT * FROM carts ORDER BY cartID DESC LIMIT 1', rows =>
                {
                    let id;
                    if (rows[0])
                    {
                        id = rows[0].cartID + 1;
                    }
                    else
                    {
                        id = 1;
                    }
                    let [userID, artworkID] =
                        [req.query.userID, req.query.artworkID]
                            .map(i => Number.parseInt(i));
                    console.log(`SELECT * FROM artworks WHERE artworkID=${artworkID} AND orderID!=NULL`);
                    dbDo(`SELECT * FROM artworks WHERE artworkID=${artworkID} AND orderID IS NOT NULL`, rows =>
                    {
                        if (rows[0])
                        {
                            res.json({state: "Has been bought!"});
                        }
                        else
                        {
                            dbDo(`SELECT * FROM carts WHERE artworkID=${artworkID} AND userID=${userID}`, rows =>
                            {
                                if (rows[0])
                                {
                                    res.json({state: "Has been added!"});
                                }
                                else
                                {
                                    console.log(`${id}, ${userID}, ${artworkID}`);
                                    dbDo(`INSERT INTO carts VALUES (${id}, ${userID}, ${artworkID})`, ()=>res.json({state: "Added"}), () => res.json({state: "Error"}));
                                }
                            }, () => res.json({state: "Error"}));
                        }
                    }, () => res.json({state: "Error"}));
                }, () => res.json({state: "Error"}));
                break;
            case 'cart':
                let userID = Number.parseInt(req.query.userID);
                if (userID)
                {
                    dbDo(`SELECT * FROM carts WHERE userID=${userID}`, rows =>
                    {
                        if (rows[0])
                        {
                            res.json({state: "", cart: rows});
                        }
                        else
                        {
                            res.json({state: "Nothing!", cart: null});
                        }
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
            case 'view':
                let id = Number.parseInt(req.query.id);
                dbDo(`SELECT view FROM artworks WHERE artworkID=${id} LIMIT 1`, (rows)=>
                {
                    let view = rows[0].view + 1;
                    dbDo(`UPDATE artworks SET view = ${view} WHERE artworkID=${id}`, ()=>
                    {
                        console.log("View updated");
                    })
                });
                dbDo(`SELECT * FROM artworks WHERE artworkID=${id} LIMIT 1`, rows => res.json(rows), () => res.json({title: "Nothing Found!"}));
                break;
            // Cart
            case 'id':
                let id2 = Number.parseInt(req.query.id);
                dbDo(`SELECT * FROM artworks WHERE artworkID=${id2} LIMIT 1`, rows => res.json(rows), () => res.json({title: "Nothing Found!"}));
                break;

            case 'own':
                let userID2 = Number.parseInt(req.query.userID);
                if (userID2)
                {
                    dbDo(`SELECT * FROM artworks WHERE ownerID=${userID2}`, rows =>
                    {
                        if (rows[0])
                        {
                            res.json(rows);
                        }
                        else
                        {
                            res.json(null);
                        }
                    }, () => res.json({state: "Error"}));
                }
                break;
            case 'order':
                let userID3 = Number.parseInt(req.query.userID);
                if (userID3)
                {
                    dbDo(`SELECT * FROM orders WHERE ownerID=${userID3}`, rows =>
                    {
                        let orders = rows;
                        if (rows[0])
                        {
                            let sum = 'sum';
                            rows.map(r => sum += `UNION SELECT * FROM artworks WHERE orderID=${r.orderID}`);
                            sum = sum.replace('sumUNION ', '');
                            dbDo(sum, rows =>
                            {
                                if (rows[0])
                                {
                                    orders.forEach(o =>
                                    {
                                        rows.forEach(r =>
                                        {
                                            if (r.orderID === o.orderID)
                                            {
                                                r.order = o;
                                            }
                                        })
                                    });
                                    res.json(rows);
                                }
                                else
                                {
                                    res.json(null);
                                }
                            });
                        }
                        else
                        {
                            res.json(null);
                        }
                    }, () => res.json({state: "Error"}));
                }
                break;
            case 'sold':
                let userID4 = Number.parseInt(req.query.userID);
                if (userID4)
                {
                    dbDo(`SELECT * FROM artworks WHERE ownerID=${userID4} AND orderID IS NOT NULL`, rows =>
                    {
                        if (rows[0])
                        {
                            let rs = rows;
                            let sum = 'sum';
                            rows.map(r => sum += `UNION SELECT * FROM orders WHERE orderID=${r.orderID}`);
                            sum = sum.replace('sumUNION ', '');
                            dbDo(sum, rows =>
                            {
                                if (rows[0])
                                {
                                    rows.forEach(o =>
                                    {
                                        rs.forEach(r =>
                                        {
                                            if (r.orderID === o.orderID)
                                            {
                                                r.order = o;
                                            }
                                        })
                                    });
                                    let sum = 'sum';
                                    rs.map(r => sum += `UNION SELECT * FROM users WHERE userID=${r.order.ownerID} `);
                                    sum = sum.replace('sumUNION ', '');
                                    dbDo(sum, rows =>
                                    {
                                        if (rows[0])
                                        {
                                            rows.forEach(b =>
                                            {
                                                rs.forEach(r =>
                                                {
                                                    if (r.order.ownerID === b.userID)
                                                    {
                                                        r.buyer = b;
                                                    }
                                                })
                                            });
                                            res.json(rs);
                                        }
                                        else
                                        {
                                            res.json(null);
                                        }
                                    });
                                }
                                else
                                {
                                    res.json(null);
                                }
                            });
                        }
                        else
                        {
                            res.json(null);
                        }
                    }, () => res.json({state: "Error"}));
                }
                break;
            case 'cart':
                let userID5 = Number.parseInt(req.query.userID);
                if (userID5)
                {
                    dbDo(`SELECT * FROM carts WHERE userID=${userID5}`, rows =>
                    {
                        let carts = rows;
                        if (rows[0])
                        {
                            let sum = 'sum';
                            rows.map(r => sum += `UNION SELECT * FROM artworks WHERE artworkID=${r.artworkID} `);
                            sum = sum.replace('sumUNION ', '');
                            dbDo(sum, rows =>
                            {
                                if (rows[0])
                                {
                                    carts.forEach(c =>
                                    {
                                        rows.forEach(r =>
                                        {
                                            if (r.artworkID === c.artworkID)
                                            {
                                                r.cart = c;
                                            }
                                        })
                                    });
                                    res.json(rows);
                                }
                                else
                                {
                                    res.json(null);
                                }
                            });
                        }
                        else
                        {
                            res.json(null);
                        }
                    }, () => res.json({state: "Error"}));
                }
                break;
            case 'deleteCart':
                let cartID = Number.parseInt(req.query.cartID);
                console.log(`!DELETE cart ${cartID}`);
                dbDo(`DELETE FROM carts WHERE cartID=${cartID}`, rows => {res.json(rows)});
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
function validate(query)
{
    try
    {
        let [validation2, validation3, validation4, validation5] =
            [
                query.password === query.rePassword,
                query.password.length >= 6,
                /[0-9]/.test(query.password),
                /[A-z]/.test(query.password)
            ];
        console.log(`${validation2};${validation3};${validation4};${validation5}`)
        return validation2 && validation3 && validation4 && validation5;
    }
    catch (e)
    {
        return false;
    }
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
            console.log(err);
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