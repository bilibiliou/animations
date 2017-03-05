+function () {
    let oListWrap = $('.list-wrap');
    let oItems = $$('.items');
    let oSlideFront = $('.slide-front');
    let oCloseBtn = $('.close-btn');
    let oS4List = $('.s-4-list');
    let oLis = $$('.s-4-list li');
    let oIntroduce = $('.introduce');
    let nowIndex = -1;
    let boff = 1;
    let oInfo = [`\n
信息管理学院创业
教育基地成立于2002年
于2008年
入驻创业教育学院学生创业园。
基地以培养学生学习能力、
实践能力、团队协作
能力为宗旨。`,
`\n
Web前端工程师
是Web程序开发方向
最接近用户的一群人，负责设
计开发网页,包括各种终端页面布局
架构,工程架构,各种炫酷的
效果,代码优化,以及各
个浏览器兼容。`,`\n
Web后端开发工程师
专注于Web端后台数据的计
算处理，基地通过多年的发展Web
后端团队已经成为拥有javaEE开发
ios开发，andriod开发，大数
据处理等多种技术方向
并进的强大团
队。`,
`\n
UI即User 
Interface(用户界面)
的简称, 负责软件的人机交互、
操作逻辑、界面美观的整体设计。
配合前端工程师设计
开发页面`,
`\n
C++是一门很通
用的语言，从QQ到英雄
联盟，从window到Ps,还有浏
览器、服务器都是用C++开发的，
就业门路很广，也很难。。。`]

    function onShow () {
        let control = Promise.resolve();

        control.then(() => {
            oListWrap.classList.remove('step3');
            oListWrap.classList.add('step4');
            return Sleep(100);
        })
        .then(() => {
            oItems[2].classList.remove('step2');
            oItems[2].classList.add('step5');
            return Sleep(100);
        })

        .then(() => {
            oItems[0].classList.remove('step1');
            oItems[0].classList.add('step6');
            return Sleep(300);
        })
        .then(() => {
            oItems[2].classList.add('step5-2');
            return Sleep(500);
        })
        .then(() => {
            boff = 2;
        })
    }

    function onHidden () {
        let control = Promise.resolve();

        control.then(() => {
            oItems[2].classList.remove('step5-2');
            oItems[2].classList.add('step5-3');
            return Sleep(500);
        })
        .then(() => {
            oItems[0].classList.remove('step6');
            oItems[0].classList.add('step1');
            return Sleep(100);
        })
        .then(() => {
            oItems[2].classList.remove('step5-3');
            oItems[2].classList.remove('step5');
            oItems[2].classList.add('step2');
            return Sleep(100);
        })
        .then(() => {
            oListWrap.classList.remove('step4');
            oListWrap.classList.add('step3');
            return Sleep(500)
        })
        .then(() => {
            boff = 1;
        })
    }

    oSlideFront.addEventListener('click', () => {
        if(boff === 1) {
            onShow();
            boff = 0;
        }
    })

    oCloseBtn.addEventListener('click', () => {
        if(boff === 2) {
            onHidden();
            boff = 0;
        }
    })

    oS4List.addEventListener('click', (ev) => {
        let TargetName = ev.target.tagName;
        if(ev && TargetName === 'DIV' || TargetName === 'I') {
            let oIndex = ~~ev.target.dataset.index;

            if(oIndex === nowIndex) {
                oLis[nowIndex].classList.remove('s-4-list-active');
                nowIndex = -1;
            } else {
                if(nowIndex !== -1) {
                    oLis[nowIndex].classList.remove('s-4-list-active');
                }

                nowIndex = oIndex;
                oLis[nowIndex].classList.add('s-4-list-active');
            }

            oIntroduce.innerHTML = oInfo[nowIndex + 1];
        }
    })

}()


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