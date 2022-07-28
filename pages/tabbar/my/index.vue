<template>
	<view >
		
		<!-- <Login v-if="token.length>0"></Login> -->
		<!-- <Register @reg="reg" v-else ></Register> -->
		<!-- <uni-card title="标题文字" thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" extra="额外信息" note="Tips">
		    内容主体，可自定义内容及样式
		</uni-card> -->
		<!-- 用户信息：头像，呢称 /登录 -->
		<view class="login" v-if="token==''">
			<h1>登录</h1>
			 <image src="../../../static/my.png" mode=""></image>
			 <button @click="open">点击登录</button>
			 <uni-popup ref="popup" type="center" backgroundColor="white">
						  <h3>miumiu申请获得以下权限</h3>
						  <li>获得你的公开信息(昵称，头像等)</li>
						  <button @click="login">授权登录</button>
			 </uni-popup>
		</view>
		<view class="userPage" v-else>
			<view class="back">
			<!-- 	<uni-card>xxx</uni-card> -->
				<image src="../../../static/summer.jpg" mode=""></image>
			</view>
			<view class="myorder">
				<uni-card>
					<h1>我的订单</h1>
				<view>
					<li @click="goOrder">
						<image src="../../../static/wd.png" mode=""></image><span>我的订单</span>
					</li>
					<li>
						<image src="../../../static/qb.png" mode=""></image><span>我的券包</span>
					</li>
				</view>
				</uni-card>
			</view>
			<view class="myfunc">
				<uni-card>
					<h1>我的功能</h1>
				<view>
					<li>
						<image src="../../../static/tran.png" mode=""></image><span>更换号码</span>
					</li>
					<li>
						<image src="../../../static/yhq.png" mode=""></image><span style="margin-left: 16rpx;">优惠券</span>
					</li>
					<li>
						<image src="../../../static/kf.png" mode=""></image><span style="margin-left: 40rpx;">客服</span>
					</li>
					<li>
						<image src="../../../static/code.png" mode=""></image><span style="margin-left: 26rpx;">会员码</span>
					</li>
				</view>
				</uni-card>
			</view>
			<!-- 底部轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" indicator-color="#fff" indicator-active-color="#C7ECFF">
						<swiper-item >
							<navigator class="swiper-item" >
								<img src="../../../static/s1.jpg" alt="">
							</navigator>
						</swiper-item>
						<swiper-item >
							<navigator class="swiper-item" >
								<img src="../../../static/s2.jpg" alt="">
							</navigator>
						</swiper-item>
			</swiper>
			<view class="logout" @click="open1()">
				<button>
					退出登录
				</button>
			</view>
		</view> 
		<uni-popup ref="pop" type="dialog">
			<uni-popup-dialog mode="base" message="success" content="确定要退出登录吗？" :duration="2000" :before-close="true" @close="close1" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import Register from '../../../components/register/register.vue'
	import Login from '../../../components/login/login.vue'
	export default{
		data(){
			return{
				token:'',
			}
		},
		components:{
			Register,
			Login
		},
		created(){
			var that=this
			wx.getStorage({
				key:'token',
				success:function(res){
					if(res.data.length>0){
						that.token=res.data
					}
				}
			})
		},
		mounted(){
			
		},
		methods:{
			login(){
				var that=this
				wx.login({
				  success (res) {
				    if (res.code) {
				      //发起网络请求
				      wx.request({
				        url: 'http://127.0.0.1:3007/api/user/login',
				        data: {
				          code: res.code,
				        },
						success(res){
							// 登录成功后会在本地存储里面产生__DC_STAT_UUID
							console.log(res);
							if(res.data.status==201||res.data.status==200){
								that.close()
								wx.setStorage({
								  key: "token",
								  data: res.data.data[0].openid,
								  encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
								  success() {
									  wx.reLaunch({
									  	url:'/pages/tabbar/my/index',
										success:function(){
											wx.showToast({
												title:'登录成功，即将跳转到首页',
												icon:'none',
												duration:1500
											})
										}
									  })
									  setTimeout(function(){
										  wx.switchTab({url:'/pages/tabbar/index/index'})
									  },2000)
								    
								  }
								})
								
								wx.getUserInfo({
								  success: function(res) {
								    var userInfo = res.userInfo
								    var nickName = userInfo.nickName
								    var avatarUrl = userInfo.avatarUrl
								    var gender = userInfo.gender //性别 0：未知、1：男、2：女
								    var province = userInfo.province
								    var city = userInfo.city
								    var country = userInfo.country
								  }
								})
								
							}
						}
				      })
				    } else {
				      alert('登录失败！' + res.errMsg)
				    }
				  }
				})
			},
			open(){
			        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			        this.$refs.popup.open('center')
			},
			close(){
				this.$refs.popup.close('center')
			},
			open1() {
						this.$refs.pop.open()
					},
					
			close1() {
				this.$refs.pop.close()
			},
			confirm(value) {
				this.logout()
				this.$refs.pop.close()
			},
			goOrder(){
				wx.switchTab({
					url:'/pages/tabbar/order/index'
				})
			},
			logout(){
				var that=this
				wx.setStorage({
					key:'token',
					data:'',
					success:function(res){
						wx.reLaunch({
							url:'/pages/tabbar/my/index'
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
	h1{
			text-align: center;
			font-weight: bold;
			color: black;
		}
	image{
		margin-top: 200rpx;
		margin-left: 70rpx;
	}
	button{
		background: #00ccc6;
		border-radius: 999rpx;
		width: 70%;
	}
	.uni-popup{
		padding: 20rpx;
		h1{
			font-weight: bold;
			font-size: 30rpx;
			margin-bottom: 20rpx;
		}
		
		li{
			color: gray;
			font-size: 20rpx;
		}
		button{
			margin-top: 30rpx;
			height: 80rpx;
			width: 200rpx;
			font-size: 32rpx;
		}
	}
	.userPage{
		.back{
			width: 100%;
			// position: relative;
			margin-bottom: 400rpx;
			image{
				position: absolute;
				top: 0;
				left: 0;
				margin: 0;
				width: 750rpx;
			}
		}
		.myorder{
			.uni-card{
				height: 240rpx;
				h1{
					font-weight: bold;
					float: left;
				}
				view{
					float: left;
					margin-right: 30rpx;
					li{
						margin-top: 30rpx;
						list-style: none;
						float: left;
						width: 200rpx;
						position: relative;
						height: 150rpx;
						image{
							height: 70rpx;
							width: 70rpx;
							position: absolute;
							left: 30rpx;
							top: 0;
							margin:0;
						}
						span{
							position: absolute;
							top: 60rpx;
							margin: 10rpx 10rpx;
						}
					}
				}
				
			}
		}
		.myfunc{
			.uni-card{
				height: 240rpx;
				h1{
					font-weight: bold;
					float: left;
				}
				view{
					float: left;
					// margin-right: 30rpx;
					li{
						margin-top: 30rpx;
						list-style: none;
						float: left;
						width: 150rpx;
						position: relative;
						height: 150rpx;
						image{
							height: 70rpx;
							width: 70rpx;
							position: absolute;
							left: 30rpx;
							top: 0;
							margin:0;
						}
						span{
							position: absolute;
							top: 60rpx;
							margin: 10rpx 10rpx;
						}
					}
				}
				}
		}
		swiper{
			height: 300rpx;
			margin: 0;
			width: 100%;
			swiper-item{
				height: 300rpx;
				width: 100%;
				navigator{
					img{
						width: 750rpx;
						height: 300rpx;
						margin-top: 0rpx;
						margin-left:0 ;
					}
				}
			}
		}
		.logout{
			margin-top: 40rpx;
		}
	}
</style>