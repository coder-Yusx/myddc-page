<style scoped>
  .title-font{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: white;
    padding: 10px 0 10px 0;
  }
  .row-margin{
    margin-top: 10px;
  }
</style>
<template>
  <div>
    <Row class="row-margin" style="background-color: #5cadff">
      <Col span="9">&nbsp;</Col>
      <Col span="5">
        <div class="title-font">襄阳市中心医院满意度调查后台</div>
      </Col>
      <Col span="10">&nbsp;</Col>
    </Row>
    <Row class="row-margin">
      <Col span="4" offset="3">
        <Select style="width: 200px" placeholder="选择科室" @on-change="searchByDept">
          <Option v-for="item in depts" :value="item.deptCode">{{item.deptName}}</Option>
        </Select>
      </Col>
      <Col span="3">
        <span>总满意度：</span>{{totalPrecent}}
      </Col>
    </Row>
    <Row class="row-margin">
      <Col span="3">&nbsp;</Col>
      <Col span="18">
        <Table :columns="columns1" :data="filteredItems"></Table>
      </Col>
      <Col span="3">&nbsp;</Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        deptSearchKey:'',
        totalPrecent:0.0,
        depts:[],
        columns1: [
          {
            title: '科室',
            key: 'deptName'
          },
          {
            title: '调查项',
            key: 'itemName'
          },
          {
            title: '很不满意',
            key: 'hbmy'
          },
          {
            title: '不满意',
            key: 'bmy'
          },
          {
            title: '一般',
            key: 'yb'
          },
          {
            title: '满意',
            key: 'my'
          },
          {
            title: '很满意',
            key: 'hmy'
          },
          {
            title: '总数',
            key: 'sumSurvey'
          },
          {
            title: '每项得分',
            key: 'achieveScore'
          },
          {
            title: '每项总分',
            key: 'totalScore'
          },
          {
            title: '每项满意度',
            key: 'satisfyPrecent'
          },
          {
            title: '最终得分',
            key: 'finalScore'
          }
        ],
        data1: []
      }
    },
    created:function () {
      this.$api.get('report1' ,{
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json;charset=UTF-8"
          }
        }
      ).then((data) => {
          if(data.status == 200){
            this.data1 = data.data.data
          }
        })

      this.$api.get('depts' ,{
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json;charset=UTF-8"
          }
        }
      ).then((data) => {
        if(data.status == 200){
          console.log(data.data.data)
          this.depts = data.data.data
        }
      })
    },
    computed:{
      filteredItems:function(){
        return this.data1.filter((item) =>{
          return item.deptCode.match(this.deptSearchKey);
        })
      }
    },
    methods:{
      searchByDept:function (value) {
        this.deptSearchKey = value

        this.$api.get('totalprecent/'+this.deptSearchKey ,{
            headers:{
              "Access-Control-Allow-Origin":"*",
              "Content-Type":"application/json;charset=UTF-8",
            }
          }
        ).then((data) => {
          console.log(data.data)
          if(data.data.meta.message == 'ok'){
            this.totalPrecent = data.data.data
          }
        })
      }
    }
  }
</script>
