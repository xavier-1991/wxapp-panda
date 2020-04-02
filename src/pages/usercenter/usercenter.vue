<template lang="pug">
    view(v-if="hasData")
        view(class="top re")
            view(class="info df ai-center")
                image(class="avatar" src="../../static/images/usercenter/head.png")
                view(class="ml30" style="width:535rpx;")
                    view(class="fs36 cor_f textFlow2") 联营区域：{{userInfo.cityInfo}}
                    view(class="mt10 cor_f fs28") ID:{{userInfo.id}}
            view(class="money ai-center")
                view
                    view(class="yue df fs30") 
                        view(class="cor_9") 我的余额
                        view(class="cor_0 fwb") ￥{{userInfo.allMount}}
                    view(class="yue df fs30 mt20") 
                        view(class="cor_9") 当月可提现余额
                        view(class="cor_0 fwb") ￥{{userInfo.canApplyAmount}}
                    view(class="yue df fs30 mt20") 
                        view(class="cor_9") 已成功提现金额
                        view(class="cor_0 fwb") ￥{{userInfo.historyApplyAmount}}
                view(class="tx" @click="toWithdraw") 提现
        view(class="list")
            view(class="df ai-center" @click="toWithDrawBill")
                image(class="icon" src="../../static/images/usercenter/icon_bill.png")
                view(class="listRight bb1 df ai-center jcsb")
                    view(class="listText") 提现账单
                    view(class="df ai-center")
                        image(class="arrow" src="../../static/images/usercenter/icon_arrow.png")
            view(class="df ai-center" @click="toLoginPassWordEdit")
                image(class="icon" src="../../static/images/usercenter/icon_me_in.png")
                view(class="listRight bb1 df ai-center jcsb")
                    view(class="listText") 修改登录密码
                    view(class="df ai-center")
                        image(class="arrow" src="../../static/images/usercenter/icon_arrow.png")
            view(class="df ai-center" @click="toWithdrawPassWordEdit")
                image(class="icon" src="../../static/images/usercenter/icon_me_money.png")
                view(class="listRight bb1 df ai-center jcsb")
                    view(class="listText") 修改提现密码
                    view(class="df ai-center")
                        image(class="arrow" src="../../static/images/usercenter/icon_arrow.png")
            view(class="df ai-center" @tap="toBankList")
                image(class="icon" src="../../static/images/usercenter/icon_card.png")
                view(class="listRight bb1 df ai-center jcsb")
                    view(class="listText") 设置银行卡
                    view(class="df ai-center")
                        image(class="arrow" src="../../static/images/usercenter/icon_arrow.png") 
            view(class="df ai-center" @click="toCall")
                image(class="icon" src="../../static/images/usercenter/icon_me_service.png")
                view(class="listRight bb1 df ai-center jcsb")
                    view(class="listText") 拨打客服电话
                    view(class="df ai-center")
                        view(class="cor_999 fs32") {{userInfo.customTel}}
                        image(class="arrow" src="../../static/images/usercenter/icon_arrow.png") 
            view(class="df ai-center" @click="toLoginOut")
                image(class="icon" src="../../static/images/usercenter/icon_out.png")
                view(class="listRight df ai-center jcsb")
                    view(class="listText") 退出当前账号
                    view(class="df ai-center")
                        image(class="arrow" src="../../static/images/usercenter/icon_arrow.png")
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
export default {
    data(){
        return {
            hasData:false,
            userInfo:null
        }
    },
    onLoad(){
        this.loadData()
    },
    onPullDownRefresh() {
         this.loadData();
    },
    methods: {
        loadData() {
            util.showLoadingDialog('正在加载');
            http.request(urls.USER_CENTER, "GET", null).then(result => {
                this.hasData=true;
                this.userInfo=result.user;
                util.hideLoadingDialog();
            }).finally(()=>{
                 uni.stopPullDownRefresh();
            })
        },
        toLoginOut(){
            util.showConfirm('','退出登录','是否退出当前账号',()=>{
                util.showLoadingDialog('正在加载');
                http.request(urls.LOGIN_OUT, "GET", null).then(result => {
                    util.hideLoadingDialog();
                    util.reLaunch('login');
                });
            })
        },
        toCall(){
            uni.makePhoneCall({
                phoneNumber: this.userInfo.customTel
            })
        },
        toLoginPassWordEdit(){
            util.linkto('login-password-edit');
        },
        toWithdrawPassWordEdit(){
            util.linkto('withdraw-password-edit');
        },
        toWithDrawBill(){
            util.linkto('withdraw-bill');
        },
        toWithdraw(){
            util.linkto('withdraw-apply');
        },
        toBankList(){
            util.linkto('bank-list')
        }
        
    }
}
</script>
<style lang="stylus">
    @import "./usercenter.styl"
</style>