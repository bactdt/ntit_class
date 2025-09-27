(function(){
    // 解锁复制/选中
    var style = document.createElement('style');
    style.innerHTML = `
        * { user-select: text !important; }
        textarea { user-select: text !important; }
    `;
    document.head.appendChild(style);
    [
      'copy','cut','contextmenu','selectstart','mousedown','mouseup','keydown','keypress','dragstart'
    ].forEach(function(evt){
        document.addEventListener(evt,function(e){e.stopPropagation();},true);
    });

    // 采集题干与选项
    var items = document.querySelectorAll('.m-item');
    var all = [];
    items.forEach(function(item,i){
        var titleEl = item.querySelector('.examTitle p, .examTitle');
        var title = (titleEl ? titleEl.innerText.trim() : '题干未检测到');
        var ind = item.querySelector('.index');
        var index = ind ? ind.innerText.replace(/\D/g,'') : (i+1);
        var options = Array.from(item.querySelectorAll('.ivu-radio-wrapper, .ivu-checkbox-wrapper')).map(function(opt, oi){
            var optText = opt.innerText.trim();
            var label = String.fromCharCode(65 + oi);
            return label + '. ' + optText;
        });
        var full = '第' + index + '题：' + title + '\n';
        if(options.length) {
            full += options.join('\n');
        } else {
            var radioLabels = Array.from(item.querySelectorAll('.ivu-radio-group label, .ivu-radio-wrapper label'));
            if(radioLabels.length) {
                full += radioLabels.map(function(opt, oi){
                    var label = String.fromCharCode(65 + oi);
                    return label + '. ' + opt.innerText.trim();
                }).join('\n');
            }
        }
        all.push(full);
    });
    var result = all.join('\n\n------------------------------\n\n');
    // 小一点的文本框样式
    var ta = document.createElement('textarea');
    ta.style = 'width:60vw;height:16vh;position:fixed;bottom:10px;left:20vw;z-index:9999;font-size:14px;';
    ta.value = result;
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    alert('已生成小号文本框，Ctrl+C可复制。如嫌占屏，可手动关闭此对话框或直接删除文本框。');
})();
