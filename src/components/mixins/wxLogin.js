//const redirectUrl = location.href//"http://www.dachengdiankongkeji.cn/api/wx/getUserInfo" //`www.dachengdiankongkeji.cn/wx`

import wxUserApi from '@/api/wxUser.js'
export const wxLogin = {
  data(){        
    return {
      userInfo1:'',
      code:'',
      appid: `wxcb4ec9048496d830`,
      redirectUrl: location.href, //'http://video.cheyunduan.cn/', //
      test:"",
      theUserInfo:''
    }
  },
  created(){
    var userInfo = sessionStorage.getItem("userInfo") || "";
    if(userInfo != ''){
        this.theUserInfo = JSON.parse(userInfo);
    }else{
        this.theUserInfo = "";
    }
    console.log(wxUserApi,'wxUserApi') 
    this.login()
  },
  methods:{
    login(){
      //授权登录
      this.code = this.$route.query.code;
      const userInfoUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      console.log(this.code,'this.codethis.code')
      if (this.code) {
        var params = {
          appid: this.appid,
          code: this.code
        }
        wxUserApi.wxLogin(params).then(res => {
          console.log(res)
          this.userInfo1 = res.data.data;
          this.test = res.data
          sessionStorage.setItem("userInfo",JSON.stringify(res.data.data))
          window.reload()
        })
        // if(!this.theUserInfo){
        // }
      } else {
        console.log(this.theUserInfo,'this.theUserInfo')
        if(!this.theUserInfo){
          window.location.href = userInfoUrl;
        }
      }
    },
    loadUserInfo(){
      this.code = this.$route.query.code;
      const userInfoUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      if (this.code) {
        var url = `/wx/getUserInfo?appid=${this.appid}&code=${this.code}`
        this.$http.get(url)
          .then(res=>{
            this.userInfo1 = res.data.data;
            sessionStorage.setItem("userInfo",JSON.stringify(res.data.data))
            // this.getOrder()
            location.reload();
          })
      } else {
        window.location.href = userInfoUrl;
      }
    }, 
  }
}