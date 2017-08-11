<template>
  <div class="form-wrap" id="create-news-wrap">
    <h3 class="create-news-header-txt">修改解决方案</h3>
    <hr>
    <el-form ref="form" :model="article" label-width="120px">
      <el-form-item label="文件名称">
        <el-input v-model="article.Down_Title"></el-input>
      </el-form-item>

      <el-form-item label="文件排序">
        <el-input v-model="article.Down_Order"></el-input>
      </el-form-item>

      <el-form-item label="预览图">
        <el-col :span="20">
          <el-input v-model="article.Down_Image" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="本地文件">
        <el-col :span="20">
          <el-input v-model="article.Down_LocalPath" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>
      <el-form-item label="网络地址">
        <el-input v-model="article.Down_OtherPath">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-form-item>

      <el-form-item label="关联产品目录">
        <el-select v-model="article.related_category_name" placeholder="请选择目录">
          <el-option :label="cat.title+' - '+cat.lang" :value="cat.cat_id" v-for="cat in relatedCategories"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发布时间">
        <el-col :span="11">
          <el-date-picker type="date" format="yyyy-MM-dd"
          placeholder="选择发布日期" v-model="article.Down_AddTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="显示状态">
        <el-select v-model="article.Down_State" placeholder="是否显示本文件?">
          <el-option label="显示" value="1"></el-option>
          <el-option label="不显示" value="0"></el-option>
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
        <el-button type="primary" @click.prevent="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./Edit.js">
</script>
