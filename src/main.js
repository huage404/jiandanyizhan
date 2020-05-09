const x = window.localStorage.getItem('x');
const xObject = JSON.parse(x);

const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' }
];

const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');


const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
}

const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                    <svg class="icon" viewBox="0 0 1024 1024"><path d="M895.423623 224.432539 607.855138 512l286.901289 297.699216 0.666172 85.723384-95.856162 0L512 607.856162 224.432539 895.423623l-95.856162 0 0-95.856162 287.567461-287.567461L128.576377 224.432539l0-95.856162 95.856162 0 287.567461 287.567461 287.567461-287.567461 95.856162 0L895.423623 224.432539z"></path></svg>
                    </div>
                </div>
            </li>
        `).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url);
        });
        // 阻止冒泡
        $li.on('click', '.close', (e) => {
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    });
}





render();


$('.addButton').on('click', () => {
    let url = window.prompt('请问你想添加的网址是什么');
    if (url.indexOf('http') !== 0) {
        url = 'http://' + url;
    }
    hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });
    render();
});


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    window.localStorage.setItem('x', string);
}

// 监听键盘事件
$(document).on('keypress', (e) => {
    const { key } = e;
    // for (let i = 0; i < hashMap.length; i++) {
    //     if (hashMap[i].logo.toLowerCase() === key) {
    //         window.open(hashMap[i].url);
    //     }
    // }
    console.log(key);
});