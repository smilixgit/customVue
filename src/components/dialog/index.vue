<template>
    <van-popup
     v-model="show"
     class="dialog-test"
     close-icon-position="top-right"
   >
     <div class="dialog-content">
       <div class="top-bg">
           <img src="../../assets/images/token.png" />
           <div class="dialog-text" v-if="active == 1">合约授权功能可以检测并展示您目前正在 授权的智能合约，方便你及时发现并回收 权限，避免造成资金损失。</div>
           <div class="dialog-text" v-if="active == 2">你将解除对此合约的授权，解除授权 后，此合约将无权支配您的资产，您 的资产只有您自己可掌控！确认解除 授权？</div>
       </div>
       <div class="data-flex" v-if="active == 1">
           <div @click="handleNoTips">不再提醒</div>
           <div class="line-middel">|</div>
           <div class="confirm" @click="confirmHandle">确认</div>
       </div>
       <div class="data-flex" v-if="active == 2">
           <div @click="show=false">取消</div>
           <div class="line-middel">|</div>
           <div class="confirm" @click="removeAuth" style="color:rgba(243, 96, 17, 1)">立即解除授权</div>
       </div>
     </div>
   </van-popup> 
</template>
<script>
export default {
    props:{
        active:{
            type: String,
            default: '1'
        }
    },
  name: "dialog",
  data() {
    return { 
        show: false,
    };
  },
  mounted() { 

  },
  methods: {
      showDialog(){
        this.show = true;
      },
      //不在提醒
      handleNoTips(){
        this.show = false;
        this.$emit("handleNoTips")
      },
      //确认
      confirmHandle(){
        this.show = false;
        this.$emit("confirmHandle")
      },
      //立即解除授权
      removeAuth(){
        this.show = false;
        this.$emit("removeAuth")
      }
  }
}
</script>

<style scoped> 
.dialog-content{
    height: 320px;
    width: 320px;
}
.van-popup{
    border-radius: 15px;
}
.top-bg{
    background-image: linear-gradient(#5fcffb, #1b8bef);
    height: 270px;
    text-align: center;
}
.top-bg img{
    width: 290px;
    margin-top: 15px;
}
.dialog-text{
    position: absolute;
    top: 175px;
    padding: 0 25px;
    color: #ffff;
}
.data-flex{
    display: flex;
    justify-content: space-between;
    line-height: 50px;
}
.data-flex div{
    text-align: center;
    width: 49%;
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
}
.data-flex .line-middel{
    color: rgba(153, 153, 153, 1);
    height: 35px;
    width: 1%;
}
.data-flex .confirm{
    color: rgba(81, 161, 242, 1)
}
.van-popup--center{
    top: 290px;
}
</style>