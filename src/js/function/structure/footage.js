import Tools from "../Tools";


function getFootage()
{
    return Tools.getValue(document.cookie, 'footage');
}

function setFootage(footage)
{
    document.cookie = Tools.setValue(document.cookie, 'footage', footage);
}

function encodeFootage(steps)
{
    let footage = '';
    for (let step of steps)
    {
        footage += '~' + step;
    }
    return footage.slice(1);
}

function decodeFootage(footage)
{
    return footage.split('~');
}

export function getSteps()
{
    return decodeFootage(getFootage());
}

export function setSteps(steps)
{
    return setFootage(encodeFootage(steps));
}

export function addStep(appStep, initialStep, skipStep)
{
    if (appStep === initialStep || document.cookie === '' || !getSteps())
    {
        setSteps([initialStep]);
    }
    if (appStep !== initialStep)
    {
        let steps = [];
        for (let step of getSteps())
        {
            if (step === appStep){break}
            if (step === skipStep){continue}
            steps.push(step);
        }
        steps.push(appStep);
        setSteps(steps);
    }
}