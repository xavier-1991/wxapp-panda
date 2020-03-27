<template lang="pug">
    view(class="wrap" v-if="hasData")
        view(class="fillTitle p30lr bb1")
            view(class="df ai-center bb1 pb25 jcsb" id="timeFilter")
                view(class="df ai-center" @tap="changeYears")
                    view(class="fs40 cor_3 mr10") {{year}}
                    view(class="arrow_wrap" v-if="yearArr.length>1")
                        view(class="arrow")
                view(class="df ai-center" id="filter" @tap="toShowFilter")
                    image(class="filterImg" src="../../static/images/icon_home_filter.png")
                    view(class="cor_9 fs28 ml5 fwb") 筛选
            view(class="df ai-center jcsb listTitle")
                view 时间
                view 提现金额/备注
        view(class="list")
            view(class="df ai-center jcsb item" v-for="(item,index) in list" :key="index" @tap="toDetail(item.id)")
                view(class="df")
                    image(class="bill_icon" :src="'../../static/images/withdraw/'+item.iconName+'.png'")
                    view(class="ml20")
                        view(class="fs30") {{item.status}}
                        view(class="fs28 cor_9 mt10") {{item.applyTime}}
                view(class="fs30 cor_9" v-if="item.iconName=='icon_failure'") {{item.reviewDescription}}
                view(class="fs30" v-else) -{{item.applyAmount}}
        view(class="filterMask" v-if="isShow")
            view(class="filterMain")
                view(class="df ai-center jcsba")
                    view(:class="{filterTab:true,filterTabRed:status==index}" :data-index="index" v-for="(item,index) in applyArr" :key="index" @tap="clickTab(index)") {{item}}
                view(class="df ai-center filterBtnWrap")
                    view(id="reset" @tap="toReset") 重置
                    view(@tap="toFilter") 确定
        view(class="lookMore cor_6 fs26 df jcc mt20")
            view(v-if="page<pageTotal" @tap="lookMore") 查看更多
            view(v-if="count==0") 暂无数据
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
            isShow:false,
            list:[],
            applyArr:[],
            yearArr:[],
            year:'',
            pageTotal:0,
            count:0,
            page:1,
            status:-1
        }
    },
    onLoad(){
        this.loadData();
    },
    methods: {
        loadData(){
            let params={
                status:this.status*1,
                page:this.page,
                year:this.year
            };
            util.showLoadingDialog('正在加载');
            http.request(urls.APPLY, "GET", params).then(result => {
                if(this.page==1){
                    this.hasData=true;
                    this.list=result.list;
                    this.applyArr=result.applyArr;
                    this.yearArr=result.yearArr;
                    this.year=this.year?this.year:result.nowYear;
                    this.pageTotal=result.pageTotal;
                    this.count=result.count;
                }else{
                    this.list=[...this.list,...result.list];
                }
                
                util.hideLoadingDialog();
            });
        },
        toDetail(id){
           util.linkto("withdraw-bill-detail",`id=${id}`);
        },
        lookMore(){
            if(this.page<this.pageTotal){
                this.page++;
                this.loadData();
            }
        },
        toShowFilter(){
            this.isShow = !this.isShow
        },
        clickTab(index){
            console.log(index);
            this.status=index;
        },
        toReset(){
            this.status=-1
        },
        toFilter(){
            this.loadData();
            this.isShow = false;
        },
        changeYears(){
            if(this.yearArr.length<2){
                return;
            }
            uni.showActionSheet({
                itemList: this.yearArr,
                success: res => {
                    this.page=1;
                    this.year=this.yearArr[res.tapIndex];
                    this.loadData();
                }
            });
        }
    }
}
</script>
<style lang="stylus">
    @import "./withdraw-bill.styl"
</style>