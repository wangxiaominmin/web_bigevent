$(function() {
    var form = layui.form
    var layer = layui.layer
    
    form.verify({

        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          samepwd: function(value) {
           if(value === $('[name=oldPwd]').val()) {
            return '新旧密码不能一致'
           }
          },
          repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            if (value !== $('[name=newPwd]').val()) {
              return '两次密码不一致'
            }
          }
    })

   $('.layui-form').on('submit', function(e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起ajax请求
      $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function(res) {
          if(res.status !== 0) {
            return layer.msg('密码更新失败')
          }
          layer.msg('更新密码成功')
          // 重置表单
          $('.layui-form')[0].reset()
        }
      })
   })
})