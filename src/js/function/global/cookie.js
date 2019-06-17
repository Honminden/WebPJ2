const Cookie = require('cookie');

export function getValue(cookie, name)
{
    let cookiePairs = Cookie.parse(cookie);
    return cookiePairs[name];
}

export function setValue(cookie, name, value)
{
    cookie = Cookie.serialize(name, value);
    return cookie;
}