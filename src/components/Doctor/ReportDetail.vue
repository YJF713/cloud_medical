<template>
	<!-- 报告详情界面 -->
	<div class="reportDetail_wrap">
		<!-- 标题 -->
		<div class="docCon_title">
			<h2 class="reportDetail_title">
				<router-link to="/ReportQuery">
					<span>报告查询</span>
				</router-link>
			</h2>
			<h2 class="add_medical add_report">
				<router-link to="/AddReport">
					<span>添加报告</span>
				</router-link>
			</h2>
		</div>
		<!-- 内容 -->
		<div class="docCon_main">
			<!-- 一, 病人信息 -->
			<div class="medical_search">
				<div class="reportDetail_patientInfo">
					<!-- 左侧病人信息 -->
					<ul class="repDet_patientWrap fl">
						<li>姓名：<span>{{report_info.conName}}</span></li>
						<li>性别：<span>{{report_info.gender=1?'男':'女'}}</span></li>
						<li>年龄：<span>{{report_info.age}}</span></li>
						<li>科别：<span>{{report_info.deName}}</span></li>
						<li>诊断类型：<span>{{report_info.diType=1?'初诊':'复诊'}}</span></li>
					</ul>
					<!-- 右侧控制修改的按钮等 -->
					<div class="repDet_patientEditWrap fr">
						<!-- 未修改时的元素 -->
						<div v-show="!isEidt" class="repDet_edit fr" @click="editReport">
							<i class="fa fa-pencil"></i>&nbsp;修改信息
						</div>
						<!-- 修改时显示的元素 -->
						<div v-show="isEidt" class="repDet_saveChange">
							<div class="repDet_cancle" @click="cancleChangeReport">取消</div>
							<div class="repDet_save" @click="sureChangeReport">保存</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 二, 内容 -->
			<div class="medical_content">
				<ul class="reportDetail_con">
					<li class="reportDetail_con_item">
						<span>临床诊断：</span><textarea :class="{editItem:isEidt}" :disabled="!isEidt" v-model="report_info.symptom"></textarea>
					</li>
					<li class="reportDetail_con_item">
						<span>大体检查：</span><textarea :class="{editItem:isEidt}" :disabled="!isEidt" v-model="report_info.dtjc"></textarea>
					</li>
					<li class="reportDetail_con_item">
						<span>病理诊断：</span><textarea :class="{editItem:isEidt}" :disabled="!isEidt" v-model="report_info.blzd"></textarea>
					</li>
					<li class="reportDetail_con_item">
						<span>免疫/组化：</span><textarea :class="{editItem:isEidt}" :disabled="!isEidt" v-model="report_info.mianyi"></textarea>
					</li>
					<li class="reportDetail_con_item">
						<span>结果：</span><textarea :class="{editItem:isEidt}" :disabled="!isEidt" v-model="report_info.result"></textarea>
					</li>
					<li class="reportDetail_con_item">
						<span>备注：</span><textarea :class="{editItem:isEidt}" :disabled="!isEidt" v-model="report_info.mark"></textarea>
					</li>
				</ul>
			</div>
			<!-- 三, 报告医师, 审核医师项 -->
			<div class="medical_control">
				<div class="reportDetail_foot">
					<div>
						报告医师：<span>{{report_info.bgysName}}</span>
					</div>
					<div>
						审核医师：<span>{{report_info.shysName}}</span>
					</div>
					<div>
						报告时间：<span>{{report_info.seektime}}</span>
					</div>
					<div class="lookaccessory" @click="lookAccessoryAction">
						查看附件
					</div>
				</div>
			</div>
		</div>
		<!-- 查看附件弹窗内容 -->
		<div v-show="isShowMask" class="reprotDetail_alert">
			<!-- 报告单弹窗本体 -->
			<div class="alert">
				<!-- 标题提示信息 -->
				<div class="alert_title">
					<div class="report_title fl">报告单</div>
					<div class="close_btn fr"  @click="closeMask">
						<i class="fa fa-times-circle-o"></i>&nbsp;关闭
					</div>
				</div>
				<!-- 弹窗内容 -->
				<div class="alert_content">
					<img :src="imgUrl" alt="报告单详情图">
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
	import xhrData from '../../main';
	export default {
		name: "ReportDetail",
		data() {
			return {
				isEidt: false,// 是否修改页面
				isShowMask: false,// 是否显示附件弹窗
				report_info: {},
				imgUrl: ''// 附件图片地址
			}
		},
		created: function() {
			// 获取详情
			this.getCheckDetailById()
		},
		methods: {
			getCheckDetailById: function() {
				let that = this
				let data = {
					checkId: that.$route.params.checkId
				}
				Object.assign(data, xhrData)
				data = qs.stringify(data)
				axios.post(url.getCheckDetailById, data)
					.then( res => {
						that.report_info = res.data.result[0]
					})
					.catch( err => {
						console.log(err)
					})
			},
			// 修改报告
			editReport: function() {
				this.isEidt = !this.isEidt;
			},
			// 取消修改按钮
			cancleChangeReport: function() {
				this.isEidt = !this.isEidt;
			},
			// 确定修改
			sureChangeReport: function() {
				// updateCheckById
				let that = this
				let data = {
					checkId: that.$route.params.checkId,
					symptom: that.report_info.symptom,
					dtjc: that.report_info.dtjc,
					blzd: that.report_info.blzd,
					mianyi: that.report_info.mianyi,
					diagnosticresult: that.report_info.result,
					mark: that.report_info.mark
				}
				Object.assign(data, xhrData)
				data = qs.stringify(data)
				axios.post(url.updateCheckById, data)
					.then( res => {
						alert('更新成功')
					})
					.catch( err => {
						console.log(err)
					})
				// 关闭修改状态
				this.isEidt = !this.isEidt;
			},
			// 查看附件
			lookAccessoryAction: function() {
				// 弹出弹窗
				this.isShowMask = !this.isShowMask;
				// 获取图片
				let that = this
				let data = {
					checkId: that.$route.params.checkId
				}
				Object.assign(data, xhrData)
				data = qs.stringify(data)
				axios.post(url.getCheckUrlById, data)
					.then( res => {
						that.imgUrl = res.data.result
					})
			},
			// 关闭附件弹窗
			closeMask: function() {
				this.isShowMask = !this.isShowMask;
			},
		},
	}
