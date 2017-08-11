<template>
  <div class="form-wrap" id="create-news-wrap">
    <h3 class="create-news-header-txt">修改新闻文章</h3>
    <hr>
    <el-form ref="form" :model="article" label-width="120px">
      <el-form-item label="新闻标题">
        <el-input v-model="article.News_Title"></el-input>
      </el-form-item>
      <el-form-item label="新闻排序">
        <el-input v-model="article.News_Order"></el-input>
      </el-form-item>
      <el-form-item label="新闻图片">
        <el-col :span="20">
          <el-input v-model="article.News_Image" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="新闻视频">
        <el-col :span="20">
          <el-input v-model="article.News_Video" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="发布时间">
        <el-col :span="11">
          <el-date-picker type="date" format="yyyy-MM-dd" placeholder="选择发布日期" v-model="article.News_AddTime" @change="dateChange" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="显示状态">
        <el-select v-model="article.News_State" placeholder="是否显示本新闻?">
          <el-option label="显示" value="1"></el-option>
          <el-option label="不显示" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="首页推荐">
        <el-select v-model="article.News_IsIndex" placeholder="是否在网站首页推荐?">
          <el-option label="不首页推荐" value="0"></el-option>
          <el-option label="首页推荐" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="简述">
        <el-input v-model="article.excerpt"></el-input>
      </el-form-item>

      <el-form-item label="信息正文">
        <div id="introEditorWrapper">
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./Edit.js">
</script>
