import * as cookie from './global/cookie';
import * as fetch from './global/fetch';
import * as map from './global/map';
import * as footage from './structure/footage';

const Tools =
{
    getValue: cookie.getValue,
    setValue: cookie.setValue,
    getJson: fetch.getJSON,
    getImgSrc: fetch.getImgSrc,
    mapListItems: map.mapListItems,
    mapImgs: map.mapImgs,
    getSteps: footage.getSteps,
    setSteps: footage.setSteps,
    addStep: footage.addStep
};

export default Tools;