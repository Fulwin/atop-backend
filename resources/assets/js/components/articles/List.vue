<template>
  <div class="table-wrap" id="articles-wrap">
    <div class="articles-table-wrapper">
      <div class="table-tools-header">
          <h3 class="table-header pull-left">{{ currentCategoryName }}</h3>
          <el-button class="pull-right ml20" type="primary" @click="addNews"><i class="el-icon-plus"></i>添加</el-button>
      </div>

      <el-table
        :data="articles"
        stripe
        style="width: 100%">
        <el-table-column
          label="ID 编号"
          width="120">
          <template scope="scope">{{ scope.row.News_Id }}</template>
        </el-table-column>
        <el-table-column
          prop="News_Title"
          label="信息标题"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="News_AddTime"
          label="添加日期"
          width="200">
        </el-table-column>
        <el-table-column
          prop="News_Order"
          label="排序号"
          width="120">
        </el-table-column>

        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script src="./List.js">
</script>
