import MediaManagerTrigger from '../media_manager/MediaManagerTrigger.vue';
import { mapGetters } from 'vuex';
import Vueditor from 'vueditor';

const CREATE_OK = 100;
const CREATE_FAIL = 99;

export default {
  name: 'EditProduct',
  components: {
    'media-manager-trigger': MediaManagerTrigger
  },
  data() {
    return {
      article: {
        id: 0,
        Products_ID: 0,
        Products_CateID: 0,
        Products_Title: '',
        Products_CodeName: '',
        Products_Order: 0,
        Products_MinImage: '',
        Products_BigImage: '',
        Products_EyeDiagram1: '',
        Products_EyeDiagram2: '',
        Products_EyeDiagram3: '',
        Products_MechanicalSpecification: '',
        Products_recommend: '',
        Products_Feature: '',
        Products_FileIntro: '',
        Products_AddTime: '',
        Products_State: '',
        Products_IsNew: '',
        Products_Introduction: '',
        Products_ExFlag1: '',
        Products_ExFlag2: '',
        Products_ExFlag3: '',
        Products_ExFlag4: '',
        Products_ExFlag5: '',
        Products_ExFlag6: '',
        Products_ExFlag7: '',
        Products_ExFlag8: '',
        Products_ExFlag9: '',
        Products_ExFlag10: '',
        Products_BigImage1: '',
        Products_BigImage2: '',
        Products_BigImage3: '',
        Products_BigImage4: '',
        Products_BigImage5: '',
        Products_BigImage6: '',
        Products_BigImage7: '',
        Products_BigImage8: '',
        Products_BigImage9: '',
        mpo_connector_type: '',
        mpo_fiber_type: '',
        mpo_low_il: '',
        mpo_high_il: '',
        mpo_return_loss: '',
        // wdm_channel_wavelength: '',
        wdm_adjacent_channel_isolation: '',
        wdm_non_adjacent_channel_isolation: '',
        wdm_insertion_loss: ''
      },
       productFeaturesEditor:null,
       productIntroEditor:null
    };
  },
  computed: {
    ...mapGetters([
        'getWysiwygEditorOption'
      ]
    )
  },
  mounted(){
    // 再创建一个 wysiwyg 编辑器
    this.productFeaturesEditor = Vueditor.createEditor(
      '#featuresEditorWrapper',
      this.getWysiwygEditorOption  // 通过 vuex 取来的
    );
    this.productIntroEditor = Vueditor.createEditor(
      '#introEditorWrapper',
      this.getWysiwygEditorOption
    );
    this.editProductForm();
  },
  methods: {
    editProductForm: function() {
      this.$http.get('/api/get_product/' + this.$route.params.productId).then(res => {
        return res.json();
      }).then(dataInJson => {
        this.article.id = dataInJson.data.id;
        this.article.Products_ID = dataInJson.data.Products_ID;
        this.article.Products_CateID = dataInJson.data.Products_CateID;
        this.article.Products_Title = dataInJson.data.Products_Title;
        this.article.Products_CodeName = dataInJson.data.Products_CodeName;
        this.article.Products_MinImage = dataInJson.data.Products_MinImage;
        this.article.Products_Order = dataInJson.data.Products_Order;
        this.article.Products_BigImage = dataInJson.data.Products_BigImage;
        this.article.Products_EyeDiagram1 = dataInJson.data.Products_EyeDiagram1;
        this.article.Products_EyeDiagram2 = dataInJson.data.Products_EyeDiagram2;
        this.article.Products_EyeDiagram3 = dataInJson.data.Products_EyeDiagram3;
        this.article.Products_MechanicalSpecification = dataInJson.data.Products_MechanicalSpecification;
        this.article.Products_FileIntro = dataInJson.data.Products_FileIntro;
        this.article.Products_AddTime = dataInJson.data.Products_AddTime;
        this.article.Products_State = dataInJson.data.Products_State;
        this.article.Products_recommend = dataInJson.data.Products_recommend + '';
        this.article.Products_IsNew = dataInJson.data.Products_IsNew;
        this.article.Products_ExFlag1 = dataInJson.data.Products_ExFlag1;
        this.article.Products_ExFlag2 = dataInJson.data.Products_ExFlag2;
        this.article.Products_ExFlag3 = dataInJson.data.Products_ExFlag3;
        this.article.Products_ExFlag4 = dataInJson.data.Products_ExFlag4;
        this.article.Products_ExFlag5 = dataInJson.data.Products_ExFlag5;
        this.article.Products_ExFlag6 = dataInJson.data.Products_ExFlag6;
        this.article.Products_ExFlag7 = dataInJson.data.Products_ExFlag7;
        this.article.Products_ExFlag8 = dataInJson.data.Products_ExFlag8;
        this.article.Products_ExFlag9 = dataInJson.data.Products_ExFlag9;
        this.article.Products_ExFlag10 = dataInJson.data.Products_ExFlag10;
        this.article.Products_BigImage1 = dataInJson.data.Products_BigImage1;
        this.article.Products_BigImage2 = dataInJson.data.Products_BigImage2;
        this.article.Products_BigImage3 = dataInJson.data.Products_BigImage3;
        this.article.Products_BigImage4 = dataInJson.data.Products_BigImage4;
        this.article.Products_BigImage5 = dataInJson.data.Products_BigImage5;
        this.article.Products_BigImage6 = dataInJson.data.Products_BigImage6;
        this.article.Products_BigImage7 = dataInJson.data.Products_BigImage7;
        this.article.Products_BigImage8 = dataInJson.data.Products_BigImage8;
        this.article.Products_BigImage9 = dataInJson.data.Products_BigImage9;

        this.article.mpo_connector_type = dataInJson.data.mpo_connector_type;
        this.article.mpo_fiber_type = dataInJson.data.mpo_fiber_type;
        this.article.mpo_low_il = dataInJson.data.mpo_low_il;
        this.article.mpo_high_il = dataInJson.data.mpo_high_il;
        this.article.mpo_return_loss = dataInJson.data.mpo_return_loss;
        // this.article.wdm_channel_wavelength = dataInJson.data.wdm_channel_wavelength;
        this.article.wdm_adjacent_channel_isolation = dataInJson.data.wdm_adjacent_channel_isolation;
        this.article.wdm_non_adjacent_channel_isolation = dataInJson.data.wdm_non_adjacent_channel_isolation;
        this.article.wdm_insertion_loss = dataInJson.data.wdm_insertion_loss;

        this.productFeaturesEditor.setContent(dataInJson.data.Products_Feature);
        this.productIntroEditor.setContent(dataInJson.data.Products_Introduction);
      });
    },
    onSubmit: function(event) {
      this.article.Products_Feature = this.productFeaturesEditor.getContent();
      this.article.Products_Introduction = this.productIntroEditor.getContent();
      this.$http.post(
        '/api/save_product',
        this.article
      ).then(res => {
        return res.json();
      }).then(dataInJson => {
        if(dataInJson.error_no === CREATE_OK){
          this.$router.push({name: 'loadArticlesList',params:{id: this.article.Products_CateID}});
        }
      });
    },
    handleFeaturesUpdated: function(val) {
      // 产品的 features 的编辑框内容更新时
      this.article.Products_Feature = val;
    },
    handleIntroductionUpdated: function(val) {
      // 产品的介绍 的编辑框内容更新时
      this.article.Products_Introduction = val;
    }
  }
}
