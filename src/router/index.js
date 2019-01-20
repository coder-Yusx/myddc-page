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
import CYuanIndex2 from '../components/ChuYuan/CYuanIndex2'
import CYuanCount from '../components/ChuYuan/CYuanCount'
import CYuanCount2 from '../components/ChuYuan/CYuanCount2'
import CommonSuccess from '../components/Common/CommonSuccess'

import ZGong from '../components/ZhiGong/ZGong'
import ZGongIndex from '../components/ZhiGong/ZGongIndex'
import ZGongLogin from '../components/ZhiGong/ZGongLogin'
import ZGongCount from '../components/ZhiGong/ZGongCount'

import Wx from '../components/wx/Wx'
import WxOauth2 from '../components/wx/WxOauth2'

Vue.use(Router)

const router = new Router({
  mode:'history',
  base: '/dist/',
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
        /*{
          path: 'index',
          name: 'CYuanIndex',
          component: CYuanIndex,
        },*/
        {
          path: 'index',
          name: 'CYuanIndex2',
          component: CYuanIndex2,
        },
        /*{
          path: 'count',
          name: 'CYuanCount',
          component: CYuanCount
        },*/
        {
          path: 'count',
          name: 'CYuanCount2',
          component: CYuanCount2
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
    },{
      path:'/wx',
      name:'Wx',
      component:Wx,
      children:[
        {
          path:'oauth2',
          name:'WxOauth2',
          component:WxOauth2
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
