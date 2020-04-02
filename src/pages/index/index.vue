<template lang="pug">
    view(class="wrap re" v-if="hasData")
        view
            image(src="../../static/images/banner.jpg" class="bk_bule bannerImg br10" alt="")
        view(class="city-nav df fw")
            view(class="city-tag" :data-cityid="0" :class="{currType:params.cityId===''}" @tap="chooseCity") 全部
            view(class="city-tag" v-for="(item,index) in cityInfo" :key="index" :data-cityid="item.cityId" :class="{currType:item.cityId==params.cityId}" @tap="chooseCity") {{item.cityName}}
        view(class="card")
            view(class="df ai-center jcsb cardTitle bb1 p25lr")
                view(class="df ai-center")
                    image(class="labelImg" src="../../static/images/label_red.png")
                    view(class="cardTitleText") 总数据统计
                view(class="df ai-center" @click="toShowFilter")
                    image(class="filterImg" src="../../static/images/icon_home_filter.png")
                    view(class="cor_9 fs28 ml5 fwb") 筛选
            view(class="cardMain df fw")
                view(class="cardMainItem br1")
                    view(class="cardMainItemTextNum") {{sData.allStoresNum}}
                    view(class="cardMainItemText") 门店数
                view(class="cardMainItem")
                    view(class="fs38 cor_000") {{sData.allOrderNum}}
                    view(class="cardMainItemText") 订单数
                view(class="cardMainItem bt1 br1")
                    view(class="fs38 cor_000") ￥{{sData.allSaleAmount}}
                    view(class="cardMainItemText") 销售额
                view(class="cardMainItem bt1")
                    view(class="fs38 cor_red") ￥{{sData.allProfitAmount}}
                    view(class="cardMainItemText") 分润额
        view(class="card mt20")
            view(class="df ai-center jcsb cardTitle bb1 p25lr")
                view(class="df ai-center")
                    image(class="labelImg" src="../../static/images/label_orange.png")
                    view(class="cardTitleText") 今日新增数据统计
            view(class="cardMain df fw")
                view(class="cardMainItem br1")
                    view(class="cardMainItemTextNum") {{sData.todayStoresNum}}
                    view(class="cardMainItemText") 门店数
                view(class="cardMainItem")
                    view(class="fs38 cor_000") {{sData.todayOrderNum}}
                    view(class="cardMainItemText") 订单数
                view(class="cardMainItem bt1 br1")
                    view(class="fs38 cor_000") ￥{{sData.todaySaleAmount}}
                    view(class="cardMainItemText") 销售额
                view(class="cardMainItem bt1")
                    view(class="fs38 cor_red") ￥{{sData.todayProfitAmount}}
                    view(class="cardMainItemText") 分润额
        view(class="cor_333 fs30 fwb" style="padding:50rpx 0 20rpx;") 门店采购商品列表
        view(v-for="(item,index) in list" :key="index" class="bk_f list" :style="{marginTop:item.isDisplay&&index>0?'15rpx':0}")
            view(class="p25lr")
                view(class="title2 df jcsb" v-if="item.isDisplay")
                    view(class="fs24 cor_9") {{item.date}}
                    view(class="fs24 cor_9") 共分润：￥{{item.todayProfitAmount}}
            view(v-for="(goodItem,goodIndex) in item.goods" :key="goodIndex" class="p25lr bt1")
                view(class="title2 bb1") {{goodItem.goodsName}}
                view(class="df jcsb ai-center" style="padding:23rpx 0;")
                    view(class="listItem line re")
                        view(class="listNum") ￥{{goodItem.goodsPrice}}
                        view(class="listText") 采购价
                    view(class="listItem line re")
                        view(class="listNum") {{goodItem.goodsNum}}
                        view(class="listText") 数量
                    view(class="listItem line re")
                        view(class="listNum") {{goodItem.brandProfit}}
                        view(class="listText") 毛利率
                    view(class="listItem re")
                        view(class="listNum" style="color:#e93421") ￥{{goodItem.cityAdminAmount}}
                        view(class="listText") 分润额
        view(class="df jcc mt50")
            view(class="df jcc ai-center" @tap="toGoodsList")
                view(class="fs26 cor_666") 查看所有商品
                image(class="moreImg ml10" src="../../static/images/usercenter/icon_arrow.png")
        //- 筛选遮罩层 ******************************************************************
        view(class="filter" id="filterMain" v-if="isShowFilter")
            view(class="p30lr" style="padding-bottom: 120rpx;")
                view
                    view(class="fItem")
                        view(class="fItemL") 渠道
                    view(class="df fw fItemBox")
                        view(v-for="item in channelInfo" :key="index" :data-channelid="item.channelId" :class="{currType:item.channelId==params.channelId}" @tap="chooseChannel") {{item.channelName}}
                view
                    view(class="fItem")
                        view(class="fItemL") 品牌  
                        view(class="fItemR toShow" @tap="toggleBrand")
                            view 展开全部
                            image(:class="{arrow:true,arrow_t:!hideBrand}" src="../../static/images/arrow_right.png")                     
                    view(:class="{df:true,fw:true,fItemBox:true,hiddenBrand:hideBrand}")
                        view(v-for="item in brandInfo" :key="index" :data-brandid="item.brandId" :class="{currType:item.brandId==params.brandId}" @tap="chooseBrand") {{item.brandName}}
                view
                    view(class="fItem")
                        view(class="fItemL") 价格
                    view(class="df ai-center jcsb mt25")
                        view(class="df ai-center priceBox")
                            view(class="fs38 cor_333 ml25") ￥
                            input(class="priceInp" v-model="params.minPrice" placeholder="最低价格" type="text")
                        view(class="line2")
                        view(class="df ai-center priceBox")
                            view(class="fs38 cor_333 ml25") ￥
                            input(class="priceInp"  v-model="params.maxPrice" placeholder="最高价格" type="text")
                view
                    view(class="fItem")
                        view(class="fItemL") 时间
                    view(class="df ai-center jcsb mt25")
                        view(class="df ai-center priceBox")
                            input(@tap="chooseTime(0)" id="date1" :value="params.startTime" :disabled='true' class="timeInp form-control" placeholder="开始时间" type="text")
                        view(class="line2")
                        view(class="df ai-center priceBox")
                            input(@tap="chooseTime(1)" id="date2" :value="params.endTime" :disabled='true' class="timeInp form-control" placeholder="结束时间" type="text")
            view(class="btnWrap df")
                view(class="reset cor_red" @tap="reSet") 重置
                view(class="confirm cor_f" @tap="toFilter") 确定  
            yu-datetime-picker(ref="dateTime" startYear="2000" :value="currentTime" endYear="2035" :isAll="true" :current="false" @confirm="onConfirm")