</script>

<style>
	/* 报告详情页面样式 */
	@import url("../../css/ReportDetail.css");
	
	/* 外层包裹元素 */
	.reportDetail_wrap {
		width: 100%;
		height: 100%;
	}
	/* 报告查询 */
	.reportDetail_title a {
		padding-top: 12px;
		text-decoration: none;
		color: white;
	}
	/* 添加报告 */
	.reportDetail_wrap .add_report {
		background: url(../../assets/title_bg.png) no-repeat 5px -48px;
	}
	
	
	/**
	 * 弹窗样式
	 */
	.reprotDetail_alert {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
	}
	/* 弹窗本体 */
	.alert {
		width: 650px;
		height: 400px;
		border: 1px solid #707070;
		border-radius: 10px;
		background: #fbfbfb;
		/* 定位 */
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -250px;
		margin-top: -150px;
	}
	
	/* 弹窗标题部分 */
	.alert_title {
		width: 92%;
		height: 15%;
		margin: auto;
		/* 字体 */
		line-height: 44px;
	}
	.report_title {
		color: #333333;
	}
	.close_btn {
		cursor: pointer;
	}
	.close_btn:hover {
		color: #16DCB8;
	}
	
	/* 弹窗内容 */
	.alert_content {
		width: 92%;
		height: 85%;
		margin: auto;
	}
	.alert_content img {
		width: 92%;
		height: 85%;
	}
</style>
