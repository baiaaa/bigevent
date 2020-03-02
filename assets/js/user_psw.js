$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 自定义校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpass: function (val) {
            if (val == $('[name="oldPwd" ]').val()) {
                return '新旧密码不能相同';
            }
        },
        repass: function (val) {
            if (val !== $('[name="newPwd" ]').val()) {
                return '两次输入密码不相同';
            }
        }
    });
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('密码修改失败')
                }
                $('#reset').click();
                return layer.msg(res.message)

            }
        }
        );
    });
})