import React, { useState, useEffect} from 'react';
import Header from './js/Header'
import './App.css';
import Figure from "./js/component/global/Figure";
import Tools from "./js/function/Tools";
import Tag from "./js/component/global/Tag";
import Button from "./js/component/global/Button";

const HtmlToReactParser = require('html-to-react').Parser;
const parser = new HtmlToReactParser();

function Cart()
{
  const [imgs, setImgs] = useState(null);
  const [signed, setSigned] = useState(false);
  const [info,setInfo] = useState({state: "", user: {}, cart: null});
  const [submit, setSubmit] = useState(false);

  /*useEffect(() =>
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
                      setInfo({state: datum.state, user: info.user, cart: info.cart});
                  });
          }
          setSubmit(false);
      }
  }, [submit, signed, info.user.userID, imgs]);*/

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
                    setInfo({state: "", user: datum.user, cart: info.cart})
                }
            });
        }
    });

    useEffect(() =>
    {
        if (!info.cart && signed)
        {
            Tools.getJSON('/sign',
                [
                    {name: 'aim', value: 'cart'},
                    {name: 'userID', value: info.user.userID}
                ], data =>
            {
                let datum = (Array.isArray(data)) ? data[0] : data;
                if (datum.cart)
                {
                    setInfo({state: "", user: info.user, cart: datum.cart})
                }
            });
        }
    });

    useEffect(() =>
    {
        if (!imgs)
        {
            setImgs([]);
        }
    }, [imgs]);

    useEffect(() =>
    {
        if (imgs && imgs.length === 0 && info.cart)
        {
            info.cart.forEach(i =>
                {
                    Tools.setImgs('id', newImg => {setImgs(imgs.concat(newImg))},
                        [{name: 'id', value: i.artworkID}]);
                }
            );
        }
    }, [imgs, info.cart]);

    /*useEffect(() =>
    {
        if (!imgs)
        {
            Tools.setImgs('id', setImgs, [{name: 'id', value: window.location.search.replace('?id=', '')}]);
        }
        else if (document.title === "HMD Art - Item") 
        {
            document.title = imgs[0].datum.title;
        }
    }, [imgs]);*/

  return (
    <div className="Item">
      <Header />
      {
          (signed) ?
              <div>
                <h1> {info.user.name}'s Cart </h1>
                <h1> {(signed) ? info.state : ""} </h1>
                {
                    (info.cart) ? info.cart.map(i => <h2> {i.artworkID} </h2>) : ''
                }
                {
                    (imgs) ?
                        <Figure className={'vertical'}
                                imgs = {imgs}
                                captionSide={'top'}
                                innerText={<Tag className={'orange brighter'} fontSize={'2em'} innerText={'Items'}/>}/>
                        :
                        <Figure color={'white'} innerText={"Loading..."} />
                }
              </div>
              : <h1> Sign in first. </h1>
      }
    </div>
  );
}

export default Cart;
