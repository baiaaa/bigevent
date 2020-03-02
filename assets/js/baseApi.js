$(function () {
    $.ajaxPrefilter(function (option) {
        // 统一更改端口号
        option.url = 'http://www.liulongbin.top:3007' + option.url;
        // 判断是否需要获取信息
        if (option.url.indexOf('/my/')) {
            option.headers = {
                Authorization: localStorage.getItem('token')
            }
            option.complete = function (res) {

                if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
                    localStorage.removeItem('token');
                    location.href = '/login.html'
                }
            }
        }
    })

})