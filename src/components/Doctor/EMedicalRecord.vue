<template>
	<!-- 电子病历页面 -->
	<div class="medical_wrap">
		<!-- 标题 -->
		<div class="docCon_title">
			<h2>
				<span>电子病历</span>
			</h2>
			<h2 class="add_medical">
				<router-link to="/AddMedical">
					<span>添加病历</span>
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
						<input type="text" name="" placeholder="请输入用户姓名" />
					</div>
					<!-- 日期 -->
					<div class="medical_search_form_inp medical_search_time">
						<input type="text" list="timeList" placeholder="选择就诊时间">
						<datalist id="timeList">
							<option value="date">date</option>
						</datalist>
					</div>
					<!-- 搜索 -->
					<div class="medical_search_btn">
						<i class="fa fa-search"></i>
					</div>
				</form>
			</div>
			<!-- 二, 内容 -->
			<div class="medical_content">
				<table class="medical_list" cellspacing="0">
					<tr class="medicai_list_title">
						<th class="medicai_list_check"><input type="checkbox" v-model="all"></th>
						<th>序号</th>
						<th>姓名</th>
						<th>性别</th>
						<th>年龄</th>
						<th>主治医生</th>
						<th>就诊时间</th>
						<th>操作</th>
					</tr>
					<tr class="medicai_list_item" v-for="(medical, index) in medical_lists" :key="index">
						<td><input type="checkbox" v-model="medical.isChecked" @click="checkRecord(index)"></td>
						<td>{{ index+1 }}</td>
						<td>{{medical.med_name}}</td>
						<td>{{medical.med_gender}}</td>
						<td>{{medical.med_age}}</td>
						<td>{{medical.med_doctor}}</td>
						<td>{{medical.med_hospitalTime}}</td>
						<td>
							<router-link to="/EMedicalListDetail" @click.native='setMedicalID(index)'>
								<span class="medicai_list_lookdetails">查看详情</span>
							</router-link>
						</td>
					</tr>
				</table>
			</div>
			<!-- 三, 页码操作控制 -->
			<div class="medical_control">
				
				<!-- 批量删除 -->
				<div class="medical_delete" @click="deleteMore">
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
	export default {
		name: "EMedicalRecord",
		data() {
			return {
				// 被删除病历的索引
				blo: false,
				checked:'',
				delIndexArr: [],
				medical_lists: [],
			}
		},
		created: function() {
			let that = this
			axios.get('http://39.97.245.166/v1/getinfo')
			.then(function (res) {
				// console.log(res.data.medical_lists);
				that.medical_lists = res.data.medical_lists
				// 获取数据后增加isChecked属性
				that.addIsChecked()
			})
			.catch(function (error) {
				console.log(111,error);
			});
		
		},
		computed: {
			all:{
				get(){
					this.blo=this.medical_lists.every(item => {
					 return	item.isChecked==true
					})
					
					return this.blo
				},
				set(val){
					console.log(val)
					
						this.medical_lists.map( (item,index) => {
							item.isChecked = val
							this.medical_lists.splice(index, 1, this.medical_lists[index])
						})
					

				}
			},
		},
		methods: {
			// 组件间传值, 传值给 电子病历详情界面, 这里预先设计的是传递 id 过去
			setMedicalID: function(index) {
				console.log(this.medical_lists[index].med_id);
				this.$store.state.emedicalID = "你好这里假装有电子病历的id值";
			},
			addIsChecked: function() {
				this.medical_lists.map( item => {
					item.isChecked = false
				})
			},
			// 勾选病历
			checkRecord: function(index) {
				this.medical_lists[index].isChecked = !this.medical_lists[index].isChecked
				this.medical_lists.splice(index, 1, this.medical_lists[index])
				// 这个病历在删除列表中的位置
				let indexInDel = this.delIndexArr.indexOf(index)
				// 将要被删除
				if(this.medical_lists[index].isChecked) {
					if(indexInDel === -1) {
						this.delIndexArr.push(index)
					}
				}else {
					// 从删除列表中剃掉
					this.delIndexArr.splice(indexInDel, 1)
				}
			},
			// 批量删除
			deleteMore: function() {
				// 打印要被删除的病历的索引
				console.log('要删除的病历有：',this.delIndexArr)
			},
		},
	}
</script>

<style>
	
	/* 病历详情/添加病历页面的样式 */
	@import url("../../css/EMedicalDetail.css");
	/* 电子病历页面样式 */
	@import url("../../css/EMedicalRecord.css");
	
	/**
	 * 外部控制元素
	 */
	.medical_wrap {
		height: 100%;
	}
	
</style>
