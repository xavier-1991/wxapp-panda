<template lang="pug">
    view(style="padding:10rpx 32rpx 0;")
        view(class="bb1 item df ai-center re")
            view(class="itemL") 手机号:
            input(class="inp" placeholder="请输入手机号" type="text")
            view(class="code cor_red") 获取验证码
        view(class="bb1 item df ai-center")
            view(class="itemL") 验证码：
            input(class="inp" placeholder="请输入验证码" type="text") 
        view(class="bb1 item df ai-center")
            view(class="itemL") 新登录密码:
            input(class="inp" placeholder="请重新设置6位数提现密码" type="password")
        view(class="btn can-use") 提交
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
export default {
    data(){
        return {
            phone:'',
            code:'',
            newPassword:'',
            oldPassword:'',
            sec:60

        }
    }
}
</script>
<style lang="stylus">
    @import "./withdraw-password-forgot.styl"
</style>