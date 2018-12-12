<style scoped>
  li {list-style-type:none;}
  .survey-card-border{
    border: #2d8cf0 dotted 1px;
    margin: 5px;
  }
  span{
    margin-right: 20px;
  }
  .dept_row{
    margin: 10px 0 10px 0;
  }
  .submit_btn{
    margin-bottom: 10px
  }
</style>
<template>
  <div>

    <Row>
      <Card style="background-color: #5cadff;">
        <p style="color: white;text-align: center;font-size: large">襄阳中心医院职工满意度调查</p>
      </Card>
    </Row>

    <Row class="dept_row">
      <Col span="1">&nbsp;</Col>
      <Col span="22">
        <Card class="survey-card-border" v-for="(dept , index) in employee_survey.doc_dept" :key="dept.dept_code">
          <p slot="title">
            {{(index+1) +dept.dept_name}}
          </p>
          <ul>
            <li v-for="(item,index) in dept.dept_group[0].group_item" :key="item.item_code">
              <span>{{(index+1)+item.item_name}}</span>
              <template>
                <Rate v-model="item.item_star"  style="margin-left: 15%;font-size: 28px;"/>
              </template>
            </li>
          </ul>
        </Card>
      </Col>
      <Col span="1">&nbsp;</Col>
    </Row>
    <!--</Scroll>-->
    <Row class="dept_row">
      <Col span="1">&nbsp;</Col>
      <Col span="22">
        <Input type="textarea" v-model="employee_survey.doc_advice" :rows="4" placeholder="请输入您的意见和建议" style="padding: 0px 5px 0 5px;"/>
      </Col>
      <Col span="1">&nbsp;</Col>
    </Row>
    <Row>
      <Col span="1">&nbsp;</Col>
      <Col span="22"><Button class="submit_btn" long type="primary" @click="addSurveyDoc">提&nbsp;&nbsp;交</Button></Col>
      <Col span="1">&nbsp;</Col>
      <!--<Col span="7"><Button type="primary" style="width: 150px;margin-bottom: 5px;" @click="setItem">填充</Button></Col>-->
    </Row>
    <!--<Row>
      <Col span="1">&nbsp;</Col>
      <Col span="22"><Button type="primary" style="width: 150px;margin-bottom: 5px;" @click="setItem">填充</Button></Col>
      <Col span="1">&nbsp;</Col>
    </Row>-->
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    computed:{
      employee_survey:function () {
        //this.$store.dispatch("getEmployeeTemplate")
        return this.$store.getters.EmployeeSurvey
      }
    },
    methods: {
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
          var a = parseInt(i)+1
          var items=depts[i].dept_group[0].group_item
          for(var j in items){
            if(items[j].item_star == 0){
              var b = parseInt(j)+1
              alert("请填写完毕再提交！"+" \n "+a+depts[i].dept_name+" 的 "+b+items[j].item_name+" 没有填写");
              //alert("请填写完毕再提交！"+" \n "+i+depts[i].dept_name+" 的 "+j+items[j].item_name+" 没有填写");
              return;
            }
          }
        }
        if(this.employee_survey.doc_advice == ''){
          alert("请填写意见和建议")
        }
        this.$api.post('adddoc' ,{
            headers:{
              "Access-Control-Allow-Origin":"*",
              "Content-Type":"application/json;charset=UTF-8",
              "Access-Control-Allow-Headers":"Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
              "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
            },
            params:this.employee_survey
          }
        ).then((data) => {
            console.log(data)
            if(data.data.meta.message == 'ok'){
              this.$router.push({path: '/successwx'})
            }
          })
      }
    }
  }
</script>
