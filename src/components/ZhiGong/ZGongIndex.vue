<style></style>
<template>
  <div id="container">
    <Row style="background-color: #3399ff;padding: 10px 0px 10px 0px;border-radius: 5px;">
      <Col span="24">
        <div style="font-size: 18px;text-align: center;color: white">襄阳市中心医院职工满意度调查</div>
      </Col>
    </Row>

    <Card v-for="item in zgdcha.zgbmen" style="width:380px;margin: 5px 0px 0px 10px;">
      <p slot="title" style="font-size: 15px;">
        {{item.dept}}
      </p>
      <ul>
        <li style="list-style-type: none">
          <span>服务态度</span>
          <Rate style="margin-left: 100px;font-size: 25px;" v-model="item.dcha[0]"></Rate>
        </li>
        <li style="list-style-type: none">
          <span>服务质量</span>
          <Rate style="margin-left: 100px;font-size: 25px;" v-model="item.dcha[1]"></Rate>
        </li>
        <li style="list-style-type: none">
          <span>办事效率</span>
          <Rate style="margin-left: 100px;font-size: 25px;" v-model="item.dcha[2]"></Rate>
        </li>
        <li style="list-style-type: none">
          <span>劳动纪律</span>
          <Rate style="margin-left: 100px;font-size: 25px;" v-model="item.dcha[3]"></Rate>
        </li>
      </ul>
    </Card>

    <Row style="padding: 10px 0px 10px 0px;border-radius: 5px;">
      <Col span="24">
        <i-input type="textarea" :rows="4" placeholder="请输入意见和建议" v-model="zgdcha.zgyjian"></i-input>
      </Col>
    </Row>
    <Row style="padding: 10px 0px 10px 0px;border-radius: 5px;">
      <Col span="24">
        <i-button type="primary" long @click="addZGong">提交</i-button>
        <i-button style="margin-top: 10px;" type="primary" long @click="test">测试</i-button>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data:function(){
      return{

      }
    },
    computed:{
      zgdcha:function(){
        //this.zgdCha.dcx=this.$store.getters.ZGong_Dept
        return this.$store.getters.zgdcha
      }
    },
    methods:{
      addZGong:function(){
        if(localStorage.getItem('username') != null && localStorage.getItem('username') != undefined){
          this.zgdcha.username = localStorage.getItem('username')
        }
        console.log(this.zgdcha);
        this.$api.post('/zgong/addczgong',JSON.stringify(this.zgdcha),{
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
      },
      test:function(){
        var depts = this.zgdcha.zgbmen
        for(var i in depts){
          console.log(depts[i])
          for(var j in depts[i].dcha){
            var randomNum1 = Math.random()*10+1;
            var randomNum2 = Math.floor(randomNum1);
            if(randomNum2 % 6 == 0){
              depts[i].dcha[j] = 5
            }else{
              depts[i].dcha[j] = randomNum2 % 6
            }
          }
        }
      }
    }
  }
</script>
