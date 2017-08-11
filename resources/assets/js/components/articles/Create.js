import MediaManagerTrigger from '../media_manager/MediaManagerTrigger.vue';
import { mapGetters } from 'vuex';
import Vueditor from 'vueditor';
const CREATE_OK = 100;
const CREATE_FAIL = 99;

export default {
  name: 'CreateArticle',
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
    this.article.News_CateId = this.$route.params.categoryId;
    this.editor = Vueditor.createEditor(
        '#introEditorWrapper',
        this.getWysiwygEditorOption
    );
  },
  watch: {
    // call again the method if the route changes
    '$route.params.categoryId': 'createNewArticleForm'
  },
  methods: {
    createNewArticleForm: function() {
      console.log(this.$route.params.categoryId);
    },
    onSubmit: function(event) {
      this.article.News_Content =  this.editor.getContent();
      this.$http.post(
        '/api/save_article',
        this.article
      ).then(res => {
        return res.json();
      }).then(dataInJson => {
        if(dataInJson.error_no === CREATE_OK){
          this.$router.push({name: 'loadArticlesList',params:{id: this.article.News_CateId}});
        }
      });
    }
  }
}
