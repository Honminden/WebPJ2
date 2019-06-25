import React, { useState, useEffect} from 'react';
import Header from './js/Header'
import './App.css';
import Figure from "./js/component/global/Figure";
import Tools from "./js/function/Tools";
import Tag from "./js/component/global/Tag";

const HtmlToReactParser = require('html-to-react').Parser;
const parser = new HtmlToReactParser();

function Item()
{
  const [imgs, setImgs] = useState(null);

    useEffect(() =>
    {
        if (!imgs)
        {
            Tools.setImgs('id', setImgs, [{name: 'id', value: window.location.search.replace('?id=', '')}]);
        }
        else if (document.title === "HMD Art - Item") 
        {
            document.title = imgs[0].datum.title;
        }
    }, [imgs]);

  return (
    <div className="Item">
      <Header />
      {
          (imgs) ?
              <Figure className={'vertical noAside'}
                      imgs={imgs}/>
                      :
              <Figure color={'white'} innerText={"Loading..."} />
      }
      {
          (imgs) ?
              <div className={'details'}>
                <h1><em> {imgs[0].datum.title} </em></h1>
                <h2> {imgs[0].datum.artist} <small><time> {"(" + imgs[0].datum.yearOfWork + ")"} </time></small> </h2>
                <Tag className={'red brighter'} innerText={"View: " + imgs[0].datum.view} />
                <Tag className={'yellow brighter'} innerText={imgs[0].datum.genre} />
                <Tag className={'green brighter'} innerText={"Price: " + imgs[0].datum.price} />
                <Tag className={'blue brighter'} innerText={imgs[0].datum.timeReleased} />
                <h3> Description </h3>
                <p> {parser.parse(imgs[0].datum.description
                    .replace('\\r\\n', '<br />'))} </p>
                <p> Width: {imgs[0].datum.width} Height: {imgs[0].datum.height} </p>
              </div>
              : ''
      }

    </div>
  );
}

export default Item;
