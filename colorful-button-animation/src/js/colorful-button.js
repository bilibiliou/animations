+function () {
    let oButton = $('.button');
    let oEffectList = $('.effect-list');

    let bthHandle = (ev) => {
        let self = oButton;

        if (self.boff === 1) {
            self.boff = 0;

            let control =Promise.resolve();
            control.then(() => {
                oButton.classList.add('r-flower')
                return Sleep(200);
            })
            .then(() => {
                oButton.classList.add('elastic-scale');
                oEffectList.classList.remove('effect-list-hidden');
                oEffectList.classList.add('show-hidden');    
                return Sleep(1300);
            })
            .then(() => {
                oButton.classList.remove('elastic-scale');
                oEffectList.classList.add('effect-list-hidden');
                oEffectList.classList.remove('show-hidden');
                self.boff = 2;
            })
        }

        if(self.boff === 2) {
            self.boff = 0;
            let control =Promise.resolve();
            control.then(() => {
                oButton.classList.remove('r-flower');
                oButton.classList.add('thumb');
                return Sleep(50);
            })
            .then(() => {
                self.boff = 1;
            })
        }

        event.preventDefault();
        return false;
    }

    oButton.boff = 1;
    oButton.addEventListener('mouseup', bthHandle);
    oButton.addEventListener('touchend', bthHandle)
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