//南通理工实验室安全教育刷时长 js 脚本
//针对域名头为labsafe 的网页
//控制台复制 js 代码即可运行



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

// 定时检测并自动移除 “系统提示”弹窗
function removeSystemModal() {
    // 定位到弹窗根元素
    const modal = document.querySelector('.ivu-modal-confirm');
    if (modal) {
        modal.remove();
        console.log('已移除系统提示弹窗');
    }
    setTimeout(removeSystemModal, 1000); // 每秒检测一次
}

// 首次随机点击
randomClickPanelItem();

// 启动无限刷
checkTimeAndAutoClick();

// 启动弹窗移除监控
removeSystemModal();
