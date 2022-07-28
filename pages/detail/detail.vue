<template>
	<view>
		<uni-nav-bar leftIcon="arrowleft" leftText="返回" title="订单详情" @clickLeft="back"></uni-nav-bar>
		<view class="noOk" v-if="complete==0" >
			
			<!-- 奶茶盒子 -->
			<view class="tea">
				<view class="order">
					<image src="../../static/red1.png" mode=""></image>
					<p>取茶号</p>
					<span>{{orderNumber>10?orderNumber:'0'+orderNumber}}</span>
				</view>
			</view>
			<span class="one">下单</span> <li class="circle"></li><span class="two">取茶</span>
			<p>饮品正抓紧制作中，请稍后</p>
		</view>
		<view class="ok" v-else>
			<uni-card>
				<li>已完成</li>
				<li>取茶号{{orderNumber>10?orderNumber:'0'+orderNumber}}</li>
				<li>再来一单</li>
			</uni-card>
		</view>
		<view >
			<uni-card v-for="(item,i) in order[0].pag" :key="i" class="good" :subTitle="'X'+item[2].num" :title="item[0].good.good.name" :thumbnail="'/static/'+item[0].good.good.img_path" :extra="'￥'+item[1].sum" note="Tips" margin="0 30rpx">
			     <!-- 内容主体，可自定义内容及样式 -->
		    </uni-card>
			<uni-card  :title="'合计：￥'+order[1].total" :extra="'共'+order[2].num+'件'" margin="0 30rpx"></uni-card>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order:[],
				complete:0,
				orderNumber:0
			};
		},
		mounted(options) {
			const eventChannel = this.getOpenerEventChannel()
			var that=this
			eventChannel.on('orderInfo', function(data) {
			      console.log(data)
				  that.order=data.data
				  that.complete=data.complete
				  that.orderNumber=data.orderNumber
			})
		},
		methods:{
			back(){
				wx.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	.noOk{
		margin-bottom: 100rpx;
		.tea{
			.order{
				border: 20rpx solid white;
				height:350rpx;
				// background-image: url('../../static/red.png');
				width: 300rpx;
				border-bottom-left-radius: 200rpx;
				border-bottom-right-radius: 200rpx;
				border-top-left-radius: 70rpx;
				border-top-right-radius: 70rpx;
				margin: 10rpx auto;
				image{
					z-index: -1;
					width: 300rpx;
					height: 350rpx;
					border-bottom-left-radius: 200rpx;
					border-bottom-right-radius: 200rpx;
					border-top-left-radius: 70rpx;
					border-top-right-radius: 70rpx;
					opacity: 0.8;
				}
				p{
					position: absolute;
					font-size: 36rpx;
					// margin-left: 33%;
					// margin-top: 60rpx;
					top: 180rpx;
					left: 320rpx;
				}
				span{
					position: absolute;
					font-size: 60rpx;
					font-weight: bold;
					top: 240rpx;
					left: 330rpx;
				}
			}
		}
		.circle{
			width: 230px;
			height: 100px;
			border: 10rpx solid #F8BF9F;
			border-radius: 0 0 50% 50%/0 0 100% 100% ;
			border-top: none;
			margin: 0 auto;
			position: absolute;
			top: 350rpx;
			left: 140rpx;
		}
		.one{
			position: absolute;
			top:300rpx;
			left:100rpx
		}
		.two{
			position: absolute;
			top: 300rpx;
			right:100rpx ;
		}
		p{
			position: absolute;
			top: 600rpx;
			left: 180rpx;
		}
	}

.good{
	margin-top: 230rpx;
}
</style>
