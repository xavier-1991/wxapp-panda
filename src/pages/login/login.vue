<template lang="pug">
    view(class="p30lr")
        view(class="df ai-center jcsb" style="padding-top:90rpx;")
            view(class="fs60 cor_3") 登录
            image(src="../../static/images/head.png" style="width:100rpx;height:100rpx;")
        view(style="margin-top:34rpx;")
            input(v-model="phone" type="text" maxlength="11" placeholder="请输入手机号" class="inp")
            input(v-model="password" type="password" placeholder="请输入密码" class="inp")
        view(class="df ai-center pt40")
            switch(color="#e93421" @change="changeRemerble")
            view(class="fs32 ml20") 记住密码
        view(class="pt40")
            view(:class="{btn:true,'can-use':phone.length==11 && password ? true:false}" @click="toSubmit") 登录
        view(style="padding-top:60rpx;")
            view(class="forgot cor_6") 忘记密码
        image(class="logo" src="../../static/images/logo.png")
        
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
export default {
    data() {
        return {
            phone: "",
            password: "",
            remerble: false
        };
    },
    onLoad() {},
    methods: {
        changeRemerble(e) {
            this.remerble = e.detail.value;
        },
        toSubmit() {
            if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                util.showToast('手机号格式错误');
                return;
            }
            if(!this.password){
                util.showToast('请填写密码');
                return;
            }
        }
    }
};
</script>
<style lang="stylus">
@import './login.styl'
</style>