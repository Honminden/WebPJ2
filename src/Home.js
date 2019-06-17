import React from 'react';
import Header from './js/Header';
import Button from './js/component/global/Button';
import Tag from './js/component/global/Tag';
import Figure from './js/component/global/Figure';
import './App.css';

const TEST_IMAGE =
{
    src: 'https://tse1-mm.cn.bing.net/th?id=OIP.x6sXocG8wmZR9DaancjW7AHaEo&w=275&h=168&c=7&o=5&pid=1.7',
    alt: 'a fish',
    innerText: 'Copper Banded Butterfly Fish'
};
const TEST_IMAGES =
[
    {
        key: 1,
        src: 'https://tse4-mm.cn.bing.net/th?id=OIP.7MCs1ElPsaUu-MYTHBlQeQHaKG&w=186&h=255&c=7&o=5&pid=1.7',
        alt: 'a beauty',
        innerText: 'a beauty'
    },
    {
        key: 2,
        src: 'https://tse3-mm.cn.bing.net/th?id=OIP.NmaEmjm1SQ6Pv3Oibpmg7QHaLH&w=186&h=279&c=7&o=5&pid=1.7',
        alt: 'another beauty',
        href: 'https://www.alexjdiary.com/wp-content/uploads/2016/07/Jenna-Kelly-Wilhelmina-Models-Alex-Jackson.jpg'
    },
    {
        key: 3,
        src: 'https://tse1-mm.cn.bing.net/th?id=OIP.MBQ5KjnfiAhMYnQOhDNcHAHaJQ&w=186&h=233&c=7&o=5&pid=1.7',
        alt: 'a third beauty',
        width: '300px'
    }
];

function Home() {
  return (
    <div className="Home">
      <Header />
      <h1> Home </h1>
      <Button className={'green'} innerText={'Purchase'}/>
      <Tag innerText={<a href={"https://en.wiktionary.org/wiki/realism"}> realism </a>}/>
      <Figure src={TEST_IMAGE.src}
              alt={TEST_IMAGE.alt}
              color={'white'}
              innerText={TEST_IMAGE.innerText}/>
      <Figure imgs={TEST_IMAGES} captionSide={'top'} innerText={<Tag className={'red brighter'} innerText={'Beauties'}/>}/>
    </div>
  );
}

export default Home;
