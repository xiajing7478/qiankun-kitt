# qinakuan-kitt
qiankuan vue webpack


参考1：https://qiankun.umijs.org/zh/api#runafterfirstmountedeffect
参考2：https://my.oschina.net/u/3849658/blog/4930704?_from=gitee_search
参考3：https://juejin.cn/post/6970310177517993998 



### 微前端
子应用可以对立构建，运行时动态加载。主子应用完全解耦，与技术栈无关，靠的是协议接入(子应用必须导出bootstrap，mounte，unmounte方法)

css隔离
  动态样式表，当应用切换时移除老样式，添加新应用样式
  主应用和子应用

js沙箱
  1.快照沙箱  1年前拍一张  现在拍一张 ，=》将区别保存起来，切换的时候把区别来回加载移除


