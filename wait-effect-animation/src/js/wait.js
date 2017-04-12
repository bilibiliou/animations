+function () {
    let oWait = $('.wait');
    let oPs = $('.process-stage');
    let oT = $('.t');
    let oDownload = $('.download');

    oDownload.addEventListener('click', () => {
        oDownload.style.transform = 'scale(0)';
        Promise.resolve()
        .then(() => {
            oWait.classList.add('wait-mor')
            return Sleep(10000);
        })
        .then(() => {
            oPs.style.animationIterationCount = 1;
            oWait.style.animationIterationCount = 1;
            oWait.classList.add('hidden');
            oT.classList.add('show');
        })        
    })

}();

function rem() {
    document.documentElement.style.fontSize = (document.documentElement.clientWidth || document.documentElement.clientWidth) + 'px';
};

rem();
window.addEventListener('resize', rem);

function $(v,d) {
    d = d || document;
    return d.querySelector(v);
}

function $$(v,d) {
    d = d || document;
    return d.querySelectorAll(v);
}

function Sleep(timeout) {
    return new Promise(function(resolve) {
        setTimeout(function () {
            resolve();
        },timeout);
    });
}