<template lang="pug">
    view(class="wrap" v-if="hasData") 
        view(class="card p25lr") 
            view(class="cardTitle") 提现金额
            view(class="df ai-center mt35") 
                view(class="mIcon mr20") ￥
                input(class="inp" v-model="applyAmount" placeholder="请输入提现金额" type="text" placeholder-class='input-placeholder')
            view(class="df ai-center bt1 fs28 mt30" style="height:88rpx;") 
                view(class="cor_9 ml5") 我的可提现余额：
                view(class="cor_0 ml10") ¥{{canApplyAmount}}
                view(class="cor_red ml15" @tap="toAll") 全部提现
        
        view(class="card p25lr mt20") 
            view(class="cardTitle bb1") 请选择提现账号
            view(class="df ai-center jcsb unBind" v-if="!cardInfo"  @tap="toChooseCard") 
                view(class="df ai-center") 
                    //- image(class="iconBank" src="../../static/images/withdraw/icon_add.png")
                    //- view(class="cor_red fs30 ml10 cor_red") 未绑定，请先添加银行卡
                    view(class="fs30 ml10") 选择银行卡
                image(class="arrow" src="../../static/images/usercenter/icon_arrow.png") 
            view(class="df ai-center jcsb unBind" v-else @tap="toChooseCard") 
                view(class="df ai-center") 
                    view(class="fs28 ml15 fwb") 
                        text {{cardInfo.bankName}}
                        text(class="ml10") {{cardInfo.formatBankCard}}
                image(class="arrow" src="../../static/images/usercenter/icon_arrow.png") 
        view(class="bottomBox") 
            view(class="btn can-use" id="withdrawBtn" @tap="toWithdrawBtn") 确认提现
            view(class="mt40 fs22 cor_9" style="line-height: 30rpx;") 
                view 提现须知：
                view(class="mt5") 当月可提现余额是上月及之前未提现的余额之和，建议当月1-2日提现上月及之前的收益余额，最迟当月20日之前要提交提现申请，提交提现申请后，会在当月的25日把已提现金额转入已绑定的银行卡内，请各位联营企业家到时注意查收！另绑定银行卡时认真核实卡号及用户信息是否正确。
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
export default {
    data(){
        return {
            hasData:false,
            canApplyAmount:"",
            cardInfo:null,
            hasCard:0,
            applyAmount:"",
            onOff:true  
        }
    },
    onShow(){
        if(this.onOff){
            let pages = getCurrentPages();
            let currPage = pages[pages.length - 1];
            let cardInfo = JSON.parse(JSON.stringify(currPage.data.cardInfo));
            this.cardInfo={}
            setTimeout(() => {
                this.cardInfo=cardInfo;
            }, 0);
        }
        this.onOff=true;
        
        
    },
    onLoad(){
        this.onOff=false;
        this.loadData();
    },
    methods: {
        loadData(){
            util.showLoadingDialog('正在加载');
            http.request(urls.APPLY_PAGE, "GET", null).then(result => {
                this.hasCard=result.hasCard;
                this.canApplyAmount=result.canApplyAmount;
                this.cardInfo=result.cardInfo;
                this.hasData=true;
                util.hideLoadingDialog();
            });
        },
        toAll(){
            this.applyAmount=this.canApplyAmount;
        },
        toChooseCard(){
            util.linkto('bank-list','pagefrom=withdraw');
        },
        toWithdrawBtn(){
            if(!util.checkPrice(this.applyAmount)){
                util.showToast('请输入正确格式的提现金额，最多两位小数');
                return;
            }
            if(this.applyAmount*1>this.canApplyAmount*1){
                util.showToast('提现金额不得高于可提现金额');
                return;
            }
            if(!this.cardInfo){
                util.showToast('请选择提现账号');
                return;
            }
        }
    }
}
</script>
<style lang="stylus">
    @import "./withdraw-apply.styl"
</style>
