<template>
  <div class="top-wrap" id="top-wrap">
    <div v-show="isLoggedIn" class="nav-wrap">
      <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-submenu index="shortcuts">
          <template slot="title">快捷菜单</template>
          <el-menu-item index="basic_settings">网站设置</el-menu-item>
          <el-menu-item index="categories">网站栏目管理</el-menu-item>
        </el-submenu>
        <el-submenu index="switch">
          <template slot="title">版本切换</template>
          <el-menu-item index="CN">中文网站</el-menu-item>
          <el-menu-item index="EN">English Version</el-menu-item>
        </el-submenu>
        <el-menu-item index="media_manager_trigger">
          <media-manager-trigger title="Files Manager"></media-manager-trigger>
        </el-menu-item>
        <el-menu-item index="logout">退出</el-menu-item>
        <el-menu-item index="language" class="pull-right">当前语言: {{ currentLanguage }}</el-menu-item>
        <el-menu-item index="user" class="pull-right">{{ username }}, 欢迎你</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script src="./Top.js">
</script>
