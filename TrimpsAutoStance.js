let voidAtHeliumZone = 645;
let voidAtRadonZone = 200;
(function run() {
    if (typeof game !== "undefined") {
        let dom = document.getElementById('formation2');
        let scry = document.getElementById('formation4');
        if (dom !== null && scry !== null) {
            if (inBionicMap()) {
                // console.log('in bionic');
                setNewFormation(2);
            } else if (inVoidMap()) {
                // console.log('in void');
                setNewFormation(4);
            } /*else if (inSpireV()) {
            setNewFormation(2);
        }*/ else if (inWorld()) {
                // console.log('in world');
                setNewFormation(4);
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

function setNewFormation(formation) {
    if (game.global.formation !== formation) {
        console.log("Switching Stance: " + formation);
        setFormation(formation);
    }
}

function canRunVoidMaps() {
    if (game.global.world) {
        let totalVoids = game.global.totalVoidMaps;
        let inMap = game.global.mapsActive;
        let inMapScreen = game.global.preMapsActive;

        if (voidAtZone() && totalVoids > 0 && !inMap && inMapScreen) {
            console.log("Running Voids");
            setNewFormation(4);
            runVoidMaps();
        }
    }
}

function voidAtZone() {
    return (game.global.world === voidAtHeliumZone && game.global.universe === 1)
        || (game.global.world === voidAtRadonZone && game.global.universe === 2)
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


