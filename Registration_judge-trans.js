const address = document.getElementById("address");
const alert_close = document.querySelector('.register_error-alert-close');
const alertContent = document.querySelector('.register_error-alert');
const animatedBackground = document.getElementById('animated-background');
const clearButton = document.querySelectorAll('.clearButton');
const confirm = document.getElementById('confirm');
const container = document.querySelector('.container');
const inline_animation = document.querySelector(".inline-animation");
const password = document.getElementById('password');
const popup = document.querySelector('.popup');
const signup = document.querySelector('.signup');
const transition = document.querySelector('.transition');
const username = document.getElementById('username');
let valid_username = false;
let valid_password = false;
let valid_confirm = false;
let valid_address = false;
//插入图标从这里开始,可以优化的部分(优化次数: 1)
const valid = document.querySelectorAll('.valid');
const invalid = document.querySelectorAll('.invalid');
//-----------------------到这里
const pass = {
    borderBottom: "1px solid green"
}
const stop = {
    borderBottom: "1px solid red"
}
const original = {
    borderBottom: ""
}

function isNotEmpty(str) {
    if(str == null || str === '') {
        return false;
    }
    //另一种写法:if(str == undefined || str === ''){}  因为js当中null和undefined的值相同, 只是类型不同
    return true;
}

function judgeUsername(username) {
    //每次触发onblur事件时让check/error可见度归零，避免从错误更改到正确时的图标重叠(#该点存疑)(已在下方解答)(每次focus事件时清除重新判断，有focus就必然有blur)
    //valid[0].style.opacity = 0;
    //invalid[0].style.opacity = 0;
    //触发blur, 隐藏clearButton
    clearButton[0].style.opacity = 0;
    if(isNotEmpty(username)) {
        //字母a-z gi 长度:1~11
        if (username.match(/^[a-zA-Z0-9]{1,11}$/g)) {
            $('#username').css(pass);
            valid_username = true;
            valid[0].style.opacity = 1;
            //保存最后一次输入的*合法数据*
            localStorage.setItem('username', username);
            return true;
        } else {
            $('#username').css(stop);
            invalid[0].style.opacity = 1;
            return false;
        }
    } else {
        $('#username').css(original);
    }
}
function judgePassword(password) {
    if(isNotEmpty(password)) {
        //数字0~9,字母a-z gi 长度:8~15
        if(password.match(/^[a-zA-Z0-9]{8,15}$/g)) {
            $('#password').css(pass);
            valid_password = true;
            valid[1].style.opacity = 1;
            return true;
        } else {
            $('#password').css(stop);
            invalid[1].style.opacity = 1;
            return false;
        }
    } else {
        $('#password').css(original);
    }
}
function judgeConfirm(confirm) {
    const password = document.querySelector('#password').value;
    if(isNotEmpty(confirm)) {
        //先判断password是否规范
        if(valid_password) {
            //指向password
            if (confirm === password) {
                $('#confirm').css(pass);
                valid_confirm = true;
                valid[2].style.opacity = 1;
                return true;
            } else {
                $('#confirm').css(stop);
                invalid[2].style.opacity = 1;
                return false;
            }
        }
    } else {
        $('#confirm').css(original);
    }
}
function judgeAddress(address) {
    clearButton[1].style.opacity = 0;
    if(isNotEmpty(address)) {
        //数字0~9,字母a-z,@.com gi 长度:不限
        if (address.match(/^([a-zA-Z0-9])+\@([a-zA-Z0-9])+\.([a-z)]{2,8})$/g)) {
            $('#address').css(pass);
            valid_address = true;
            valid[3].style.opacity = 1;
            localStorage.setItem('address', address);
            return true;
        } else {
            $('#address').css(stop);
            invalid[3].style.opacity = 1;
            return false;
        }
    } else {
        $('#address').css(original);
    }
}
signup.addEventListener('click', function showPop() {
    if (valid_username&&valid_password&&valid_confirm&&valid_address&&judgeUsername(username.value)&&judgePassword(password.value)&&judgeConfirm(confirm.value)&&judgeAddress(address.value)) {
        //隐藏用户登录注册交互页面, 显示"弹窗"
        container.style.display = 'none';
        popup.style.display = 'flex';
        //将用户名字插入"弹窗"里
        transition.textContent = "Welcome to Utopia, " + username.value + "....";
        animatedBackground.className = "background-2";
        inline_animation.addEventListener("animationend", function next() {
            //setTimeout函数的第一个传参可以是已有的函数也可以是新函数，也就是里面有执行代码块内容的
            setTimeout(function () {location.assign("http://localhost:63342/HTML/HC%20beginner/Tag/Sidebar.html?_ijt=v4p2u95pd3v9qqjiu03eln0g3e&_ij_reload=RELOAD_ON_SAVE");}, 1000);
        });
    } else {
        container.style.opacity = 0.3;
        container.style.filter = "blur(3px)";
        alertContent.style.display = 'block';
        //js制作animation动画的思路: *明白动画的本质,把它当成一个元素的逐帧(px)迭代, 比如说要将一个元素从top0移动到top200, 设置一个计数器, 把他从0迭代到200*
        /*let pos = 0;
        let iteration = setInterval(animation,10);
        function animation() {
            if(pos === 20) {
                clearInterval(iteration)
            } else {
                pos++;
                alert.style.top = pos + 'px';
            }
        }
         */
        alert_close.addEventListener('click', function closeAlert() {
            container.style.opacity = 1;
            container.style.filter = "none";
            alertContent.style.display = 'none';
        });
    }
});
function usernameFocus(username) {
    //在focus时不显示check/error(代替了上方blur时清除图标可见度的效果)
    valid[0].style.opacity = 0;
    invalid[0].style.opacity = 0;
    //focus时如果有内容则显示按钮
    if(isNotEmpty(username)) {
        clearButton[0].style.opacity = 1;
    }
}
function passwordFocus() {
    valid[1].style.opacity = 0;
    invalid[1].style.opacity = 0;
}
function confirmFocus() {
    valid[2].style.opacity = 0;
    invalid[2].style.opacity = 0;
}
function addressFocus(address) {
    valid[3].style.opacity = 0;
    invalid[3].style.opacity = 0;
    if(isNotEmpty(address)) {
        clearButton[1].style.opacity = 1;
    }
}
//清除按钮显示场景: input聚焦,value修改时, value不为空时, 用oninput事件是因为当前情况修改value时必须聚焦, oninput是更好的动态监测, 触发频率更频繁, 而focus事件只能从第二次触发,
//因为第一次触发isEmpty(value)必然是true,也就意味着是空字符串, 进入else语句(无论如何都不显示)
function showUsernameClearButton(username) {
    clearButton[0].style.opacity = 1;
    if(isNotEmpty(username) === false) {
        clearButton[0].style.opacity = 0;
    }
}
function showAddressClearButton(address) {
    clearButton[1].style.opacity = 1;
    if(isNotEmpty(address) === false) {
        clearButton[1].style.opacity = 0;
    }
}
//clearButton的click事件监测
function clearTextInput_username() {
    username.value = '';
    username.focus();
}
function clearTextInput_address() {
    address.value = '';
    address.focus();
}
//监测浏览器页面的刷新, 自动填写用户名以及地址为最后一次的输入信息(如果存在的话)
window.addEventListener('load', function reloadAutoComplete() {
    const username_data = localStorage.getItem('username');
    const address_data = localStorage.getItem('address');
    if(username_data) {
        username.value = username_data;
    }
    if(address_data) {
        address.value = address_data;
    }
});


