import MediaManagerTrigger from '../media_manager/MediaManagerTrigger.vue';
const CREATE_OK = 100;
const CREATE_FAIL = 99;
import { mapGetters } from 'vuex';
import Vueditor from 'vueditor';

export default {
  name: 'CreateDownload',
  components: {
    'media-manager-trigger': MediaManagerTrigger
  },
  data() {
    return {
      article: {
        id: 0,
        Down_ID: 0,
        Down_AddTime: '',
        Down_CateID: 0,
        Down_Content: 0,
        Down_Title: '',
        Down_TagTitle: '',
        Down_TagSummary: '',
        Down_Order: 0,
        Down_FileSize: '',
        Down_FileType: '',
        Down_Image: '',
        Down_LocalPath: '',
        Down_OtherPath: '',
        Down_State: '',
        Down_SEOTitle: '',
        Down_SEOKeyWord: '',
        Down_SEODescription: '',
        Down_ExFlag1: '',
        Down_ExFlag2: '',
        Down_ExFlag3: '',
        Down_ExFlag4: '',
        Down_ExFlag5: '',
        Down_ExFlag6: '',
        Down_ExFlag7: '',
        Down_ExFlag8: '',
        Down_ExFlag9: '',
        Down_ExFlag10: '',
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
    this.createProductForm();
    this.editor = Vueditor.createEditor(
        '#introEditorWrapper',
        this.getWysiwygEditorOption
    );
  },
  methods: {
    createProductForm: function() {
      console.log('正创建产品的目录 id 是: ' +this.$route.params.categoryId);
      this.article.Down_CateID = this.$route.params.categoryId;
    },
    onSubmit: function(event) {
      this.article.Down_Content = this.editor.getContent();
      this.$http.post(
        '/api/save_download',
        this.article
      ).then(res => {
        return res.json();
      }).then(dataInJson => {
        if(dataInJson.error_no === CREATE_OK){
          this.$router.push({name: 'loadArticlesList',params:{id: this.article.Down_CateID}});
          this._resetForm();
        }
      });
    },
    _resetForm: function() {

    },
    dateChange: function(val) {
      console.log(val);
      this.article.Down_AddTime = val;
    }
  }
}
