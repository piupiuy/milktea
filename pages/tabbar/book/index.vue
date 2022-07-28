<template>
	<view >
		<uni-icons type="arrowleft" size="30" @click="goback"></uni-icons>
	<!-- 商店信息 -->
	<view class="store">
		<p>门店详细信息</p>
		<view class="see">
			点此查看<uni-icons type="arrowright" size="15"></uni-icons>
		</view>
	</view>
	<!-- 导航区域 -->
	<view class="nav">
		<ul >
			<li v-for="(nav,i) in navs"  @click="navChange(i)" :class="{active:i==current}">
				<image :src="nav.img" mode=""></image> 
				<p>{{nav.text}}</p>
			</li>
		</ul>
	</view>
	<!-- 商品区域 -->
	<view class="goods">
		<!-- 果茶 -->
		<uni-card class="good" v-for="(item,index) in fruitList" :key="item._id">
			<!-- 商品图片 -->
			<image :src="'../../../static/'+item.good.img_path" mode=""></image>
			<!-- 右侧商品信息 -->
			<view class="right">
				<h3>{{item.good.name}}</h3>
				<view class="des">{{item.good.detail}}</view>
				<view class="floor">
					<view class="price">￥{{item.good.price}}</view>
					<uni-badge size="small"  absolute="rightTop" type="primary" >
					<button @click="open(item)">选规格</button>
					</uni-badge>
				</view>
				
			</view> 
		</uni-card> 
		<!-- 奶茶 -->
		<uni-card class="good" v-for="(item,index) in milkList" :key="item._id">
			<!-- 商品图片 -->
			<image :src="'../../../static/'+item.good.img_path" mode=""></image>
			<!-- 右侧商品信息 -->
			<view class="right">
				<h3>{{item.good.name}}</h3>
				<view class="des">{{item.good.detail}}</view>
				<view class="floor">
					<view class="price">￥{{item.good.price}}</view>
					<uni-badge size="small"  absolute="rightTop" type="primary" >
					<button @click="open(item)">选规格</button>
					</uni-badge>
				</view>
				
			</view>
		</uni-card>
	</view>
	<!-- 商品属性选择区 -->
	<uni-popup ref="popup" type="bottom" background-color="white">
		<image :src="pic" mode=""></image>
		<!-- 商品信息 -->
		<view class="detail">
			<view class="detail1">
				<view class="goodName">
					{{chooseGood.good.name}}
				</view>
				<view class="star">
					<view >
						<image :src="star" mode=""></image>
					</view>
					
					<p @click="collect">{{starText}}</p>
				</view>
			</view>
			<view class="detail2">
				<p>{{chooseGood.good.detail}}</p>
			</view>
		</view>
		<!-- 小料区 -->
		<!-- 结算区域 -->
		<view class="cart">
			
			<view class="count">
				<!-- 商品价格 -->
				<view class="sum">
					￥{{sum}}
				</view>
				<!-- 商品数量 -->
				<view class="num">
					<uni-number-box :min="1" :max="9" v-model="num" @change="priceCount()"></uni-number-box>
				</view>
			</view>
			<!-- 加入购物车按钮 -->
				<button class="addCart" @click="addCart">加入购物袋</button>
		</view>
	</uni-popup>
	<!-- 结算 -->
	<view class="goodPag" v-if="chooseNum!=0" >
		<view @click="showPag">
			<uni-badge size="small" :text="chooseNum" absolute="rightBottom" type="success" >
			<image src="../../../static/bag.png" mode=""></image>
			</uni-badge>
			<p class="total">
				￥{{total}}
			</p>
		</view>
		
		<view class="goCount" @click="goCount()">
			<p>去结算</p>
		</view>
		
	</view>
	<!-- 购物车模块 -->
	<!-- 给购物车添加动画效果 -->
	<transition >
	<view class="mask" v-if="total!=0&&isShow!=0">
		<view class="head">
			<!-- 全选 -->
			<view class="checkAll" >
				<view >
					
				</view>
				<uni-icons type="checkbox-filled" size="30" color="#007952" @click="checkAll" v-if="isCheckAll==1"></uni-icons>
				<uni-icons type="checkbox" size="30" color="#007952" @click="checkAll" v-else></uni-icons>
			</view>
			<!-- 清空 -->
			<view class="trash" @click="clear">
				<uni-icons type="trash" size="30"></uni-icons>
			</view>
		</view>
		<!-- 商品内容区 -->
		<view class="content">
			<view class="choosed" v-for="(pagOne,i) in pag" :key="i">
				<view class="uni"  @click="checkOne(pagOne)" v-if="pagOne[3].checked==1"><uni-icons type="checkbox-filled" size="30" color="#007952"></uni-icons></view>
				<view class="uni"  @click="checkOne(pagOne)" v-else><uni-icons type="checkbox" size="30" color="#007952"></uni-icons></view>
				<image :src="'../../../static/'+pagOne[0].good.good.img_path" mode=""></image>
				<view class="descrip">
					<h1>{{pagOne[0].good.good.name}}</h1>
					<p class="price">￥{{pagOne[1].sum}}</p>
				</view>
				<view class="addSub">
					<uni-icons type="minus-filled" size="30" color="#007952"></uni-icons>
					<span>{{pagOne[2].num}}</span>
					<uni-icons type="plus-filled" size="30" color="#007952"></uni-icons>
				</view>
			</view>
		</view>
	</view>
	</transition>
