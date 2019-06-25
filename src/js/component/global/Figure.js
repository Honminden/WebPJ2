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
                {(p.imgs) ? Tools.mapImgs(p.imgs, p) : ''}
            </figure>);
    }
}

export default Figure;