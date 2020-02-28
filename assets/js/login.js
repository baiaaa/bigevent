$(function () {
    // 点击切换登录注册页面
    $('.signBox').hide();
    // 点击登录
    $('#sign').on('click', function () {
        $('.signBox').hide();
        $('.inbox').show();
    });
    // 点击注册
    $('#in').on('click', function () {
        $('.inbox').hide();
        $('.signBox').show();
    });
    // 阻止注册表单的默认提交
    $('#signForm').on('submit', function (e) {
        e.preventDefault();
        var data = $('#signForm').serialize();
        // 提交ajax
        $.ajax({
            type: 'POST',
            url: "http://www.liulongbin.top:3007/api/reguser",
            data: data,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 注册成功
                layer.msg(res.message);
                // 跳转到登录界面
                $('#sign').click();
            }
        });
    });
    // 阻止登录表单
    $('#inForm').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax(
            {
                type: 'POST',
                url: 'http://www.liulongbin.top:3007/api/login',
                data: data,
                success: function (res) {
                    if (res.status !== 0) { return layer.msg(res.message) };
                    layer.msg(res.message);
                    localStorage.setItem('token', res.token);
                    location.href = 'index.html';
                }
            }

        );
    });
    var form = layui.form;
    var layer = layui.layer;
    // 设置form属性
    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repsw: function (value) {
            if (value != $('.signBox [name=password]').val().trim()) {
                return '密码不相同';
            }
        }
    });

})
