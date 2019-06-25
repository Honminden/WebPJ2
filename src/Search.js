import React, { useState, useEffect} from 'react';
import Header from './js/Header'
import './App.css';
import Form from "./js/component/global/Form";
import Figure from "./js/component/global/Figure";
import Tag from "./js/component/global/Tag";
import Tools from "./js/function/Tools";

function Search()
{
  const [search, setSearch] = useState(null);
  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [artist, setArtist] = useState(false);
  const [order, setOrder] = useState("timeReleased");
  const [page, setPage] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [imgs, setImgs] = useState(null);

  useEffect(() =>
  {
      if (submit)
      {
          Tools.setImgs('search', setImgs,
              [
                  {name: 's', value: search},
                  {name: 't', value: title},
                  {name: 'd', value: description},
                  {name: 'a', value: artist},
                  {name: 'o', value: order},
                  {name: 'p', value: page}
              ]);
          setSubmit(false);
      }
  }, [artist, description, order, page, search, submit, title]);


  return (
    <div className="Search">
      <Header />
      <Form inputs=
                {[
                    {
                        key: 1,
                        type: 'search',
                        name: 'search',
                        placeholder: "search...",
                        onChange: e => {setSearch(e.target.value)}
                    },
                    {
                        key: 2,
                        innerText: "title",
                        type: 'checkbox',
                        name: 'title',
                        onChange: e => {setTitle(e.target.checked)}
                    },
                    {
                        key: 3,
                        innerText: "description",
                        type: 'checkbox',
                        name: 'description',
                        onChange: e => {setDescription(e.target.checked)}
                    },
                    {
                        key: 4,
                        innerText: "artist",
                        type: 'checkbox',
                        name: 'artist',
                        onChange: e => {setArtist(e.target.checked)}
                    },
                    {
                        key: 5,
                        innerText: "timeReleased",
                        type: 'radio',
                        name: 'order',
                        onChange: () => {setOrder('timeReleased')}
                    },
                    {
                        key: 6,
                        innerText: "view",
                        type: 'radio',
                        name: 'order',
                        onChange: () => {setOrder('view')}
                    },
                    {
                        key: 7,
                        innerText: "price",
                        type: 'radio',
                        name: 'order',
                        onChange: () => {setOrder('price')}
                    },
                    {
                        key: 8,
                        innerText: "page",
                        type: 'number',
                        name: 'page',
                        onChange: e => {setPage(e.target.value)}
                    }
                ]}
            onClick={null}
            innerText={"Submit"}
            onSubmit={e => {setSubmit(true); e.preventDefault();}}/>
      {
          (imgs) ?
              <Figure className={'vertical'}
                      imgs={imgs}
                      captionSide={'top'}
                      innerText={<Tag className={'orange brighter'} fontSize={'2em'} innerText={'Results of ' + search}/>}/>
                      :
              <Figure color={'white'} innerText={"Loading..."} />
      }
    </div>
  );
}

export default Search;
