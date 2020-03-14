<template lang="pug">
    image(v-if="goBackShow" class="btn_img" src="../../static/images/btn_left.png")
</template>
<script>
   export default {
		props: {
			goBackShow:{
                type:Boolean,
                default:true
            }		
		},
		methods: {
			refreshPage(){
                this.$emit('refreshPage');
            }
		}
	}
</script>
<style lang="stylus">
    .btn_img
        width 72rpx
        height 72rpx
        position: absolute
        top 47rpx
        left 37rpx
        z-index 10
</style>