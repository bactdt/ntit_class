//南通理工实验室安全教育刷时长 js 脚本
//针对域名头为labsafe 的网页
//控制台复制 js 代码即可运行
// 跳过弹窗提示
setTimeout(function(){
    window.confirm = function(){ return true; };
    window.alert = function(){};
}, 5000);

// 自动每隔5分钟随机点击文章并倒计时提示
let countdown = 300; // 5分钟倒计时，单位秒

function clickRandomItem() {
    const items = Array.from(document.querySelectorAll('.panelItem'));
    if (items.length === 0) {
        console.log('未找到任何文章');
        return;
    }
    const randomIndex = Math.floor(Math.random() * items.length);
    console.log(`找到${items.length}篇文章，准备点击第${randomIndex + 1}篇`);
    items[randomIndex].click();
}

function startTimer() {
    if (countdown <= 60 && countdown > 0) {
        console.log(`即将刷新，还剩 ${countdown} 秒`);
    }
    countdown--;
    if (countdown < 0) {
        clickRandomItem();
        countdown = 300;
    }
}

// 首次执行点击
clickRandomItem();

// 每秒执行倒计时逻辑
setInterval(startTimer, 1000);
