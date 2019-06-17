import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import User from './User';
import NotFound from './NotFound';
import Tools from "./js/function/Tools";
import * as serviceWorker from './serviceWorker';

export const [home, user, cart, collection, help, search, notFound] =
[
    {
        key: 'home',
        App: <Home />,
        href: '/',
        innerText: "home",
        step: "home",
        subtitle: " - Home"
    },
    {
        key: 'user',
        App: <User />,
        href: '/user',
        innerText: "user",
        step: "user",
        subtitle: " - User"
    },
    {
        key: 'cart',
        App: <NotFound />,
        href: '/cart',
        innerText: "cart",
        step: "cart",
        subtitle: " - Cart"
    },
    {
        key: 'collection',
        App: <NotFound />,
        href: '/collection',
        innerText: "collection",
        step: "collection",
        subtitle: " - Collection"
    },
    {
        key: 'help',
        App: <NotFound />,
        href: '/help',
        innerText: "help",
        step: "help",
        subtitle: " - Help"
    },
    {
        key: 'search',
        App: <NotFound />,
        href: '/search',
        innerText: "search",
        step: "search",
        subtitle: " - Search"
    },
    {
        key: 'notFound',
        App: <NotFound />,
        href: '/notFound',
        innerText: "404",
        step: "404",
        subtitle: " - 404 not found"
    },
];

// judge app
let app;
for (app of [home, user, cart, collection, help, search, notFound])
{
    if (app.href === window.location.pathname){break}
}

// handle footage
Tools.addStep(app.step, home.step, notFound.step);

// render App

ReactDOM.render(app.App, document.getElementById('root'));

// change title
document.title = "HMD Art" + app.subtitle;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
