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
        <i-table height="500" width="1250" border :columns="columns1" :data="data1"></i-table>
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
            key: 'kshi',
            width: 100,
            fixed:'left'
          },
          {
            title: '患者姓名',
            key: 'hzxming',
            width: 90,
          },
          {
            title: '联系方式',
            key: 'lxfshi',
            width: 110,
          },
          {
            title: '填写时间',
            key: 'txsjianStr',
            width: 150,
          },
          {
            title: '医生态度',
            key: 'ystdu',
            width: 70,
          },
          {
            title: '医生技术',
            key: 'ysjshu',
            width: 70,
          },
          {
            title: '医生医德',
            key: 'ysyde',
            width: 70,
          },
          {
            title: '护士态度',
            key: 'hstdu',
            width: 70,
          },
          {
            title: '护士技术',
            key: 'hsjshu',
            width: 70,
          },
          {
            title: '护士效率',
            key: 'hsxlv',
            width: 70,
          },
          {
            title: '医疗放射',
            key: 'ylfshe',
            width: 70,
          },
          {
            title: '医疗核磁',
            key: 'ylhci',
            width: 70,
          },
          {
            title: '医疗ct',
            key: 'ylct',
            width: 70,
          },
          {
            title: '医疗超声',
            key: 'ylcsheng',
            width: 70,
          },
          {
            title: '医疗心电',
            key: 'ylxdian',
            width: 70,
          },
          {
            title: '医疗推拿',
            key: 'yltna',
            width: 70,
          },
          {
            title: '医疗检验',
            key: 'yljyan',
            width: 70,
          },
          {
            title: '后勤卫生',
            key: 'hqwsheng',
            width: 70,
          },
          {
            title: '后勤膳食',
            key: 'hqsshi',
            width: 70,
          },
          {
            title: '后勤入出院',
            key: 'hqrcyuan',
            width: 70,
          },
          {
            title: '后勤水电电梯',
            key: 'hqsddti',
            width: 70,
          },
          {
            title: '住院部环境',
            key: 'zybhjing',
            width: 70,
          },
          {
            title: '合计',
            key: 'hji',
            width: 70,
          },
          {
            title: '满分',
            key: 'mfen',
            width: 70,
          },
          {
            title: '满意率',
            key: 'mylv',
            fixed:'right',
            width: 90,
          }
        ],
        data1: [],
        zyKshi:[]
      }
    },
    computed:{
      ZyuanDepts:function(){
        return this.$store.getters.DEPTS
      }
    },
    created:function(){
      this.$api.get('cyuan/count' ,{
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
        this.$api.get('cyuan/countbycondition' ,{
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
          console.log(data)
          if(data.data != null && data.data != undefined && data.data != ""){
            if(data.data.meta.message == 'ok'){
              this.data1 = data.data.data
            }
          }else{
            this.data1 = []
          }
        })
      }
    }
  }
</script>
