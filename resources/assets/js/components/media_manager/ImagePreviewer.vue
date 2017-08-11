<template>
  <div class="image-previewer-wrap" id="image-previewer-wrap">
    <div v-if="showPreviewWrap" class="preview">
      <img :src="src" alt="">
    </div>
    <div class="preview" v-else>
      <i :class="previewIcon"></i>
    </div>
    <a v-if="src !== '/Upload/'" class="open-btn" :href="src" target="_blank">查看原文件</a>
  </div>
</template>

<script src="./ImagePreviewer.js">
</script>
