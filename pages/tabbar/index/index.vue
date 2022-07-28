<template>
	<view >
			<!-- 首页轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true" indicator-color="#fff" indicator-active-color="#C7ECFF">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<navigator class="swiper-item" >
							<img :src="'../../../static/'+item" alt="">
						</navigator>
					</swiper-item>
		</swiper>
		<!-- 功能区域 -->
		<view class="order">
			<!-- 右边大盒子 -->
			<view class="left" @click="goBook">
				<p class="tit">自助点单</p>
				<p class="tit2">简单便捷不社恐</p>
				<image src="../../../static/shop.png" mode=""></image>
			</view>
			<!-- 左边两个盒子 -->
			<view class="right">
				<!-- 上面的盒子 -->
				<view class="score">
					<image src="../../../static/store.png" mode=""></image>
					<h1>积分商城</h1>
					<p>礼物宝券</p>
				</view>
				<!-- 下面的 -->
				<view class="togeter">
					<image src="../../../static/mt3.png" mode=""></image>
					<h1>拼单</h1>
					<p>好友一起点</p>
				</view>
			</view>
			
		</view>
		<!-- 下方小盒子 -->
		<ul class="bottom">
			<li class="one">
				<h3>加盟咨询</h3>
				<p>400-400-4000</p>
				<image src="../../../static/mt2.png" mode=""></image>
			</li>
			<li class="two">
				<h3>团餐</h3>
				<p>企业团餐福利多</p>
				<image src="../../../static/mt5.png" mode=""></image>
			</li>
			<li class="three">
				<h3>视频号</h3>
				<p>美味先睹为快</p>
				<image src="../../../static/ice.png" mode=""></image>
			</li>
		</ul>
	</view>

	
</template>

<script>
export default{
	data(){
		return{
			// 存放轮播图数据的数组
			swiperList:[]
		}
	},
	onLoad(){
		this.getSwiperList()
	},
	methods:{
		async getSwiperList(){
			const res=await uni.$http.get('/api/swiper')
			if(res.statusCode==200){
				let good=res.data
				for(var i=0;i<good.length;i++){
					this.swiperList.push(good[i].good.img_path)
				}
			}
		},
		goBook(){
			wx.switchTab({
				url:'/pages/tabbar/book/index'
			})
		}
	}
}
	
</script>

<style lang="scss">
	page{
		background: #C7ECFF;
		swiper{
			height: 500rpx;
			.swiper-item,img{
				
					height:100%;
					width: 100%;
					
			}
			
		}
		.order{
			width: 680rpx;
			height: 450rpx;
			background: white;
			margin: 30rpx auto;
			position: relative;
			border-radius: 25rpx;
			.left{
				width: 330rpx;
				height: 100%;
				border-right: 6rpx  dashed #C7ECFF;
				border-radius: 25rpx;
				float: left;
				image{
					position: absolute;
					top:250rpx ;
					left: 30rpx;
					width: 30%;
					height: 30%;
				}
				.tit{
					font-size: 40rpx;
					font-weight: bold;
					position: absolute;
					top:40rpx;
					left: 90rpx;
				}
				.tit2{
					position: absolute;
					top: 110rpx;
					color: gray;
					left: 65rpx;
				}
			}
			.right{
				width: 340rpx;
				height:100%;
				float: right;
				border-radius: 25rpx;
				.score{
					height: 50%;
					width: 100%;
					position: relative;
					border-radius: 25rpx;
					image{
						margin-top: 60rpx;
						left: 20rpx;
						width: 40%;
						height: 40%;
						position: absolute;
						
					}
					h1{
						position: absolute;
						top: 30rpx;
						left: 170rpx;
						font-size: 36rpx;
						font-weight: bold;
					}
					p{
						position: absolute;
						top: 76rpx;
						left: 170rpx;
						font-size: 26rpx;
						color: gray;
					}
				}
				.togeter{
					height: 245rpx;
					width: 100%;
					border-top: #C7ECFF dashed 6rpx;
					position: relative;
					image{
						width: 60%;
						height: 60%;
						position: absolute;
						margin-top: 40rpx;
						
					}
					h1{
						position: absolute;
						font-size: 36rpx;
						font-weight: bold;
						position: absolute;
						left: 180rpx;
						top: 30rpx;
					}
					p{
						position: absolute;
						top: 80rpx;
						left: 180rpx;
						font-size: 26rpx;
						color: gray;
					}
				}
			}
		}
		ul{
			width: 680rpx;
			height: 200rpx;
			margin: 20rpx auto;
			display: flex;
			justify-content: space-around;
			li{
				list-style: none;
				float: left;
				width: 31%;
				height: 100%;
				background:#fff;
				border-radius: 25rpx;
				position: relative;
				image{
					width: 50%;
					height: 50%;
					position: absolute;
					top: 80rpx;
					left: 90rpx;
				}
				h3{
					margin-top: 4rpx;
					font-weight: bold;
					text-align: center;
				}
				p{
					margin-top: 4rpx;
					font-size: 24rpx;
					text-align: center;
					color: gray;
				}
			}
		}
		
	}
	
</style>