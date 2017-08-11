<template>
  <div class="form-wrap" id="create-news-wrap">
    <h3 class="create-news-header-txt">修改信息</h3>
    <hr>
    <el-form ref="form" :model="article" label-width="120px">
      <el-form-item label="信息标题">
        <el-input v-model="article.BaseInfo_Title"></el-input>
      </el-form-item>
      <el-form-item label="信息排序">
        <el-input v-model="article.BaseInfo_Order"></el-input>
      </el-form-item>
      <el-form-item label="信息图片">
        <el-col :span="20">
          <el-input v-model="article.BaseInfo_Image" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="发布时间">
        <el-col :span="11">
          <el-date-picker type="date" format="yyyy-MM-dd" placeholder="选择发布日期" v-model="article.BaseInfo_AddTime" style="width: 100%;" @change="dateChange"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="显示状态">
        <el-select v-model="article.BaseInfo_State" placeholder="是否显示本新闻?">
          <el-option label="显示" value="1"></el-option>
          <el-option label="不显示" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="信息正文">
        <Vueditor ref="vueditorComponent"></Vueditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./Edit.js">
</script>
