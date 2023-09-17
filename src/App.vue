<template>
  <div id="app" style="height:100%">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      active: 1, 
    }
  },
}
</script>

<style>
#app{
  background: #f8f8f8;
}
</style>
