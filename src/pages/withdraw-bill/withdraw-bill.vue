<template lang="pug">
    view(class="wrap")
        view(class="fillTitle p30lr bb1")
            view(class="df ai-center bb1 pb25 jcsb" id="timeFilter")
                view(class="df ai-center" @click="changeYears")
                    view(class="fs40 cor_3 mr10") 2019
                    view(class="arrow_wrap")
                        view(class="arrow")
                view(class="df ai-center" id="filter")
                    image(class="filterImg" src="../../static/images/icon_home_filter.png")
                    view(class="cor_9 fs28 ml5 fwb") 筛选
            view(class="df ai-center jcsb listTitle")
                view 时间
                view 提现金额/备注
        view(class="list")
            view(class="df ai-center jcsb item bb1")
                view(class="df")
                    image(class="bill_icon" src="../../static/images/withdraw/icon_wait.png")
                    view(class="ml20")
                        view(class="fs30") 提现申请
                        view(class="fs28 cor_9 mt10") 09/21 09:21
                view(class="fs36")-1000
            view(class="df ai-center jcsb item bb1")
                view(class="df")
                    image(class="bill_icon" src="../../static/images/withdraw/icon_sucess.png")
                    view(class="ml20")
                        view(class="fs30") 提现成功
                        view(class="fs28 cor_9 mt10") 09/21 09:21
                view(class="fs36")-1000
            view(class="df ai-center jcsb item")
                view(class="df")
                    image(class="bill_icon" src="../../static/images/withdraw/icon_failure.png")
                    view(class="ml20")
                        view(class="fs30") 审核失败
                        view(class="fs28 cor_9 mt10") 09/21 09:21
                view(class="fs30 cor_9") 帐号错误
        view(class="filterMask hide")
            view(class="filterMain")
                view(class="df ai-center jcsba")
                    view(class="filterTab filterTabRed") 提现申请
                    view(class="filterTab") 提现成功
                    view(class="filterTab") 审核失败
                view(class="df ai-center filterBtnWrap")
                    view(id="reset") 重置
                    view 确定
        view(class="lookMore cor_6 fs26 df jcc mt20")
            view 查看更多
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        changeYears(){
            uni.showActionSheet({
                itemList: ['A', 'B', 'C'],
                success: function (res) {
                    console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
                },
                fail: function (res) {
                    console.log(res.errMsg);
                }
            });
        }
    }
}
</script>
<style lang="stylus">
    @import "./withdraw-bill.styl"
</style>