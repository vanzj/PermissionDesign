$.validator.setDefaults({
    highlight: function (e) {
        $(e).closest(".form-group").removeClass("has-success").addClass("has-error")
    }, success: function (e) {
        e.closest(".form-group").removeClass("has-error").addClass("has-success")
    }, errorElement: "span",
    errorPlacement: function (e, r) {
        e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent())
    }, errorClass: "help-block m-b-none",
    validClass: "help-block m-b-none"
});
var validate;//验证对象
//重置表单样式至初始样式
function Reset() {
    validate.resetForm();
    $(".form-group").removeClass("has-error").removeClass("has-success");
}
$().ready(function () {
    var e = "<i class='fa fa-times-circle'></i> ";
    //添加表单验证
    validate = $("#addForm").validate({
        rules: {
            LoginAccount: {
                required: !0,
                minlength: 2,
                maxlength: 40,
                remote: {
                    
                }
            }
        },
        messages: {
            LoginAccount: {
                required: e + "请输入用户账号",
                minlength: e + "用户账号必须2个字符以上",
                maxlength: e + "用户账号长度超过限制",
                remote: ""
            }
        }
    })
});