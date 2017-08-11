<template>
  <div class="dashboard-wrap" id="dashboard-wrap">
    <v-top></v-top>

    <el-row type="flex" class="row-bg">
      <el-col :span="4">
        <v-sidebar></v-sidebar>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
    <media-manager></media-manager>
  </div>
</template>
<script src="./Dashboard.js">
</script>
