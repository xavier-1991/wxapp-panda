<template lang="pug">
    view(v-if="hasData")
        view(class="list" v-if="list.length") 
            view(class="item" v-for="(item,index) in list" :key="index" @tap="chooseBankCard(item)") 
                view(class="itemInner") 
                    view(class="df ai-center jcsb itemTitle p35lr") 
                        view(class="df ai-center") 
                            view(class="bankName") {{item.bankName}}
                            view(class="default ml15" v-if="item.isDefault==1") 默认    
                        image(v-if="pagefrom!='withdraw'" @tap.stop="editCard(item)" class="edit" src="../../static/images/withdraw/edit.png") 
                    view(class="p35lr num") {{item.formatBankCard}}
        view(class="p25lr mt60") 
            view(class="df ai-center addCard" @tap="addCard") 
                image(class="addIcon ml20" src="../../static/images/withdraw/icon_add_gray.png") 
                view(class="cor_6 fs34 ml5") 添加新的银行卡
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data(){
        return {
            hasData:false,
            list:[],
            pagefrom:''
        }
    },
    onShow(){
        this.loadData()
    },
    onLoad(options){
        this.pagefrom=options.pagefrom;
        if(options.pagefrom=='withdraw'){
            uni.setNavigationBarTitle({
                title: '选择银行卡'
            });
        }
    },
    methods: {
        loadData(){
            util.showLoadingDialog('正在加载');
            http.request(urls.BANK_CARD, "GET", this.params).then(result => {
                this.hasData=true;
                this.list=result.list;
                util.hideLoadingDialog();
            });
        },
        addCard(){
            util.linkto("bank-edit-add","type=add");
        },
        editCard(item){
            pd.storeCardInfo(item);
            util.linkto("bank-edit-add","type=edit");
        },
        chooseBankCard(item){
            if(this.pagefrom!='withdraw'){
                return;
            }
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];
            prevPage.data.cardInfo=item;
            uni.navigateBack();
        }
    }
}
</script>
<style lang="stylus">
    @import "./bank-list.styl"
</style>