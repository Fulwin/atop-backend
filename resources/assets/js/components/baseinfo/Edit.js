import MediaManagerTrigger from '../media_manager/MediaManagerTrigger.vue';
const CREATE_OK = 100;
const CREATE_FAIL = 99;

export default {
  name: 'EditBaseInfo',
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
    this.editBaseInfoForm();
  },
  watch: {
    // call again the method if the route changes
    '$route.params.baseInfoId': 'editBaseInfoForm'
  },
  methods: {
    dateChange (val) {
        this.article.BaseInfo_AddTime = val;
    },
    editBaseInfoForm: function() {
      console.log(this.$route.params.baseInfoId);
      this.$http.get('/api/get_baseinfo/' + this.$route.params.baseInfoId).then(res => {
        return res.json();
      }).then(dataInJson => {
        this.article.id = dataInJson.data.id;
        this.article.BaseInfo_Id = dataInJson.data.BaseInfo_Id;
        this.article.BaseInfo_CateId = dataInJson.data.BaseInfo_CateId;
        this.article.BaseInfo_Title = dataInJson.data.BaseInfo_Title;
        this.article.BaseInfo_Order = dataInJson.data.BaseInfo_Order;
        this.article.BaseInfo_Image = dataInJson.data.BaseInfo_Image;
        this.article.BaseInfo_AddTime = dataInJson.data.BaseInfo_AddTime;
        this.article.BaseInfo_State = dataInJson.data.BaseInfo_State;
        this.$refs.vueditorComponent.setContent(dataInJson.data.BaseInfo_Content);
      });
    },
    onSubmit: function(event) {
      this.article.BaseInfo_Content = this.$refs.vueditorComponent.getContent();
      this.$http.post(
        '/api/save_baseinfo',
        this.article
      ).then(res => {
        return res.json();
      }).then(dataInJson => {
        if(dataInJson.error_no === CREATE_OK){
          this.$router.push({name: 'loadArticlesList',params:{id: this.article.BaseInfo_CateId}});
        }
      });
    }
  }
}
