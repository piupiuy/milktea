<template>
	<view>
		
		<view class="box">
			<h1>注册</h1>
			<input type="text" name="" id="" placeholder="输入账号" v-model="account">
			<input type="password" placeholder="输入密码" v-model="password">
			<button @click="register">点击注册</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"register",
		data() {
			return {
				account:'',
				password:'',
				token:''
			};
		},
		mounted(){
			
		},
		methods:{
			async register(){
			      let params={account:this.account,password:this.password}
					const res=await uni.$http.post("/api/register",params)
			        console.log(res);
			        if(res.statusCode==200){
						if(res.data.status==200){
							wx.setStorage({
								key:'account',
								data:`${this.account}`
							})
							wx.showToast({title: '注册成功',icon: 'success',duration: 2000})
							this.$emit('reg',this.account)
							
						}else{
							wx.showToast({title: '用户已存在',icon: 'none',duration: 2000})
						}
			          }else{
			            wx.showToast({title: '注册失败',icon: 'none',duration: 2000})
			          }
			       
			    }
				
		}
	}
</script>

<style lang="scss">
// image{
// 	margin-top: 200rpx;
// 	margin-left: 70rpx;
// }
.box{
	margin-top: 400rpx;
	h1{
		text-align: center;
		font-weight: bold;
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
		margin:  10rpx auto;
	}
}

</style>