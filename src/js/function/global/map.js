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
              {(i.innerText) ?
                  <aside style=
                             {
                                 {
                                     fontSize: i.fontSize,
                                     width: i.asideWidth,
                                     height: i.asideHeight,
                                     maxWidth: i.asideMaxWidth,
                                     maxHeight: i.asideMaxHeight
                                 }
                             }> {i.innerText} </aside>
                  : ''
              }
            </a>);
    });
}

export function mapInputs(inputs)
{
    return inputs.map((i) =>
    {
        return (
            <a href={i.href} key={i.key}>
                {(i.innerText) ?
                    <label style=
                               {
                                   {
                                       fontSize: i.labelFontSize,
                                       color: i.labelColor
                                   }
                               }> {i.innerText} </label>
                    : ''
                }
                <input type={i.type} name={i.name} placeholder={i.placeholder}
                       style=
                           {
                               {
                                   fontSize: i.fontSize,
                                   color: i.color,
                                   width: i.width,
                                   height: i.height
                               }
                           }
                       onChange={i.onChange}/>
            </a>);
    });
}