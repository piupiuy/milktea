<template>
	<view>
		<h1>登录</h1>
		<image src="../../static/my.png" mode=""></image>
		<input type="text" name="" id="" placeholder="账号" v-model="account">
		<input type="text" name="" id="" placeholder="密码" v-model="password">
		<button @click="login">点击登录</button>
	</view>
</template>

<script>
	export default {
		name:"login",
		data() {
			return {
				account:'',
				password:''
			};
		},
		mounted(){
			var that=this
			wx.getStorage({
				key:'account',
				success(res){
					that.account=res.data
				}
			})
		},
		methods:{
			async login(){
			      let params={account:this.account,password:this.password}
					const res=await uni.$http.post("/api/login",params)
			        console.log(res);
			        if(res.statusCode==200){
						if(res.data.status==200){
							wx.showToast({title: '登录成功',icon: 'success',duration: 2000})
							wx.switchTab({url:'/pages/tabbar/index/index'})
						}else{
							wx.showToast({title: '账号或密码错误',icon: 'none',duration: 2000})
						}
			          }else{
			            wx.showToast({title: '登录失败',icon: 'none',duration: 2000})
			          }
			       
			    }
		}
	}
</script>

<style lang="scss">
	h1{
		text-align: center;
		font-weight: bold;
	}
image{
	margin-top: 200rpx;
	margin-left: 70rpx;
}
input{
	border:1px solid #00ccc6;
	border-radius: 999rpx;
	width: 70%;
	height: 100rpx;
	margin: 30rpx auto;
}
button{
	background: #00ccc6;
	border-radius: 999rpx;
	width: 70%;
}
</style>