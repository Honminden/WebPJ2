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

export function getJSON(location, queries, callback)
{
    let req = new Request(getFullLocation(location, queries));
    fetch(req, GET_INIT)
        .then(res => res.json())
        .then(data => {callback(data)});
}

export function getImgSrc(fileName)
{
    return `${IMG_LOCATION}/${fileName}`;
}