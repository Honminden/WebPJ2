import React, { useState, useEffect } from 'react';
import Header from './js/Header';
import Tag from './js/component/global/Tag';
import Figure from './js/component/global/Figure';
import Tools from "./js/function/Tools";
import './App.css';

function Home()
{
  const HOT_NUM = 3;
  const [hotIndex, setHotIndex] = useState(0);
  const [hotImgs, setHotImgs] = useState(null);
  const [newImgs, setNewImgs] = useState(null);

  useEffect(() =>
  {
      if (!hotImgs)
      {
          Tools.setImgs('hot', setHotImgs);
      }

      if (!newImgs)
      {
          Tools.setImgs('new', setNewImgs);
      }
  }, [hotImgs, newImgs]);

  useEffect(() =>
  {
      if (hotImgs)
      {
          const interval = setInterval(() =>
          {
              if (hotIndex < HOT_NUM - 1)
              {
                  setHotIndex(hotIndex + 1);
              }
              else
              {
                  setHotIndex(0);
              }
          }, 3000);
          return () => clearInterval(interval);
      }
  });

  return (
    <div className="Home">
      <Header />
      {
          (hotImgs) ?
              <Figure className={'vertical'}
                      imgs={[hotImgs[hotIndex]]}
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
