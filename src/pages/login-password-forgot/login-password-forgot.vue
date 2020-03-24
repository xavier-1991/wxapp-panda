<template lang="pug">
    view(style="padding:10rpx 32rpx 0;")
        view(class="bb1 item df ai-center re")
            view(class="itemL") 手机号:
            input(class="inp" v-model="mobile" placeholder="请输入手机号" type="number" maxlength='11')
            view(class="code cor_red" @click="toSendCode") {{codeStr}}
        view(class="bb1 item df ai-center")
            view(class="itemL") 验证码：
            input(class="inp" v-model="verificationCode" placeholder="请输入验证码" type="number") 
        view(class="bb1 item df ai-center")
            view(class="itemL") 新登录密码:
            input(class="inp" v-model="password" placeholder="请重新设置登录密码" type="password" maxlength='16')
        view(class="bb1 item df ai-center")
            view(class="itemL") 确认密码:
            input(class="inp" v-model="password2" placeholder="请再次输入新登录密码" type="password" maxlength='16')
        view(class="fs24 cor_9 mt20") 6到16位字母和数字组成，区分大小写，不能有空格或是特殊符号  
        view(class="btn can-use" @click="toSubmit") 提交
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
export default {
    data() {
        return {
            mobile: "",
            verificationCode: "",
            password: "",
            password2: "",
            sec: 60,
            timer: null,
            codeStr: "获取验证码"
        };
    },
    onLoad() {},
    methods: {
        toSendCode() {
            var mobile = this.mobile;
            if (!util.checkPhone(mobile)) {
                util.showToast("请输入正确的手机号");
                return false;
            }
            if (this.sec != 60) {
                util.showToast("请" + this.sec + "秒后重试！", null);
                return false;
            }
            let params = { mobile: this.mobile, type: 21 };
            util.showLoadingDialog("请稍候");
            http.request(urls.SEND_CODE, "POST", params, false).then(data => {
                this.intTimer = setInterval(() => {
                    if (this.sec == 1) {
                        this.codeStr = "获取验证码";
                        this.sec = 60;
                        clearInterval(this.intTimer);
                    } else {
                        var sec = this.sec - 1;
                        this.codeStr = sec + "秒后获取";
                        this.sec = sec;
                    }
                }, 1000);
                util.hideLoadingDialog();
            });
        },
        toSubmit() {
            if (!util.checkPhone(this.mobile)) {
                util.showToast("请输入正确的手机号");
                return false;
            }
            if (!this.verificationCode.trim()) {
                util.showToast("验证码不能为空");
                return false;
            }
            if (!util.checkPassword(this.password)) {
                util.showToast("请输入正确格式的密码");
                return false;
            }
            if (this.password != this.password2) {
                util.showToast("两次输入密码不一致");
                return false;
            }
            util.showLoadingDialog("正在提交");
            let params = {
                mobile: this.mobile,
                verificationCode: this.verificationCode,
                password: this.password
            };
            http.request(urls.FORGOT_LOGIN_PASSWORD, "PUT", params, false).then(
                data => {
                    util.showToast('重置成功')
                    setTimeout(() => {
                        util.hideLoadingDialog();
                        util.reLaunch('login');
                    }, 1000);
                    
                }
            );
        }
    }
};
</script>
<style lang="stylus">
@import './login-password-forgot.styl'
</style>