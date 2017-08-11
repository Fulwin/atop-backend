import { mapGetters, mapActions } from 'vuex';
const UPLOAD_OK = 100;
const UPLOAD_FAIL = 98;

export default {
  name: 'FileUploader',
  props: {
    fileInputId: String
  },
  data() {
    return {
      succeedFilesIndex: [],
      failedFilesIndex: [],
      maxFileSize: 2000000
    };
  },
  computed: {
    ...mapGetters(
      ['getActiveFolderName']
    )
  },
  methods: {
    ...mapActions(
      ['updateActiveFolderName']
    ),
    fileChange: function(event){
      // 监听当文件被选择之后的操作, 主要是通过 ajax 去提交
      let filesLengthToBeUpdate = event.target.files.length;
      // 准备一个变量, 用来在广播上传开始消息的时候用
      let filesBriefs = [];

      for (let idx in event.target.files) {
        let brief = {};
        let fileToBeUpload = event.target.files[idx];
        if(fileToBeUpload.name && fileToBeUpload.name !== 'item'){
          // 这个检查条件是必须的, 因为会有一些似乎是干扰的元素
          brief.name = fileToBeUpload.name;
          brief.size = fileToBeUpload.size;
          brief.inProgress = true;
          brief.status = '';
          filesBriefs.push(brief);
        }
      };
      // 广播上传文件开始的消息
      this.$emit('uploadStartEvent', filesBriefs);

      this.succeedFilesIndex = [];
      this.failedFilesIndex = [];
      for (let idx in event.target.files) {
        if (event.target.files.hasOwnProperty(idx)) {
          let fileToBeUpload = event.target.files[idx];
          let reader = new FileReader();
          reader.readAsDataURL(fileToBeUpload);
          let data = {};
          data.name = fileToBeUpload.name;
          data.size = fileToBeUpload.size;
          data.type = fileToBeUpload.type;
          data.target_folder = this.getActiveFolderName;
          let that = this;
          reader.onload = function(e) {
            data.blob = e.target.result;
            // 通过 ajax 去提交到服务器
            that._uploadToServerAjax(data);
          }
        }
      }
    },
    _uploadToServerAjax: function (data) {
      // 指向 ajax 提交的真正方法, 文件的真正内容已经在 data.blob 中包含了
      let success = false;
      this.$http.post('/api/upload',data).then(res => {
        return res.json();
      }).then(resultInJson => {
        success = resultInJson.error_no === UPLOAD_OK;
        // 把表示文件是否上传成功的指示数组元素设置好
        if(success) {
          // this.succeedFilesIndex.push(idx);
          this.$emit('uploadSuccessEvent', data.name);
        }else{
          // this.failedFilesIndex.push(idx);
          this.$emit('uploadFailEvent', data.name);
        }
      });
      return success;
    }
  }
}
