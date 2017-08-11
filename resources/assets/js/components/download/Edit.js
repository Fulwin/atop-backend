import MediaManagerTrigger from '../media_manager/MediaManagerTrigger.vue';
const CREATE_OK = 100;
const CREATE_FAIL = 99;
import { mapGetters } from 'vuex';
import Vueditor from 'vueditor';

export default {
  name: 'EditDownload',
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
        excerpt: '',
        related_category_name:''
      },
      relatedCategories: [],  // 和解决方案关联的产品目录列表
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
    this.editDownloadForm();
  },
  methods: {
    editDownloadForm: function() {
      this.$http.get('/api/get_download/' + this.$route.params.downloadId).then(res => {
        return res.json();
      }).then(dataInJson => {
        this.article.id = dataInJson.data.id;
        this.article.Down_ID = dataInJson.data.Down_ID;
        this.article.Down_CateID = dataInJson.data.Down_CateID;
        this.article.Down_Title = dataInJson.data.Down_Title;
        this.article.Down_TagTitle = dataInJson.data.Down_TagTitle;
        this.article.Down_TagSummary = dataInJson.data.Down_TagSummary;
        this.article.Down_Order = dataInJson.data.Down_Order;
        this.article.Down_FileSize = dataInJson.data.Down_FileSize;
        this.article.Down_FileType = dataInJson.data.Down_FileType;
        this.article.Down_Image = dataInJson.data.Down_Image;
        this.article.Down_LocalPath = dataInJson.data.Down_LocalPath;
        this.article.Down_OtherPath = dataInJson.data.Down_OtherPath;
        this.article.Down_State = dataInJson.data.Down_State;
        this.article.Down_SEOTitle = dataInJson.data.Down_SEOTitle;
        this.article.Down_SEOKeyWord = dataInJson.data.Down_SEOKeyWord;
        this.article.Down_SEODescription = dataInJson.data.Down_SEODescription;
        this.article.Down_AddTime = dataInJson.data.Down_AddTime;
        this.article.Down_ExFlag1 = dataInJson.data.Down_ExFlag1;
        this.article.Down_ExFlag2 = dataInJson.data.Down_ExFlag2;
        this.article.Down_ExFlag3 = dataInJson.data.Down_ExFlag3;
        this.article.Down_ExFlag4 = dataInJson.data.Down_ExFlag4;
        this.article.Down_ExFlag5 = dataInJson.data.Down_ExFlag5;
        this.article.Down_ExFlag6 = dataInJson.data.Down_ExFlag6;
        this.article.Down_ExFlag7 = dataInJson.data.Down_ExFlag7;
        this.article.Down_ExFlag8 = dataInJson.data.Down_ExFlag8;
        this.article.Down_ExFlag9 = dataInJson.data.Down_ExFlag9;
        this.article.Down_ExFlag10 = dataInJson.data.Down_ExFlag10;
        this.article.excerpt = dataInJson.data.excerpt;
        if(dataInJson.data.related_category_name.length>0){
          this.article.related_category_name = parseInt(dataInJson.data.related_category_name);
        }

        this.relatedCategories = dataInJson.cats;
        this.editor.setContent(dataInJson.data.Down_Content);
        // this.$refs.vueditorComponent.setContent(dataInJson.data.Down_Content);
      });
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
        }
      });
    }
  }
}
