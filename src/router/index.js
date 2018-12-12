import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import SurveyComplete from '../components/SurveyComplete'
import SatisfactionWx from '../components/wx/SatisfactionWx'
import SurveySuccessWx from '../components/wx/SurveySuccessWx'
import SurveySearch from  '../components/backstage/SurveySearch'
import WxLogin from '../components/wx/WxLogin'
import CYuan from '../components/ChuYuan/CYuan'
import CYuanIndex from '../components/ChuYuan/CYuanIndex'
import CommonSuccess from '../components/Common/CommonSuccess'
import CYuanCount from '../components/ChuYuan/CYuanCount'
import ZGong from '../components/ZhiGong/ZGong'
import ZGongIndex from '../components/ZhiGong/ZGongIndex'
import ZGongLogin from '../components/ZhiGong/ZGongLogin'
import ZGongCount from '../components/ZhiGong/ZGongCount'

Vue.use(Router)

const router = new Router({
  //mode:'history',
  base: '/dist',
  routes: [
    /*{
      path: '/helloword',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/complete',
      name: 'SurveyComplete',
      component: SurveyComplete,
    },
    {
      path: '/wx',
      name: 'SatisfactionWx',
      component: SatisfactionWx,
    },
    {
      path: '/successwx',
      name: 'SurveySuccessWx',
      component: SurveySuccessWx,
    },
    {
      path: '/search',
      name: 'SurveySearch',
      component: SurveySearch,
    },
    {
      path: '/',
      name: 'WxLogin',
      component: WxLogin,
    },*/

    {
      path: '/comsuccess',
      name: 'CommonSuccess',
      component: CommonSuccess
    },
    {
      path: '/cyuan',
      name: 'CYuan',
      component: CYuan,
      children:[
        {
          path: 'index',
          name: 'CYuanIndex',
          component: CYuanIndex,
        },
        {
          path: 'count',
          name: 'CYuanCount',
          component: CYuanCount
        }
      ]
    },
    {
      path:'/zgong',
      name:'ZGong',
      component:ZGong,
      children:[
        {
          path:'index',
          name:'ZGongIndex',
          component:ZGongIndex
        },
        {
          path:'login',
          name:'ZGongLogin',
          component:ZGongLogin
        },
        {
          path:'count',
          name:'ZGongCount',
          component:ZGongCount
        }
      ]
    }
  ]
})

/*router.beforeEach(function (to,from,next) {
  const nextRoute = ['HelloWorld', 'SurveyComplete', 'SatisfactionWx', 'SurveySearch'];
  if(nextRoute.indexOf(to.name) >= 0){
    if(localStorage.getItem("isLogin")){
      if(to.name === 'WxLogin'){
        router.push({ name: 'SatisfactionWx' })
      }else{
        next()
      }
    }else{
      if(to.name === 'WxLogin'){
        next()
      }else{
        router.push({ name: 'WxLogin' })
      }
    }
    //next();
  }else{
    next()
  }
})*/
export default router;
