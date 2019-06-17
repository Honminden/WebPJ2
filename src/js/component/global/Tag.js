import React from 'react'

class Tag extends React.Component
{
    render()
    {
        let p = this.props;

        return <span className=
                         {
                             'Tag' + ((p.className) ? (' ' + p.className) : '')
                         }

                     style=
                         {
                             {
                                 borderWidth: p.borderWidth,
                                 backgroundColor: p.backgroundColor,
                                 fontSize: p.fontSize,
                                 color: p.color
                             }
                         }> {p.innerText} </span>
    }
}

export default Tag;