let Baseurl1 = `http://www.kuaiyunwl.com:9906`
export default {
  // 获取手机验证码
  getCode: Baseurl1 + `/shiro/getCode`,
  // 登录
  login: Baseurl1 + '/shiro/login',
  // 登出
  logout: Baseurl1 + `/shiro/logout`,
  // 获取数据
  getinfo: Baseurl1 + '/v1/getinfo',
  // 上传图片
  upload: Baseurl1 + `/imgs/upload`,
  // 获取报告列表
  getCheckReportList: Baseurl1 + `/ds1/checkreport/getCheckReportList`,
  // 获取报告详情
  getCheckDetailById: Baseurl1 + `/ds1/checkreport/getCheckDetailById`,
  // 更新报告
  updateCheckById: Baseurl1 + `/ds1/checkreport/updateCheckById`,
  // 获取报告附件
  getCheckUrlById: Baseurl1 + `/ds1/checkreport/getAttachmentUrl`,
  // 添加报告
  addCheckById: Baseurl1 + `/ds1/checkreport/addCheckById`,
  // 获取患者信息
  getUser: Baseurl1 + `/ds1/consultation/getUserDetailByConNo`,
  // 获取所有科室id
  getAllDeId: Baseurl1 + `/ds1/departmentinfo/getAllDeId`,
  // 获取所有医生id
  getAllDocId: Baseurl1 + `/ds1/departmentinfo/getAllDocId`
}