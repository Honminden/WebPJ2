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
  const [sum, setSum] = useState(0);
  const [imgs, setImgs] = useState(null);
  const [signed, setSigned] = useState(false);
  const [info,setInfo] = useState({state: "", user: {}});
  const [submit, setSubmit] = useState(false);

    useEffect(() =>
    {
        if (signed && info.user.userID)
        {
            Tools.setImgs('cart', setImgs, [{name: 'userID', value: info.user.userID}]);
        }
    }, [info.user, signed]);

    useEffect(() =>
    {
       let s = 0;
       if (imgs)
       {
           imgs.forEach(i =>
           {
              if (i.datum.price)
              {
                  s += i.datum.price;
              }
           });
       }

       setSum(s);
    }, [imgs]);

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
                    setInfo({state: "", user: datum.user})
                }
            });
        }
    });

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
                <h2> {sum} </h2>
                <h1> {(signed) ? info.state : ""} </h1>
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
