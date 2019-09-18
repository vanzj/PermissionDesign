var myTable;
$(function () {
    myTable = new TableInit();
    myTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
});
var currentRow;
var TableInit = function () {
    var myTableInit = new Object();
    //初始化Table
    myTableInit.Init = function () {
        $('#').bootstrapTable({
            url: '',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            singleSelect: true,                     // 单选checkbox  
            sortOrder: "asc",                   //排序方式
            queryParams: myTableInit.queryParams,//传递参数（*）
            queryParamsType: "",
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            //height: 630,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            detailView: false,                   //是否显示父子表
            columns: [
               ]
        });
    };
    //得到查询的参数
    myTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
           
        };
        return temp;
    };
    return myTableInit;
};
var ButtonInit = function () {
    var oInit = new Object();
    //初始化数据
    oInit.Init = function () {
      

    };
    return oInit;
};
var start = {
    elem: '#search_start',
    format: "YYYY-MM-DD hh:mm:ss",
    min: "2018-01-01 00:00:00",
    max: "2099-06-16 23:59:59",
    istime: false,
    istoday: true,
    choose: function (datas) {
        end.min = datas;
    }
};
var end = {
    elem: '#search_end',
    format: "YYYY-MM-DD  23:59:59",
    min: "2018-01-01 00:00:00",
    max: "2099-06-16 23:59:59",
    istime: false,
    istoday: true,
    choose: function (datas) {
        start.max = datas;
    }
};
Date.prototype.Format = function (fmt) { //author: wangf 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
