<style scoped>
  .instructions{
    border: 1px dotted rgba(0, 0, 0, 0.45);
    border-radius: 10px;
    position: absolute;
    z-index: 100;
    top: 11%;
    left: 80%;
    padding: 8px;
  }
</style>
<template>
      <table class="instructions">
        <tr>
          <td colspan="2">提示：</td>
        </tr>
        <tr>
          <td>
            很不满意：
          </td>
          <td>
            <template>
              <Rate v-model="rank.hbmy" disabled/>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            不满意：
          </td>
          <td>
            <template>
              <Rate v-model="rank.bmy" disabled/>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            一般：
          </td>
          <td>
            <template>
              <Rate v-model="rank.yb" disabled/>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            满意：
          </td>
          <td>
            <template>
              <Rate v-model="rank.my" disabled/>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            很满意：
          </td>
          <td>
            <template>
              <Rate v-model="rank.hmy" disabled/>
            </template>
          </td>
        </tr>
      </table>
</template>

<script>
  export default {
    name:'FriendlyTips',
    data:function () {
      return{
        rank:{
          hbmy:1,
          bmy:2,
          yb:3,
          my:4,
          hmy:5
        }
      }
    }
  }
</script>
