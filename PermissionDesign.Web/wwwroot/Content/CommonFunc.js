var Common = {
    showMsg: function (message, callback, title) {
        var html = '';
        if (title == '' || title == undefined) {
            title = '消息提示';
        }
        if ($('#common_modal_msg').length == 0) {
            html = '<div class="modal fade" data-backdrop="static"';
            html += 'style="display: table;height: 100%;background-color:transparent; margin: 0px auto;width: 50%;"';
            html += ' id = "common_modal_msg" > ';
            html += '</div>';
            $('body').append(html);
        }
        html = '<div class="modal-dialog" style="display: table-cell; vertical-align: middle;">';
        html += '<div class="modal-content" style="width:25%;margin: 0px auto;" >';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        html += '<h4 class="modal-title">' + title + '</h4>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<label for="eventName" style="word-break:break-all;font-weight:400;">' + message + '</label>';
        html += '</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btn btn-alt btn-sm" style="float:right;color: #fff;background-color: #337ab7;border-color: #2e6da4;" id="common_modal_msg_ok" data-dismiss="modal">确定</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $('#common_modal_msg').empty().append(html).modal('show');

        $('#common_modal_msg').find('#common_modal_msg_ok').bind('click', function () {
            $('#common_modal_msg').modal('hide');
            if (message != undefined && message.indexOf('请先登录') > 0) {
                var returnUrl = encodeURIComponent(window.location.href);
                window.location.href = '/Home/Login?returnUrl=' + returnUrl;
                return;
            }
            if (callback != undefined && callback != null) {
                callback();
            }
        });
    },
    confirm: function (message, callback, title) {
        var html = '';
        if (title == '' || title == undefined) {
            title = '操作确认';
        }

        if ($('#common_modal_confirm').length == 0) {
            html = '<div class="modal fade" data-backdrop="static" ';
            html += 'style="display: table;height: 100%;background-color:transparent; margin: 0px auto;width: 50%;"';
            html += ' id = "common_modal_confirm" > ';
            html += '</div>';
            $('body').append(html);
        }

        html = '<div class="modal-dialog" style="display: table-cell; vertical-align: middle;">';
        html += '<div class="modal-content" style="width:25%;margin: 0px auto;" >';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        html += '<h4 class="modal-title">' + title + '</h4>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<label for="eventName" style="word-break:break-all;font-weight:400;">' + message + '</label>';
        html += '</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btn btn-alt btn-sm m-r-5 pull-right" id="model_btn_ok" style="color: #fff;background-color: #337ab7;border-color: #2e6da4;" data-dismiss="modal">确定</button>';
        html += '<button type="button" class="btn btn-alt btn-sm m-r-5 pull-right" data-dismiss="modal" style="margin-right: 6px; color: #fff;background-color: #337ab7;border-color: #2e6da4;">取消</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $('#common_modal_confirm').empty().append(html).modal('show');

        $('#common_modal_confirm').find('#model_btn_ok').bind('click', function () {
            if (callback != undefined) {
                callback();
            }
            $('#common_modal_confirm').modal('hide');
        });
    },
    setCookie: function (name, value, time) {
        var exp = new Date();
        exp.setTime(exp.getTime() + time);
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString();
    },
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = Common.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + escape(cval) + ";expires=" + exp.toUTCString() + ";path=/";
    },
    TimePicker: function (element, callback, disabledHour) {
        if (disabledHour == undefined) {
            disabledHour = false;
        }

        function getIndex(val, data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i] == val) {
                    return i;
                }
            }
            return 0;
        }

        var $e = $('#' + element);
        var hours = [];
        var minutes = [];
        var second = [];
        for (var i = 0; i < 24; i++) {
            if (i < 10) {
                hours.push('0' + i);
            } else {
                hours.push(i.toString());
            }
        }
        for (var i = 0; i < 60; i++) {
            if (i < 10) {
                minutes.push('0' + i);
                second.push('0' + i);
            } else {
                minutes.push(i.toString());
                second.push(i.toString());
            }
        }
        var html = '<div class="st-time">';
        html += '<div class="st-time-body">';

        if (disabledHour == false) {
            html += '<div class="st-time-panel">';//st-time-hour
            html += '<div>';
            html += '<span></span>';
            html += '</div>';
            html += '<div id="st_time_hour" data-type="h" class="st-time-cur">';
            html += '<span></span>';
            html += '</div>';
            html += '<div>';
            html += '<span></span>';
            html += '</div>';
            html += '</div>';
        }

        html += '<div class="st-time-panel">';//st-time-minutes
        html += '<div>';
        html += '<span></span>';
        html += '</div>';
        html += '<div id="st_time_minute" data-type="m" class="st-time-cur">';
        html += '<span></span>';
        html += '</div>';
        html += '<div>';
        html += '<span></span>';
        html += '</div>';
        html += '</div>';

        html += '<div class="st-time-panel">';//st-time-second
        html += '<div>';
        html += '<span></span>';
        html += '</div>';
        html += '<div id="st_time_second" data-type="s" class="st-time-cur">';
        html += '<span></span>';
        html += '</div>';
        html += '<div>';
        html += '<span></span>';
        html += '</div>';
        html += '</div>';

        html += '</div>';
        html += '</div>';
        html += '<span class="ft12 pull-right" style="color:chartreuse;margin-right: 5em;">* &nbsp;请将鼠标移入功能区，使用鼠标滚轮选择时间</span>';
        $e.empty().append(html);

        var time = $e.data('time');
        if (time == undefined) {
            time = ['00', '00', '00'];
            $e.data('time', time);
        }
        //时
        var $e_hour = $e.find('#st_time_hour');
        if (disabledHour == false) {
            var $cur_hour = $e_hour.find('span');
            var $pre_hour = $e_hour.parent().children('div').first().find('span');
            var $next_hour = $e_hour.next('div').find('span');

            var init_index_hour = getIndex(time[0], hours);

            $pre_hour.html(hours[init_index_hour - 1 < 0 ? hours.length - 1 : init_index_hour - 1]);
            $cur_hour.html(hours[init_index_hour]);
            $next_hour.html(hours[init_index_hour + 1 >= hours.length ? 0 : init_index_hour + 1]);
        }
        //分
        var $e_minute = $e.find('#st_time_minute');
        var $cur_minute = $e_minute.find('span');
        var $pre_minute = $e_minute.parent().children('div').first().find('span');
        var $next_minute = $e_minute.next('div').find('span');

        var init_index_minute = getIndex(time[1], minutes);

        $pre_minute.html(minutes[init_index_minute - 1 < 0 ? minutes.length - 1 : init_index_minute - 1]);
        $cur_minute.html(minutes[init_index_minute]);
        $next_minute.html(minutes[init_index_minute + 1 >= minutes.length ? 0 : init_index_minute + 1]);
        //秒
        var $e_second = $e.find('#st_time_second');
        var $cur_second = $e_second.find('span');
        var $pre_second = $e_second.parent().children('div').first().find('span');
        var $next_second = $e_second.next('div').find('span');

        var init_index_second = getIndex(time[2], second);

        $pre_second.html(second[init_index_second - 1 < 0 ? second.length - 1 : init_index_second - 1]);
        $cur_second.html(second[init_index_second]);
        $next_second.html(second[init_index_second + 1 >= second.length ? 0 : init_index_second + 1]);

        //var type = ['h','m','s'];//时 分 秒
        var data = [];
        //鼠标事件监听 -- 依赖 <script src="~/Content/Common/plugins/mousewheel/jquery.mousewheel.min.js"></script>
        $e.find('.st-time-cur').bind('mousewheel', function (event, delta) {
            var $cur = $(this).find('span');
            var $pre = $(this).parent().children('div').first().find('span');
            var $next = $(this).next('div').find('span');

            switch ($(this).data('type')) {
                case 'h':
                    data = hours;
                    break;
                case 'm':
                    data = minutes;
                    break;
                case 's':
                    data = second;
                    break;
            }
            var cur_html = $cur.html();
            var cur_index = getIndex(cur_html, data);

            var pre_index = 0;
            var next_index = 0;

            // 1向上 -1向下
            if (delta == 1) {
                cur_index--;
                if (cur_index < 0) {
                    cur_index = data.length - 1;
                }
                pre_index = cur_index - 1;
                next_index = cur_index + 1;
            } else {
                cur_index++;
                if (cur_index >= data.length) {
                    cur_index = 0;
                }
                pre_index = cur_index - 1;
                next_index = cur_index + 1;
            }

            if (pre_index < 0) {
                pre_index = data.length - 1;
            }

            if (next_index >= data.length) {
                next_index = 0;
            }
            $cur.html(data[cur_index]);
            $pre.html(data[pre_index]);
            $next.html(data[next_index]);

            data = [];
            cur_index = 0;
            pre_index = 0;
            next_index = 0;

            var hour = '00';
            if (disabledHour == false) {
                hour = $e_hour.find('span').html();
            }

            $e.data('time', [hour, $e_minute.find('span').html(), $e_second.find('span').html()]);
            if (callback != undefined) {
                callback(hour, $e_minute.find('span').html(), $e_second.find('span').html());
            }
        });
    },
    TablePage: function (domId, data, header, pagesize, pagenum, tableclass) //domId:存放table数据的divId,data:数据源，header:列名,pagesize:单页显示条数,pagenum:页码,count:数据总量,tableclass:表格class
    {
        DataPage.InitTable(domId, data, header, pagesize, pagenum, tableclass);
    },
    Upload: function (element, ext) {

        if (ext == undefined) {
            ext = ['jpg', 'png', 'jpeg'];
        }

        var $e = $('#' + element);
        var file = $e.data('file');
        var file_name = file.substring(file.lastIndexOf('/') + 1);

        var options = {
            language: 'zh',
            textEncoding: 'UTF-8',
            allowedFileExtensions: ext,
            uploadUrl: '/common/uploadimage', // server upload action
            uploadAsync: true,
            autoReplace: true,
            maxFileCount: 1,
            maxFileSize: 10240,
            maxFilePreviewSize: 10240,
            //maxImageWidth: '200px',
            //maxImageHeight:'200px',
            showBrowse: true,
            browseLabel: '选择...',
            browseClass: 'btn btn-alt', //按钮样式
            showRemove: true,
            removeLabel: '',
            removeTitle: '',
            removeClass: 'btn btn-alt',
            showUpload: false,
            showUploadedThumbs: false,
            showCancel: false,
            showCaption: false,
            showPreview: true,
            browseOnZoneClick: false,
            dropZoneEnabled: false,
            showClose: false,
            msgUploadEnd: '',
            msgProgress: '',
            required: true,
            msgSelected: '',
            msgZoomModalHeading: '详细预览',
            msgInvalidFileType: '不正确的文件类型',
            msgInvalidFileExtension: '不正确的文件扩展名!仅支持 "{extensions}"',
            msgFileNotReadable: '文件 {name} 不可读',
            msgFileSecured: '安全限制!为了防止读取文件 "{name}"',
            msgFileNotFound: '文件 "{name}" 未找到!',
            msgFilesTooLess: '你必须选择最少 <b>{n}</b> {files} 来上传.',
            msgSizeTooLarge: '文件 "{name}" (<b>{size} KB</b>) 超过了允许大小 <b>{maxSize} KB</b>',
            msgImageWidthLarge: '图像文件 "{name}" 的宽度不能超过 {size} 像素',
            msgImageHeightLarge: '图像文件 "{name}" 的高度不能超过 {size} 像素',
            mainClass: 'input-group-sm',
            previewClass: 'cus-preview',
            //frameClass:'cus-init-preview',
            fileActionSettings: {
                showRemove: false,
                showUpload: false,
                showDrag: false,
                showZoom: false,
                zoomTitle: '预览',
                indicatorNew: '<i style="opacity:0;" class ="glyphicon glyphicon-hand-down text-warning"> </i>',
                indicatorSuccess: '<i style="opacity:0;" class ="glyphicon glyphicon-ok-sign file-icon-large text-success"> </i>',
                indicatorError: '<i style="opacity:0;" class ="glyphicon glyphicon-exclamation-sign text-danger"> </i>',
                indicatorLoading: '<i style="opacity:0;" class ="glyphicon glyphicon-hand-up text-muted"> </i>',
                indicatorNewTitle: '尚未上传',
                indicatorSuccessTitle: '已上传',
                indicatorErrorTitle: '上传错误',
                indicatorLoadingTitle: '上传...',
            },
            previewFileExtSettings: {},
            previewZoomButtonTitles: {
                prev: '预览上一个文件',
                next: '预览下一个文件',
                toggleheader: '缩放',
                fullscreen: '全屏',
                borderless: '无边界模式',
                close: '关闭当前预览'
            },
            overwriteInitial: true,
            initialPreviewCount: 1,
            initialPreviewFileType: 'image',
            initialPreviewAsData: true,
            initialPreview: [file],
            initialCaption: file_name,
            initialPreviewConfig: [{
                frameClass: 'cus-init-preview',
                //caption: file_name,
                showUpload: false,
                showDrag: false,
                showZoom: false,
                zoomTitle: '预览',
                indicatorSuccess: '',
            }],
            initialPreviewShowDelete: false,
        };

        $e.attr('style', 'visibility:visible;')
            .fileinput(options).on('filebatchselected', function (event, files) {
                if (files.length > 0) {
                    $e.fileinput('upload');
                }
            }).on("filecleared", function (event, data, msg) {
                $e.data('file', '');
            }).on('fileuploaded', function (e, r) {
                if (r.response) {
                    if (r.response.Code != 0) {
                        Common.showMsg(r.response.Msg, function () {
                            var old = $e.data('file');
                            $e.fileinput('refresh', { initialPreview: [old] }).data('file', old);
                        });
                    } else {
                        $e.data('file', r.response.Data);
                    }
                }
            });
    },
    ChooseIcon: function (element, callback) {
        var $e = $('#' + element);// data-icon:图标初始url  data-encoding图标类型编码
        var modal_id = element + '_modal';
        var icon_id = element + '_img';
        var icon_url = $e.data('icon');

        if (!$e.hasClass('st-choose-icon')) {
            $e.addClass('st-choose-icon');
        }
        var html = '';
        html += '<div style="margin:5px 1px;display:none;cursor:pointer;">';
        html += '<img id="' + icon_id + '" class="img-thumbnail" src="' + icon_url + '" />';
        html += '</div>';
        html += '<button class="btn btn-alt btn-sm" data-toggle="modal" data-target="#' + modal_id + '">';
        html += '<span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;选择图标';
        html += '</button>';

        $e.empty().append(html);

        html = '';
        html += '<div id="' + modal_id + '" class="modal fade modal-middle" style="z-index:19940527 !important;" data-backdrop="static" role="dialog">';
        html += '<div class="modal-dialog">';
        html += '<div class="modal-content" style="background: rgba(254, 254, 254, 0.98);">';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        html += '<h4 class="modal-title">图标选择</h4>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<div class="input-group">';
        html += '<input type="text" id="search_icon_text" class="form-control input-sm" value="" placeholder="请输入搜索关键字" />';
        html += '<div class="input-group-addon btn btn-alt" id="search_icon"><span class="glyphicon glyphicon-search"></span></div>';
        html += '</div>';
        html += '<div id="st_icon_panel" class="st-choose-icon-panel"></div>';
        html += '</div><div class="modal-footer">';
        html += '<button class="btn btn-default" style="color: #fff;background-color: #337ab7;border-color: #2e6da4;" data-dismiss="modal">关闭</button>';
        html += '<button class="btn btn-default" style="color: #fff;background-color: #337ab7;border-color: #2e6da4;" id="btn_ok_choose_icon">确定</button>';
        html += '</div></div></div>';
        html += '</div>';
        $('body').append(html);

        if (icon_url != undefined && icon_url != null) {
            $e.find('#' + icon_id).parent().css({ display: 'block' });
        }

        $e.find('#' + icon_id).parent().click(function () {
            $(this).next('button').trigger('click');
        });

        //modal event
        $('body').find('#' + modal_id).on('shown.bs.modal', function () {
            GetIcon('');
        }).on('hidden.bs.modal', function () {
            $('body').find('#search_icon_text').val('');
        });
        //搜索
        $('body').find('#search_icon').bind('click', function () {
            var key = $('body').find('#search_icon_text').val();
            GetIcon(key);
        });
        $('body').find('#search_icon_text').keydown(function (e) {
            if (e.keyCode == 13) {
                $('body').find('#search_icon').trigger('click');
            }
        });
        //确定
        $('#btn_ok_choose_icon').click(function (e) {
            e.preventDefault();
            var icon_val = $('#st_icon_panel').find('input[type=radio]:checked').val();
            $e.data('icon', icon_val);
            $e.find('#' + icon_id).attr('src', icon_val).parent().css({ display: 'block' });
            $('body').find('#' + modal_id).modal('hide');
        });

        //获取图标
        function GetIcon(key) {
            var encoding = $e.data('encoding');

            if (window.localStorage) {
                var local_key = 'local_' + encoding;
                GetIconFromLocal(encoding, key, local_key);
            } else {
                GetIconFromRemote(encoding, key);
            }
        }
        function GetIconFromRemote(encoding, key, local_key) {
            $.ajax({
                url: '/common/GetIconList',
                async: true,
                data: { encoding: encoding, key: key },
                type: 'post',
                dataType: 'json',
                success: function (r) {
                    if (r.Code == 0) {
                        if (local_key != undefined && key == '' && window.localStorage) {
                            window.localStorage[local_key] = JSON.stringify(r.Data);
                        }
                        RefreshIcon(r.Data);
                    } else {
                        $('.modal').modal('hide');
                        Common.showMsg(r.Msg);
                    }
                },
                error: function () {
                    $('.modal').modal('hide');
                    Common.showMsg('出现异常!请刷新页面后重试');
                }
            });
        }
        function GetIconFromLocal(encoding, key, local_key) {
            var data_json = window.localStorage[local_key];
            var data = [];
            if (data_json != undefined) {
                data = JSON.parse(data_json);
            }
            if (!Common.getCookie(local_key) || data.length == 0) {
                GetIconFromRemote(encoding, '', local_key);
                Common.setCookie(local_key, new Date().getTime(), 1 * 60 * 1000);
            } else {
                var data_result = [];
                if (key.length != 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].icon_name.indexOf(key) >= 0) {
                            data_result.push(data[i]);
                        }
                    }
                } else {
                    data_result = data;
                }
                RefreshIcon(data_result);
            }
        }
        function RefreshIcon(data) {
            if (data.length == 0) {
                $('#st_icon_panel').empty().append('<p style="text-align:center;line-height:200px;">没有找到图标唉</p>');
                return;
            }
            var html_li = '<ul class="list-unstyled row">';
            for (var i = 0; i < data.length; i++) {
                html_li += '<li class="col-md-2" style="width: 20%">';
                html_li += '<div>';
                html_li += '<div class="icon-panel-img">';
                html_li += '<img class="img-thumbnail" src="' + data[i].icon_url + '" />';
                html_li += '</div>';
                html_li += '<div class="icon-panel-text">';
                html_li += '<input type="radio" name="smart_icon" value="' + data[i].icon_url + '" />';
                html_li += '<span title="' + data[i].icon_name + '">' + data[i].icon_name + '</span>';
                html_li += '</div>';
                html_li += '</div>';
                html_li += '</li>';
            }
            html_li += '</ul>';
            $('#st_icon_panel').empty().append(html_li).find('input[type=radio]').iCheck({
                radioClass: 'iradio_minimal',
                radioClass: 'iradio_minimal',
                increaseArea: '20%' // optional
            });
            //依赖 <script src="~/SuperAdmin/js/icheck.js"></script>
            $('#st_icon_panel > ul > li > div').bind('click', function () {
                var $radio = $(this).find('input[type=radio]');
                if ($radio.is('checked')) {
                    $radio.iCheck('uncheck');
                } else {
                    $radio.iCheck('check');
                }
            });
        }

        //滚动条优化 -- 依赖 <script src="~/Content/Common/plugins/slimscroll/jquery.slimscroll.min.js"></script>
        $('body').find('#st_icon_panel').slimScroll({
            height: '100%',
            width: 'auto',
            size: '1px',
            position: 'right',
            color: 'rgba(255,255,255,0.64)',
            distance: '0px',
            railColor: 'rgba(255,255,255,0.32)',
            railOpacity: 0.3,
            wheelStep: 6,
            borderRadius: '7px',
            railVisible: false,
            alwaysVisible: true,
            allowPageScroll: true,
            disableFadeOut: false
        });
    },
    ChooseEquip: function (options) {
        //options = {
        //    //trigger_id:'',//触发modal show
        //    modal_title: '设备选择',//modal标题
        //    btn_cancel_name:'关闭',//退出按钮名字
        //    btn_ok_name: '确定',//确定按钮的名字
        //    chosen_equip:{},//已选择的设备 {room_id:1,type_id:1,equip_list:[{equip_id:1,equip_name:'插座111'}]}
        //    show_check_all:false,//显示全选，默认不显示
        //    is_same_type:true,//是否选择同一类型的设备
        //    is_same_room:true,//是否选择同一区域的设备
        //    is_filter:false,//是否由配置过滤设备
        //    has_private:true,//是否包含私有设备
        //    disabled_room:false,// 房间是否可选，默认可选
        //    disabled_type:false,// 类型是否可选，默认可选
        //    callback: function (data) { },//点击确定的回调函数 返回已选择的设备和房间、类型信息 data={room_id:1,type_id:1,equip_list=[{equip_id:1,equip_name:'插座111'}] }
        //};
        //初始化options
        InitOptions();
        var html = '';
        $('body').find('#modal_choose_equip1994').remove();
        //if ($('body').find('#modal_choose_equip1994').length == 0) {
        html = '<div id="modal_choose_equip1994" class="modal fade modal-middle" data-backdrop="static" role="dialog">';
        html += '</div>';
        $('body').append(html);
        $('body').find('#modal_choose_equip1994').on('show.bs.modal', function () {
            $modal.find('.modal-dialog').css({
                'margin-top': function () {
                    return ($(window).height() / 5);
                }
            });
            if (options.chosen_equip.equip_list != undefined && options.chosen_equip.equip_list.length > 0) {
                var temp_json = JSON.stringify(options.chosen_equip.equip_list);
                chosen_equip_data = JSON.parse(temp_json);
            }
            //GetRoomList();
        });
        //}
        //数据
        var chosen_equip_data = [];//已选择设备
        var room_data = [];//区域房间数据
        var equip_type_data = [];//区域设备及类型数据
        var show_check_all = options.show_check_all;// ture or false
        var all_equips = [];//所有设备
        var first_room_data = undefined;

        var $modal = $('body').find('#modal_choose_equip1994');
        FillHtml();

        //确定
        $modal.find('#btn_ok_choose_equip').bind('click', function () {
            var roomId = $modal.find('#area_list').val();
            var typeId = $modal.find('#equip_type_list').val();
            if (!options.is_same_type) {
                roomId = 0;
                typeId = 0;
            }
            options.callback({
                room_id: roomId,
                type_id: typeId,
                equip_list: chosen_equip_data
            });
            chosen_equip_data = [];
            $modal.modal('hide');
        });

        //事件监听
        $modal.find('#area_list').on('change', function () {
            if (options.is_same_room == true) {
                chosen_equip_data = [];
            }
            GetEuipAndTypeList($(this).val());
        });
        $modal.find('#equip_type_list').on('change', function () {
            if (options.is_same_type == true) {
                chosen_equip_data = [];
            }
            RefreshEquipList($modal.find('#area_list').val(), $(this).val());
        });
        ////获取区域房间列表
        //function GetRoomList() {
        //    if (room_data.length > 0) {
        //        InitRoomList();
        //    } else {
        //        $.post('/common/getroomlist', null, function (r) {
        //            if (r.Code == 0) {
        //                room_data = r.Data;
        //                InitRoomList();
        //            } else {
        //                Common.showMsg(r.Msg, function () {
        //                    $('.modal').modal('hide');
        //                });
        //            }
        //        }, 'json');
        //    }

        //    //初始化房间列表
        //    function InitRoomList() {
        //        var $area_list = $modal.find('#area_list');
        //        var opt = '<option value="0">全部</option>';
        //        for (var i = 0; i < room_data.length; i++) {
        //            opt += '<option value="' + room_data[i].room_id + '"';

        //            if (options.chosen_equip.room_id != undefined && room_data[i].room_id == options.chosen_equip.room_id) {
        //                opt += ' selected ';
        //            }

        //            opt += '>' + room_data[i].room_name + '</option>';
        //        }
        //        if (options.disabled_room == true) {
        //            $area_list.attr('disabled', true);
        //        } else {
        //            $area_list.removeAttr('disabled');
        //        }
        //        $area_list.empty().append(opt).selectpicker('refresh');
        //        GetEuipAndTypeList($area_list.val());
        //    }
        //}
        //由区域房间获取设备类型列表
        function GetEuipAndTypeList(gardenid) {
            var room_equip = equip_type_data.find(function (x) { return x.gardenid == gardenid });

            if (room_equip == undefined) {
                $.post('/common/getequipandtypelist', { id: gardenid }, function (r) {
                    if (r.Code == 0) {
                        equip_type_data.push({ room_id: room_id, type_list: r.Data });

                        InitEquip({ room_id: room_id, type_list: r.Data });
                    } else {
                        Common.showMsg(r.Msg);
                    }
                }, 'json');
            } else {
                InitEquip(room_equip);
            }

            //初始化区域设备类型
            function InitEquip(room_equip) {
                var opt = '';
                var $equip_type_list = $modal.find('#equip_type_list');
                if (room_equip != undefined && room_equip.type_list.length > 0) {
                    var temp_type_list = room_equip.type_list;
                    for (var i = 0; i < temp_type_list.length; i++) {
                        opt += '<option value="' + temp_type_list[i].type_id + '"';

                        if (options.chosen_equip.type_id != undefined && temp_type_list[i].type_id == options.chosen_equip.type_id) {
                            opt += ' selected ';
                        }

                        opt += '>' + temp_type_list[i].type_name + '</option > ';
                    }
                }
                if (options.disabled_type == true) {
                    $equip_type_list.attr('disabled', true);
                } else {
                    $equip_type_list.removeAttr('disabled');
                }
                $equip_type_list.html('').append(opt).selectpicker('refresh');

                RefreshEquipList(room_id, $equip_type_list.val());

                //获取第一个房间（默认为全部），获取所有设备
                if (show_check_all && (first_room_data == undefined || first_room_data.room_id != 0)) {
                    first_room_data = equip_type_data.find(function (x) { return x.room_id == 0 });
                    for (var i = 0; i < first_room_data.type_list.length; i++) {
                        for (var j = 0; j < first_room_data.type_list[i].equip_list.length; j++) {
                            all_equips.push({
                                equip_id: first_room_data.type_list[i].equip_list[j].equip_id,
                                equip_name: first_room_data.type_list[i].equip_list[j].equip_name
                            });
                        }
                    }

                    if (all_equips.length == chosen_equip_data.length) {
                        $modal.find('#allChecked').iCheck('check');
                    }
                }
            }
        }
        //刷新设备列表
        function RefreshEquipList(room_id, type_id) {
            var html = '';
            if (type_id != 0) {
                var room_equip = equip_type_data.find(function (x) { return x.room_id == room_id });
                var temp_type_list = room_equip.type_list.find(function (x) { return x.type_id == type_id });
                var temp_equip_list = temp_type_list.equip_list;
                html += '<ul class="row list-unstyled">';
                for (var i = 0; i < temp_equip_list.length; i++) {
                    html += '<li class="col-md-2" style="margin:5px auto;">';
                    html += '<div class="equip" title="' + temp_equip_list[i].equip_name + '">';
                    html += '<div>';
                    html += '<img class="img-thumbnail" src="' + temp_equip_list[i].equip_icon + '" />';
                    html += '</div>';
                    html += '<div class="row equip-info">';
                    html += '<span class="checkableBox col-md-2"><input type="checkbox" data-id="' + temp_equip_list[i].equip_id + '" data-name="' + temp_equip_list[i].equip_name + '"';

                    //判断是否在已选择设备中
                    if (chosen_equip_data.find(function (x) { return x.equip_id == temp_equip_list[i].equip_id })) {
                        html += ' checked ';
                    }

                    html += ' ></span>';
                    html += '<span class="col-md-8 initialism">' + temp_equip_list[i].equip_name + '</span>';
                    html += '</div>';
                    html += '</div>';
                    html += '</li>';
                }
                html += '</ul>';
            } else {
                html += '<p style="text-align:center;line-height:150px;">没有相关设备</p>';
            }
            $modal.find('#equip_list').html('').append(html)
                .find('input:checkbox').iCheck({
                    checkboxClass: 'icheckbox_minimal',
                    increaseArea: '20%' // optional
                });
            $modal.find('#equip_list .equip').bind('click', function () {
                var $checkbox = $(this).find('input:checkbox');
                if ($checkbox.is(':checked')) {
                    $checkbox.iCheck('uncheck');
                } else {
                    $checkbox.iCheck('check');
                }
            });
            $modal.find('#equip_list .equip input:checkbox').on('ifChanged', function () {
                ChangeState($(this));
            });
            function ChangeState($checkbox) {
                var $allChecked = $modal.find('#allChecked');
                if ($checkbox.is(':checked')) {
                    var name = $checkbox.data('name');
                    chosen_equip_data.push({ equip_id: $checkbox.data('id'), equip_name: name });

                    if (show_check_all && all_equips.length == chosen_equip_data.length) {
                        $modal.find('#allChecked').iCheck('check');
                    }
                } else {
                    if (show_check_all && $allChecked != undefined && $allChecked.is(':checked')) {
                        $allChecked.iCheck('uncheck');
                    }
                    var temp_equip_id = $checkbox.data('id');
                    for (var i = 0; i < chosen_equip_data.length; i++) {
                        if (chosen_equip_data[i].equip_id == temp_equip_id) {
                            chosen_equip_data.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
        /**
         * ******************************************
         */
        //初始化options
        function InitOptions() {
            if (options.modal_title == undefined) {
                options.modal_title = '设备选择';
            }
            if (options.btn_cancel_name == undefined) {
                options.btn_cancel_name = '关闭';
            }
            if (options.btn_ok_name == undefined) {
                options.btn_ok_name = '确定';
            }
            if (options.chosen_equip == undefined) {
                options.chosen_equip = {};
            }
            if (options.is_same_type == undefined) {
                options.is_same_type = true;
            }
            if (options.is_same_room == undefined) {
                options.is_same_room = true;
            }
            if (options.callback == undefined || typeof (options.callback) != 'function') {
                options.callback = function () { };
            }
            if (options.has_private == undefined) {
                options.has_private = true;
            }
            if (options.disabled_room == undefined) {
                options.disabled_room = false;
            }
            if (options.disabled_type == undefined) {
                options.disabled_type = false;
            }
            if (options.show_check_all == undefined) {
                options.show_check_all = false;
            }
            if (options.is_filter == undefined) {
                options.is_filter = false;
            }
        }
        //填充内容
        function FillHtml() {
            html = '';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            html += '<h4 class="modal-title">' + options.modal_title + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<div class="row">';
            html += '<div class="col-md-6">';
            html += '<label class="col-md-2">区域:</label>';
            html += '<div class="col-md-10">';
            html += '<select id="area_list" class="select">';
            html += '<option value="0">全部</option>';
            html += '</select>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<label class="col-md-2">类型:</label>';
            html += '<div class="col-md-10">';
            html += '<select id="equip_type_list" class="select">';
            html += '<option value="0">全部</option>';
            html += '</select></div></div></div>';
            html += '<div id="equip_list" style="min-height:200px; padding: 20px 10px;"></div>';
            if (show_check_all) {
                html += '<div style="padding: 0 15px;"><input id="allChecked" type="checkbox" /><span name="checkTip">全选</span></div>';
            }
            html += '</div>';
            html += '<div class="modal-footer">';
            html += '<button class="btn btn-alt btn-sm m-r-5" data-dismiss="modal">' + options.btn_cancel_name + '</button>';
            html += '<button class="btn btn-alt btn-sm m-r-5" id="btn_ok_choose_equip">' + options.btn_ok_name + '</button>';
            html += '</div></div></div>';
            $modal.empty().append(html).modal('show');

            $modal.find('#allChecked').iCheck({
                checkboxClass: 'icheckbox_minimal',
                increaseArea: '20%' // optional
            }).on('ifClicked', function () {
                let $e = $(this);
                let isChecked = !$e.is(':checked');
                chosen_equip_data = [];
                if (isChecked) {
                    chosen_equip_data = JSON.parse(JSON.stringify(all_equips));
                }
                $modal.find('#area_list').val(first_room_data.room_id).selectpicker('refresh').trigger('change');
            }).on('ifChanged', function () {
                let $e = $(this);
                if ($e.is(':checked')) {
                    $e.parent().parent().find('span[name="checkTip"]').text('取消全选');
                } else {
                    $e.parent().parent().find('span[name="checkTip"]').text('全选');
                }
            });
        }
    },
    Loading: function (oper, msg) {
        if (oper != 'hide') {
            oper = 'show';
        }
        if (msg == undefined) msg = '请稍后...';

        var $loading = $('body').find('#loading2017');
        switch (oper) {
            case 'hide':
                hide();
                break;
            default:
                show();
                break;
        }
        function show() {
            var height = $(window).height() - 10;
            var html = '';
            if ($loading.length != 0) {
                $loading.remove();
            }
            html += '<div id="loading2017" style="display:block;width:100%;height:' + height + 'px;position:absolute;top:0;left:0;z-index:99999;background-color:rgba(0,0,0,0.66);text-align:center;margin:0;padding:0;">';
            html += '<p style="line-height:' + height + 'px;color:#fff;">';
            html += '<i class="fa fa-spinner fa-spin fa-2x" style="color:#fff;"></i>&nbsp;&nbsp;&nbsp;&nbsp;' + msg + '</p>';
            html += '</div>';
            $('body').append(html);
            $loading.show();
        }
        function hide() {
            if ($loading.length != 0) {
                $loading.hide().remove();
            }
        }
    },
};
