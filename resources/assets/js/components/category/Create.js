import { mapGetters, mapActions } from 'vuex';
import MediaManagerTrigger from '../media_manager/MediaManagerTrigger.vue';
const CREATE_OK = 100;
const CREATE_FAIL = 99;

export default {
    name: 'CreateCategory',
    components: {
      'media-manager-trigger': MediaManagerTrigger
    },
    data() {
      return {
        category: {
          id: 0,
          Cate_Id: '',
          Cate_Title: '',
          Cate_Key: '',
          Cate_Order: 0,
          Cate_Url: '',
          Cate_Image: '',
          Cate_Intro: '',
          Cate_Lang: '',
          Cate_ParentID: 0,
          Cate_State: '',
          Cate_IsMenu: '',
          Cate_SEOTitle: '',
          Cate_SEOKeyWord: '',
          Cate_SEODescription: '',
          Cate_ExField1: ''
        },
        sectionTitle: '新建栏目',
        Cate_ParentTitle: '',  // 显示上级目录的名字
        parentCategoiesList: []
      };
    },
    computed: {
      ...mapGetters(
        ['currentLanguage','currentCategoriesTree']
      )
    },
    watch: {
      currentCategoriesTree: function (){
        this.loadAll(true);
      }
    },
    methods: {
      loadCreateNewCategoryForm: function(){
        console.log('loadCreateNewCategoryForm');
        this._resetCategoryFormData();
      },
      _resetCategoryFormData: function(){
        this.category.id = 0;
        this.category.Cate_Id = '';
        this.category.Cate_Title = '';
        this.category.Cate_Key = '';
        this.category.Cate_Order = 0;
        this.category.Cate_Url = '';
        this.category.Cate_Image = '';
        this.category.Cate_State = '';
        this.category.Cate_IsMenu = '';
        this.category.Cate_ExField1 = '';
        this.category.Cate_ParentID = 0;
        this.$refs.vueditorComponent.setContent('');
        this.sectionTitle = '新建栏目';
        this.Cate_ParentTitle = '';
      },
      removeCategory: function(id, e){
        // 删除成功
        e.preventDefault();
        this.$confirm('此操作将永久删除该栏目, 该栏目下的所有内容也将被删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(
            '/api/delete_category/' + id
          ).then(res => {
            return res.json();
          }).then(dataInJson => {
            if(dataInJson.error_no === CREATE_OK){
              // 更新目录列表
              this.$store.dispatch('fetchCategoriesTree');
              this.$notify({
                title: '成功',
                message: '栏目已经成功删除!',
                type: 'success'
              });
            }else{
              this.$message.error('删除失败!');
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      editCategory: function(id) {
        // 加载 Category 的内容
        this.$http.get(
          '/api/get_category/' + id
        ).then(res => {
          return res.json();
        }).then(dataInJson => {
          if(dataInJson){
            // 更新本地的 Category
            this.sectionTitle = '编辑栏目: ' + dataInJson.Cate_Title;
            if(dataInJson.Cate_ParentID != 0){
              // 寻找对应的父栏目的名称
              for (var idx in this.parentCategoiesList) {
                if (this.parentCategoiesList.hasOwnProperty(idx)) {
                  if(dataInJson.Cate_ParentID == this.parentCategoiesList[idx].id){
                    this.Cate_ParentTitle = this.parentCategoiesList[idx].value;
                    break;
                  }
                }
              }
            }
            // 更新所有 category 的属性
            this.category.id = dataInJson.id;
            this.category.Cate_Id = dataInJson.Cate_Id;
            this.category.Cate_Title = dataInJson.Cate_Title;
            this.category.Cate_Key = dataInJson.Cate_Key;
            this.category.Cate_Order = dataInJson.Cate_Order;
            this.category.Cate_Url = dataInJson.Cate_Url;
            this.category.Cate_Image = dataInJson.Cate_Image;
            this.category.Cate_State = dataInJson.Cate_State;
            this.category.Cate_IsMenu = dataInJson.Cate_IsMenu;
            this.category.Cate_ExField1 = dataInJson.Cate_ExField1;
            this.category.Cate_ParentID = dataInJson.Cate_ParentID;
            this.$refs.vueditorComponent.setContent(dataInJson.Cate_Intro);
          }
        });
      },
      onSubmit: function () {
        // 当点击立即创建按钮的时候
        this.category.Cate_Intro = this.$refs.vueditorComponent.getContent();
        this.category.Cate_Lang = this.currentLanguage;

        this.$http.post(
          '/api/save_category',
          this.category
        ).then(res => {
          return res.json();
        }).then(dataInJson => {
          if(dataInJson.error_no === CREATE_OK){
            // this.$router.push({name: 'loadArticlesList',params:{id: this.article.News_CateId}});
            this.$store.dispatch('fetchCategoriesTree');
            this.$notify({
              title: '成功',
              message: '栏目已经保存成功',
              type: 'success'
            });
          }
        });
      },
      querySearch: function(queryString, cb) {
        // 输入父级目录时的搜索选线
        var parentCategoiesList = this.loadAll(false);
        var results = queryString ? parentCategoiesList.filter(this.createFilter(queryString)) : parentCategoiesList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (category) => {
          return category.value.includes(queryString);
        };
      },
      handleSelect: function(item) {
        // 选择父级目录时的处理, 把当前选择的元素的 id 作为当前菜单的父目录
        this.category.Cate_ParentID = item.id;
      },
      loadAll: function(forceUpdate) {
        if(this.parentCategoiesList.length === 0 || forceUpdate){
          // 更新本地的栏目列表数组
          this.parentCategoiesList = [];
          for (var firstLevelIndex in this.currentCategoriesTree) {
            if (this.currentCategoriesTree.hasOwnProperty(firstLevelIndex)) {
              let firstLevel = this.currentCategoriesTree[firstLevelIndex];
              let cate = {
                id: firstLevel.data.Cate_Id,
                value: firstLevel.data.Cate_Title,
                isSub: false,
                isSecondSub: false // 是否为第三级目录
              };
              this.parentCategoiesList.push(cate);
              // 第一级目录处理完毕

              if(typeof firstLevel.subs === 'object'){
                for (var secondLevelIndex in firstLevel.subs) {
                  if (firstLevel.subs.hasOwnProperty(secondLevelIndex)) {
                    // 循环处理第二级目录
                    let secondLevel = firstLevel.subs[secondLevelIndex].data;
                    let secondLevelSubs = firstLevel.subs[secondLevelIndex].subs;
                    //console.log(secondLevel);
                    cate = {
                      id: secondLevel.Cate_Id,
                      value: secondLevel.Cate_Title,
                      isSub: true,
                      isSecondSub: false  // 是否为第三级目录
                    };
                    this.parentCategoiesList.push(cate);

                    // 处理第三级目录
                    for (var thirdIndex in secondLevelSubs) {
                      if (secondLevelSubs.hasOwnProperty(thirdIndex)) {
                        cate = {
                          id: secondLevelSubs[thirdIndex].data.Cate_Id,
                          value: secondLevelSubs[thirdIndex].data.Cate_Title,
                          isSub: false,
                          isSecondSub: true  // 是否为第三级目录
                        }
                        this.parentCategoiesList.push(cate);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return this.parentCategoiesList;
      }
    },
    created() {
      if(!this.currentCategoriesTree){
        this.$store.dispatch('fetchCategoriesTree');
      }
      this.parentCategoiesList = this.loadAll(false);
    }
}
