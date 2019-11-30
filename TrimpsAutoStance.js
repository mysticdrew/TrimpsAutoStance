(function run() {
    let dom = document.getElementById('formation2');
    let scry = document.getElementById('formation4');
    if (dom !== null && scry !== null) {
        if (inBionicMap()) {
            console.log('in bionic')
            // setNewFormation(2, dom);
        } else if (inVoidMap()) {
            console.log('in void')
            // setNewFormation(4, scry);
        } else if (inWorld()) {
            console.log('in world')
            // setNewFormation(4, scry);
        }
    }
    setTimeout(run, 1000)
})();

function inVoidMap() {
    let mapButtons = document.getElementById('repeatVoidsContainer');
    return mapButtons.style.cssText === 'display: block;';
}

function inBionicMap() {
    let mapButtons = document.getElementById('climbBwContainer');
    return mapButtons.style.cssText === 'display: block;';
}

function inWorld() {
    let mapButtons = document.getElementById('extraMapBtns');
    return mapButtons.classList.contains('col-xs-off');
}

function setNewFormation(formation, button) {
    if (button.classList.contains('formationStateDisabled')) {
        let current = document.getElementsByClassName('formationStateEnabled').item(0);
        current.classList.remove('formationStateEnabled');
        current.classList.add('formationStateDisabled');

        button.classList.remove('formationStateDisabled');
        button.classList.add('formationStateEnabled');
        setFormation(formation);
    }
}
