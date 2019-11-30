(function () {

    (function run() {
        let dom = document.getElementById('formation2');
        // var scry = $('#formation4');
        console.log("is dom null");
        if (dom !== null) {
            console.log("dom not null");
            console.log(dom.className);
        }

        //   console.log(scry.attr('class'));
        setTimeout(run, 1000)
    })()

})();