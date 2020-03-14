<template lang="pug">
    view(class="wrap re")
        view
            image(src="../../static/images/banner.jpg" class="bk_bule bannerImg br10" alt="")
        view(class="card mt20")
            view(class="df ai-center jcsb cardTitle bb1 p25lr")
                view(class="df ai-center")
                    image(class="labelImg" src="../../static/images/label_red.png")
                    view(class="cardTitleText") 总数据统计
                view(class="df ai-center" id="filter")
                    image(class="filterImg" src="../../static/images/icon_home_filter.png")
                    view(class="cor_9 fs28 ml5 fwb") 筛选
            view(class="cardMain df fw")
                view(class="cardMainItem br1")
                    view(class="cardMainItemTextNum") 12
                    view(class="cardMainItemText") 门店数
                view(class="cardMainItem")
                    view(class="fs38 cor_000") 1992
                    view(class="cardMainItemText") 订单数
                view(class="cardMainItem bt1 br1")
                    view(class="fs38 cor_000") ￥12312
                    view(class="cardMainItemText") 销售额
                view(class="cardMainItem bt1")
                    view(class="fs38 cor_red") ￥1122.00
                    view(class="cardMainItemText") 分润额
        view(class="card mt20")
            view(class="df ai-center jcsb cardTitle bb1 p25lr")
                view(class="df ai-center")
                    image(class="labelImg" src="../../static/images/label_orange.png")
                    view(class="cardTitleText") 今日新增数据统计
                view(class="df ai-center" id="filter")
                    image(class="filterImg" src="../../static/images/icon_home_filter.png")
                    view(class="cor_9 fs28 ml5 fwb") 筛选
            view(class="cardMain df fw")
                view(class="cardMainItem br1")
                    view(class="cardMainItemTextNum") 12
                    view(class="cardMainItemText") 门店数
                view(class="cardMainItem")
                    view(class="fs38 cor_000") 1992
                    view(class="cardMainItemText") 订单数
                view(class="cardMainItem bt1 br1")
                    view(class="fs38 cor_000") ￥12312
                    view(class="cardMainItemText") 销售额
                view(class="cardMainItem bt1")
                    view(class="fs38 cor_red") ￥1122.00
                    view(class="cardMainItemText") 分润额
        view(id="listTitle" class="card mt20" style="border-radius: 10rpx 10rpx 0 0;")
            view(class="df ai-center jcsb cardTitle bb1 p25lr")
                view(class="df ai-center")
                    image(class="labelImg" src="../../static/images/label_blue.png")
                    view(class="cardTitleText") 门店采购商品列表
                view(class="df ai-center" id="filter")
                    image(class="filterImg" src="../../static/images/icon_home_filter.png")
                    view(class="cor_9 fs28 ml5 fwb") 筛选
        view(class="p25lr bk_f list" style="border-radius:0 0 10rpx 10rpx;")
            view(class="title2 bb1") 法国mustela妙思乐婴儿洗发沐浴露2
            view(class="df jcsb ai-center" style="padding:23rpx 0;")
                view(class="listItem line re")
                    view(class="listNum") ￥150.00
                    view(class="listText") 采购价
                view(class="listItem line re")
                    view(class="listNum") 28
                    view(class="listText") 数量
                view(class="listItem line re")
                    view(class="listNum") 22%
                    view(class="listText") 毛利率
                view(class="listItem re")
                    view(class="listNum cor_red") ￥150.00
                    view(class="listText") 分润额
        view(class="df ai-center jcc mt50")
            view(class="fs26 cor_666") 查看所有商品
            image(class="moreImg ml10" src="../../static/images/usercenter/icon_arrow.png")
        view(class="filter" id="filterMain")
            view(class="p30lr" style="padding-bottom: 120rpx;")
                view
                    view(class="fItem")
                        view(class="fItemL") 区域
                    view(class="df fw fItemBox")
                        view 合肥
                        view 合肥
                view
                    view(class="fItem")
                        view(class="fItemL") 渠道
                        view(class="fItemR toShow")
                            view 展开全部
                            image(class="arrow arrow_b" src="../../static/images/arrow_right.png")
                    view(class="df fw fItemBox")
                        view 艺朝艺夕
                        view 艺朝艺夕
                view
                    view(class="fItem")
                        view(class="fItemL") 品牌                       
                    view(class="df fw fItemBox")
                        view 克乐思
                        view 克乐思
                view
                    view(class="fItem")
                        view(class="fItemL") 价格
                    view(class="df ai-center jcsb mt25")
                        view(class="df ai-center priceBox")
                            view(class="fs38 cor_333 ml25") ￥
                            input(class="priceInp" placeholder="最低价格" type="text")
                        view(class="line2")
                        view(class="df ai-center priceBox")
                            view(class="fs38 cor_333 ml25") ￥
                            input(class="priceInp" placeholder="最高价格" type="text")
                view
                    view(class="fItem")
                        view(class="fItemL") 时间
                    view(class="df ai-center jcsb mt25")
                        view(class="df ai-center priceBox")
                            input(id="date1" readonly class="timeInp form-control" placeholder="开始时间" type="text")
                        view(class="line2")
                        view(class="df ai-center priceBox")
                            input(id="date2" readonly class="timeInp form-control" placeholder="结束时间" type="text")
            view(class="btnWrap df")
                view(class="reset cor_red") 重置
                view(class="confirm cor_f") 确定
        view(class="tabbar")
            view(class="tabbarItem")
                image(src="../../static/images/tabbar/home_01.png")
                view(class="fs20 cor_red tac") 首页
            view(class="tabbarItem")
                image(src="../../static/images/tabbar/user_02.png")
                view(class="fs20 cor_999 tac") 我的
               
</template>

<script>
const util = require("../../utils/util");
const urls = require("../../utils/urls");
const http = require("../../utils/http");
import "./index.styl";
export default {
    data() {
        return {};
    },
    onLoad() {},
    methods: {}
};
</script>

<style lang="stylus"></style>
