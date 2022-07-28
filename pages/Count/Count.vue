<template>
	<view>
		<!-- 提交订单 -->
		<view class="submit" @click="submit">
			<uni-icons type="arrowleft" size="30"></uni-icons>
		</view>
		<!-- 商品卡片 -->
		<view class="goods">
			<view class="good" v-for="(good,index) in pag" :key="index">
				<!-- 上面的商品信息区 -->
				<view class="top">
					<image :src="'../../static/'+good[0].good.good.img_path" mode=""></image>
					<!-- 商品信息区 -->
					<view class="info">
						<!-- 商品名称 -->
						<h1>{{good[0].good.good.name}}</h1>
						<!-- 商品信息 -->
						<!-- <p></p> -->
						<!-- 商品数量 -->
						<span>x{{good[2].num}}</span>
					</view>
					<view class="right">
						￥{{good[0].good.good.price}}
					</view>
				</view>
				<br>
				<view class="bottom">
					<view class="yb">
						小计<span>￥{{good[1].sum}}</span>
					</view>
					
				</view>
				
			</view>
			
		</view>
		
		<view class="pay" >
			<view class="price">
				
					合计:<span>￥{{total}}</span>
				
			</view>
			<button @click="goPay">提交订单</button>
		</view>
		<!-- 确认支付 -->
		<uni-popup ref="pop" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" :duration="2000" :before-close="true" @close="close1" @confirm="confirm" content="确认支付"></uni-popup-dialog>
		</uni-popup>
		<!-- 支付成功的弹窗 -->
		<uni-popup ref="popup" type="message">
			<uni-popup-message type="success" message="支付成功!2秒后跳转页面" :duration="2000"></uni-popup-message>
		</uni-popup>
		<!-- 取消支付的弹窗 -->
		<uni-popup ref="cancel" type="message">
			<uni-popup-message type="warn" message="您已取消支付" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"Count",
		data() {
			return {
				pag:[],
				total:0,
				num:0,
				token:'',
				orderNumber:0
			};
		},
		mounted(options){
			var that =this
			 
			 const eventChannel = this.getOpenerEventChannel()			
			 eventChannel.on('acceptData', function(data) {
				  that.pag=data.data[0]
				  that.total=data.data[1]
				  that.num=data.data[2]
			 })
		
		},
		methods:{
			// 进行支付
			goPay(){
				var that =this
				wx.getStorage({
					// 根据此判断用户是否登录
				  key: 'token',
				  success (res) {
					  // let openid=res.data
					  if(res.data){
						  that.open1()
						  that.token=res.data
					  }
				  }
				})
				
			},
			// 返回提交订单页面
			submit(){
				wx.navigateBack()
			},
			// 支付的显示与隐藏
			open() {
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			},
			// 确认支付的显示与隐藏
			open1(){
				this.$refs.pop.open()
			},
			close1(){
				this.$refs.pop.close()
				// 取消支付：订单依旧跳转，但显示为待支付
				
				this.open2()
				// 支付状态为0
				var status=0
				this.goOrder(status)
				this.exitOrder(status)
			},
			// 确认支付的事件
			confirm() {
				// this.$refs.pop.close()
				this.open()
				// 1表示支付状态
				var status=1
				// 把状态传入给goOrder方法
				this.goOrder(status)
				this.exitOrder(status)
			},
			// 取消支付的显示与隐藏
			open2(){
				this.$refs.cancel.open('bottom')
			},
			close2(){
				this.$refs.cancel.close()
			},
			// 跳转页面的方法:接收支付的状态，并带着状态跳转
			goOrder(status){
				// console.log(status);
				var that=this
				setTimeout(function() {
					let order = [that.pag,that.total,that.num,status,{complete:0},that.orderNumber]
					// console.log(order);
					//把参数保存至全局变量
					getApp().globalData.order = order
					// 确认支付，订单状态为已支付
					wx.switchTab({
						url:'/pages/tabbar/order/index',
					})
				}, 2000);
			},
			// 存储订单的方法
			exitOrder(status){
				var that=this
				let code=Math.random().toString(36).slice(-10)
				wx.request({
						url:'http://127.0.0.1:3007/api/order',
						data:{
							order:[{pag:that.pag},{total:that.total},{num:that.num}],
							user:that.token,
							complete:0,
							code:code,
							pay:status
						},
						success:function(res){
							that.orderNumber=res.data.orderNumber
							console.log(that.orderNumber);
						}
				})
			}
		}
	}
</script>

<style lang="scss">
	.submit{
		width: 100%;
		background-color: white;
		position: fixed;
		top: 0;
		height: 100rpx;
	}
	.goods{
		background: #f7f7f7;
		margin-top: 120rpx;
		border-radius: 25rpx;
		.good{
			width: 95%;
			background: white;
			margin: 20rpx auto;
			border-radius: 25rpx;
			height: 200rpx;
			.top{
				border-radius: 10rpx;
				margin-top: 10rpx;
				position: relative;
				height: 150rpx;
				image{
					position: absolute;
					height: 100rpx;
					width: 100rpx;
					top: 30rpx;
					left: 30rpx;
				}
				.info{
					position: absolute;
					left: 160rpx;
					top: 20rpx;
					h1{
						font-weight: bold;
						margin-bottom: 10rpx;
						font-size: 34rpx;
					}
					span{
						color: #017A53;
						// font-weight: bold;
					}
				}
				.right{
					position: absolute;
					right: 20rpx;
					top:50rpx;
				}
			}
			.bottom{
				border-radius: 10rpx;
				height: 80rpx;
				background: white;
				border-top: 4rpx solid #f5f5f5;
				border-bottom: 2rpx solid lightgray;
				position: relative;
				.yb{
					margin-top: 20rpx;
					position: absolute;
					right: 20rpx;
					span{
						font-weight: bold;
					}
				}
			}
			
		}
		
	}
.pay{
	width: 100%;
	background: white;
	position: fixed;
	bottom: 0;
	padding-bottom: 40rpx;
	height: 160rpx;
	.price{
		float: left;
		margin-top: 24rpx;
	}
	button{
		width: 200rpx;
		float: right;
		background: #017A53;
		color: white;
		margin-top: 14rpx;
		margin-right: 10rpx;
		border-radius: 999rpx;
		font-size: 30rpx;
	}
}
</style>