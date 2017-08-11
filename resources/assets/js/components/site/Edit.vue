<template>
    <div class="form-wrap" id="create-news-wrap">
      <el-row>
        <el-col :span="24">
          <h3 class="create-news-header-txt">网站设置</h3>
          <hr>
          <el-form ref="form" :model="site" label-width="180px">
            <el-form-item label="页面标题">
              <el-input v-model="site.title" placeholder="必填"></el-input>
            </el-form-item>
            <el-form-item label="页面关键字">
              <el-input v-model="site.keyword" placeholder="可选"></el-input>
            </el-form-item>
            <el-form-item label="页面描述">
              <el-input v-model="site.description"></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="site.author" placeholder="可选"></el-input>
            </el-form-item>
            <el-form-item label="版权信息">
              <el-input v-model="site.copyright" placeholder="可选"></el-input>
            </el-form-item>
            <el-form-item label="公司信息">
              <el-input v-model="site.info" placeholder="可选"></el-input>
            </el-form-item>
            <el-form-item label="收信邮件地址">
              <el-input v-model="site.quote_request_handler" placeholder="可选"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="upload" @click.prevent="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script src="./Edit.js">
</script>
