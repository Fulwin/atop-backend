import { mapGetters, mapActions } from 'vuex';
const ARTICLES_RESULT_OK = 100;
const ARTICLES_NO_RESULT = 99;
export default {
  name: 'ArticlesList',
  data() {
      return {
        articles: [],
        currentCategoryName: '',
        currentCategoryId: '',
        target: '',
        loading: false,
        articlesGroup: [101, 102, 168, 169,199,141, 121, 184], // Company News, Exhibitions
        baseInfoGroup: [92, 93, 96, 97, 98, 99, 103, 135, 137,139, 140, 142, 143, 144, 145, 146, 147, 148, 149,
          166,201,202,203,204,205,213,200,170,211,212,214,215,207,206,
          // 关于我们
          195,138,196,197,198
        ],
        downloadGroup: [
          87,155,         // Solutions 中英
          150,120,183,208 // 技术支持
        ]
      };
  },
  created() {
    // 加载指定的 id 的目录所包含的内容
    this.fetchData();
  },
  computed: {
    ...mapGetters([
      'getCurrentCategoryId'
    ])
  },
  watch: {
    // call again the method if the route changes
    '$route.params.id': 'fetchData'
  },
  methods: {
    ...mapActions([
        'updateCurrentCategoryId'
      ]
    ),
    addNewProductCategory: function() {
      // 添加新目录的监听响应
      console.log(
        'Current category id: ' + this.getCurrentCategoryId
      );
    },
    fetchData: function() {
      this.articles = [];
      this.loading = true;
      // 加载指定的 id 的目录所包含的内容
      this.$http.get('/api/get_articles_by_category/' + this.$route.params.id).then(res => {
        return res.json();
      }).then(dataInJson => {
        if (dataInJson.error_no === ARTICLES_RESULT_OK) {
          this.articles = dataInJson.articles;
          this.currentCategoryName = dataInJson.category.name;
          this.currentCategoryId = dataInJson.category.id;
          this.target = dataInJson.category.target;  // 这次取来的数据的类型, 用于标示是否产品用
          this.loading = false;
          // 加载数据成功之后, 就更新 vuex 中的标示当前正在操作的目录的 id 属性
          this.$store.dispatch('updateCurrentCategoryId', {data: this.$route.params.id});
        }
      });
    },
    addNews: function() {
      if (this.articlesGroup.indexOf(this.getCurrentCategoryId) !== -1){
        // Article
        this.$router.push({name:'CreateArticle', params: {categoryId: this.getCurrentCategoryId}});
      } else if (this.baseInfoGroup.indexOf(this.getCurrentCategoryId) !== -1) {
        // Base Info
        this.$router.push({name:'CreateBaseInfo', params: {categoryId: this.getCurrentCategoryId}});
      } else if (this.downloadGroup.indexOf(this.getCurrentCategoryId) !== -1) {
        // Base Info
        this.$router.push({name:'CreateDownload', params: {categoryId: this.getCurrentCategoryId}});
      } else {
        // Product
        this.$router.push({name:'CreateProduct', params: {categoryId: this.getCurrentCategoryId}});
      };
    },
    handleSelectionChange: function() {

    },
    handleEdit: function(idx, row){
      // 带着 news id 的值跳转
      if (this.articlesGroup.indexOf(this.currentCategoryId) !== -1){
        // Article
        this.$router.push({name:'EditArticle', params: {newsId: row.News_Id}});
      } else if (this.baseInfoGroup.indexOf(this.currentCategoryId) !== -1) {
        // Base Info
        this.$router.push({name:'EditBaseInfo', params: {baseInfoId: row.News_Id}});
      } else if (this.downloadGroup.indexOf(this.currentCategoryId) !== -1) {
        // Base Info
        this.$router.push({name:'EditDownload', params: {downloadId: row.News_Id}});
      } else {
        // Product
        this.$router.push({name:'EditProduct', params: {productId: row.News_Id}});
      };
    },
    handleDelete: function(idx, row) {
      // 删除数据
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let uri = '/api/delete_article/';
        if (this.articlesGroup.indexOf(this.currentCategoryId) !== -1){
          // Article
        } else if (this.baseInfoGroup.indexOf(this.currentCategoryId) !== -1) {
          // Base Info
          uri = '/api/delete_baseinfo/';
        } else if (this.downloadGroup.indexOf(this.currentCategoryId) !== -1) {
          // Download
          uri = '/api/delete_download/';
        } else {
          // Product
          uri = '/api/delete_product/';
        };
        this.$http.get(uri + row.News_Id).then(res => {
          return res.json();
        }).then(dataInJson => {
          if(dataInJson.error_no === ARTICLES_RESULT_OK){
            this.articles.splice(idx, 1);
            this.$message({
              message: '数据已经成功删除!',
              type: 'success'
            });
          } else {
            this.$message({
              message: '删除数据失败, 请稍候再试!',
              type: 'error'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
