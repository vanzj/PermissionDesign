$(function () {
    //判断是否是登录状态，不是的话回到登录页面
    $.ajax(
        {
            type: 'POST',
            dataType: 'Json',
            url: '\Login\GetIsLoging',
            success: function (data) {
                if (data != "1") {
                    window.location.href = "/Login/index.html";
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
                url: 'LoginOut',
                success: function (data) {

                }
            }
        );
    })
    //更新登录状态
    $(function () {
        /* 鼠标移动事件 */
        $(document).mouseup(function () {
            $.ajax(
                {
                    type: 'POST',
                    dataType: 'Json',
                    url: 'UpdateIsLoging',
                    success: function (data) {

                    }
                }
            );
        });
    });

})