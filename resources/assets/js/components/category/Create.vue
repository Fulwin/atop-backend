<template>
    <div class="form-wrap" id="create-news-wrap">
      <el-row>
        <el-col :span="8">
          <div class="category-tree-wrap">
            <h3 class="create-news-header-txt">
              栏目列表
              <span style="font-size:14px; cursor: pointer;">
                <a @click="loadCreateNewCategoryForm">+新建栏目</a>
              </span>
            </h3>
            <hr>
            <ul class="category-tree">
              <li class="branch" v-for="item in parentCategoiesList" :class="{ 'is-sub': item.isSub, 'is-sub-sub': item.isSecondSub }">
                  <span @click="editCategory(item.id)">
                    {{ item.value }}
                  </span>
                  <a href="#" class="del-btn" @click="removeCategory(item.id, $event)">
                    <i class="el-icon-circle-close"></i>
                  </a>
              </li>
            </ul>
          </div>
        </el-col>

        <el-col :span="16">
          <h3 class="create-news-header-txt">{{ sectionTitle }}</h3>
          <hr>
          <el-form ref="form" :model="category" label-width="120px">
            <el-form-item label="父级栏目">
              <el-autocomplete
                    class="inline-input"
                    v-model="Cate_ParentTitle"
                    :fetch-suggestions="querySearch"
                    placeholder="根目录"
                    @select="handleSelect"
                  ></el-autocomplete>
            </el-form-item>
            <el-form-item label="栏目名称">
              <el-input v-model="category.Cate_Title" placeholder="必填"></el-input>
            </el-form-item>
            <el-form-item label="栏目标识">
              <el-input v-model="category.Cate_Key" placeholder="可选"></el-input>
            </el-form-item>
            <el-form-item label="栏目排序">
              <el-input v-model="category.Cate_Order"></el-input>
            </el-form-item>
            <el-form-item label="前台链接">
              <el-input v-model="category.Cate_Url" placeholder="可选"></el-input>
            </el-form-item>

            <el-form-item label="显示状态">
              <el-select v-model="category.Cate_State" placeholder="是否显示本栏目">
                <el-option label="显示" value="1"></el-option>
                <el-option label="不显示" value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="设为菜单项">
              <el-select v-model="category.Cate_IsMenu" placeholder="置于顶部菜单中">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="栏目图片">
              <el-col :span="20">
                <el-input v-model="category.Cate_Image" placeholder="可选" class="pull-left ">
                </el-input>
              </el-col>
              <el-col :span="4">
                <media-manager-trigger></media-manager-trigger>
              </el-col>
            </el-form-item>

            <el-form-item label="栏目图片2">
              <el-col :span="20">
                <el-input v-model="category.Cate_ExField1" placeholder="可选" class="pull-left ">
                </el-input>
              </el-col>
              <el-col :span="4">
                <media-manager-trigger></media-manager-trigger>
              </el-col>
            </el-form-item>

            <el-form-item label="栏目说明">
              <Vueditor ref="vueditorComponent"></Vueditor>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="upload" @click.prevent="onSubmit">保存</el-button>
            </el-form-item>

          </el-form>

        </el-col>
      </el-row>

    </div>
</template>

<script src="./Create.js">
</script>
