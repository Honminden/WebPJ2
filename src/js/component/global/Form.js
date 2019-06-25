import React from 'react';
import Tools from "../../function/Tools";
import Button from "./Button";

class Form extends React.Component
{
    render()
    {
        let p = this.props;

        return (
            <form className=
                      {
                          'Form' + ((p.className) ? (' ' + p.className) : '')
                      }
                  JSON = {p.JSON}
                  onSubmit={p.onSubmit}>
                {(p.inputs) ? Tools.mapInputs(p.inputs, p) : ''}
                <Button className={p.buttonClassName}
                        isForbidden={p.isForbidden}
                        isBusy={p.isBusy}
                        onForbiddenClick={p.onForbiddenClick}
                        onBusyClick={p.onBusyClick}
                        onClick={p.onClick}
                        fontSize={p.fontSize}
                        forbiddenText={p.forbiddenText}
                        busyText={p.busyText}
                        innerText={p.innerText} />
            </form>
        );
    }
}

export default Form;