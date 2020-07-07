<template>
	<div class="hello">
		<h1>Hello 这里计划安排的是医生登录页面</h1>
		<div>
			当医生输入正确的账号，密码后点击“登录”。接下来就显示“我的病人页面”。
		</div>
		<router-link to="/Doctor" @mouseover.native="changeLocal">假装这个是医生的登录按钮，我的病人页面走起！</router-link>
	</div>
</template>

<script>
	export default {
	  name: 'DoctorLogin',
	  data () {
	    return {
	      
	    }
	  },
	  methods: {
	  	changeLocal: function () {
			// 辅助出院管理页面的
	  		localStorage.outHos = 0;
	  	}
	  }
	}
</script>

<style>
	
a {
  color: #42b983;
}
</style>