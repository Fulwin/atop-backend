import MediaManagerTrigger from '../media_manager/MediaManagerTrigger.vue';
const CREATE_OK = 100;
const CREATE_FAIL = 99;

export default {
  name: 'CreateBaseInfo',
  components: {
    'media-manager-trigger': MediaManagerTrigger
  },
  data() {
    return {
      article: {
        id: 0,
        BaseInfo_Id: 0,
        BaseInfo_CateId: 0,
        BaseInfo_Title: '',
        BaseInfo_Order: 0,
        BaseInfo_Image: '',
        BaseInfo_AddTime: '',
        BaseInfo_State: '',
        BaseInfo_Content: ''
      }
    };
  },
  created(){
    this.article.BaseInfo_CateId = this.$route.params.categoryId;
  },
  watch: {
    // call again the method if the route changes
    '$route': 'createNewBaseInfoForm'
  },
  methods: {
    createNewArticleForm: function() {
      console.log(this.$route.params.categoryId);
    },
    onSubmit: function(event) {
      this.article.BaseInfo_Content = this.$refs.vueditorComponent.getContent();
      this.$http.post(
        '/api/save_baseinfo',
        this.article
      ).then(res => {
        return res.json();
      }).then(dataInJson => {
        console.log(dataInJson);
        if(dataInJson.error_no === CREATE_OK){
          this.$router.push({name: 'loadArticlesList',params:{id: this.article.BaseInfo_CateId}});
        }
      });
    }
  }
}
