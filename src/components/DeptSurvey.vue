<style scoped>
  .tbody div{

  }
</style>
<template>
  <Row class="tbody">
    <Col span="5">&nbsp;</Col>
    <Col span="2">{{survey.name}}</Col>
    <Col span="3">
      <template>
        <Rate v-model="survey.attitude" />
      </template>
    </Col>
    <Col span="3">
      <template>
        <Rate v-model="survey.efficiency" />
      </template>
    </Col>
    <Col span="3">
      <template>
        <Rate v-model="survey.quality" />
      </template>
    </Col>
    <Col span="3">
      <template>
        <Rate v-model="survey.discipline" />
      </template>
    </Col>
    <!--<Col span="5">
      &nbsp;
    </Col>-->
  </Row>
</template>

<script>
  export default {
    props:['survey'],
    data(){
      return{
        /*survey:{
          code:'',
          name:'',
          attitude:0,
          efficiency:0,
          quality:0,
          discipline:0
        }*/
      }
    }
  }
</script>
