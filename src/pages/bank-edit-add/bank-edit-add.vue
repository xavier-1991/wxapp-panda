<template lang="pug">
    view
        view(class="p30lr") 
            view(class="df jcfe" v-if="type=='edit'")
                view(class="cor_red fs34" @tap="toDelete") 删除银行卡
            view(class="bb1 item df ai-center") 
                view(class="itemL") 真实姓名：
                input(class="inp" v-model="params.trueName" placeholder="请输入您身份证上的姓名" type="text")
            view(class="bb1 item df ai-center") 
                view(class="itemL") 银行卡号：
                input(class="inp" v-model="params.bankCard" placeholder="请输入银行卡号" type="number" @blur="getBankName")
            view(class="bb1 item df ai-center") 
                view(class="itemL") 银行名称：
                input(class="inp" v-model="params.bankName" placeholder="请输入需要绑定银行卡名称" type="text")
            view(class="bb1 item df ai-center") 
                view(class="itemL") 具体支行：
                input(class="inp" v-model="params.bankSubBranch" placeholder="请输入具体支行名称" type="text")
            view(class="df ai-center jcsb item") 
                view(class="cor_3 fs34") 设置为默认提现账号
                switch(@change="toChange" :checked="!!params.isDefault" color="#E93421") 
            view(class="btn can-use" style="margin-top: 3.1rem;" @tap="toSubmit") 提交
</template>
<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data(){
        return {
            type:'',
            params:{
                trueName:'',
                bankCard:'',
                bankName:'',
                bankSubBranch:'',
                isDefault:1,
            }
        }
    },
    onLoad(options){
        this.type=options.type;
        if(options.type=='edit'){
            uni.setNavigationBarTitle({
                title: '编辑银行卡'
            });
            let cardinfo=pd.getCardInfo();
            delete cardinfo.formatBankCard;
            this.params=cardinfo;
        }else{
            uni.setNavigationBarTitle({
                title: '添加银行卡'
            });
        }
    },
    methods: {
        getBankName(){
             http.request(urls.GET_BANK_NAME, 'GET',{bankCardNo:this.params.bankCard},false).then(
                data => {
                     if(data.validated) {
                        this.$set(this.params,'bankName',data.bankName);
                     }else{
                        this.$set(this.params,'bankName','');
                     }           
                }
            );
        },
        toChange(e){
            this.params.isDefault=e.detail.value?1:0;
        },
        toSubmit(){
            if(!this.params.trueName.trim()){
                util.showToast('真实姓名不能为空');
                return;
            }
            if(!this.params.bankCard.trim()){
                util.showToast('银行卡号不能为空');
                return;
            }
            if(!this.params.bankName.trim()){
                util.showToast('银行名称不能为空');
                return;
            }
            if(!this.params.bankSubBranch.trim()){
                util.showToast('具体支行不能为空');
                return;
            }
            let method="";
            let url="";
            if(this.type=='add'){
                method="POST"
                url=urls.BANK_CARD;
            }else{
                method="PUT"
                url=`${urls.BANK_CARD}/${this.params.id}`;
            }
            util.showLoadingDialog("正在提交");
            http.request(url, method, this.params).then(
                data => {
                    if(this.type=='add'){
                        util.showToast('添加成功')
                    }else{
                        util.showToast('编辑成功')
                    }
                    setTimeout(() => {
                        util.hideLoadingDialog();
                        uni.navigateBack();
                    }, 1000);
                    
                }
            );
        },
        toDelete(){
             util.showConfirm('','删除','是否删除当前银行卡',()=>{
                util.showLoadingDialog('正在删除');
                http.request(`${urls.BANK_CARD}/${this.params.id}`, "DELETE", null).then(result => {
                    util.showToast('删除成功');
                    setTimeout(() => {
                        util.hideLoadingDialog();
                        uni.navigateBack();
                    }, 1000);
                });
            })
        }  
    }
}
</script>
<style lang="stylus">
    @import "./bank-edit-add.styl"
</style>