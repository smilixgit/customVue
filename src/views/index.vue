<template>
    <div class="main">
        <img src="../assets/home.jpg" style="width:100%;z-index: 1;position: relative;">
        <div class="today-info">
            <div class="flex-row">
                <div class="fw">今天我能拍</div>
                <div class="fw red"><span class="f20">{{count}}</span>单</div>
            </div>
        </div>
        <div class="alipay-box flex-bw">
            <div class="flex-fl">
                <img src="../assets/alipay.jpg" style="width:40px;border-radius: 40px;">
                <div style="margin-left:5px;">
                    <div class="ali-text">支付宝安全支付</div>
                    <div class="f12">完成支付宝授权绑定，即可通过安全验证</div>
                </div>
            </div>
            <div class="alipay-btn" @click="toAlipay" >立即验证</div>
        </div>
        <div class="main-title fw f16">免单商品</div>

        <van-empty description="暂无商品" v-if="goodsList.length == 0"/>
        <div style="padding-bottom:55px;">
            <div class="course-item" v-for="item in goodsList" :key="item.id">
                <div class="flex-fl text-over">
                    <img :src="item['goodsThumbnailUrl']" class="goods-img">
                    <div class="right-content">
                        <div class="fw f16">{{ item['goodsName'] }}</div>
                        <div class="f14 c6" style="margin: 5px 0;">券后价：{{item['groupAfterQuan']}}</div>
                        <div class="red1 flex-bw">
                            <div>补贴金额：{{item['freePrice']}}</div>
                            <div class="alipay-btn pay-btn" @click="toBuy(item)">立即购买</div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <MyTabbar :active="0"/>
    </div>
</template>

<script> 
import goodsApi from '@/api/api.js'
import MyTabbar from './common/tabbar'
// import {wxLogin} from '@/components/mixins/wxLogin.js'

export default {
    // mixins: [ wxLogin ],
        name: "admin",
        components:{MyTabbar},
        data() {
            return { 
                count: 3,
                videoList:[],
                goodsList:[],
                page:1,
                limit: 15,
                userIdd: 0
            }
        },
        created(){
            document.title = '抢免单';
            this.userIdd=localStorage.getItem('userId');
            console.log(this.userIdd)
            var param={
uid:this.userIdd
}
goodsApi.getconfig({params:param}).then(res=>{
   console.log(res);
   var data=res.data;
   this.count=data.count;
});
        }, 
        onload(){
          
        },
       
        mounted() {
            window.addEventListener('scroll', this.scrollBottom); 
            console.log('进入加载页面');


            this.getList()
        },
        methods: {
            getHome(){
                goodsApi.getDouGoods().then(res => {
                    console.log(res)
                })
            },
            // 获取列表
            getList(){
                var params = {
                    limit: this.limit,
                    page: this.page,
                    type: "xw",
                    v: 2                
                }
                goodsApi.getDouGoods({params: params}).then(res => {
                    console.log(res)
                    var ccsd=this;
                    if(res.code==10001)
                    {
                        ccsd.$toast('登录已经过期，请重新登录！');
                        setTimeout(() => {
                            ccsd.$router.push('alipayVerify');
                        }, 1000);
                    }
                    this.goodsList=res.data;
                   

                    
                })
            },
            // 支付宝验证
            toAlipay(){
                this.$router.push('alipayVerify')
            },
            // 购买
            toBuy(row){
              
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                });
                if(this.count<=0)
                {
                    this.$toast({
                        message:"当日次数已用完"
                    })
                    return;
                }
                var thiz = this;
                var userId = localStorage.getItem('userId') || ''
                if(userId == ''){ 
                    this.$toast.clear();

                    this.$dialog.confirm({
                        title: '提示',
                        message: '请先完成实名认证注册',
                        theme: 'round-button',
                    }).then(() => {
                        thiz.$router.push('alipayVerify')
                    });
                    return;
                }
                console.log(row)
                var params = {
                    goods_url: row["goodsUrl"], 
                    uid: userId,
                    id:row['id']
                }
                goodsApi.getDycode( params).then(res => {
                    console.log(res)
                    this.$toast.clear();

                    this.$dialog.confirm({
                        title: '提示',
                        message: '点复制获取抖口令，打开抖音下单',
                        confirmButtonText: '复制',
                        theme: 'round-button',
                    }).then(() => {
                        let oInput = document.createElement('input');
                        oInput.value = res.data;
                        document.body.appendChild(oInput);
                        oInput.select();
                        document.execCommand('Copy');
                        this.$toast.success('复制成功');
                        oInput.remove();
                    });
                })
            },
            scrollBottom() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let clientHeight = document.documentElement.clientHeight;
                let scrollHeight = document.documentElement.scrollHeight;
                if (scrollTop + clientHeight >= scrollHeight) {
                    console.log('到底啦')
                    this.page += 1;
                    this.getList()
                }
            },
            // 详情
            toDetail(id){
                this.$router.push({path:'detail',query:{id: id}})
            }, 
        }
    }
</script>

<style scoped>
.main{
    background: #f8f8f8;
} 
.today-info{
    background: #f8e8cf;
    width: 88%;
    padding:15px;
    border-radius: 15px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    margin-top: -40px;
}
.flex-row{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.alipay-box{
    width: 88%;
    background: #c6dff9;
    width: 88%;
    padding:15px 10px;
    border-radius: 15px;
    margin: 15px auto;
    position: relative;
    z-index: 2;
}
.red{
    color: red;
    font-size: 22px;
}
.ali-text{
    color: #1d7cdc;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 600;
}
.alipay-btn{
    background: #1d7cdc;
    color: #fff;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 30px;
}
.pay-btn{
    background: rgb(226, 4, 4);
    width: 70px;
    text-align: center;
}
.goods-img{
    width: 100px;
    min-width: 100px;
    height: 90px;
}
.right-content{
    margin-left: 5px;
    width: calc(100% - 110px);
}


.main-title{
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    background: #f8f8f8;
    padding-left: 15px;
}
.main-title::before{
    content: '`';
    width: 6px;
    height: 20px;
    display: inline-block;
    background: #1d7cdc;
    color: #1d7cdc;
    margin-right: 5px;
    vertical-align: middle;
    z-index: 2;
    position: relative;
}
.price{
    color: rgb(226, 4, 4);
    margin-top: 15px;
}
.red1{
    color: rgb(226, 4, 4);
    font-size: 14px;
}
.flex-row1{
    display:flex;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 15px;
    border-bottom: 10px solid #f0f0f0;
    background: #fff;
}
.course-item{
    border-bottom: 5px solid #f8f8f8;
    padding:10px 5px;
    background: #fff;
}
</style>
