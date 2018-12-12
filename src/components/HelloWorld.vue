<style scoped>
  .doc_header{
    background-color: #2d8cf0;
    padding: 15px 0 15px 210px;
    color: white;
    font-size: 15px;
  }
  .doc_tip1{
    color: red;
    padding-left: 130px;
  }
  .dept_row{
    margin: 10px 0 10px 0;
  }
  .item-row{
    border: 1px #2d8cf0 dotted;
  }
  li{
    list-style-type:none;
  }
</style>
<template>
  <div>
    <Row class="doc_header">
      <Col span="8">&nbsp;</Col>
      <Col span="8"><span>{{employee_survey.doc_name}}</span></Col>
      <Col span="8">&nbsp;</Col>
    </Row>
    <Row class="doc_tip1">
      <Col span="8">&nbsp;</Col>
      <Col span="8"><span>本次调查为匿名调查，系统为用户信息保密，请放心填写</span></Col>
      <Col span="8">&nbsp;</Col>
    </Row>
    <Row class="dept_row" v-for="(dept,index) in employee_survey.doc_dept">
      <Col span="8">&nbsp;</Col>
      <Col span="8">
        <Card class="item-row">
          <p slot="title">{{index+dept.dept_name}}</p>
          <ul v-for="(item,index) in dept.dept_group[0].group_item">
            <li>
              <span>{{index+item.item_name}}</span>
              <span style="margin-left: 50px">
              <Rate v-model="item.item_star" />
            </span>
            </li>
          </ul>
        </Card>
      </Col>
      <Col span="8">&nbsp;</Col>
    </Row>
    <Row class="dept_row">
      <Col span="8">&nbsp;</Col>
      <Col span="8">
        <Input type="textarea" v-model="employee_survey.doc_advice" :rows="4" placeholder="请输入您的意见和建议" />
      </Col>
      <Col span="8">&nbsp;</Col>
    </Row>
    <Row class="dept_row">
      <Col span="8">&nbsp;</Col>
      <Col span="8">
        <Button @click="addSurveyDoc" type="primary" long style="font-size: 15px">提&nbsp;&nbsp;交</Button>
      </Col>
      <Col span="8"><Button @click="setItem" type="primary" long style="font-size: 15px">填充</Button></Col>
    </Row>
    <friendly-tips></friendly-tips>
  </div>
</template>
<script>
  import FriendlyTips from './FriendlyTips'
  export default {
    components:{
      FriendlyTips
    },
    data:function(){
      return {
      }
    },
    computed:{
      employee_survey:function () {
        //this.$store.dispatch("getEmployeeTemplate")
        return this.$store.getters.EmployeeSurvey
      }
    },
    created:function(){
      //this.$store.dispatch("getEmployeeTemplate")

      //console.log(this.$store.getters.EmployeeSurvey)
    },
    methods:{
      setItem:function(){
        var depts = this.employee_survey.doc_dept;
        for(var i in depts){
          var items=depts[i].dept_group[0].group_item
          for(var j in items){
            var randomNum1 = Math.random()*10+1;
            var randomNum2 = Math.floor(randomNum1);
            if(randomNum2 % 6 == 0){
              items[j].item_star = 5
            }else{
              items[j].item_star = randomNum2 % 6
            }

          }
        }
      },
      addSurveyDoc:function () {
        var depts = this.employee_survey.doc_dept;
        for(var i in depts){
          var items=depts[i].dept_group[0].group_item
          for(var j in items){
            if(items[j].item_star == 0){
              alert("请填写完毕再提交！"+" \n "+i+depts[i].dept_name+" 的 "+j+items[j].item_name+" 没有填写");
              return;
            }
          }
        }
        if(this.employee_survey.doc_advice == ''){
          alert("请填写意见和建议")
        }
        console.log(this.employee_survey)
        this.$api.post('adddoc' ,{
              headers:{
                "Content-Type":"application/json;charset=UTF-8",
                /*"Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Headers":"Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
                "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"*/
              },
              params:this.employee_survey
            }
          )
          .then((data) => {
            console.log(data)
            if(data.status == 200){
              /*this.submmited = false
              this.msg = '添加成功！！！'*/
              this.$router.push({path: '/complete'})
            }
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
