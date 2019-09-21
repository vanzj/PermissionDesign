// JavaScript Document
//支持Enter键登录
document.onkeydown = function (e) {
    if ($(".bac").length == 0) {
        if (!e) e = window.event;
        if ((e.keyCode || e.which) == 13) {
            var obtnLogin = document.getElementById("submit_btn")
            obtnLogin.focus();
        }
    }
}
$(function () {
    //login
    $("#submit_btn").click(function () {
        if ($("#username").val() == '') {
            show_err_msg('用户名还未填写');
            return;
        }
        else if ($("#password").val() == '') {
            show_err_msg('密码未填');
            return;
        }
        else {
            $.ajax(
                {
                    type: 'POST',
                    dataType: 'Json',
                    url: 'Login',
                    async: false,
                    data: $('#login_form').serialize(),
                    success: function (data) {
                        if (data.result == true) {
                            alert("chenggong")
                            window.location.href = "/Index.html";
                        }
                        else {
                            $('#username').val() = '';
                            $('#password').val() = '';
                            show_err_msg(data.data)
                        }
                    }
                }
            );
        }



    })
});