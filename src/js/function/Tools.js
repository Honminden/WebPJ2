import * as cookie from './global/cookie';
import * as fetch from './global/fetch';
import * as map from './global/map';
import * as footage from './structure/footage';

const Tools =
{
    getValue: cookie.getValue,
    setValue: cookie.setValue,
    getJSON: fetch.getJSON,
    getImgSrc: fetch.getImgSrc,
    setImgs: fetch.setImgs,
    mapListItems: map.mapListItems,
    mapImgs: map.mapImgs,
    mapInputs: map.mapInputs,
    getSteps: footage.getSteps,
    setSteps: footage.setSteps,
    addStep: footage.addStep
};

export default Tools;