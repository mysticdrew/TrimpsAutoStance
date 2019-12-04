let voidAtZone = 630;

(function run() {
    if (typeof game !== "undefined") {
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
        canRunVoidMaps();
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

//run voidmaps
// get voidCount - int 'game.global.totalVoidMaps'
// in maps screen - boolean game.global.preMapsActive
function canRunVoidMaps() {
    if (typeof game.global.world === "undefined") return;
    let currentZone = game.global.world;
    let totalVoids = game.global.totalVoidMaps;
    let inMap = game.global.mapsActive;
    let inMapScreen = game.global.preMapsActive;

    if (currentZone === voidAtZone && totalVoids > 0 && !inMap && inMapScreen) {
        runVoidMaps();
    }
}

function runVoidMaps() {
    let nextVoid = getNextVoidId();
    if (nextVoid) {
        game.options.menu.exitTo.enabled = 1;
        toggleSetting('exitTo', null, false, true);
        if (game.global.currentMapId) recycleMap();
        selectMap(nextVoid);
        runMap();
    }
}


