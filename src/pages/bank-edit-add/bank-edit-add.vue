<template lang="pug">
    view
        view(class="p30lr") 
            view(class="df jcfe")
                view(class="cor_red fs34") 删除银行卡
            view(class="bb1 item df ai-center") 
                view(class="itemL") 真实姓名：
                input(class="inp" v-model="params.trueName" placeholder="请输入您身份证上的姓名" type="text")
            view(class="bb1 item df ai-center") 
                view(class="itemL") 银行卡号：
                input(class="inp" v-model="params.bankCard" placeholder="请输入银行卡号" type="number")
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
export default {
    data(){
        return {
            params:{
                trueName:'',
                bankCard:'',
                bankName:'',
                bankSubBranch:'',
                isDefault:1,
            }
        }
    },
    onLoad(){

    },
    methods: {
        toChange(e){
            this.params.isDefault=e.detail.value?1:0;
        },
        toSubmit(){
            util.showLoadingDialog("正在提交");
            http.request(urls.FORGOT_LOGIN_PASSWORD, "POST", this.params).then(
                data => {
                    util.showToast('重置成功')
                    setTimeout(() => {
                        util.hideLoadingDialog();
                        util.reLaunch('login');
                    }, 1000);
                    
                }
            );
        }   
    }
}
</script>
<style lang="stylus">
    @import "./bank-edit-add.styl"
</style>