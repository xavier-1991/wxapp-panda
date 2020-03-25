<template lang="pug">
    view(class="list p30lr" v-if="hasData")
        view(class="item bb1")
            view(class="itemLeft") 用户ID
            view(class="itemRight") {{data.uid}}
        view(class="item bb1")
            view(class="itemLeft") 交易类型
            view(class="itemRight") 提现
        view(class="item bb1")
            view(class="itemLeft") 提现金额
            view(class="itemRight") {{data.applyAmount}}元
        view(class="item bb1 item2")
            view(class="itemLeft") 申请账号
            view(class="itemRight") {{data.bankName}}{{data.bankSubBranch}}-{{data.trueName}}-{{data.bankCard}}
        view(class="item bb1")
            view(class="itemLeft") 审核状态
            view(class="itemRight") {{data.status}}
        view(class="item bb1")
            view(class="itemLeft") 申请时间
            view(class="itemRight") {{data.applyTime}}
        view(class="item bb1 item2")
            view(class="itemLeft") 备注原因
            view(class="itemRight") {{data.reviewDescription}}
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
export default {
    data(){
        return {
            hasData:false,
            data:null
        }
    },
    onLoad(options){
        this.loadData(options.id);
    },
    methods: {
        loadData(id){
            util.showLoadingDialog('正在加载');
            http.request(`${urls.APPLY_DETAIL}/${id}`, "GET", null).then(result => {
                this.hasData=true;
                this.data=result.detail;
                util.hideLoadingDialog();
            });
        }
    },
}
</script>
<style lang="stylus">
    @import "./withdraw-bill-detail.styl"
</style>