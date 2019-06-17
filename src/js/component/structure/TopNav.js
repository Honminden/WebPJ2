import React from 'react';
import Nav from '../global/Nav';
import Tools from '../../function/Tools';
import {home, user, cart, collection, help, search} from '../../../index';

class TopNav extends React.Component
{
    constructor(props)
    {
        super(props);
        this.listItems = [home, user, cart, collection, help, search];
    }

    render()
    {
        return <Nav className={'TopNav'} innerText={Tools.mapListItems(this.listItems)}/>;
    }
}

export default TopNav;