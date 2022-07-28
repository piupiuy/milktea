<template>
	<view>
	<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button" activeColor="#017953"></uni-segmented-control>
	        <view class="content">
				<!-- 当前订单 -->
	            <view class="orders" v-for="(nocorder,index) in NoCOrder">
	            	<view v-for="(item,i) in JSON.parse(nocorder.order[0])[0].pag" :key="i"  @click="goDetail(JSON.parse(nocorder.order[0]),nocorder.pay,nocorder.complete,nocorder.orderNumber)">
	            		<uni-card  :subTitle="'X'+item[2].num" :title="item[0].good.good.name" :thumbnail="'/static/'+item[0].good.good.img_path" :extra="'￥'+item[1].sum" note="Tips" margin="0 30rpx">
	            		    <!-- 内容主体，可自定义内容及样式 -->
	            		</uni-card>
	            	</view>
	            	<uni-card class="info" margin="0 30rpx" border-radius="0">
	            		<li>合计:{{JSON.parse(nocorder.order[0])[1].total}}</li>
	            		<li>共{{JSON.parse(nocorder.order[0])[2].num}}件</li>
	            		<li style="color: #017953;">{{nocorder.pay==1?'已支付':'未支付'}}</li>
	            		<span>{{nocorder.complete==1?'已完成':'进行中'}}</span>
	            	</uni-card>
					<!-- 订单处于未支付的时候可以选择取消订单 -->
					<uni-card class="qx" v-if="nocorder.pay==0" margin="0 30rpx" border-top="none"><span @click="cancel(index)">取消订单</span></uni-card>
	            </view>
				<!-- 历史订单 -->
	            <view v-show="current == 1">
					<view class="orders" v-for="(order,index) in COrder">
						<view v-for="(item,i) in JSON.parse(order.order[0])[0].pag" :key="i" @click="goDetail(JSON.parse(order.order[0]),order.pay,order.complete,order.orderNumber)">
							<uni-card  margin="0 30rpx" :subTitle="'X'+item[2].num" :title="item[0].good.good.name" :thumbnail="'/static/'+item[0].good.good.img_path" :extra="'￥'+item[1].sum" note="Tips">
							</uni-card>
						</view>
						<uni-card class="info" margin="0 30rpx">
							<li>合计:{{JSON.parse(order.order[0])[1].total}}</li>
							<li>共{{JSON.parse(order.order[0])[2].num}}件</li>
							<li style="color: #017953;">{{order.pay==1?'已支付':'未支付'}}</li>
							<span>{{order.complete==1?'已完成':'进行中'}}</span>
						</uni-card>
					</view>
	            </view>
	        </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// 订单数据
				order:[],
				current:0,
				items:['当前订单','历史订单'],
				orderStatus:0,
				token:'',
				// 完成的订单
				COrder:[],
				// 未完成的订单
				NoCOrder:[],
			}
		},
		mounted() {
			// 接收传递过来的订单数据
			let order = getApp().globalData.order
			this.order=order
			// this.getOrder()
			// 判断用户是否登录
			var that=this
			wx.getStorage({
				key:'token',
				success:function(res){
					if(res.data){
						wx.request({
							url:'http://127.0.0.1:3007/api/getcomplete',
							data:{
								user:res.data
							},
							success:function(res){
								if(res.data.status==200){
									that.COrder=res.data.data
									
								}
							}
						})
						wx.request({
							url:'http://127.0.0.1:3007/api/nocorder',
							data:{
								user:res.data
							},
							success:function(res){
								if(res.data.status==200){
									that.NoCOrder=res.data.data
								}
							}
						})
					}
					
				}
			})
			
		},
		methods:{
			onClickItem(e){
				if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
				}
			},
			cancel(index){
				var code=this.NoCOrder[index].code
				var that=this
				wx.request({
					url:'http://127.0.0.1:3007/api/cancelOrder',
					data:{
						code:code
					},
					success:function(res){
						wx.showToast({
							title:'取消订单成功',
							icon:'success',
							duration:2000
						})
						that.NoCOrder.splice(index,1)
					},
					fail:function(){
						wx.showToast({
							title:'取消订单失败',
							icon:'none',
							duration:2000
						})
					}
					
				})
			},
			goDetail(order,pay,complete,orderNumber){
				if(pay==1){
					wx.navigateTo({
						url:'../../detail/detail',
						success:function(res){
							res.eventChannel.emit('orderInfo', { data: order,complete,orderNumber })
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orders{
		width: 98%;
		margin: 20rpx auto;
		background: #f4fcf8;
		padding: 4rpx;
		view{
			
		}
		.info{
			margin-top: 0;
			height:60rpx;
			li{
				list-style: none;
				float: left;
				margin-right: 20rpx;
			}
			span{
				float: right;
				color: #017953;
			}
		}
		.qx{
			height:40rpx;
		}
	}
	
</style>