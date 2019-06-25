import React, { useState, useEffect } from 'react';
import Header from './js/Header';
import Tag from './js/component/global/Tag';
import Figure from './js/component/global/Figure';
import Tools from "./js/function/Tools";
import './App.css';
//const HtmlToReactParser = require('html-to-react').Parser;

function Home() {
    const [hotImgs, setHotImgs] = useState(null);
    const [newImgs, setNewImgs] = useState(null);

  useEffect(() =>
  {
      function setImgs(type, setValue)
      {
          Tools.getJson(
              '/artworks',
              [{name: 'aim', value: type}],
              (data) =>
              {
                  let newImgs = [];
                  let key = 0;
                  //let parser = new HtmlToReactParser();
                  data.forEach(datum =>
                  {
                      newImgs.push(
                          {
                              key: ++key,
                              href: null,
                              src: Tools.getImgSrc(datum.imageFileName),
                              alt: datum.title,
                              width: '60vw',
                              asideWidth: '60vw',
                              //innerText: <p>{parser.parse(datum.description.replace('\\r\\n', '<br />'))}</p>
                              innerText: datum.title
                          });
                  });
                  setValue(newImgs);
              });
      }
      if (!hotImgs)
      {
          setImgs('hot', setHotImgs)
      }
      if (!newImgs)
      {
          setImgs('new', setNewImgs)
      }
  }, [hotImgs, newImgs]);

  return (
    <div className="Home">
      <Header />
      {
          (hotImgs) ?
              <Figure className={'vertical'}
                      imgs = {hotImgs}
                      captionSide={'top'}
                      innerText={<Tag className={'red brighter'} fontSize={'2em'} innerText={'Hot'}/>}/>
                      :
              <Figure color={'white'} innerText={"Loading..."} />
      }
      {
          (newImgs) ?
              <Figure className={'vertical'}
                      imgs = {newImgs}
                      captionSide={'top'}
                      innerText={<Tag className={'blue brighter'} fontSize={'2em'} innerText={'New'}/>}/>
                      :
              <Figure color={'white'} innerText={"Loading..."} />
      }
    </div>
  );
}

export default Home;
