import React, { useState, useEffect} from 'react';
import Header from './js/Header'
import './App.css';
import Figure from "./js/component/global/Figure";
import Tools from "./js/function/Tools";
import Tag from "./js/component/global/Tag";
import Button from "./js/component/global/Button";

const HtmlToReactParser = require('html-to-react').Parser;
const parser = new HtmlToReactParser();

function Item()
{
  const [imgs, setImgs] = useState(null);
  const [signed, setSigned] = useState(false);
  const [info,setInfo] = useState({state: "", user: {}});
  const [submit, setSubmit] = useState(false);

  useEffect(() =>
  {
      if (submit)
      {
          if (signed)
          {
              Tools.getJSON('/sign',
                  [
                      {name: 'aim', value: 'addToCart'},
                      {name: 'userID', value: info.user.userID},
                      {name: 'artworkID', value: imgs[0].datum.artworkID}
                  ], data =>
                  {
                      let datum = (Array.isArray(data)) ? data[0] : data;
                      setInfo({state: datum.state, user: info.user});
                  });
          }
          setSubmit(false);
      }
  }, [submit, signed, info.user.userID, imgs, info.user]);

    useEffect(() =>
    {
        if (!signed)
        {
            Tools.getJSON('/sign', [{name: 'aim', value: 'check'}], data =>
            {
                let datum = (Array.isArray(data)) ? data[0] : data;
                setSigned(datum.signed === true);
                if (datum.user)
                {
                    setInfo({state: info.state, user: datum.user})
                }
            });
        }
    });

    useEffect(() =>
    {
        if (!imgs)
        {
            Tools.setImgs('view', setImgs, [{name: 'id', value: window.location.search.replace('?id=', '')}]);
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
                <h1> {(signed) ? info.state : ""} </h1>
                <h1><em> {imgs[0].datum.title} </em></h1>
                <h2> {imgs[0].datum.artist} <small><time> {"(" + imgs[0].datum.yearOfWork + ")"} </time></small> </h2>
                <Tag className={'red brighter'} innerText={"View: " + imgs[0].datum.view} />
                <Tag className={'yellow brighter'} innerText={imgs[0].datum.genre} />
                <Tag className={'green brighter'} innerText={"Price: " + imgs[0].datum.price} />
                <Tag className={'blue brighter'} innerText={imgs[0].datum.timeReleased} />
                {
                    (signed) ?
                        <Button className={'orange brighter'}
                                onClick={e => {setSubmit(true); e.preventDefault();}}
                                innerText={"Add To Cart"}/>
                        : ''
                }
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
