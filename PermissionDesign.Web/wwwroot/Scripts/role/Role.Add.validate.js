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
            RoleName: {
                required: !0,
                minlength: 2,
                maxlength: 40,
                remote: {
                    
                }
            },
            RoleEncoding: {
                required: !0,
                minlength: 2,
                maxlength: 25,
                remote: {
                    
                }
            }
        },
        messages: {
            RoleName: {
                required: e + "请输入角色名称",
                minlength: e + "角色名称必须2个字符以上",
                maxlength: e + "角色名称长度超过限制",
                remote: ""
            },
            RoleEncoding: {
                required: e + "请输入角色识别码",
                minlength: e + "角色识别码必须2个字符以上",
                maxlength: e + "角色识别码长度超过限制",
                remote: ""
            }
        }
    })
});