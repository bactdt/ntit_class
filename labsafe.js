//南通理工实验室安全教育刷时长 js 脚本
//针对域名头为labsafe 的网页
//控制台复制 js 代码即可运行
//version 1.1
//autor bactdt

// 跳过弹窗（alert、confirm）
setTimeout(function(){
    window.confirm = function(){ return true; };
    window.alert = function(){};
}, 5000);

// 强制隐藏所有弹窗相关元素
const style = document.createElement('style');
style.innerHTML = `
.v-transfer-dom,
.ivu-modal-mask,
.ivu-modal-wrap,
.ivu-modal,
.ivu-modal-confirm,
.ivu-modal-content,
.ivu-modal-body {
    display: none !important;
}
`;
document.head.appendChild(style);

// 定时移除所有弹窗 DOM
function removeAllModalElements() {
    [
        '.v-transfer-dom',
        '.ivu-modal-mask',
        '.ivu-modal-wrap',
        '.ivu-modal',
        '.ivu-modal-confirm',
        '.ivu-modal-content',
        '.ivu-modal-body'
    ].forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
    });
    setTimeout(removeAllModalElements, 1000);
}
removeAllModalElements();

// 随机点击一篇文章并打印信息
function randomClickPanelItem() {
    const items = Array.from(document.querySelectorAll('.panelItem'));
    console.log(`共获取到 ${items.length} 个 .panelItem 元素`);
    if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        console.log(`随机点击第 ${randomIndex + 1} 个`);
        items[randomIndex].click();
    }
}

// 无限计时监控，到 5:00 时自动点击
function checkTimeAndAutoClick() {
    const timeSpan = document.querySelector('.alredyTime');
    if (!timeSpan) {
        setTimeout(checkTimeAndAutoClick, 2000);
        return;
    }
    const currentTime = timeSpan.innerText.trim();
    if (currentTime === '05:00') {
        randomClickPanelItem();
        setTimeout(checkTimeAndAutoClick, 3000); // 跳转后缓冲再监控
    } else {
        setTimeout(checkTimeAndAutoClick, 1000);
    }
}

// 首次随机点击
randomClickPanelItem();
checkTimeAndAutoClick();
