<style></style>
<template>
  <div id="zgdchz">
    <Row class="count-row" style="background-color: #3399ff;padding: 10px 0 10px 0;">
      <Col span="24">
        <div style="text-align: center;font-size: 17px;font-weight: 800;color: white">出院患者对临床服务满意度调查表</div>
      </Col>
    </Row>
    <Row style="margin-top: 10px;">
      <Col span="3" offset="4">
        <i-select v-model="kshi" style="width:150px">
          <i-option v-for="item in zgdcha.zgbmen" :value="item.dept">{{ item.dept }}</i-option>
        </i-select>
      </Col>
      <Col span="4">
        <i-col span="12">
          <Date-picker type="daterange" v-model="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px"></Date-picker>
        </i-col>
      </Col>
      <Col span="2">
        <i-button type="primary" @click="findZgongByConditions">查询</i-button>
      </Col>
      <Col span="2">
        <i-button type="primary" @click="zgongToExcel">导出excel</i-button>
      </Col>
    </Row>
    <Row style="margin-top: 10px;">
      <Col span="20" offset="4">
        <i-table height="500" width="919" border :columns="columns1" :data="data1" @on-row-dblclick="showDetail"></i-table>
      </Col>
    </Row>

    <Row style="margin-top: 10px;">
      <Col span="20" offset="4">
        <i-table height="300" width="919" border :columns="columns2" :data="data2" @on-row-dblclick="showDetail"></i-table>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data:function(){
      return {
        kshi:'',
        daterange:[],
        columns1:[
          {
            title: '科室',
            key: 'kshi',
            width: 100,
            fixed: 'left'
          },
          {
            title: '调查次数',
            key: 'fshu',
            width: 100
          },
          {
            title: '服务态度',
            key: 'fwtdu',
            width: 100
          },
          {
            title: '服务质量',
            key: 'fwzliang',
            width: 100
          },
          {
            title: '办事效率',
            key: 'bsxlv',
            width: 100
          },
          {
            title: '劳动纪律',
            key: 'ldjlv',
            width: 100
          },
          {
            title: '合计',
            key: 'hji',
            width: 100
          },
          {
            title: '满分',
            key: 'zfen',
            width: 100
          },
          {
            title: '总满意度',
            key: 'zmyd',
            width: 100,
            fixed: 'right'
          }
        ],
        data1:[],
        columns2:[
          {
            title: '科室',
            key: 'kshi',
            width: 100,
            fixed: 'left'
          },
          {
            title: '创建人',
            key: 'cjren',
            width: 100,
          },{
            title: '创建时间',
            key: 'cjsjianStr',
            width: 100,
          },{
            title: '意见',
            key: 'jyi',
            width: 200,
          },{
            title: '服务态度',
            key: 'fwtdu',
            width: 100,
          },{
            title: '服务质量',
            key: 'fwzliang',
            width: 100,
          },{
            title: '办事效率',
            key: 'bsxlv',
            width: 100,
          },{
            title: '劳动纪律',
            key: 'ldjlv',
            width: 100,
          },{
            title: '合计',
            key: 'hji',
            width: 100,
          },{
            title: '满分',
            key: 'mfen',
            width: 100,
          },{
            title: '满意度',
            key: 'mylvStr',
            width: 100,
            fixed: 'right'
          },
        ],
        data2:[]
      }
    },
    computed:{
      zgdcha:function(){
        return this.$store.getters.zgdcha
      }
    },
    methods:{
      showDetail:function(a){
        var startTime=this.daterange[0],endTime=this.daterange[1];
        if(startTime != null&&startTime != ''){
          startTime = formatDate(this.daterange[0], 'yyyy-MM-dd')
        }
        if(endTime != null&&endTime != ''){
          endTime = formatDate(this.daterange[1], 'yyyy-MM-dd')
        }
        this.$api.get('zgong/dcdetail' ,{
            headers:{
              "Access-Control-Allow-Origin":"*",
            },
            params:{
              kshi:a.kshi,
              startTime:startTime,
              endTime:endTime,
            }
          }
        ).then((data) => {
          console.log(data.data)
          if(data.data.meta.message == 'ok'){
            this.data2 = data.data.data
          }
        })
      },
      findZgongByConditions:function(){
        var startTime=this.daterange[0],endTime=this.daterange[1];
        if(startTime != null&&startTime != ''){
          startTime = formatDate(this.daterange[0], 'yyyy-MM-dd')
        }
        if(endTime != null&&endTime != ''){
          endTime = formatDate(this.daterange[1], 'yyyy-MM-dd')
        }
        this.$api.get('zgong/countbycondition' ,{
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
          console.log(data.data)
          if(data.data.meta.message == 'ok'){
            this.data1 = data.data.data
          }
        })
      },
      zgongToExcel:function(){
        var startTime=this.daterange[0],endTime=this.daterange[1];
        if(startTime != null&&startTime != ''){
          startTime = formatDate(this.daterange[0], 'yyyy-MM-dd')
        }
        if(endTime != null&&endTime != ''){
          endTime = formatDate(this.daterange[1], 'yyyy-MM-dd')
        }
        this.$api.post('export/zgong',{
          kshi:this.kshi,
          startTime:startTime,
          endTime:endTime,
        },{responseType: 'arraybuffer'}).then((res) => {
          let fileName = '襄阳市中心医院职能部门满意度调查表.xls'
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
      }
    },
    created:function(){
      this.$api.get('zgong/getdchz' ,{
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
    }
  }
</script>
