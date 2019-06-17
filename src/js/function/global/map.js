import React from "react";

export function mapListItems(listItems)
{
    return listItems.map((i) => {return <a href={i.href} key={i.key}>{i.innerText}</a>});
}

export function mapImgs(imgs)
{
    return imgs.map((i) =>
    {
        return (
            <a href={i.href} key={i.key}>
              <img src={i.src} alt={i.alt} style=
                  {
                      {
                          width: i.width,
                          height: i.height,
                          maxWidth: i.maxWidth,
                          maxHeight: i.maxHeight
                      }
                  }/>
              {(i.innerText) ? <aside> {i.innerText} </aside> : ''}
            </a>);
    });
}