//规划1: judge判断标准修改 弹窗样式 -tick-
//规划2: pass,stop丰富反馈(插入图标) -tick-
//规划3: clearButton样式制作,以及focus显示,blur隐藏(j)   *进度: 以实现第二次focus时显示, 因为目的是有内容时显示清除按钮, 但是第一次focus时又不可能有内容, 所以就算输入内容也不会显示(可能要引入input方法监听)
//      待完善: 1.如上 2.click事件清除内容(预计使用空文档覆盖input value)* (这里直接给input value 赋值null) -tick- ?第一次触发click事件页面为什么会刷新, 无论哪个button
//规划4: 利用localStorage存储用户最后一次输入的有效数据(setItem放在judge方法内部，只要一输入有效数据就保存), 页面刷新时自动赋值给对应input框 -tick-
//规划4: 开始制作登录页面，交互切换, 新思路: 把切换button做成a link, 点击跳转到second_content,设置scroll-behaviour:smooth, 因为已经有overflow hidden的缘故会不会从右往左shift, 值得尝试  -此项先略
//规划5: 用js插入一段animation, animation改变注册页面click事件后的popup背景 ?如何制作无限流动背景 预计完成时间6/27 -tick-
//规划6: 获取元素的宽, 然后导入一个带自适应宽度算法的css变量() 预计完成时间6/28 方案: transition调成块级元素, js设置其宽为常驻语句的宽+username.value的length -有待商榷
//规划7: 优化: 变量上升 6/28 -tick-
