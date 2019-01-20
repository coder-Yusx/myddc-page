<style scoped>
  .login{
    border: 1px #ed4014 dotted;
    border-radius: 5px;
    padding: 20px 20px 10px 20px;
    width: 237px;
    height: 168px;
    position: absolute;
    top: 29%;
    left: 21%;
    background-color: cornsilk;
  }
  .form-ele{
    margin: 10px 0 10px 0px;
  }
</style>
<template>
  <div style="background-color: #f8f8f9;">
    <div class="login">
      <div class="form-ele">
        <Input v-model="user_name" prefix="ios-contact" placeholder="输入OA账号" style="width: auto" />
      </div>
      <!--<div class="form-ele">
        <Input v-model="user_password" type="password" prefix="ios-eye-off" placeholder="请输入密码" style="width: auto" />
      </div>-->
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
      }
    },
    methods:{
      login:function () {
        if(this.user_name == ''){
          alert("用户名不能为空")
        }
        //校验多次填写（一个月内）
        this.$api.get('zgong/dcmonth' ,{
            headers:{
              "Access-Control-Allow-Origin":"*",
            },
            params:{
              username:this.user_name,
            }
          }
        ).then((data) => {
          console.log(data.data)
          if(data.data.meta.message == 'error'){
            alert("一个月内不能填写多次")
            return;
          }else{
            this.$api.get('login/'+this.user_name,{
                headers:{
                  "Access-Control-Allow-Origin":"*",
                  "Content-Type":"application/json;charset=UTF-8",
                }
              }
            ).then((data) => {
              console.log(data.data)
              if(data.data.meta.message == 'ok'){
                localStorage.setItem("username",this.user_name)
                this.$router.push({path: '/zgong/index'})
              }else{
                alert('用户名错误')
              }
            })
          }
        })
      }
    }
  }
</script>
