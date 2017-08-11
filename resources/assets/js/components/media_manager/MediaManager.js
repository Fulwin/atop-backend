// 加载配置文件
var config = require("json!./config_cn.json");

import Ps from 'perfect-scrollbar';
import Clipboard from 'clipboard';
import ImagePreviewer from './ImagePreviewer.vue';
import FileUploader from './FileUploader.vue';
import { mapGetters, mapActions } from 'vuex';

const MEDIA_RESULT_OK = 100;
const MEDIA_RESULT_FAIL = 98;

export default {
  name: 'MediaManager',
  components:{
    'image-previewer': ImagePreviewer,
    'file-uploader': FileUploader,
  },
  props: {
    rootFolderPrefix: String
  },
  data() {
    return {
      filesContent: [],    // 当前目录所包含的文件
      foldersContent: [],  // 当前目录所包含的子目录
      selectedFilePath: '',// 当前被选中的文件的全路径
      clipboard: null,
      // 上传文件的指示框
      progressBar: {
        files: []
      },
      // 新建目录的部分
      newFolderName: '',
      showCreateFolderForm: false,
      // 配置信息
      config: {}
    };
  },
  mounted() {
    let foldersContainer = document.getElementById('folders-tree-wrap');
    let filesContainer = document.getElementById('files-list-wrap');
    // 滚动的显示区域为: 减去 banner,底部和其余的64像素空间
    // let theHeight = window.innerHeight - 224 - 40 - 50;
    // listContainer.setAttribute('style', 'height:' + theHeight + 'px');
    Ps.initialize(foldersContainer);
    Ps.initialize(filesContainer);
  },
  created() {
    this._loadFolders(true); // 加载左侧的目录列表
    this._loadFolderContent();  // 加载根目录的内容
    // 初始化一键拷贝功能
    this.clipboard = new Clipboard('.cp-to-select-btn');
    var that = this;
    this.clipboard.on('success', function(e){
      that.$message('拷贝成功');
      that.close();
    });

    // 加载配置文件
    this.config = config;
  },
  computed: {
    ...mapGetters(
      ['showMediaManager','foldersTree','getActiveFolderName']
    ),
    fullPathToBeCopied: function() {
      if (this.rootFolderPrefix){
        // 如果指定了前缀, 则使用模板传来的前缀即可
        return '/' + this.rootFolderPrefix + '/' + this.selectedFilePath;
      }else{
        // 从配置文件中取得根目录所需要的前缀, 比如 Upload
        return '/' + this.config.manager.rootFolderPrefix + '/' + this.selectedFilePath;
      }
    }
  },
  methods: {
    ...mapActions([
        'toggleMediaManager','updateFoldersTree','updateActiveFolderName'
      ]
    ),
    _loadFolders: function(force) {
      // force 参数表示强制重新加载
      if(this.foldersTree.length === 0 || force){
        this.$http.post(
          '/api/load_uploads_folder_content',
          {path: ''}
        ).then(res => {
          return res.json();
        }).then(dataInJson => {
          if(dataInJson.error_no === MEDIA_RESULT_OK){
            this.$store.dispatch('updateFoldersTree',{data: dataInJson.data});
          }
        });
      }
    },
    _loadFolderContent: function(folderName) {
      // 负责处理在中间的目录的点击事件函数, 加载指定的 folderName, 如果没有指定, 则加载根目录的内容
      // 1: 先通知 vuex 来更新当前被选择的目录的名字
      if(!folderName){
        folderName = '/';
      }
      // console.log('加载目录内容: ' + folderName);
      // 因为点击了目录的链接并加载了目录内容, 所以当前被选择的文件就应该被刷新为空了
      this.selectedFilePath = '';
      // 更新当前被选择的目录的 state
      this.$store.dispatch('updateActiveFolderName',{name: folderName});

      // 2: 从服务器加载内容
      this.$http.post(
        '/api/load_uploads_folder_content',
        {path: folderName}
      ).then(res => {
        return res.json();
      }).then(dataInJson => {
        if(dataInJson.error_no === MEDIA_RESULT_OK){
          this.filesContent = dataInJson.data.files;
          this.foldersContent = dataInJson.data.folders;
        }
      });
    },
    _goBack: function() {
      // 专门执行返回上级目录的方法
      let arr = this.getActiveFolderName.split('/');
      arr.pop();
      let parent = arr.join('/');
      this._loadFolderContent(parent);
      // if(arr.length>0){
      //   let parent = arr.join('/');
      //   this._loadFolderContent(parent);
      // }else{
      //   this.$message('您已经在根目录了');
      //   this._loadFolders(true);
      // }
    },
    handleSelect: function(key, keyPath) {
      // 负责处理顶部工具栏的项目的点击处理函数
      if (key === 'upload'){
        let fileInput = document.getElementById('file_upload_input');
        fileInput.click();
      } else if (key === 'create_folder') {
        this.showCreateFolderForm = true;
      } else if (key === 'back') {
        if(this.getActiveFolderName.length > 0){
          // 返回上级目录的操作
          this._goBack();
        }else{

        }
      } else if (key === 'delete') {
        // 删除操作
        let target = null;
        let msg = null;
        if(this.selectedFilePath.trim().length === 0){
          this.$message({
            type: 'info',
            message: '您没有删除目录的权限'
          });
          return;
          // 表示要删除一个目录, 因为点击目录的时候, 当前选择的文件路径值被清空了
          target = this.getActiveFolderName;
          msg = '此操作将永久删除整个目录 "' + target + '" 及其全部子目录和文件, 是否继续?';
        }else{
          // 表示要删除一个文件
          target = this.selectedFilePath.trim();
          msg = '此操作将永久删除文件 "' + target + '" , 是否继续?';
        }

        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确定删除
          this.$http.post('/api/delete_file',{path: target}).then(res => {
            return res.json();
          }).then(dataInJson => {
            if(dataInJson.error_no === MEDIA_RESULT_OK){
              if(dataInJson.isFolder){
                // 表示删除的是目录, 因此返回上一级目录
                this._goBack();
                this._loadFolders(true);
              }else{
                this._loadFolderContent(this.getActiveFolderName);
              }
              // 显示成功消息
              this.$message({
                message: '删除成功!',
                type: 'success'
              });
            } else {
              this.$message.error('错误: ' + dataInJson.msg);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    createNewFolderAction: function(){
      // 创建新菜单的方法
      if(this.newFolderName.trim().length > 0){
        this.$http.post(
          '/api/create_new_folder',
          {name: this.newFolderName.trim(), base: this.getActiveFolderName}
        ).then(res => {
          return res.json();
        }).then(dataInJson => {
          if(dataInJson.error_no === MEDIA_RESULT_OK){
            this.$message({
              message: '创建成功!',
              type: 'success'
            });
            this.showCreateFolderForm = false;
            // 刷新一下左侧的目录树
            this._loadFolders(true);
            // 以新建目录作为当前目录
            this._loadFolderContent(this.newFolderName);
            this.newFolderName = '';
          }else{
            this.$message.error('创建失败,  原因: ' + dataInJson.msg);
          }
        });
      }else{
        this.showCreateFolderForm = false;
      }
    },
    handleFolderSelect: function(key, keyPath){
      // 负责处理侧栏的第一级目录的点击处理
      this._loadFolderContent(key);
    },
    calcIconClass: function(ext) {
      let result = 'fa-file-o';
      switch (ext) {
        case 'pdf':
          result = 'fa-file-pdf-o txt-red';
          break;
        case 'jpg':
          result = 'fa-file-image-o';
          break;
        case 'png':
          result = 'fa-file-image-o';
          break;
        case 'gif':
          result = 'fa-file-image-o';
          break;
        case 'jpeg':
          result = 'fa-file-image-o';
          break;
        case 'docx':
          result = 'fa-file-word-o';
          break;
        case 'doc':
          result = 'fa-file-word-o';
          break;
        case 'xls':
          result = 'fa-file-excel-o';
          break;
        default:

      }
      return result;
    },
    uploadSuccessHandler: function(fileName) {
      // 当一个文件上传成功时候的响应
      for (var index in this.progressBar.files) {
        if (this.progressBar.files.hasOwnProperty(index) && this.progressBar.files[index].name === fileName) {
          this.progressBar.files[index].inProgress = false;
          this.$message({
            message: '上传成功!',
            type: 'success'
          });
          this._loadFolderContent(this.getActiveFolderName);
          break;
        }
      }
      // 1秒之后把列表清空
      let that = this;
      window.setTimeout(function(){
        that.progressBar.files = [];
      },1000)
    },
    uploadFailHandler: function(fileName) {
      // 当一个文件失败成功时候的响应
      for (var index in this.progressBar.files) {
        if (this.progressBar.files.hasOwnProperty(index) && this.progressBar.files[index].name === fileName) {
          this.progressBar.files[index].status = 'error';  // 把选定的文件名字变成红色
          this.$message.error('上传失败, 文件类型不支持');
          break;
        }
      }

      // 2秒之后把列表清空
      let that = this;
      window.setTimeout(function(){
        that.progressBar.files = [];
      },2000)
    },
    uploadStartHandler: function(fileList) {
      // 当文件上传开始时候的响应
      this.progressBar.files = fileList;
    },
    uploadDoneHandler: function() {
      // 当文件上传结束时候的响应
    },
    updateSelectedFile: function(idx){
      this.selectedFilePath = this.filesContent[idx].full_path;
    },
    close: function() {
      this.$store.dispatch('toggleMediaManager');
    }
  }
};
