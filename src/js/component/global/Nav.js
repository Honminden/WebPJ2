import React from 'react'

class Nav extends React.Component
{
    render()
    {
        let p = this.props;

        return <nav className=
                         {
                             'Nav' + ((p.className) ? (' ' + p.className) : '')
                         }

                    style=
                         {
                             {
                                 flexDirection: p.flexDirection,
                                 fontSize: p.fontSize
                             }
                         }> {p.innerText} </nav>
    }
}

export default Nav;