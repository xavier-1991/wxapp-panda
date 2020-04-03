<template lang="pug">
    view(style="padding:10rpx 32rpx 0;")
        view(class="bb1 item df ai-center re")
            view(class="itemL") 当前密码:
            input(class="inp" v-model="params.oldPassword" placeholder="请输入当前提现密码" type="password" maxlength="6")
            view(class="code cor_red" @tap="toWithdrawPasswordForgot") 忘记密码
        view(class="bb1 item df ai-center")
            view(class="itemL") 新密码:
            input(class="inp" v-model="params.password" placeholder="请输入6位纯数字" type="password" maxlength="6")
        view(class="bb1 item df ai-center")
            view(class="itemL") 确认密码:
            input(class="inp" v-model="params.confirmPassword" placeholder="请再次输入新密码" type="password" maxlength="6")
        view(class="btn can-use" @tap="toSubmit") 确定
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
export default {
    data(){
        return {
            params:{
                oldPassword:'',
                password:'',
                confirmPassword:''
            }
        }
    },
     methods: {
        toWithdrawPasswordForgot(){
            util.linkto('withdraw-password-forgot');
        },
        toSubmit(){
            if (!util.checkWithdrawPassword(this.params.oldPassword)) {
                util.showToast("请输入正确格式的当前密码");
                return false;
            }
            if (!util.checkWithdrawPassword(this.params.password)) {
                util.showToast("请输入正确格式的新密码");
                return false;
            }
            if (this.params.password != this.params.confirmPassword) {
                util.showToast("两次输入密码不一致");
                return false;
            }
            util.showLoadingDialog("正在修改");
            http.request(urls.CHANGE_PAY_PASSWORD, "PUT", this.params).then(
                data => {
                    util.showToast('修改成功')
                    setTimeout(() => {
                        util.hideLoadingDialog();
                        uni.navigateBack();
                    }, 1000);
                    
                }
            );
        }   
    }
}
</script>
<style lang="stylus">
    @import "./withdraw-password-edit.styl"
</style>