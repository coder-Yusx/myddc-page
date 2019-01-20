<style>
.count-row{
  margin-bottom: 5px
}
</style>
<template>
  <div>
    <Row class="count-row" style="background-color: #3399ff;padding: 10px 0 10px 0;">
      <Col span="24">
        <div style="text-align: center;font-size: 17px;font-weight: 800;color: white">出院患者对临床服务满意度调查表</div>
      </Col>
    </Row>
    <Row class="count-row">
      <Col span="3" offset="2">
        <i-select v-model="kshi" style="width:150px" filterable>
          <i-option v-for="item in zyKshi" :value="item.deptname">{{ item.deptname }}</i-option>
        </i-select>
      </Col>
      <Col span="4">
        <i-col span="12">
          <Date-picker type="daterange" v-model="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px"></Date-picker>
        </i-col>
      </Col>
      <Col span="2">
        <i-button type="primary" @click="findCyuanByConditions">查询</i-button>
      </Col>
      <Col span="2">
        <i-button type="primary" @click="cyuanToExcel">导出excel</i-button>
      </Col>
    </Row>
    <Row class="count-row">
      <Col span="22" offset="2">
        <i-table height="300" width="500" border :columns="columns1" :data="data1" @on-row-click="getDetails"></i-table>
      </Col>
    </Row>
    <Row class="count-row">
      <Col span="22" offset="2">
        <i-table height="300" width="1250" border :columns="columns2" :data="data2"></i-table>
      </Col>
    </Row>

  </div>

</template>
<script>
  import {formatDate} from '../../js/formatDate'
  export default {
    data () {
      return {
        kshi:'',
        daterange:[],
        columns1: [
          {
            title: '科室',
            key: 'dept',
            width: 100,
            //fixed:'left'
          },
          {
            title: '次数',
            key: 'num',
            width: 90,
          },
          {
            title: '得分',
            key: 'score',
            width: 110,
          },
          {
            title: '总分',
            key: 'totalscor',
            width: 100,
          },
          {
            title: '满意度',
            key: 'satisfy',
            width: 100,
          }
        ],
        data1: [],
        columns2:[
          {
            title: '科室',
            key: 'dept',
            width: 100,
            fixed:'left'
          },
          {
            title: '医生服务态度',
            key: 'ysfwu',
            width: 100,
          },
          {
            title: '医生医疗技术',
            key: 'ysyl',
            width: 100,
          },
          {
            title: '医生告知病情',
            key: 'ysgz',
            width: 100,
          },{
            title: '医生医德',
            key: 'ysyd',
            width: 100,
          },
          {
            title: '护士服务态度',
            key: 'hsfw',
            width: 100,
          },
          {
            title: '护士护理技术',
            key: 'hsjs',
            width: 100,
          },
          {
            title: '护士效率',
            key: 'hsjz',
            width: 100,
          },
          {
            title: '检验服务',
            key: 'yljy',
            width: 100,
          },
          {
            title: '放射',
            key: 'ylfs',
            width: 100,
          },
          {
            title: 'CT',
            key: 'ylct',
            width: 100,
          },{
            title: '核磁',
            key: 'ylhs',
            width: 100,
          },
          {
            title: 'B超',
            key: 'ylbc',
            width: 100,
          },
          {
            title: '心电',
            key: 'ylxd',
            width: 100,
          },{
            title: '推拿',
            key: 'yltn',
            width: 100,
          },{
            title: '后勤卫生',
            key: 'hqqj',
            width: 100,
          },
          {
            title: '膳食',
            key: 'hqss',
            width: 100,
          },
          {
            title: '入出院',
            key: 'hqrc',
            width: 100,
          },
          {
            title: '水电电梯',
            key: 'hqsdd',
            width: 100,
          },
          {
            title: '住院部环境',
            key: 'zyhj',
            width: 100,
          },{
            title: '意见',
            key: 'yjian',
            width: 100,
          },
          {
            title: '创建时间',
            key: 'createtime',
            width: 100,
          },
          {
            title: '得分',
            key: 'score',
            width: 100,
          },
          {
            title: '总分',
            key: 'totalscor',
            width: 100,
          },
          {
            title: '满意度',
            key: 'satisfy',
            width: 100,
            fixed:'right'
          }
        ],
        data2:[],
        zyKshi:[]
      }
    },
    computed:{
      ZyuanDepts:function(){
        return this.$store.getters.DEPTS
      }
    },
    created:function(){
      this.$api.get('cydc/getall' ,{
          headers:{
            "Access-Control-Allow-Origin":"*",
          }
        }
      ).then((data) => {
        console.log(data.data)
        if(data.data.meta.message == 'ok'){
          this.data1 = data.data.data
        }
      })

      this.$api.get('cydc/getalldetail' ,{
          headers:{
            "Access-Control-Allow-Origin":"*",
          }
        }
      ).then((data) => {
        console.log(data.data)
        if(data.data.meta.message == 'ok'){
          this.data2 = data.data.data
        }
      })

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
    methods:{

      getDetails:function(aa){
        var startTime=this.daterange[0],endTime=this.daterange[1];
        if(startTime != null&&startTime != ''){
          startTime = formatDate(this.daterange[0], 'yyyy-MM-dd')
        }
        if(endTime != null&&endTime != ''){
          endTime = formatDate(this.daterange[1], 'yyyy-MM-dd')
        }
        this.$api.get('cydc/getdetail' ,{
            headers:{
              "Access-Control-Allow-Origin":"*",
            },
            params:{
              kshi:aa.dept,
              startTime:startTime,
              endTime:endTime,
            }
          }
        ).then((data) => {
          if(data.data.meta.message == 'ok'){
            this.data2 = data.data.data
          }else{
            this.data2 = []
          }
        })
      },

      cyuanToExcel:function(){
        var startTime=this.daterange[0],endTime=this.daterange[1];
        if(startTime != null&&startTime != ''){
          startTime = formatDate(this.daterange[0], 'yyyy-MM-dd')
        }
        if(endTime != null&&endTime != ''){
          endTime = formatDate(this.daterange[1], 'yyyy-MM-dd')
        }

        this.$api.post('export/report',{
          kshi:this.kshi,
          startTime:startTime,
          endTime:endTime,
        },{responseType: 'arraybuffer'}).then((res) => {
          let fileName = '襄阳市中心医院出院患者满意度调查表.xls'
          let blob = new Blob([res.data], {type: 'application/x-xls'})
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
        })
      },
      findCyuanByConditions:function(){
        var startTime=this.daterange[0],endTime=this.daterange[1];
        if(startTime != null&&startTime != ''){
          startTime = formatDate(this.daterange[0], 'yyyy-MM-dd')
        }
        if(endTime != null&&endTime != ''){
          endTime = formatDate(this.daterange[1], 'yyyy-MM-dd')
        }
        this.$api.get('cydc/getbycondition' ,{
            headers:{
              "Access-Control-Allow-Origin":"*",
            },
            params:{
              kshi:this.kshi,
              startTime:startTime,
              endTime:endTime,
            }
          }
        ).then((data) => {
          if(data.data.meta.message == 'ok'){
            this.data1 = data.data.data
          }else{
            this.data1 = []
          }
        })
      }
    }
  }
</script>