</template>

<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
import yuDatetimePicker from "../../components/yu-datetime-picker/yu-datetime-picker.vue";
export default {
    data() {
        return {
            hasData:false,
            t: 0,
            fixed: false,
            isShowFilter: false,
            currentTime: util.formatTime(new Date()),
            timeType: 0,
            sData:null,
            hideBrand:true,
            params:{
                cityId:"",
                channelId:"",
                brandId:"",
                minPrice:"",
                maxPrice:"",
                startTime: "",
                endTime: ""
            },
            startTimeNum:"",  //用于比较时间
            endTimeNum:"",    //用于比较时间
            brandInfo:[],
            channelInfo:[],
            cityInfo:[],
            count:0,
            list:[],
            pageTotal:0
           
        };
    },
    components: {
        yuDatetimePicker
    },
    onLoad() {
        this.loadData();
    },
    onPageScroll(ev) {
        let st = ev.scrollTop;
        if (st > this.t) {
            this.fixed = true;
        } else {
            this.fixed = false;
        }
    },
    onPullDownRefresh() {
        this.loadData();
    },
    methods: {
        loadData(){
            util.showLoadingDialog('正在加载');
            http.request(urls.INDEX, "GET", this.params).then(result => {
                this.sData=result;
                util.hideLoadingDialog();
                return Promise.resolve()
            }).then(()=>{
                http.request(urls.GOODS, "GET", {...this.params,page:1}).then(result => {
                    this.brandInfo=result.brandInfo;
                    this.cityInfo=result.cityInfo;
                    this.channelInfo=result.channelInfo;
                    this.count=result.count;
                    this.list=result.list;
                    this.pageTotal=result.pageTotal;
                    this.hasData=true;
                    return Promise.resolve()
                });
            }).finally(()=>{
                uni.stopPullDownRefresh();
            })
        },
        toggleBrand(){
            this.hideBrand=!this.hideBrand;
        },
        chooseCity(e){
            if(e.currentTarget.dataset.cityid===0){
                this.params.cityId='';
            }else{
                this.params.cityId=e.currentTarget.dataset.cityid;
            }
            this.loadData();
        },
        chooseChannel(e){
            this.params.channelId=e.currentTarget.dataset.channelid;
        },
        chooseBrand(e){
            this.params.brandId=e.currentTarget.dataset.brandid;
        },
        toShowFilter() {
            this.isShowFilter = true;
        },
        toggleTab(item, index) {
            this.$refs.dateTime.show();
        },
        reSet(){
            let cityId=this.params.cityId;
            this.params={
                cityId:cityId,
                channelId:"",
                brandId:"",
                minPrice:"",
                maxPrice:"",
                startTime: "",
                endTime: ""
            }
            this.startTimeNum="";
            this.endTimeNum="";
        },
        toFilter(){
            if(this.params.minPrice && !util.checkPrice(this.params.minPrice)){
                util.showToast('请输入正确格式的价格，最多两位小数');
                return;
            }
            if(this.params.maxPrice && !util.checkPrice(this.params.maxPrice)){
                util.showToast('请输入正确格式的价格，最多两位小数');
                return;
            }
            if(this.params.minPrice && this.params.maxPrice && this.params.maxPrice*1<this.params.minPrice*1){
                util.showToast('最高价格必须大于最低价格');
                return;
            }
             if(this.startTimeNum && this.endTimeNum && this.startTimeNum>=this.endTimeNum){
                util.showToast('结束时间必须大于开始时间');
                return;
            }
            this.isShowFilter=false;
            this.loadData();
        },
        onConfirm(val) {
            let sArr = val.selectArr;
            let time = `${sArr[0]}-${sArr[1]}-${sArr[2]} ${sArr[3]}:${sArr[4]}`;
            if (this.timeType == 0) {
                this.startTimeNum=sArr.join('')*1;
                this.params.startTime = time;
            } else {
                this.endTimeNum=sArr.join('')*1;
                this.params.endTime = time;
            }
        },
        chooseTime(type) {
            this.timeType = type;
            this.$refs.dateTime.show();
        },
        toGoodsList(){
            util.linkto("goods-list");
        }
    }
};
</script>

<style lang="stylus">
@import './index.styl'
</style>
