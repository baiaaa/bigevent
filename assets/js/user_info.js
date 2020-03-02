$(function () {
    var layer = layui.layer;
    var form = layui.form;

    // 初始化表单函数
    function initMeg() {
        $.get('/my/userinfo', function (res) {
            if (res.status !== 0) {
                return layer.msg('获取信息失败!');
            }
            // 快速表单赋值
            form.val('f1', res.data);
        });
    };
    // 加载页面就初始化
    initMeg();


    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        form.verify({
            // 自定义表单验证属性
            usnane: [
                /^[\S]{2,6}$/
                , '用户昵称必须2到6位，且不能出现空格'
            ]
        });
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {

                    return layer.msg(res.message)
                }
                // 成功的话页面就初始化
                layer.msg(res.message);
                initMeg()
                window.parent.getUser();
            }
        })

    })
    $('.reset').on('click', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 重新获取用户信息
        initMeg();
    });
})