<style scoped>
  .survey-item{
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: dotted 1px;
  }

  .survey-list{
    border: 1px dotted #3399ff;
    border-radius: 5px;
  }

  .survey-item-p{
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .survey-item-ul{
    margin-left:15px;
    list-style-type:none;
  }
  .survey-item-ul-li-div{
    font-size: 13px;
  }
</style>
<template>
<div class="container">
  <Row style="background-color: #3399ff;padding: 10px 0 10px 0;margin-bottom: 5px">
    <Col span="24">
      <div style="text-align: center;font-size: 17px;font-weight: 800;color: white">出院患者对临床服务满意度调查表</div>
    </Col>
  </Row>



  <div class="survey-list" style="margin: 0 5px 0 5px;">

    <div class="survey-item">
      <p  class="survey-item-p">请填写您的住院科室</p>
      <i-select  v-model="cyuan.kshi" style="width:200px" filterable>
        <i-option v-for="item in zyKshi" :value="item.deptname">{{ item.deptname }}</i-option>
      </i-select>
      <input id="content" style="border: 0px;width: 0px;" />
    </div>

    <!--<div class="survey-item">
      <p class="survey-item-p">2.对护士服务的满意度</p>
      <ul class="survey-item-ul">
        <li>
          <div class="survey-item-ul-li-div">1.对护士服务态度的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.hshi.tdu"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">2.对护士护理技术的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.hshi.jsu"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">3.对护士护理服务及时、主动性的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.hshi.xlu"></Rate>
          <input v-focus="true"/>
        </li>
      </ul>
    </div>

    <div class="survey-item">
      <p class="survey-item-p">3.对医疗科室服务满意度</p>
      <ul class="survey-item-ul">
        <li>
          <div class="survey-item-ul-li-div">1.对检验科服务的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.yliao.jyan"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">2.对放射科（拍片）服务的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.yliao.fshe"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">3.对CT是服务的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.yliao.ct"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">4.对核磁室服务的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.yliao.hci"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">5.对超生诊断科（B超）服务的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.yliao.csheng"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">6.对心电图室服务的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.yliao.xdian"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">7.对推拿室服务的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.yliao.tna"></Rate>

        </li>
      </ul>
    </div>

    <div class="survey-item">
      <p class="survey-item-p">4.对后勤及其他部门服务的满意度</p>
      <ul class="survey-item-ul">
        <li>
          <div class="survey-item-ul-li-div">1.对清洁卫生的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.hqin.wsheng"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">2.对膳食的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.hqin.sshi"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">3.对办理出、入院手续的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.hqin.rcyuan"></Rate>
        </li>
        <li>
          <div class="survey-item-ul-li-div">4.对保障：水、电、电梯的满意度</div>
          <Rate style="font-size: 28px;" v-model="cyuan.hqin.sddti"></Rate>
        </li>
      </ul>
    </div>

    <div class="survey-item">
      <p class="survey-item-p">5.住院部环境清洁、整齐</p>
      <ul class="survey-item-ul">
        <li>
          <div class="survey-item-ul-li-div">1.住院部环境清洁、整齐</div>
          <Rate style="font-size: 28px;" v-model="cyuan.zybwsheng.wsheng"></Rate>
        </li>
      </ul>
    </div>-->
    <div class="survey-item" v-for="(group,index) in cyuan.dcha">
      <p  class="survey-item-p">{{(index+1)+group.groupname}}</p>
      <ul class="survey-item-ul">
        <li v-for="(item,index) in group.itemlist" @click="updateJdian(item.itemname)">
          <div class="survey-item-ul-li-div">{{(index+1)+item.itemname}}</div>
          <Rate style="font-size: 28px;" v-model="item.itemscore" ></Rate>
          <input v-focus="item.jdian" style="border: 0px;width: 0px;" />
        </li>
      </ul>
    </div>

    <div class="survey-item">
      <p class="survey-item-p">6.请留下您宝贵的建议</p>
      <i-input v-model="cyuan.yjian" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入..."></i-input>
    </div>

    <div class="survey-item">
      <p class="survey-item-p">7.请留下您的住院号和手机号</p>
      <i-input :maxlength="7"  v-model="cyuan.zyhao" style="margin-bottom: 5px;"  placeholder="请输入住院号"></i-input>
      <i-input :maxlength="11" v-model="cyuan.sjhao"  placeholder="请输入手机号"></i-input>
    </div>

    <div class="survey-item">
      <i-button type="primary" long @click="addChuYuan">提交</i-button>
    </div>
  </div>
</div>
</template>
<script>

  export default {
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.focus()
            value = true
          }
        }
      }
    },
    data:function(){
      return {
        /*cyuan:{
          kshi:'',
          ysheng:{
            tdu:0,
            jsu:0,
            yde:0
          },
          hshi:{
            tdu:0,
            jsu:0,
            xlu:0
          },
          yliao:{
            jyan:0,
            fshe:0,
            ct:0,
            hci:0,
            csheng:0,
            xdian:0,
            tna:0
          },
          hqin:{
            wsheng:0,
            sshi:0,
            rcyuan:0,
            sddti:0
          },
          zybwsheng:{
            wsheng:0
          },
          yjian:'',
          xming:'',
          dhua:''
        },*/
        cyuan:{
          kshi:'',
          dcha:[
            {
              groupname:'对医生医疗的满意度',
              itemlist:[
                {
                  itemname:'对医生医疗技术的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对医生服务态度的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对医生医德的满意度（收受钱，物）',
                  itemscore:0,
                  jdian:false
                }
              ]
            },
            {
              groupname:'对护士服务的满意度',
              itemlist:[
                {
                  itemname:'对护士服务态度的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对护士护理技术的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对护士护理服务及时、主动性的满意度',
                  itemscore:0,
                  jdian:false
                }
              ]
            },
            {
              groupname:'对医疗科室服务满意度',
              itemlist:[
                {
                  itemname:'对检验科服务的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对放射科（拍片）服务的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对CT是服务的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对核磁室服务的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对超生诊断科（B超）服务的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对心电图室服务的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对推拿室服务的满意度',
                  itemscore:0,
                  jdian:false
                }
              ]
            },
            {
              groupname:'对后勤及其他部门服务的满意度',
              itemlist:[
                {
                  itemname:'对清洁卫生的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对膳食的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对办理出、入院手续的满意度',
                  itemscore:0,
                  jdian:false
                },
                {
                  itemname:'对保障：水、电、电梯的满意度',
                  itemscore:0,
                  jdian:false
                }
              ]
            },
            {
              groupname:'住院部环境清洁、整齐',
              itemlist:[
                {
                  itemname:'住院部环境清洁、整齐',
                  itemscore:0,
                  jdian:false
                }
              ]
            }
          ],
          yjian:'',
          zyhao:'',
          sjhao:''
        },
        zyKshi:[]
      }
    },
    created:function(){
      this.$api.get('/cyuan/zykshi',{
          headers:{
            "Content-Type":"application/json;charset=UTF-8"
          }
        }
      ).then((data) => {
        console.log(data.data)
        if(data.data.meta.message == 'ok'){
          this.zyKshi = data.data.data
        }
      })
    },
    computed:{
      ZyuanDepts:function(){
        return this.$store.getters.DEPTS
      }
    },
    methods:{
      updateJdian:function(itemname){
        for(var i in this.cyuan.dcha){
          var group = this.cyuan.dcha[i]
          for(var j in group.itemlist){
            var item = group.itemlist[j]
            if(item.itemname == itemname){
              item.jdian = false
              return
            }
          }
        }
      },
      addChuYuan:function(){

        if(this.cyuan.kshi == ''){
          alert("科室不能为空")
          document.getElementById("content").focus();
          return
        }
        for(var i in this.cyuan.dcha){
          var group = this.cyuan.dcha[i]
          for(var j in group.itemlist){
            var item = group.itemlist[j]
            if(item.itemscore == 0){
              item.jdian = true
              alert("第"+(Number(i)+Number(1))+"栏的第"+(Number(j)+Number(1))+"项未填写，请填写完毕再提交")
              return
            }
          }
        }
        if(this.cyuan.zyhao != '' || this.cyuan.sjhao != ''){
          if(this.cyuan.zyhao != ''){
            var reg=/^\d{7}$/
            if(!reg.test(this.cyuan.zyhao)){
              alert("住院号格式不正确");
              return
            }
          }
          if(this.cyuan.sjhao!=''){
            var reg=/^[1][3,4,5,7,8][0-9]{9}$/
            if(!reg.test(this.cyuan.sjhao)){
              alert("手机号格式不正确");
              return
            }
          }
        }else{
          alert("住院号和电话请必须填写一个");
          return
        }
        console.log(this.cyuan)
        this.$api.post('/cyuan/addcyuan',JSON.stringify(this.cyuan),{
            headers:{
              "Content-Type":"application/json;charset=UTF-8"
            }
          }
        ).then((data) => {
          console.log(data.data)
          if(data.data.meta.message == 'ok'){
            this.$router.push({path: '/comsuccess'})
          }
        })
      }
    }
  }
</script>
