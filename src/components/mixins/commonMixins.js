export const commonMixins = {
  data(){        
    return {
      
    }
  },
  methods:{
    onBack(){
      this.$router.go(-1) 
    }
  }
}