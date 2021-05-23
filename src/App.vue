<template>
  <div>

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <el-menu-item :index='item.path' :key="item.key" v-for="item in list" @click="menuTo(item)">
          <div> {{item.title}}</div>
        </el-menu-item>
      </el-menu>
      <router-view></router-view>



  </div>
</template>

<script>
// import HelloWorld from './components/Index.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      list: [
        {
          key: '1',
          title: '每日推荐',
          path: '/'
        },
        {
          key: '2',
          title: '搜索',
          path: '/search'
        },
      ],
      activeIndex: "/"
    }
  },
  methods: {
    menuTo(item) {
      this.$router.push(item.path)
      this.activeIndex = item.path
    },
    getPath(){
      this.activeIndex = this.$route.path
    }
  },
  watch:{
    '$route':'getPath'
  },
}
</script>

<style>

</style>
