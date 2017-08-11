<template>
  <div class="file-uploader-wrap" id="file-uploader-wrap">
    <form class="file-uploader-form" action="#" method="post">
      <input type="file" name="files[]" value="" :id="fileInputId" v-on:change="fileChange">
    </form>
  </div>
</template>

<script src="./FileUploader.js">
</script>
