import * as map from './global/map';
import * as cookie from './global/cookie';
import * as footage from './structure/footage';

const Tools =
{
    mapListItems: map.mapListItems,
    mapImgs: map.mapImgs,
    getValue: cookie.getValue,
    setValue: cookie.setValue,
    getSteps: footage.getSteps,
    setSteps: footage.setSteps,
    addStep: footage.addStep
};

export default Tools;