import React from 'react'

class Button extends React.Component
{
    render()
    {
        let p = this.props;

        return <button className=
                           {
                               'Button' + ((p.isForbidden) ? '-forbidden' : (p.isBusy) ? '-busy' : '') + ((p.className) ? ' ' + p.className : '')
                           }

                       style=
                           {
                               {
                                   fontSize: p.fontSize
                               }
                           }

                       onClick=
                           {
                               (p.isForbidden) ? p.onForbiddenClick : (p.isBusy) ? p.onBusyClick : p.onClick
                           }> {
                               (p.isForbidden && p.forbiddenText) ? p.forbiddenText :
                                   (p.isBusy && p.busyText) ? p.busyText : p.innerText} </button>;
    }
}

export default Button;