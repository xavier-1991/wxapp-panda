<template lang="pug">
    view(class="p30lr")
        view(class="df ai-center jcsb" style="padding-top:90rpx;")
            view(class="fs60 cor_3") 登录
            image(src="../../static/images/head.png" style="width:100rpx;height:100rpx;")
        view(style="margin-top:34rpx;")
            input(v-model="mobile" type="number" maxlength="11" placeholder="请输入手机号" class="inp")
            input(v-model="password" type="password" placeholder="请输入密码" class="inp")
        view(class="df ai-center pt40")
            switch(color="#e93421" :checked="remerble" @change="changeRemerble")
            view(class="fs32 ml20") 记住密码
        view(class="pt40")
            view(:class="{btn:true,'can-use':mobile.length==11 && password ? true:false}" @click="toLogin") 登录
        view(style="padding-top:60rpx;")
            view(class="forgot cor_6" @click="toForgotPassword") 忘记密码
        image(class="logo" src="../../static/images/logo.png")
        
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            mobile: "",
            password: "",
            remerble: false
        };
    },
    onLoad() {
        let loginInfo=pd.getLoginInfo();
        if(loginInfo){
            this.mobile=loginInfo.mobile;
            this.password=loginInfo.password;
            this.remerble=true;
        }
        
    },
    methods: {
        changeRemerble(e) {
            this.remerble = e.detail.value;
        },
        toLogin() {
            if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
                util.showToast("手机号格式错误");
                return;
            }
            if (!this.password) {
                util.showToast("请填写密码");
                return;
            }
            util.showLoadingDialog('正在登录');
            let params = { mobile: this.mobile, password: this.password };
            http.request(urls.LOGIN, "POST", params, false).then(result => {
                pd.storeUserInfo(result.user);
                if(this.remerble){
                    pd.storeLoginInfo(params);
                }else{
                    pd.storeLoginInfo(false);
                }
                util.hideLoadingDialog();
                util.reLaunch('index');

            });
        },
        toForgotPassword(){
            util.linkto('login-password-forgot');
        }
    }
};
</script>
<style lang="stylus">
@import './login.styl'
</style>