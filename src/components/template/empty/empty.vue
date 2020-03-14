<template lang="pug">
    view
        view(v-if="emptyType==='no_msg'" style="padding-top:265rpx;")
            view(class="df jcc")
                image(src="../../../static/images/no_msg.png" style="width:540rpx;height: 540rpx;")
            view(class="fs30 tac" style="color:#665b63;padding-top: 100rpx;") 暂无通知哦
        view(v-if="emptyType==='no_data'" style="padding-top:133rpx;")
            view(class="df jcc")
                image(src="../../../static/images/no_data.png" style="width:540rpx;height: 540rpx;")
            view(class="fs30 tac" style="color:#665b63;padding-top: 100rpx;") 暂无数据~等会再来吧
        view(v-if="emptyType==='no_lesson'" style="padding-top:133rpx;")
            view(class="df jcc")
                image(src="../../../static/images/no_lesson.png" style="width:540rpx;height: 540rpx;")
            view(class="df jcc")    
                view(class="fs30 tac" style="width:540rpx;color:#665b63;padding-top: 20rpx;") 恭喜！您宝宝本阶段课程已全部学完~可以升级啦！
        view(v-if="emptyType==='no_network'" style="padding-top:100rpx;")
            view(class="df jcc")
                image(src="../../../static/images/no_network.png" style="width:540rpx;height: 540rpx;")
            view(@click.stop="refreshPage" class="fs30 tac" style="color:#665b63;padding-top: 100rpx;")
                text 没有网啦，快找回来吧~
                text(class="ml10" style="color:#3d92e1") 点击重试
</template>
<script>
   export default {
		props: {
			emptyType:{
                type:String,
                default:''
            }		
		},
		methods: {
			refreshPage(){
                this.$emit('refreshPage');
            }
		}
	}
</script>
<style>
    
</style>