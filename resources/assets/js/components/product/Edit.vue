<template>
  <div class="form-wrap" id="create-news-wrap">
    <h3 class="create-news-header-txt">修改产品</h3>
    <hr>
    <el-form ref="form" :model="article" label-width="190px">
      <el-form-item label="产品名称">
        <el-input v-model="article.Products_Title"></el-input>
      </el-form-item>
      <el-form-item label="Part No.">
        <el-input v-model="article.Products_CodeName"></el-input>
      </el-form-item>

      <el-form-item label="产品排序">
        <el-input v-model="article.Products_Order"></el-input>
      </el-form-item>

      <el-form-item label="产品小图">
        <el-col :span="20">
          <el-input v-model="article.Products_MinImage" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="产品大图">
        <el-col :span="20">
          <el-input v-model="article.Products_BigImage" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="EYE DIAGRAM常温">
        <el-col :span="20">
          <el-input v-model="article.Products_EyeDiagram1" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="EYE DIAGRAM低温">
        <el-col :span="20">
          <el-input v-model="article.Products_EyeDiagram2" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="EYE DIAGRAM高温">
        <el-col :span="20">
          <el-input v-model="article.Products_EyeDiagram3" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="Mechanical specification">
        <el-col :span="20">
          <el-input v-model="article.Products_MechanicalSpecification" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="产品文档">
        <el-col :span="20">
          <el-input v-model="article.Products_FileIntro" class="pull-left ">
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item label="发布时间">
        <el-col :span="11">
          <el-date-picker type="date" format="yyyy-MM-dd" placeholder="选择发布日期" v-model="article.Products_AddTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="是否为推荐产品">
        <el-select v-model="article.Products_recommend" placeholder="是否显示在Solution页?">
          <el-option label="是推荐产品" value="1"></el-option>
          <el-option label="不是推荐产品" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="显示状态">
        <el-select v-model="article.Products_State" placeholder="是否显示本新闻?">
          <el-option label="显示" value="1"></el-option>
          <el-option label="不显示" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品">
        <el-select v-model="article.Products_IsNew" placeholder="是否为新品?">
          <el-option label="是" value="1"></el-option>
          <el-option label="不是" value="0"></el-option>
        </el-select>
      </el-form-item>

      <div class="el-form-item">
        <label class="el-form-item__label" style="width: 190px;">
            Applications
        </label>
        <div class="el-form-item__content" style="margin-left: 190px;">
          <div id="featuresEditorWrapper">
          </div>
        </div>
      </div>

      <div class="el-form-item">
        <label class="el-form-item__label" style="width: 190px;">
            产品详情
        </label>
        <div class="el-form-item__content" style="margin-left: 190px;">
          <div id="introEditorWrapper">
          </div>
        </div>
      </div>

      <el-form-item label="Package">
        <el-input v-model="article.Products_ExFlag1"></el-input>
      </el-form-item>
      <el-form-item label="Data Rate (bps/Hz)">
        <el-input v-model="article.Products_ExFlag2"></el-input>
      </el-form-item>
      <el-form-item label="Wavelength">
        <el-input v-model="article.Products_ExFlag3"></el-input>
      </el-form-item>
      <el-form-item label="Component">
        <el-input v-model="article.Products_ExFlag4"></el-input>
      </el-form-item>
      <el-form-item label="Output Power">
        <el-input v-model="article.Products_ExFlag5"></el-input>
      </el-form-item>
      <el-form-item label="Rec. Sens">
        <el-input v-model="article.Products_ExFlag6"></el-input>
      </el-form-item>
      <el-form-item label="Connector">
        <el-input v-model="article.Products_ExFlag7"></el-input>
      </el-form-item>
      <el-form-item label="Case Temp.">
        <el-input v-model="article.Products_ExFlag8"></el-input>
      </el-form-item>
      <el-form-item label="Reach">
        <el-input v-model="article.Products_ExFlag9"></el-input>
      </el-form-item>
      <el-form-item label="Multi-rate">
        <el-input v-model="article.Products_ExFlag10"></el-input>
      </el-form-item>

      <hr>
      <h5>MPO/波分产品特定字段集合</h5>
      <el-form-item label="连接器类型">
        <el-input v-model="article.mpo_connector_type"></el-input>
      </el-form-item>
      <el-form-item label="光纤类型">
        <el-input v-model="article.mpo_fiber_type"></el-input>
      </el-form-item>
      <el-form-item label="低插入损耗">
        <el-input v-model="article.mpo_low_il"></el-input>
      </el-form-item>
      <el-form-item label="标准插入损耗">
        <el-input v-model="article.mpo_high_il"></el-input>
      </el-form-item>
      <el-form-item label="回波损耗">
        <el-input v-model="article.mpo_return_loss"></el-input>
      </el-form-item>

      <el-form-item label="相邻信道隔离度">
        <el-input v-model="article.wdm_adjacent_channel_isolation"></el-input>
      </el-form-item>
      <el-form-item label="非相邻信道隔离度">
        <el-input v-model="article.wdm_non_adjacent_channel_isolation"></el-input>
      </el-form-item>
      <el-form-item label="插入损耗">
        <el-input v-model="article.wdm_insertion_loss"></el-input>
      </el-form-item>
      <hr>

      <el-form-item label="Extra Image 1">

        <el-col :span="20">
          <el-input v-model="article.Products_BigImage1" placeholder="选填: 产品大图1"></el-input>
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>
      <el-form-item label="Extra Image 2">
        <el-col :span="20">
          <el-input v-model="article.Products_BigImage2" placeholder="选填: 产品大图2"></el-input>
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>
      <el-form-item label="Extra Image 3">

        <el-col :span="20">
          <el-input v-model="article.Products_BigImage3" placeholder="选填: 产品大图3"></el-input>
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>
      <el-form-item label="Extra Image 4">

        <el-col :span="20">
        <el-input v-model="article.Products_BigImage4" placeholder="选填: 产品大图4"></el-input>
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>
      <el-form-item label="Extra Image 5">

        <el-col :span="20">
        <el-input v-model="article.Products_BigImage5" placeholder="选填: 产品大图5"></el-input>
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>
      <el-form-item label="Extra Image 6">

      <el-col :span="20">
        <el-input v-model="article.Products_BigImage6" placeholder="选填: 产品大图6"></el-input>
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>
      <el-form-item label="Extra Image 7">

      <el-col :span="20">
        <el-input v-model="article.Products_BigImage7" placeholder="选填: 产品大图7"></el-input>
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>
      <el-form-item label="Extra Image 8">

      <el-col :span="20">
        <el-input v-model="article.Products_BigImage8" placeholder="选填: 产品大图8"></el-input>
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>
      <el-form-item label="Extra Image 9">

        <el-col :span="20">
        <el-input v-model="article.Products_BigImage9" placeholder="选填: 产品大图9"></el-input>
          </el-input>
        </el-col>
        <el-col :span="4">
          <media-manager-trigger></media-manager-trigger>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./Edit.js">
</script>
