## 开发手册
> 作者：柠檬

##### 
  - 云医疗项目本期只做医生端，暂时隐藏了首页，直接进入登录页面。登录页面的样式已完成，现在可以直接跳转（登录功能需要后端支持）。主要功能为我的病人、电子病历、住院管理、报告查询、出院管理等，本期重点功能为我的病人和电子病历两个模块。其中我的病人为登录后默认展示的页面。
  - 我的病人：删除、批量删除、修改、查看详情、筛选等功能（前端已完成，需要后端支持）；
  - 电子病历：查看详情已完成，添加病历、删除等(前端大体完成，需要后端支持)

> 项目中有几个模块写了比较详细的注释，可以先从这两个模块看起：[ReportQuery.vue](src/components/Doctor/ReportQuery.vue)、[home.vue](src/components/Home.vue)。

#### 一、项目启动
##### - 本项目依赖node.js环境，请确保已经成功安装，如果没有请提前到[官网](http://nodejs.cn/download/)下载。VUE支持的最低IE浏览器版本为`IE10`，请注意，建议使用Chrome等现代浏览器查看和开发。
##### - 通过`npm install` 安装依赖，通过`npm run dev` 命令启动本地服务。
##### - 具体方法见[README.md](README.md)

#### 二、数据接口
##### 本项目将接口地址统一放在[src/service.js](src/service.js)目录下，方便管理。在组件中通过import导入需要的模块，按需加载，提高速度。

#### 三、数据保存
##### 本项目拟将数据存放在`vuex`中，以减少网络请求，提高响应速度。在`state`中的数据可以在各个组件中直接取用；讲需要计算并且多次使用的数据保存在`getters`中；`mutations`和`action`分别为同步和异步的提交数据。另外本项目还使用了`localStorage`技术来实现数据的本地持久化存储，例如：出院管理相关业务。

#### 四、页面跳转
##### 本项目的页面跳转在[src/router/index.js](src/router/index.js)中统一管理。除了导入所需的模块以及组件外，项目中还使用了子路由相关技术。由于本期项目涉及的是`医生端`，所以多数页面都是在医生端这个框架下进行跳转的，即：登录医生端页面后，左侧是导航栏，点击时会在医生端的各个页面间进行跳转。具体来说，从`我的病人` 、 `电子病历` 到 `就诊咨询` 和 `个人信息`这几个页面对应的组件都是[Dortor.vue](src/components/Doctor/Doctor.vue)的子组件，是通过`<router-view></router-view>`引入进来的。代码类似：
``` js
{
  path: '/Doctor',
  component: Doctor,
  children:[
    // 默认界面--我的病人
    {path:'/', component: MyPatient, children:[
        {path:'/', component: Pagenation},
      ],
    },
    // 电子病历列表详情
    {path:'/EMedicalListDetail', component: EMedicalListDetail},
    // 电子病历详情
    {path:'/EMedicalDetail', name: 'EMedicalDetail', component: EMedicalDetail},
    // 添加病历
    {path:'/AddMedical', name: 'AddMedical', component: AddMedical}
}
```
##### 通过children属性添加当前路由下的子路由。
##### 此外，还通过监听路由的变化来动态的修改侧边栏的显示状态，使对应的选项高亮，以表明当前的页面。这里使用的VUE的watch方法，来监听$route对象.

#### 五、登录方式
##### 本项目仅包含医生端的登录功能，采用手机号+验证码的方式，其中手机号有后端添加，目前不支持注册。验证码由接口实现部分功能，和后端结合后决定返回至前端页面中，页面上以alert的形式呈现。获取验证码后填写在对应的输入框即可登录，登录后获取token并存放在localStorage中。此后的请求均需要将token加在请求数据中方可正常访问接口，即额外增加一条数据。项目中将该功能统一放在[main.js](src/main.js)中处理，在发送请求时需要通过import引入xhrData并做后续处理。以下附可用于登录的手机号码：
```
18346547345
17434654564
17343545633
18426343345
18356456455
```
#### 五、bug list
##### 由于时间紧迫，本项目中尚有不少bug需要修复，或者未完成的功能，摘录如下：
 - [ReportQuery.vue](src/components/Doctor/ReportQuery.vue) 中table表格，布局有问题，需要自行修改。