<template>
    <view>
        <form @submit.stop="formSubmit" report-submit="true">
            <button style="padding:0;" class="btn_opacity" plain="true"  formType="submit"></button>
        </form>
    </view>
</template>
<script>
    const zx=require('../../utils/zx');
    export default {
        props: {
            immediately: {
                type: Boolean,
                default: false
            }
        },
        methods: {
        formSubmit(e) {
            console.log(e.detail.formId);
            let formId=e.detail.formId;
            var pattern = /\d+/;
            if (zx.isLogin() && pattern.test(formId)) {
                this.$globalData.formIdArray.push(formId);
                console.log(this.$globalData.formIdArray)
            }
            if(this.immediately && this.$globalData.formIdArray.length > 0){
                let params = {
                    form_id: this.$globalData.formIdArray.join(',')
                };
                http.request(urls.SAVE_FORMID, 'POST', params).then(data=>{
                    this.$globalData.formIdArray=[];
                });
            }
        }

    }
    }
</script>
<style>
    @import "./pushform.css"
</style>