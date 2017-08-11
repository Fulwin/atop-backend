export default {
  name: 'ImagePreviewer',
  props: {
    src: String
  },
  data() {
    return {
      imageFileExt: ['.jpg','.png','.JPG','.gif','.jpeg','.JPEG'],
      pdfFileExt: ['.pdf','.PDF'],
      wordFileExt: ['.doc','.docx'],
      excelFileExt: ['.xls'],
      powerPointFileExt: ['.ppt','.pptx'],
      videoFileExt: ['.mov','.avi','.mp4','.flv'],
      audioFileExt: ['.mp3'],
      showPreviewWrap: false,
      previewIcon: ''
    };
  },
  watch: {
    src: function(fileUrl) {
      let result = '';
      let isImage = false;
      for (let idx in this.imageFileExt) {
        let fileExtString = this.imageFileExt[idx];
        if (this.src.includes(fileExtString)) {
          isImage = true;
          result = this.src;
          this.showPreviewWrap = true;
          console.log('Image');
          break;
        }
      }
      if (!isImage) {
        // 不是图片文件
        for (let idx in this.pdfFileExt) {
          let fileExtString = this.pdfFileExt[idx];
          if (this.src.includes(fileExtString)) {
            this.previewIcon = 'fa fa-file-pdf-o fa-5x';
            this.showPreviewWrap = false;
            console.log('pdf');
            break;
          }
        }
        for (let idx in this.wordFileExt) {
          let fileExtString = this.wordFileExt[idx];
          if (this.src.includes(fileExtString)) {
            this.previewIcon = 'fa-file-word-o fa-5x';
            this.showPreviewWrap = false;
            console.log('world');
            break;
          }
        }
        for (let idx in this.excelFileExt) {
          let fileExtString = this.excelFileExt[idx];
          if (this.src.includes(fileExtString)) {
            this.previewIcon = 'fa fa-file-excel-o fa-5x';
            this.showPreviewWrap = false;
            break;
          }
        }
        for (let idx in this.powerPointFileExt) {
          let fileExtString = this.powerPointFileExt[idx];
          if (this.src.includes(fileExtString)) {
            this.previewIcon = 'fa fa-file-powerpoint-o fa-5x';
            this.showPreviewWrap = false;
            break;
          }
        }
        for (let idx in this.videoFileExt) {
          let fileExtString = this.videoFileExt[idx];
          if (this.src.includes(fileExtString)) {
            this.previewIcon = 'fa fa-file-video-o fa-5x';
            this.showPreviewWrap = false;
            break;
          }
        }
        for (let idx in this.audioFileExt) {
          let fileExtString = this.audioFileExt[idx];
          if (this.src.includes(fileExtString)) {
            this.previewIcon = 'fa fa-file-audio-o fa-5x';
            this.showPreviewWrap = false;
            break;
          }
        }
      }
      return result;
    }
  }
}
