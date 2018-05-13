
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
    })
});;