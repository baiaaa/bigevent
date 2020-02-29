$(function () {

    getUser();
    // 退出按钮
    $('#quit').on('click', function () {
        layer.confirm('确认要退出吗?', { icon: 3, title: '提示' }, function (index) {
            // 删除缓存
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    });
});
// 获取用户信息函数
function getUser() {
    var layer = layui.layer;
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        //  可以写在通用里面
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {

            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            setInfo(res.data);

        },
        // 不能随便进来,需要设置安全保障  但是不能每次都添加,需要放在公共区
        // complete: function (res) {
        //     if (res.status == 1 && res.message == '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    });
};
function setInfo(data) {
    // 设置欢迎字体
    var name = data.nickname || data.username;
    $('.welcome').text('你好,欢迎 ' + name);
    // 设置头像
    if (data.user_pic) {
        // 有图片则改为图片
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.textInfo').hide();

    } else {
        // 没有图片改成首字母
        name = name[0].toUpperCase();
        $('.textInfo').text(name).show();
        $('.layui-nav-img').hide();
    }

}