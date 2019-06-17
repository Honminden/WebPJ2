import React from 'react';
import Button from '../global/Button';
import Nav from "../global/Nav";

class TopButtons extends React.Component
{
    render()
    {
        let p = this.props;

        return (
            <Nav className={'TopButtons'} innerText=
                {
                    <div>
                      <Button className={'blue' + ((p.show.navigation) ? '' : ' semi')}
                              onClick={p.onNavigationClick}
                              innerText={((p.show.navigation) ? "Hide" : "Show") + " Navigation"}/>
                      <Button className={'green' + ((p.show.footage) ? '' : ' semi')}
                              onClick={p.onFootageClick}
                              innerText={((p.show.footage) ? "Hide" : "Show") + " Footage"}/>
                      <Button className={'red'} innerText={"Logout"}/>
                    </div>
                }/>);
    }
}

export default TopButtons;