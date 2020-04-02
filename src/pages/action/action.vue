<template lang="pug">
    view
        view
            image(class="ac-img" src="../../static/images/action.png")
        view(class="text1") 锁定联营城市
        view(class="text2") 收益数据实时掌控
        view(class="tip") 
            text(class="fs30 fwb") {{sec}}{{' '}} 
            text 秒后自动进入
        view(class="ac-btn" @tap="toEnter") 立即进入
</template>
<script>
const util = require("../../utils/util");
const pd = require("../../utils/pd");
let timer=null;

export default {
    data(){
        return {
            sec:3
        }
    },
    onLoad(){
        timer=setInterval(() => {
            this.sec--;
            if(this.sec<=0){
                clearInterval(timer);
                this.toEnter();
            }
        }, 1000);
    },
    methods: {
        toEnter(){
            clearInterval(timer);
            let userInfo = pd.getUserInfo();
            let token = userInfo ? userInfo.token:'';
            let nowTime=Math.ceil(new Date().getTime()/1000);
            if (userInfo && userInfo.token && nowTime < userInfo.tokenExpireTime){
                util.reLaunch('index');
            }else{
                util.reLaunch('login');
            } 
        },
    }
}
</script>
<style lang="stylus">
    @import "./action.styl"
</style>