<template>
  <div class="success_div">
    <Card :bordered="false">
      <p slot="title">提交成功</p>
      <p>谢谢您的参与 </p>
    </Card>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>

  .success_div{
    background-color: #5cadff;
    padding: 30px;
    border-radius: 5px;
    margin: 50% 5px 0 5px;
  }
</style>
