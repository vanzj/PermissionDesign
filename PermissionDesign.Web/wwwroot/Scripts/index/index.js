$(function () {
    //判断是否是登录状态，不是的话回到登录页面
    $.ajax(
        {
            type: 'POST',
            dataType: 'Json',
            url: '/Login/GetIsLoging',
            success: function (data) {
                if (data != "1") {
                    window.location.href = "/Login/Index";
                }
            }
        }
    );

    //LoginOut
    $("#quit_click").click(function () {
        $.ajax(
            {
                type: 'POST',
                dataType: 'Json',
                url: '/Login/LoginOut',
                success: function (data) {
                    if (data == "true") {
                        window.location.href = "/Login/Index";
                                }
                }
            }
        );
    })
    //更新登录状态

    $(document).mouseup(function () {
        $.ajax(
            {
                type: 'POST',
                dataType: 'Json',
                url: '/Login/UpdateIsLoging',
                success: function (data) {

                }
            }
        );
    });
});