</view>
</template>

<script>
	export default {
		name:'index',
		data(){
			return{
				// 控制购物车弹出框
				isShow:0,
				// 全选按钮
				isCheckAll:1,
				// 购物袋
				pag:[],
				// 总金额
				total:0,
				// 商品总数量
				chooseNum:0,
				// 当前点击的商品数量
				num:1,
				star:"../../../static/sc.png",
				starText:'收藏',
				// 选中商品的图片
				pic:"../../../static/image/m10.jpg",
				// 选中的商品
				chooseGood:{},
				sum:0,
				// 奶茶列
				 milkList:[],
				 // 果茶列
				 fruitList:[],
				 current:0,
				 // 左侧导航条
				 navs:[
					 {
						 img:"../../../static/star.png",
						 text:"星标推荐"
					 },
					 {
					 	 img:"../../../static/mt2.png",
					 	 text: "果茶"
					 },
					 {
						 
						 	 img:"../../../static/mt7.png",
						 	 text:  "奶茶"
						
					 }
				 ]
					 
				 
				 
			}
		},
		mounted(){
			this.getMilk(),
			this.getFruit()
			
		},
		methods:{
			// 获取奶茶信息
			async getMilk(){
				let res=await uni.$http.get('/api/milk')
				if(res.statusCode==200){
					this.milkList=res.data.data
				}
			},
			// 获取果茶信息
			async getFruit(){
				let res=await uni.$http.get('/api/fruit')
				if(res.statusCode==200){
					this.fruitList=res.data.data
				}
			},
			// 点击左侧导航的效果
			navChange(i){
				this.current=i
			},
			// 底部弹窗弹出
			open(item){
				var that=this
				wx.getStorage({
					key:'token',
					success(res){
						if(res.data.length>0){
							that.$refs.popup.open('bottom')
							that.chooseGood=item
							that.pic='../../../static/'+item.good.img_path
							that.sum=item.good.price
						}else{
							wx.showToast({
							      title: '请登录享受更多功能', //弹框内容
							      icon: 'none',  //弹框模式
							      duration: 2000    //弹框显示时间
							})
						}
					},
					fail:function(){
						wx.showToast({
						      title: '请登录享受更多功能', //弹框内容
						      icon: 'none',  //弹框模式
						      duration: 2000    //弹框显示时间
						})
					}
				})
				
			},
		
			collect(){
				if(this.star=="../../../static/sc.png"){
					this.star="../../../static/sc1.png",
					this.starText='取消收藏'
				}else{
					this.star="../../../static/sc.png",
					this.starText='收藏'
				}
				
			},
			priceCount(){
				this.sum=this.chooseGood.good.price*(this.num+1)
				
			},
			addCart(){
				// 将数据加入到购物袋
				this.pag.push([{good:this.chooseGood},{sum:this.sum},{num:this.num},{checked:1}])
				// 将金额添加到total
				this.total+=this.sum
				this.chooseNum+=this.num
				// 其余数据还原
				this.chooseGood={}
				this.sum=0
				this.num=1
				this.close()
			},
				// 底部弹窗关闭
			close(){
				this.$refs.popup.close('bottom')
			},
			// 点击查看购物袋详情
			showPag(){
				if(this.isShow==0){
					this.isShow=1
				}else{
					this.isShow=0
				}
			},
			// 全选功能
			checkAll(){
				if(this.isCheckAll==1){
					this.isCheckAll=0
					for(let i=0;i<this.pag.length;i++){
						this.pag[i][3].checked=0
					}
					this.total=0
					this.chooseNum=0
				}else{
					this.isCheckAll=1
					for(let i=0;i<this.pag.length;i++){
						this.pag[i][3].checked=1
						this.total=this.total+this.pag[i][1].sum
						this.chooseNum=this.chooseNum+this.pag[i][2].num
					}
				}
				
			},
			// 单选和反选
			checkOne(pagOne){
				// 点击按钮改变当前商品的状态
				if(pagOne[3].checked==1){
					pagOne[3].checked=0
					this.total= this.total-pagOne[1].sum
					this.chooseNum=this.chooseNum-pagOne[2].num
				}else{
					pagOne[3].checked=1
					this.total= this.total+pagOne[1].sum
					this.chooseNum=this.chooseNum+pagOne[2].num
				}
				if(this.chooseNum!==this.pag.length){
					this.isCheckAll=0
				}else{
					this.isCheckAll=1
				}
			},
			goCount(){
				console.log(11);
				var that=this
				wx.navigateTo({
				  url: '../../Count/Count',
				  success: function(res) {
					  console.log('eee');
				    // 通过 eventChannel 向被打开页面传送数据
				    res.eventChannel.emit('acceptData', { data:[that.pag,that.total,that.chooseNum]})
					that.pag=[],
					that.total=0,
					that.chooseNum=0
				  }
				})
			},
			goback(){
				wx.navigateBack({
				  delta: 1
				})
			},
			clear(){
				this.pag=[],
				this.total=0,
				this.chooseNum=0
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #fff;
		.store{
			margin-top: 200rpx;
			width: 100%;
			height: 40rpx;
			p{
				float: left;
				color: gray;
				font-size: 26rpx;
			}
			.see{
				float: right;
				color: gray;
				font-size: 26rpx;
			}
		}
		.nav{
			position: fixed;
			float: left;
			width: 25%;
			height: 100%;
			ul{
				background:#f5f5f5 ;
				.active{
					background: #fff;
					
				}
				li{
					width: 100%;
					height: 150rpx;
					// background: #f5f5f5;
					image{
						width: 40%;
						height: 40%;
						margin-left: 50rpx;
						margin-top: 10rpx;
					}
					p{
						width: 100%;
						text-align: center;
					}
					
				}
			}
		}
		.goods{
			
			width: 70%;
			float: right;
			height: 200rpx;
			.good{
				image{
					margin-top: 20rpx;
					// margin-left: 10rpx;
					width: 150rpx;
					height: 150rpx;
					float: left;
					margin-right: 10rpx;
				}
				.right{
					margin-top: 16rpx;
					// margin-left: 20rpx;
					h3{
						font:sans-serif;
						margin-left: 30rpx;
						font-weight: bold;
						font-size: 28rpx;
						letter-spacing:2rpx
					}
					.des{
						margin-top: 10rpx;
						color: gray;
						font-size: 20rpx;
					}
					.floor{
					margin-top: 30rpx;	
					height: 50rpx;
					.price{
						width: 40rpx;
						height: 50rpx;
						float: left;
						font-weight: bold;
					}
					uni-badge{
						float: right;
						button{
							background: #00ccc6;
							width: 150rpx;
							height: 50rpx;
							font-size: 26rpx;
							float: right;
							border-radius: 999rpx;
						}	
					}
					
					}
					
				}
				
			}
		}
		.uni-popup{
			image{
				width: 750rpx;
				height: 450rpx;
				
			}
			.detail{
				margin-left: 10rpx;
				width:100%;
				// height: 50rpx;
				
				.detail1{
					height: 100rpx;
					.goodName{
						font-weight: bold;
						float: left;
						letter-spacing: 4rpx;
					}
					.star{
						margin-right: 10rpx;
						width: 120rpx;
						float: right;
						border-left:4rpx solid #f5f5f5 ;
						view{
							image{
								height:40rpx;
								width: 40rpx;
								margin-left: 40rpx;
							}
						}
						
						p{
							// margin-right: 6rpx;
							// width: 120rpx;
							// text-align: center;
							// margin-left: 20rpx;
							font-size: 22rpx;
							margin: 0 auto;
							text-align: center;
							color: gray;
							
						}
					}
				}
				.detail2{
					width: 100%;
					margin-top: 40rpx;
					float: left;
					font-size: 28rpx;
					color: gray;
					margin-bottom: 10rpx;
				}
			}
			.cart{
				border-top: 10rpx solid #f5f5f5;
				width: 100%;
				margin-top: 20rpx;
				z-index: 3;
				.count{
					width: 100%;
					.sum{
						float: left;
						margin-bottom: 50rpx;
					}
					.num{
						float: right;
						margin-bottom: 50rpx;
					}
					
				}
				.addCart{
					background: #00ccc6;
					border-radius: 999rpx;
					width: 80%;
					
				}
			}
		}
		.goodPag{
			position: fixed;
			z-index: 4;
			width: 90%;
			height: 100rpx;
			border-radius: 999rpx;
			background: gray;
			bottom: 30rpx;
			right: 5%;
			view{
				float: left;
				width: 140rpx;
				margin-top: 16rpx;
				margin-left: 20rpx;
				
					
					image{
						float: left;
						width: 60rpx;
						height: 60rpx;
					}
				
				
				.total{
					float: right;
					width: 40rpx;
					// margin-bottom: 30rpx;
					color: white;
				}
			}
			
			.goCount{
				background: #007952;
				height: 100%;
				width: 200rpx;
				float: right;
				// margin-right: 20rpx;
				// margin-top: 30rpx;
				margin: 0;
				border-top-right-radius: 50rpx;
				border-bottom-right-radius: 50rpx;
				p{
					
					margin-left: 40rpx;
					margin-top: 20rpx;
				}
			}
		}
			v-enter-active,
			v-leave-active {
		
		}
		.mask{
			position: fixed;
			bottom: 0;
			border-top-left-radius: 25rpx;
			border-top-right-radius: 25rpx;
			width: 100%;
			background: #fff;
			.head{
				border-top-left-radius: 25rpx;
				border-top-right-radius: 25rpx;
				height: 60rpx;
				background: lightgray;
				.checkAll{
					float: left;
				}
				.trash{
					float: right;
				}
			}
			.content{
				background: #fff;
				margin-bottom: 140rpx;
				.choosed{
					position: relative;
					margin-top: 30rpx;
					margin-bottom: 20rpx;
					height: 160rpx;
					.uni{
						// border: 1px solid salmon;
						position: absolute;
						left: 10rpx;
						top: 30rpx;
						.uni-icons{
							// padding-bottom: 20rpx;
							
							
							
						}
					}
					
					image{
						width: 120rpx;
						height: 120rpx;
						margin-top: 20rpx;
						// border: 1px solid salmon;
						position: absolute;
						left: 80rpx;
						bottom: 30rpx;
						// float: left;
					}
					.descrip{
						width: 200rpx;
						// border: #007952 1px solid;
						position: absolute;
						left: 220rpx;
						bottom: 40rpx;
						h1{
							font-weight: bold;
							margin-bottom: 40rpx;
						}
						p{
							font-weight: bold;
							
						}
						// float: left;
					}
					.addSub{
						position:absolute;
						 bottom: 30rpx;
						 right: 20rpx;
						 span{
							 margin: 4rpx;
							 // padding-bottom: 10rpx;
						 }
					}
				}
			}
		}
	}

</style>