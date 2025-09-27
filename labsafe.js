//南通理工实验室安全教育刷时长 js 脚本
//针对域名头为labsafe 的网页
//控制台复制 js 代码即可运行
//version 1.2
//autor bactdt


// 10秒延时启动
setTimeout(function() {
    // 跳过弹窗
    window.confirm = function() { return true; };
    window.alert = function() {};

    // 隐藏/移除所有弹窗相关元素（循环，每秒做一次）
    setInterval(function() {
        [
            '.v-transfer-dom',
            '.ivu-modal-mask',
            '.ivu-modal-wrap',
            '.ivu-modal',
            '.ivu-modal-confirm',
            '.ivu-modal-content',
            '.ivu-modal-body'
        ].forEach(function(selector) {
            document.querySelectorAll(selector).forEach(function(el) {
                el.remove();
            });
        });
    }, 1000);

    // 自动刷课+鼠标移动模拟
    function randomClickPanelItem(tag) {
        const items = Array.from(document.querySelectorAll('.panelItem'));
        if (items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            const item = items[randomIndex];
            const title = item.innerText.trim();
            console.log(`[${tag}] 获取到${items.length}篇，将点击第${randomIndex+1}篇：${title}`);
            // 鼠标移动模拟（移动到元素中心）
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
            // 小延时后点击
            setTimeout(function() {
                item.click();
            }, 100);
        } else {
            console.log(`[${tag}] 未获取到任何 .panelItem`);
        }
    }

    // 首次自动刷课
    randomClickPanelItem('首次自动刷课');

    // 每秒监测 .alredyTime
    setInterval(function() {
        const timeSpan = document.querySelector('.alredyTime');
        if (timeSpan && timeSpan.innerText.trim() === '05:00') {
            randomClickPanelItem('5:00自动刷课');
        }
    }, 1000);

}, 10000); // 10秒延时
