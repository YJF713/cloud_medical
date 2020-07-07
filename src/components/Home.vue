<template>
  <div class="hello">
		<span class="log-title">{{ log_title }}</span>
		<img class="login-pic" src="../assets/login.png" alt="">
		<div class="login-div">
			<div class="login-content">
				<span class="login-name">{{ login_name }}</span>
				<input placeholder="请输入手机号" class="login-input" type="text" v-model="userName" autofocus>
				<i class="fa fa-phone"></i>
				<input class="login-input userCode" :type="inputType"
					v-model="userCode" @keyup.enter="loginHandler">
				<i class="fa fa-lock"></i>
				<span class="login-forget getcode" @click="getCode">获取验证码</span><br>
				<span class="login-forget">忘记密码？</span>
				<span class="login-btn" @click="loginHandler">登 录</span>
			</div>
		</div>
  </div>
</template>

<script>
import axios from 'axios'	
import url from '../service'
// 引入qs模块，避免后端无法接受数据
import qs from 'qs'
import xhrData from '../main'

export default {

  name: 'Home',
  data () {
    return {
			// 系统登录类型
			log_title: '医疗管理后台',
			// 用户登录类型
			login_name: '医生登录',
			// 输入框类型
			inputType: 'password',
			// 字体图标名称
			iconName: 'fa-eye',
			// 手机号
			userName: '18346547345',
			// 验证码
			userCode: ''
    }
	},

	methods: {
		// 总体流程：
		// 填写手机号=>校验手机号，合法后发送请求获取验证码=>填写验证码后登录
		// 登录
		loginHandler: function() {
			// 保留this指向
			let that = this
			// 判断用户的信息是否输入完整
			if(this.userName && this.userCode) {
				let data = {
					phone: that.userName,
					code: that.userCode
				}
				// ES6新语法，合并对象
				Object.assign(data, xhrData)
				// 使用qs转换数据，避免后端无法读取
				data = qs.stringify(data)
				// 接口文档已经表明，使用post方式调用。参数1是接口地址，参数2是要传递的数据
				axios.post(url.login, data)
					.then( res => {
						// 获取token，并保存在localStorage中
						localStorage.setItem('token', res.data.result.token)
						// 登录成功后跳转至Doctor的默认页
						that.$router.push('/Doctor')
					})
			}else {
				alert(`请将信息填写完整！`);
				that.$router.push('/Doctor')
			}
		},
		// 获取手机验证码
		getCode: function() {
			// 此处应该检查手机号是否合法，此处省略
			// 可用的手机号：18346547345、17434654564、17343545633、18426343345、18356456455
			if(true) {
				// 文档标明应使用get方法调用接口，需要手机号（phone）这个参数
				// 使用url拼接的方式，带上参数，例如xxx.xxx?name=Jack&age=18&sex=male
				axios.get(url.getCode + `?phone=` + this.userName)
					// 通过then方法获取接口成功的回调，这里的res => {...}是ES6的新语法，箭头函数
					// 这样写省略了function，比较简洁，在有多个参数时应写做
					// (arg1, arg2, arg3) => {
							// console.log(arg1)
							// console.log(arg2)
							// console.log(arg3)
							// ...
					// }
					.then( res => {
						// res就是接口返回的全部内容
						if(res.data.msg === 'ok') {
							// 判断接口返回内容是否正常
							alert(`验证码：` + res.data.result)
						} else {
							// 异常时应显示错误信息，例如：手机号因为未注册而不存在等
							alert(res.data.msg)
						}
					})
					// 通过catch捕获错误
					.catch ( err => {
						console.log(err)
					})
			} else {
				alert('请输入正确的手机号！')
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./../css/font-awesome.min.css");
	

html,body {font-size: 10px;}
body,ul,li,dl,dt,dd,p{ padding: 0; margin: 0; list-style: none;}
input{ border: 1px solid #999;outline-style: none; text-shadow: none ; text-indent: 5px;}
.div70{ height: 70px; width: 100%; display: inline-block;}
a{ text-decoration: none;}


.hello {
	position: relative;
	width: 740px;
	margin: 0 auto;
}
.log-title {
	position: absolute;
	margin-top: 100px;
	top: 10px;
	left: 200px;
	z-index: 3;
	color: #fff;
}
.login-pic {
	margin-top: 100px;
	position: relative;
	z-index: 2;
}
.login-div {
	width: 400px;
	height: 300px;
	position: absolute;
	background-color: rgba(220, 220, 220, 0.8);
	margin-top: 305px;
	top: -150px;
	right: 0;
	z-index: 1;
	border-radius: 4px;
}
.login-content {
	position: relative;
	width: 300px;
	height: 200px;
	padding-left: 40px;
	margin: 50px 0 0 100px;
}
.login-name {
	color: rgb(49, 192, 229);
	padding-bottom: 5px;
	border-bottom: 2px solid rgb(49, 192, 229);
}
.login-forget {
	color: rgb(49, 192, 229);
	font-size: 14px;
	cursor: pointer;    
	display: inline-block;
	padding: 15px 0;
}
.login-forget:hover {
	text-decoration: underline;
}
.login-input {
	margin-top: 15px;
	display: block;
	width: 190px;
	height: 30px;
	border-radius: 16px;
	box-shadow: #999 -1px 4px 5px;
	padding-left: 30px;
	font-size: 16px;
}
i.fa {
	position: absolute;
	color: #777;
}
.fa-phone {
	top: 45px;
	left: 50px;
	border-right: 1px solid #777;
	padding-right: 5px;
}
.userCode {
	width: 100px;
	display: inline-block;
	margin-right: 15px;
}
.fa-lock {
	top: 93px;
	left: 50px;
	border-right: 1px solid #777;
	padding-right: 5px;
}
.fa-eye,
.fa-eye-slash {
	top: 92px;
	left: 235px;
	cursor: pointer;
}
.login-btn {
	background: -webkit-linear-gradient(left, rgb(49, 192, 229) , rgb(22, 219, 184)); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, rgb(49, 192, 229), rgb(22, 219, 184)); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, rgb(49, 192, 229), rgb(22, 219, 184)); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, rgb(49, 192, 229) , rgb(22, 219, 184)); /* 标准的语法 */
	margin-top: 15px;
	display: block;
	width: 220px;
	height: 30px;
	border-radius: 16px;
	text-align: center;
	color: #fff;
	cursor: pointer;
	line-height: 30px;
	box-shadow: rgb(49, 192, 229) 2px -1px 5px;
}

</style>
