<template lang="pug">
    view(v-if="hasData")
        view(class="list" v-if="list.length") 
            view(class="item" v-for="(item,index) in list" :key="index") 
                view(class="itemInner") 
                    view(class="df ai-center jcsb itemTitle p35lr") 
                        view(class="df ai-center") 
                            view(class="bankName") {{item.bankName}}
                            view(class="default ml15" v-if="item.isDefault==1") 默认    
                        image(class="edit" src="../../static/images/withdraw/edit.png") 
                    view(class="p35lr num") {{item.formatBankCard}}
        view(class="p25lr mt60") 
            view(class="df ai-center addCard") 
                image(class="addIcon ml20" src="../../static/images/withdraw/icon_add_gray.png") 
                view(class="cor_6 fs34 ml5") 添加新的银行卡
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
export default {
    data(){
        return {
            hasData:false,
            list:[]
        }
    },
    onLoad(){
        this.loadData()
    },
    methods: {
        loadData(){
            util.showLoadingDialog('正在加载');
            http.request(urls.BANK_CARD, "GET", this.params).then(result => {
                this.hasData=true;
                this.list=result.list;
                util.hideLoadingDialog();
            });
        }
    }
}
</script>
<style lang="stylus">
    @import "./bank-list.styl"
</style>