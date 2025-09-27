//南通理工实验室安全教育刷时长 js 脚本
//针对域名头为labsafe 的网页
//控制台复制 js 代码即可运行



// 跳过弹窗提示
setTimeout(function(){
    window.confirm = function(){ return true; };
    window.alert = function(){};
}, 5000);

// 不断检测计时，时间到达5:00时自动点击并继续循环
function checkTimeAndAutoClick() {
    const timeSpan = document.querySelector('.alredyTime');
    if (!timeSpan) {
        setTimeout(checkTimeAndAutoClick, 2000);
        return;
    }
    const currentTime = timeSpan.innerText.trim();
    if (currentTime === '05:00') {
        const items = Array.from(document.querySelectorAll('.panelItem'));
        if (items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            items[randomIndex].click();
        }
        // 等待页面跳转后短暂停留，再自动继续监控（此时间可酌情调整，避免页面还没加载好）
        setTimeout(checkTimeAndAutoClick, 3000);
    } else {
        setTimeout(checkTimeAndAutoClick, 1000);
    }
}

// 启动无限刷
checkTimeAndAutoClick();
