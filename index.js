var listCache = {
    open: null,
    closed: null
}; 
$(function () {
    $("#tool_new_q").click(function () {
        layer.open({
            type: 1, 
            title: false, 
            closeBtn: false, 
            area:['700px;', '360px'], 
            shade: 0.6, 
            id: 'LAY_new_question', 
            resize: false, 
            btn: ['发布', '取消'], 
            btnAlign: 'c', 
            moveType: 1,
            content: $('#q_new'),
            success: function (layero) {
                var btn = layero.find('.layui-layer-btn');
                btn.find('.layui-layer-btn0').click(function(){
                    var cnt = layero.find('.layui-layer-content');
                    alert(cnt.find('#q_summary').val());
                });
            }
        });
    });

    $('.list_tab').click(function(){
        var $this = $(this);
        var isFocus = $this.hasClass('focus');
        if (isFocus) {
            return;
        }

        $('.focus').removeClass('focus');
        $this.addClass('focus');

        $('#list tbody').empty();
        let closed = $this.attr('data-tab-closed') === 'true';
        let target = closed ? listCache.closed : listCache.open;
        if (target == null) {
            loadList(closed);
        } else {
            render(target, closed);
        }
    });

    function loadList(closed) {
        nebPay.simulateCall(to, "0", "qlist", "[" + closed + "]", {
            listener: function(resp) {
                if (resp.result) {
                    let json = JSON.parse(resp.result);
                    if (closed) {
                        listCache.closed = json;
                    } else {
                        listCache.open = json;
                    }
                    render(json, closed);
                }
            }
        });
    }

    function render(list, closed) {
        var table = $('#list'); 
        if (closed) {
            $('#list thead th:last-child').html('状态(Status)');
            for (let i in list) {
                let ts = parseInt(list[i].closeTS);
                table.append("<tr>" +
                    "<td>" + list[i].bonus + " NAS</td>" +
                    "<td>" + list[i].sum + "</td>" +
                    "<td>" + (list[i].closed ? "已结贴(Closed)" : "未结贴(Expired)") + "</td>" +
                    "</tr>");
            }
        } else {
            $('#list thead tr th:last-child').html('剩余时间(Remain)');
            var nowTS = new Date().getTime() / 1000;

            for (let i in list) {
                let ts = parseInt(list[i].closeTS);
                let remain = Math.floor((ts - nowTS) / 3600);
                table.append("<tr>" +
                    "<td>" + list[i].bonus + " NAS</td>" +
                    "<td>" + list[i].sum + "</td>" +
                    "<td>" + remain + " Hours</td>" +
                    "</tr>");
            }
        }
    }

    $('#q_summary').keyup(function(){
        var len = $.trim($(this).val()).length;
        $('#q_summary_cnt').text(len + "/30");
    });
    $('#q_detail').keyup(function(){
        var len = $.trim($(this).val()).length;
        $('#q_detail_cnt').text(len + "/312");
    });

    loadList(false);
});;