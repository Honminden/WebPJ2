import React from 'react';
import Tools from '../../function/Tools';

class Figure extends React.Component
{
    render()
    {
        let p = this.props;

        return (
            <figure className=
                         {
                             'Figure' + ((p.className) ? (' ' + p.className) : '')
                         }>
                <figcaption style=
                             {
                                 {
                                     captionSide: p.captionSide,
                                     fontSize: p.fontSize,
                                     color: p.color
                                 }
                             }> {(p.innerText) ? p.innerText : ''} </figcaption>
                {
                    (p.imgs) ? Tools.mapImgs(p.imgs, p) : <img src={p.src} alt={p.alt} style=
                        {
                            {
                                width: p.width,
                                height: p.height,
                                maxWidth: p.maxWidth,
                                maxHeight: p.maxHeight
                            }
                        }/>
                }
            </figure>);
    }
}

export default Figure;