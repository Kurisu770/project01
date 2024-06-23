let valid_username = false;
let valid_password = false;
let valid_confirm = false;
let valid_address = false;
const pass = {
    border: "1px solid green"
}
const stop = {
    border: "1px solid red"
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
    if(isEmpty(username) === false) {
        //字母a-z gi 长度:1~11
        if (username.match(/^[a-zA-Z]{1,11}$/g)) {
            $('#username').css(pass);
            valid_username = true;
        } else {
            $('#username').css(stop);
        }
    } else {
        $('#username').css(original);
    }
}
function judgePassword(password) {
    if(isEmpty(password) === false) {
        //数字0~9,字母a-z gi 长度:8~15
        if(password.match(/^[a-zA-Z0-9]{8,15}$/g)) {
            $('#password').css(pass);
            valid_password = true;
        } else {
            $('#password').css(stop);
        }
    } else {
        $('#password').css(original);
    }
}
function judgeConfirm(confirm) {
    const password = document.querySelector('#password').value;
    if(isEmpty(confirm) === false) {
        //先判断password是否规范
        if(valid_password) {
            //指向password
            if (confirm === password) {
                $('#confirm').css(pass);
                valid_confirm = true;
            } else {
                $('#confirm').css(stop);
            }
        }
    } else {
        $('#confirm').css(original);
    }
}
function judgeAddress(address) {
    if(isEmpty(address) === false) {
        //数字0~9,字母a-z,@.com gi 长度:不限
        if (address.match(/^([a-zA-Z0-9])+\@([a-zA-Z0-9])+\.([a-zA-Z)]{2,8})$/g)) {
            $('#address').css(pass);
            valid_address = true;
            let iconCheck = document.createElement('img');
            iconCheck.setAttribute('src', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAASRJREFUaEPt1tsNwjAMBVB3E9gENmETxCQwCqMwCr1SLUUoJLFrJ43kfqKYnN46j4UmfJYJzRToXl8tko6kCwlEe0R7RHv06oFI2i/pExF9Wv7+KFvecwXfiOjcAj8CmsEcchU+Gv0LBvxNRNdSm4xEq8B4mVFoNXgUehd4BHo3uDfaBNwTbQbWoHFq3dcF/Gg5BLZtyxQsRQMMwGUDYy+tHbvmYAmaE8ZRyw/AJbgLWILGWLQF0HiBGtwNLEW3wl3BGnQNzl8jvTpU7xIt19F0jPYYz7VKbm5zsDZpxtXgLuC96H+tgt/dwBboHNwVbIVO4bx3S9eWaLx2IeYmwR7+Es2uHGyJVhLkZYGWZ6ariKR1ucmrIml5ZrqKSFqXm7xqyqS/ogg6LjVCDSMAAAAASUVORK5CYII=");
            document.getElementById('username').appendChild(iconCheck);
        } else {
            $('#address').css(stop);
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
        const alert_close = document.querySelector('.register_error-alert');
        container.style.opacity = 0.3;
        alert.style.display = 'block';
        alert.style.border = "1px solid black";
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

//规划1: judge判断标准修改 tick
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
