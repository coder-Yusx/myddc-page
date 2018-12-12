<style scoped>
  .login{
    border: 1px #ed4014 dotted;
    border-radius: 5px;
    padding: 10px 20px 10px 20px;
    width: 239px;
    position: absolute;
    top: 30%;
    left: 23%;
  }
  .form-ele{
    margin: 10px 0 10px 0px;
  }
</style>
<template>
  <div style="background-color: #f8f8f9;height: 662px;">
    <div class="login">
      <div class="form-ele">
        <Input v-model="user_name" prefix="ios-contact" placeholder="输入OA账号" style="width: auto" />
      </div>
      <div class="form-ele">
        <Input v-model="user_password" type="password" prefix="ios-eye-off" placeholder="请输入密码" style="width: auto" />
      </div>
      <div class="form-ele">
        <Button type="primary" style="width: 195px" @click="login">登录</Button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data:function () {
      return {
        'user_name':'',
        'user_password':''
      }
    },
    methods:{
      login:function () {
        this.$api.get('login/'+this.user_name,{
            headers:{
              "Access-Control-Allow-Origin":"*",
              "Content-Type":"application/json;charset=UTF-8",
            }
          }
        ).then((data) => {
          console.log(data.data)
          if(data.data.meta.message == 'ok' && (this.user_password == '' || this.user_password == undefined || this.user_password == null)){
            //localStorage.setItem("isLogin",true)
            this.$router.push({path: '/wx',params:{userid:this.user_name}})
          }else{
            alert('用户名或密码错误')
          }
        })
      }
    }
  }
</script>
