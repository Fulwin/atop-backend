import MediaManagerTrigger from '../media_manager/MediaManagerTrigger.vue';
import { mapGetters } from 'vuex';
import Vueditor from 'vueditor';
const CREATE_OK = 100;
const CREATE_FAIL = 99;

export default {
  name: 'EditArticle',
  components: {
    'media-manager-trigger': MediaManagerTrigger
  },
  data() {
    return {
      article: {
        id: 0,
        News_Id: 0,
        News_CateId: 0,
        News_Title: '',
        News_Order: 0,
        News_Image: '',
        News_Video: '',
        News_AddTime: '',
        News_State: '',
        News_IsIndex: '', // 首页推荐默认为 no
        News_Content: '',
        excerpt: ''
      },
      editor: null
    };
  },
  computed: {
    ...mapGetters([
          'getWysiwygEditorOption'
        ]
    )
  },
  mounted(){
    this.editor = Vueditor.createEditor(
        '#introEditorWrapper',
        this.getWysiwygEditorOption
    );
    this.editArticleForm();
  },
  watch: {
    // call again the method if the route changes
    '$route.params.newsId': 'editArticleForm'
  },
  methods: {
    editArticleForm: function() {
      this.$http.get('/api/get_article/' + this.$route.params.newsId).then(res => {
        return res.json();
      }).then(dataInJson => {
        this.article.id = dataInJson.data.id;
        this.article.News_Id = dataInJson.data.News_Id;
        this.article.News_CateId = dataInJson.data.News_CateId;
        this.article.News_Title = dataInJson.data.News_Title;
        this.article.News_Order = dataInJson.data.News_Order;
        this.article.News_Image = dataInJson.data.News_Image;
        this.article.News_Video = dataInJson.data.News_Video;
        this.article.News_AddTime = dataInJson.data.News_AddTime;
        this.article.News_State = dataInJson.data.News_State;
        this.article.News_IsIndex = dataInJson.data.News_IsIndex;
        this.article.excerpt = dataInJson.data.excerpt;
        this.editor.setContent(dataInJson.data.News_Content);
      });
    },
    onSubmit: function(event) {
      this.article.News_Content = this.editor.getContent();
      this.$http.post(
        '/api/save_article',
        this.article
      ).then(res => {
        return res.json();
      }).then(dataInJson => {
        console.log(dataInJson);
        if(dataInJson.error_no === CREATE_OK){
          this.$router.push({name: 'loadArticlesList',params:{id: this.article.News_CateId}});
        }
      });
    },
    dateChange: function(val){
      this.article.News_AddTime = val;
    }
  }
}
