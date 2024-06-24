let valid_username = false;
let valid_password = false;
let valid_confirm = false;
let valid_address = false;
//插入图标从这里开始,可以优化的部分
let valid_u = document.querySelector('.valid_u');
let valid_p = document.querySelector('.valid_p');
let valid_c = document.querySelector('.valid_c');
let valid_a = document.querySelector('.valid_a');
let invalid_u = document.querySelector('.invalid_u');
let invalid_p = document.querySelector('.invalid_p');
let invalid_c = document.querySelector('.invalid_c');
let invalid_a = document.querySelector('.invalid_a');
//-----------------------到这里
const pass = {
    borderBottom: "1px solid green"
}
const stop = {
    borderBottom: "1px solid red"
}
const original = {
    border: "none",
    borderBottom: "2px solid rgba(41,126,166,50%)"
}
function isEmpty(str) {
    if(str == null || str === '') {
        return true;
    }
    //另一种写法:if(str == undefined || str === ''){}  因为js当中null和undefined的值相同, 只是类型不同
    return false;
}
function judgeUsername(username) {
    valid_u.style.opacity = 0;
    invalid_u.style.opacity = 0;
    if(isEmpty(username) === false) {
        //字母a-z gi 长度:1~11
        if (username.match(/^[a-zA-Z]{1,11}$/g)) {
            $('#username').css(pass);
            valid_username = true;
            valid_u.style.opacity = 1;
        } else {
            $('#username').css(stop);
            invalid_u.style.opacity = 1;
        }
    } else {
        $('#username').css(original);
    }
}
function judgePassword(password) {
    valid_p.style.opacity = 0;
    invalid_p.style.opacity = 0;
    if(isEmpty(password) === false) {
        //数字0~9,字母a-z gi 长度:8~15
        if(password.match(/^[a-zA-Z0-9]{8,15}$/g)) {
            $('#password').css(pass);
            valid_password = true;
            valid_p.style.top = 105 + 'px';
            valid_p.style.opacity = 1;
        } else {
            $('#password').css(stop);
            invalid_p.style.top = 105 + 'px';
            invalid_p.style.opacity = 1;
        }
    } else {
        $('#password').css(original);
    }
}
function judgeConfirm(confirm) {
    valid_c.style.opacity = 0;
    invalid_c.style.opacity = 0;
    const password = document.querySelector('#password').value;
    if(isEmpty(confirm) === false) {
        //先判断password是否规范
        if(valid_password) {
            //指向password
            if (confirm === password) {
                $('#confirm').css(pass);
                valid_confirm = true;
                valid_c.style.top = 195 + 'px';
                valid_c.style.opacity = 1;
            } else {
                $('#confirm').css(stop);
                invalid_c.style.top = 195 + 'px';
                invalid_c.style.opacity = 1;
            }
        }
    } else {
        $('#confirm').css(original);
    }
}
function judgeAddress(address) {
    valid_a.style.opacity = 0;
    invalid_a.style.opacity = 0;
    if(isEmpty(address) === false) {
        //数字0~9,字母a-z,@.com gi 长度:不限
        if (address.match(/^([a-zA-Z0-9])+\@([a-zA-Z0-9])+\.([a-zA-Z)]{2,8})$/g)) {
            $('#address').css(pass);
            valid_address = true;
            valid_a.style.top = 285 + 'px';
            valid_a.style.opacity = 1;
        } else {
            $('#address').css(stop);
            invalid_a.style.top = 285 + 'px';
            invalid_a.style.opacity = 1;
        }
    } else {
        $('#address').css(original);
    }
}
let signup = document.querySelector('.signup');
signup.addEventListener('click', function showPop() {
    const container = document.querySelector('.container');
    const popup = document.querySelector('.popup');
    const transition = document.querySelector('.transition');
    if (valid_username && valid_password && valid_confirm && valid_address) {
        //隐藏用户登录注册交互页面, 显示"弹窗"
        container.style.display = 'none';
        popup.style.display = 'flex';
        //获取用户名字, 插入"弹窗"里
        transition.textContent = "Welcome to Utopia, " + document.querySelector('#username').value + "....";
    } else {
        const alert = document.querySelector('.register_error-alert');
        const alert_close = document.querySelector('.register_error-alert-close');
        container.style.opacity = 0.3;
        alert.style.display = 'block';

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
            alert.style.display = 'none';
            container.style.opacity = 1;
        });
    }
});
//动态切换登录注册页面
let convert = document.querySelector('.convert');
convert.addEventListener('click', function convertDisplay() {
    const content = document.querySelector('.content');
    const content_side = document.querySelector('.content-side');
    const second_content = document.querySelector('.second_content');
    content.style.transform = 'translateX(-100%)';
    content_side.style.transform = 'translateX(-49.3%)';
    second_content.style.transform = 'translateX(-100%)';
    convert.textContent = "注册";
    convert.style.left = 115 + 'px';
    if(convert.textContent === "注册") {
        convert.addEventListener('click', function reConvertDisplay() {
            content.style.transform = 'none';
            content_side.style.transform = 'none';
            second_content.style.transform = 'none';
            convert.textContent = "登录";
            convert.style.right = -815 + 'px';
        });
    }
});

//规划1: judge判断标准修改 弹窗样式 tick
//规划2: pass,stop丰富反馈(插入图标)
//规划3: clearButton样式制作,以及focus显示,blur隐藏(j)
//规划4: 开始制作登录页面，交互切换, 新思路: 把切换button做成a link, 点击跳转到second_content,设置scroll-behaviour:smooth, 因为已经有overflow hidden的缘故会不会从右往左shift, 值得尝试
//规划5: 用js插入一段animation, animation改变注册页面click事件后的popup背景
//规划6: 获取元素的宽, 然后导入一个带自适应宽度算法的css变量()

/*let input = document.querySelector('input');
input.addEventListener('input', function showClearButton() {
    alert(input.value);
    let clearButton_username = document.querySelector('#clear_username');
    let clearButton_password = document.querySelector('#clear_password');
    let clearButton_confirm = document.querySelector('#clear_confirm');
    let clearButton_address = document.querySelector('#clear_address');
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirm = document.getElementById('confirm').value;
    let address = document.getElementById('address').value;
    if(isEmpty(username === false)) {
        clearButton_username.style.display = 'block';
    }
    if(isEmpty(password === false)) {
        clearButton_password.style.display = 'block';
    }
    if(isEmpty(confirm === false)) {
        clearButton_confirm.style.display = 'block';
    }
    if(isEmpty(address === false)) {
        clearButton_address.style.display = 'block';
    }
});*/

