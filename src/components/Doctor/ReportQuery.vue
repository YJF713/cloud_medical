<template>
	<!-- 报告查询 -->
	<div class="reportQuery_wrap">
		<!-- 标题 -->
		<div class="docCon_title">
			<h2>
				<span>报告查询</span>
			</h2>
			<h2 class="add_medical add_report">
				<router-link to="/AddReport">
					<span>添加报告</span>
				</router-link>
			</h2>
		</div>
		<!-- 内容 -->
		<div class="docCon_main">
			<!-- 一, 搜索框 -->
			<div class="medical_search">
				<form class="medical_search_form">
					<!-- 姓名 -->
					<div class="medical_search_form_inp medical_search_name">
						<input type="text" v-model="conName" placeholder="请输入用户姓名" />
					</div>
					<!-- 插件有问题，暂时隐藏 -->
					<!-- 日期 -->
					<!-- <div class="medical_search_form_inp medical_search_time">
						<input type="text" list="timeList" placeholder="选择就诊时间">
						<datalist id="timeList">
							<option value="date">vue-datepicker-local插件</option>
						</datalist>
					</div> -->
					<!-- 检查项目 -->
					<div class="medical_search_form_inp medical_search_name">
						<input type="text" v-model="inspectionitem" placeholder="请输入检查项目" />
					</div>
					<!-- 搜索 -->
					<div class="medical_search_btn" @click="getList">
						<i class="fa fa-search"></i>
					</div>
				</form>
			</div>
			<!-- 二, 内容 -->
			<div class="medical_content">
				<table class="medical_list" cellspacing="0">
					<tr class="medicai_list_title">
						<th class="medicai_list_check"><input type="checkbox"></th>
						<th>序号</th>
						<th>姓名</th>
						<th>性别</th>
						<th>年龄</th>
						<th>就诊科室</th>
						<th>诊断类型</th>
						<th>检查时间</th>
						<th>检查项目</th>
						<th>操作</th>
					</tr>
					<tr class="medicai_list_item" v-for="(medical, index) in medical_lists" :key="index">
						<td><input type="checkbox"></td>
						<td>{{++index}}</td>
						<td>{{medical.conName}}</td>
						<td>{{medical.gender == '1' ? '男' : '女'}}</td>
						<td>{{medical.age}}</td>
						<td>{{medical.deName}}</td>
						<td>{{medical.diType}}</td>
						<td>{{medical.seektime}}</td>
						<td>{{medical.insp}}</td>
						<td>
							<span class="medicai_list_lookdetails" @click="ReportDetail(medical.checkId)">查看详情</span>
						</td>
					</tr>
				</table>
			</div>
			<!-- 三, 页码操作控制 -->
			<div class="medical_control">
				<!-- 批量删除 -->
				<div class="medical_delete">
					<i class="fa fa-trash"></i>
					批量删除
				</div>
				<!-- 页面切换组件 -->
				<div class="medical_pagenation">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'	
	import url from '../../service'
	// 引入qs模块，避免后端无法接受数据
	import qs from 'qs'; 	
	import xhrData from '../../main'

	export default {
		name: "EMedicalRecord",
		data() {
			return {
				medical_lists: [],
				// 患者姓名
				conName: '',
				// 检查项目
				inspectionitem: ''
			}
		},
		// vue实例被创建之后，渲染之前就获取数据
		created: function() {
			this.getList()
		},
		methods: {
			// 查看详情
			ReportDetail: function(id) {
				// 动态路由，根据id查询病人的数据，id必须有，格式在router/index.js中
				this.$router.push('/ReportDetail/' + id)
			},
			// 获取报告列表
			getList: function() {
				// 保留this指向
				let that = this
				let data = {
					conName: this.conName,
					Inspectionitem: this.inspectionitem,
					pageNo: 1,
					pageSize: 10,
				}
				// ES6新语法，合并对象
				Object.assign(data, xhrData)
				// 修改传递参数的方式，这里如果后端已经处理就无需再做处理
				data = qs.stringify(data)
				// 接口文档已经表明，使用post方式调用。参数1是接口地址，参数2是要传递的数据
				axios.post(url.getCheckReportList, data)
					// 通过then方法获取正确的回调
					.then( res => {
						// res 就是请求返回的所有数据
						that.medical_lists = res.data.result
						// 内容较少时，重复添加数据，使得展示更加美观，布局修复后需要删除
						if(that.medical_lists.length < 8) {
							that.medical_lists.push(...res.data.result)
							that.medical_lists.push(...res.data.result)
						}
					})
					// 通过catch捕获错误，并显示
					.catch( err =>{
						console.log(err)
					})
			}
		},
	}
</script>

<style scoped>
	
	/* 报告详情/报告修改 页面的样式 */
	@import url("../../css/ReportDetail.css");
	
	/* 电子病历页面样式 */
	@import url("../../css/EMedicalRecord.css");
	
	.reportQuery_wrap {
		height: 100%;
	}
	
	/* 添加报告 */
	.reportQuery_wrap .add_report {
		background: url(../../assets/title_bg.png) no-repeat 5px -48px;
	}
	.medicai_list_lookdetails {
		cursor: pointer;
	}
</style>
