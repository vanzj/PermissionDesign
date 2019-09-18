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
var editValidate;
function EditReset() {
    editValidate.resetForm();
    $(".form-group").removeClass("has-error").removeClass("has-success");
}
$().ready(function () {
    var e = "<i class='fa fa-times-circle'></i> ";
    //添加表单验证
    editValidate = $("#editForm").validate({
        rules: {
            editRoleName: {
                required: !0,
                minlength: 2,
                maxlength: 40,
                remote: {
                    
                }
            }
        },
        messages: {
            editRoleName: {
                required: e + "请输入角色名称",
                minlength: e + "角色名称必须2个字符以上",
                maxlength: e + "角色名称长度超过限制",
                remote: ""
            }
        }
    })
});