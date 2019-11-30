(function run() {
    let dom = document.getElementById('formation2');
    let scry = document.getElementById('formation4');

    if (dom !== null && scry !== null) {
        setNewFormation(2, dom);
    }


    setTimeout(run, 1000)
})();

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
