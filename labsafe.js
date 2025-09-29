//南通理工实验室安全教育刷时长 js 脚本
//针对域名头为labsafe 的网页
//控制台复制 js 代码即可运行
//version 1.2.1
//autor bactdt


// 定时模拟鼠标移动，防止无操作检测
function simulateMoveEvent() {
    var evtTarget = document.querySelector('.task_auto') || document.body;
    var evt = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: Math.floor(Math.random() * window.innerWidth),
        clientY: Math.floor(Math.random() * window.innerHeight)
    });
    evtTarget.dispatchEvent(evt);
}
setInterval(simulateMoveEvent, 10000);
setTimeout(simulateMoveEvent, 2000);

// 刷课相关逻辑
setTimeout(function() {
    function randomClickPanelItem(tag) {
        const items = Array.from(document.querySelectorAll('.panelItem'));
        if (items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            const item = items[randomIndex];
            const title = item.innerText.trim();
            console.log(`[${tag}] 获取到${items.length}篇，将点击第${randomIndex+1}篇：${title}`);
            const rect = item.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const mouseMoveEvent = new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y
            });
            item.dispatchEvent(mouseMoveEvent);
            setTimeout(function() {
                item.click();
            }, 100);
        } else {
            console.log(`[${tag}] 未获取到任何 .panelItem`);
        }
    }

    // 持续轮询以防页面异步渲染
    function tryStartScript() {
        const items = Array.from(document.querySelectorAll('.panelItem'));
        if (items.length === 0) {
            console.log('等待目标文章元素...');
            setTimeout(tryStartScript, 1000);
            return;
        }
        randomClickPanelItem('首次自动刷课');
        setInterval(taskMain, 1000);
    }
    function taskMain() {
        const timeSpan = document.querySelector('.alredyTime');
        if (timeSpan && timeSpan.innerText.trim() === '05:00') {
            randomClickPanelItem('5:00自动刷课');
        }
    }

    tryStartScript();
}, 10000);
