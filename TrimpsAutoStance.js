(function run() {
    let dom = document.getElementById('formation2');
    let scry = document.getElementById('formation4');
    if (dom !== null && scry !== null) {
        if (inBionicMap()) {
            // console.log('in bionic');
            setNewFormation(2, dom);
        } else if (inVoidMap()) {
            // console.log('in void');
            setNewFormation(4, scry);
        } /*else if (inSpireV()) {
            setNewFormation(2, dom);
        }*/ else if (inWorld()) {
            // console.log('in world');
            setNewFormation(4, scry);
        }
    }
    setTimeout(run, 1000)
})();

function inSpireV() {
    let worldName = document.getElementById("worldName");
    return worldName.value === "Spire V" && isValid();
}

function isValid() {
    let mapButtons = document.getElementById('battleHeadContainer');
    return mapButtons.style.cssText === 'display: block;';
}

function inVoidMap() {
    let mapButtons = document.getElementById('repeatVoidsContainer');
    return mapButtons.style.cssText === 'display: block;' && !inWorld() && isValid();
}

function inBionicMap() {
    let mapButtons = document.getElementById('climbBwContainer');
    return mapButtons.style.cssText === 'display: block;' && !inWorld() && isValid();
}

// if bionic is false, world is false, but valid, we're likely in a regular map.
function inRegularMap() {
    return isValid() && !inBionicMap() && !inWorld();
}

function inWorld() {
    let mapButtons = document.getElementById('extraMapBtns');
    return mapButtons.classList.contains('col-xs-off') && isValid();
}

function setNewFormation(formation, button) {
    if (button.classList.contains('formationStateDisabled')) {
        console.log("Switching Stance: " + formation);
        let current = document.getElementsByClassName('formationStateEnabled').item(0);
        current.classList.remove('formationStateEnabled');
        current.classList.add('formationStateDisabled');

        button.classList.remove('formationStateDisabled');
        button.classList.add('formationStateEnabled');
        setFormation(formation);
    }
}
