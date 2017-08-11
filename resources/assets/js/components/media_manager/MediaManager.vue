<template>
  <div id="media-manager-wrap" v-show="showMediaManager">
    <div class="title">
      <span class="text">{{ config.manager.title }}</span>
      <span class="text close-btn" @click="close">X</span>
    </div>
    <div class="explorer-wrap">
      <div class="tool-bar">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="create_folder"><i class="el-icon-plus"></i>{{ config.manager.newFolderBtnTitle }}</el-menu-item>
          <el-menu-item index="upload"><i class="el-icon-upload2"></i>{{ config.manager.uploadBtnTitle }}</el-menu-item>
          <el-menu-item index="back"><i class="el-icon-caret-left"></i>{{ config.manager.backToParentBtnTitle }}</el-menu-item>
          <el-menu-item index="delete"><i class="el-icon-delete2"></i>{{ config.manager.deleteBtnTitle }}</el-menu-item>
          <li class="selected-path-wrap">
            <input id="fullPathToBeCopied" class="select-target" v-model="fullPathToBeCopied">
            <button class="cp-to-select-btn" data-clipboard-target="#fullPathToBeCopied">
                <i class="fa fa-clipboard" aria-hidden="true"></i>&nbsp;{{ config.manager.copyPathBtnTitle }}
            </button>
          </li>
        </el-menu>
        <el-row v-show="progressBar.files.length>0" class="progress-bar-wrap">
          <el-col :span="24">
            <ul>
              <li v-for="fileBrief in progressBar.files" v-bind:class="fileBrief.status">
                {{ fileBrief.name }} ({{ fileBrief.size/1000 }}K)
                <i class="el-icon-loading" v-show="fileBrief.inProgress"></i>
                <i class="el-icon-circle-check" v-show="!fileBrief.inProgress" style="color: green"></i>
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row v-show="showCreateFolderForm" class="create-folder-wrap">
          <el-col :span="24">
            <input class="folder-name-input" placeholder="新目录名称" v-model="newFolderName">
            <button class="create-folder-btn" @click="createNewFolderAction">
                <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;确认
            </button>
            <button class="create-folder-btn" @click="showCreateFolderForm=false">
                关闭
            </button>
          </el-col>
        </el-row>
      </div>

      <el-row :gutter="10">
        <el-col :span="6">
          <div class="folders-tree-wrap" id="folders-tree-wrap">
              <h5 class="root-folder-name">{{ config.manager.rootFolderName }}</h5>
              <el-menu default-active="0" class="el-menu-vertical-demo" @select="handleFolderSelect">
                <el-menu-item v-for="(folderName, idx) in foldersTree" :index="'/'+folderName">
                  <i class="fa fa-folder-o" aria-hidden="true"></i>&nbsp;{{ folderName }}
                </el-menu-item>
              </el-menu>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="files-list-wrap" id="files-list-wrap">
            <h4>{{ config.manager.rootFolderName }}{{ getActiveFolderName }}</h4>
            <hr>
            <ul v-if="filesContent.length>0 || foldersContent.length>0" class="un-style no-left-padding">
              <li v-for="(folderName, idx) in foldersContent" class="folder-card" @click="_loadFolderContent('/'+folderName)">
                <i class="fa fa-folder" aria-hidden="true"></i>&nbsp;{{ folderName }}
              </li>
              <li v-for="(data, idx) in filesContent" class="file-card" @click="updateSelectedFile(idx)">
                <i class="fa" :class="calcIconClass(data.ext)" aria-hidden="true"></i>&nbsp;{{ data.name }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="6">
          <h4>{{ config.manager.filePreview }}</h4>
          <hr>
          <image-previewer :src="fullPathToBeCopied"></image-previewer>
        </el-col>
      </el-row>
    </div>
    <file-uploader
      file-input-id="file_upload_input"
      v-on:uploadSuccessEvent="uploadSuccessHandler"
      v-on:uploadFailEvent="uploadFailHandler"
      v-on:uploadStartEvent="uploadStartHandler"
      v-on:uploadDoneEvent="uploadDoneHandler"></file-uploader>
  </div>
</template>

<script src="./MediaManager.js">
</script>
