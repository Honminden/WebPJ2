import React from 'react';
import Tools from "../Tools";
import Tag from "../../component/global/Tag";

const HtmlToReactParser = require('html-to-react').Parser;

let headers = new Headers();
const GET_INIT =
{
    method: 'GET',
    headers: headers
};
const IMG_LOCATION = './img';

function getFullLocation(location, queries)
{
    let params = new URLSearchParams();
    queries.forEach(query => params.append(query.name, encodeURIComponent(query.value)));
    return `${location}?${params.toString()}`;
}

export function getJSON(location, queries, callback=()=>{})
{
    let req = new Request(getFullLocation(location, queries));
    fetch(req, GET_INIT)
        .then(res => res.json())
        .then(data => {callback(data)});
}

export function postJSON(location, body, callback)
{
    let req = new Request(location);
    fetch(req,
        {
            method: 'POST',
            headers: headers,
            body: body
        })
        .then(res => res.json())
        .then(data => {callback(data)});
}

export function getImgSrc(fileName)
{
    return `${IMG_LOCATION}/${fileName}`;
}

export function setImgs(type, setValue=()=>{}, customQueries=[])
{
    getJSON(
        '/artworks',
        [{name: 'aim', value: type}].concat(customQueries),
        (data) =>
        {
            let newImgs = [];
            let parser = new HtmlToReactParser();
            if (data)
            {
                data = (data.forEach) ? data : [data];
                data.forEach(datum =>
                {
                    newImgs.push(
                        {
                            key: datum.artworkID,
                            href: '/item?id=' + datum.artworkID,
                            src: (datum.imageFileName) ? Tools.getImgSrc(datum.imageFileName) : '',
                            alt: datum.title,
                            width: '80vw',
                            asideWidth: '90vw',
                            fontSize: '0.4em',
                            innerText:
                                <p>
                                    <Tag className={'green brighter'} innerText={datum.price}/>
                                    <Tag className={'purple brighter'} innerText={datum.title}/>
                                    {(datum.description) ? parser.parse(datum.description
                                        .replace('\\r\\n', '<br />')) : ''}
                                </p>,
                            datum: datum
                        });
                });
            }

            setValue(newImgs);
        });
}

export function signIn(setValue=()=>{}, customQueries=[])
{
    getJSON(
        '/sign',
        [{name: 'aim', value: 'in'}].concat(customQueries),
        (data) =>
        {
            let datum = (Array.isArray(data)) ? data[0] : data;
            setValue(datum);
        });
}

function validate(inputs)
{
    try
    {
        let [validation1, validation2, validation3, validation4, validation5] =
            [
                inputs.every(i => i !== null),
                inputs[2].value === inputs[3].value,
                inputs[2].value.length >=6,
                /[0-9]/.test(inputs[2].value),
                /[A-z]/.test(inputs[2].value)
            ];
        return validation1 && validation2 && validation3 && validation4 && validation5;
    }
    catch (e)
    {
        return false;
    }
}

export function signUp(setValue=()=>{}, customQueries={})
{
    if (validate(customQueries))
    {
        getJSON(
            '/sign',
            [{name: 'aim', value: 'up'}].concat(customQueries),
            (data) =>
            {
                let datum = (Array.isArray(data)) ? data[0] : data;
                setValue(datum);
            });
    }
    else
    {
        setValue({state: "Invalid"});
    }
}

export function deleteItem(cartID)
{
    getJSON('/artworks', [{name: 'aim', value: 'deleteCart'},{name: 'cartID', value: cartID}])
}