<template>
  <div class="sidebar-wrap" id="sidebar-wrap">
    <el-menu v-if="currentCategoriesTree" default-active="1" :router="true" class="" @open="handleOpen" @close="handleClose">
      <div v-for="(topLevel, firstLevelId) in currentCategoriesTree">
        <el-submenu v-if="Object.keys(topLevel.subs).length > 0" :index="firstLevelId">
          <template slot="title">{{ topLevel.data.Cate_Title }} </template>
          <div v-for="(secondLevel, secondLevelId) in topLevel.subs">
            <!-- 如果本目录已经没有子目录了 -->
            <el-menu-item v-if="Object.keys(secondLevel.subs).length === 0"
                          :index="secondLevelId"
                          :route="{name: 'loadArticlesList', params:{id: secondLevel.data.Cate_Id}}">
                {{ secondLevel.data.Cate_Title }}
            </el-menu-item>
            <!-- 本目录还有子目录 -->
            <el-submenu v-else :index="secondLevelId" :router="true">
              <template slot="title">{{ secondLevel.data.Cate_Title }}</template>
              <el-menu-item v-for="(thirdLevel, thirdLevelId) in secondLevel.subs"
                            :index="thirdLevelId"
                            :route="{name: 'loadArticlesList', params:{id: thirdLevel.data.Cate_Id}}">
                {{ thirdLevel.data.Cate_Title }}
              </el-menu-item>
            </el-submenu>
          </div>
        </el-submenu>

        <el-menu-item v-else :index="firstLevelId" :route="{name: 'loadArticlesList', params:{id: topLevel.data.Cate_Id}}">
          {{ topLevel.data.Cate_Title }}
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script src="./Sidebar.js">
</script>
