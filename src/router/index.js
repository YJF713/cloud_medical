import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Home from '@/components/Home'
/*
 * 医生管理系统
 */
import Doctor from '@/components/Doctor/Doctor'
// 登录
import DoctorLogin from '@/components/Doctor/DoctorLogin'
// 我的病人
import MyPatient from '@/components/Doctor/MyPatient'
// 电子病历
import EMedicalRecord from '@/components/Doctor/EMedicalRecord'
// 电子病历列表详情
import EMedicalListDetail from '@/components/Doctor/EMedicalListDetail'
// 电子病历详情
import EMedicalDetail from '@/components/Doctor/EMedicalDetail'
// 添加病历
import AddMedical from '@/components/Doctor/AddMedical'

// 住院管理
import HospitalizationManagement from '@/components/Doctor/HospitalizationManagement'
// 添加病人
import AddPatient from '@/components/Doctor/AddPatient'

// 报告查询
import ReportQuery from '@/components/Doctor/ReportQuery'
// 添加报告
import AddReport from '@/components/Doctor/AddReport'
// 报告详情
import ReportDetail from '@/components/Doctor/ReportDetail'

// 出院管理
import DischargeManagement from '@/components/Doctor/DischargeManagement'
// 出院打印
import DischargePrint from '@/components/Doctor/DischargePrint'

// 处方管理
import PrescriptionManagement from '@/components/Doctor/PrescriptionManagement'
// 就诊咨询
import DoctorConsultation from '@/components/Doctor/DoctorConsultation'
// 个人信息
import PersonalInformation from '@/components/Doctor/PersonalInformation'

/*
 * 公共组件
 */
// 页码组件
import Pagenation from '@/components/Doctor/Pagenation'


Vue.use(Router)

export default new Router({
  routes: [
	//   登录页面
    {
      path: '/',
      name: 'Home',
      component: Home
    },
		{
			path: '/DoctorLogin',
			name: 'DoctorLogin',
			component: DoctorLogin
		},
		{
			path: '/Doctor',
			component: Doctor,
			children:[
				// 默认界面--我的病人
				{path:'/', component: MyPatient, children:[
						{path:'/', component: Pagenation},
					],
				},
				// 电子病历
				{path:'/EMedicalRecord', component: EMedicalRecord, children:[
						{path:'/', component: Pagenation},
					],
				},
				// 电子病历列表详情
				{path:'/EMedicalListDetail', component: EMedicalListDetail},
				// 电子病历详情
				{path:'/EMedicalDetail', name: 'EMedicalDetail', component: EMedicalDetail},
				// 添加病历
				{path:'/AddMedical', name: 'AddMedical', component: AddMedical},
				
				// 住院管理
				{path:'/HospitalizationManagement', component: HospitalizationManagement, children:[
						{path:'/', component: Pagenation},
					],
				},
				// 添加病人
				{path:'/AddPatient', name: 'AddPatient', component: AddPatient},
				
				// 报告查询
				{path:'/ReportQuery', component: ReportQuery, children:[
						{path:'/', component: Pagenation},
					],
				},
				// 添加报告
				{path:'/AddReport', name: 'AddReport', component: AddReport},
				// 报告详情
				{path:'/ReportDetail/:checkId', name: 'ReportDetail', component: ReportDetail},
				
				
				// 出院管理
				{path:'/DischargeManagement', component: DischargeManagement, children:[
						{path:'/', component: Pagenation},
					],
				},
				// 出院打印
				{path:'/DischargePrint', name: 'DischargePrint', component: DischargePrint},
				
				// 处方管理
				{path:'/PrescriptionManagement', component: PrescriptionManagement, children:[
						{path:'/', component: Pagenation},
					],
				},
				
				
				// 就诊咨询
				{path:'/DoctorConsultation', component: DoctorConsultation, children:[
						{path:'/', name: 'Pagenation', component: Pagenation},
					],
				},
				
				
				// 个人信息
				{path:'/PersonalInformation', name: 'PersonalInformation', component: PersonalInformation},
			]
		},
  ]
})
