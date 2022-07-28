<template>
	<view>
		支付界面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total:0
			};
		},
		mounted(options){
			var that =this
			 const eventChannel = this.getOpenerEventChannel()
			 eventChannel.on('acceptData', function(data) {
				 console.log(data);
				  that.total=data.data
				  
			 })
		}
	}
</script>

<style lang="scss">

</style>
