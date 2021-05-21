<template>
  <div>
    <a-layout class="layout">
      <a-layout-header>
        <div class="logo" />
        <a-menu
            theme="dark"
            mode="horizontal"
            v-model:selectedKeys="current"
            :style="{ lineHeight: '64px' }">
          <a-menu-item :key="item.key" v-for="item in list" @click="menuTo(item)">{{item.title}}</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px">
<!--        <a-breadcrumb style="margin: 16px 0">-->
<!--          <a-breadcrumb-item>Home</a-breadcrumb-item>-->
<!--          <a-breadcrumb-item>List</a-breadcrumb-item>-->
<!--          <a-breadcrumb-item>App</a-breadcrumb-item>-->
<!--        </a-breadcrumb>-->
        <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Fallofleaf Design ©2021 Created by Fallofleaf
      </a-layout-footer>
    </a-layout>


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
          title: 'Gallery',
          path: '/'
        },
        {
          key: '2',
          title: 'Search',
          path: '/search'
        },
      ],
      current: "1"
    }
  },
  methods: {
    menuTo(item) {
      this.$router.push(item.path)
      this.current = item.key
    }
  }
}
</script>

<style>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
