import React from 'react';
import Nav from "../global/Nav";
import Tools from '../../function/Tools';
import {home, user, cart, collection, help, search, notFound} from '../../../index';

class Footage extends React.Component
{
    render()
    {
        // get items
        let items = [];
        let steps = Tools.getSteps();
        let apps = [home, user, cart, collection, help, search, notFound];
        for (let step of ((steps) ? steps : [home.step]))
        {
            let app;
            for (app of apps)
            {
                if (app.step === step){break}
            }
            items.push({key: app.key, href: app.href, innerText: app.innerText + " >"});
        }

        return <Nav className={'Footage'} innerText={Tools.mapListItems(items)}/>;
    }
}

export default Footage;