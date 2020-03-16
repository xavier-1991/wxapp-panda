<template lang="pug">
    view(style="padding:10rpx 32rpx 0;")
        view(class="bb1 item df ai-center re")
            view(class="itemL") 当前密码:
            input(class="inp" placeholder="请输入当前密码" type="password")
            view(class="code cor_red" @click="toWithdrawPasswordForgot") 忘记密码
        view(class="bb1 item df ai-center")
            view(class="itemL") 新密码:
            input(class="inp" placeholder="请输入6位纯数学" type="password")
        view(class="bb1 item df ai-center")
            view(class="itemL") 确认密码:
            input(class="inp" placeholder="请再次输入新密码" type="password")
        view(class="btn can-use") 确定
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
    },
     methods: {
        toWithdrawPasswordForgot(){
            util.linkto('withdraw-password-forgot');
        }   
    }
}
</script>
<style lang="stylus">
    @import "./withdraw-password-edit.styl"
</style>