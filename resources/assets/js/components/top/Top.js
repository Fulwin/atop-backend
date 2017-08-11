import { mapGetters, mapActions } from 'vuex';
import MediaManagerTrigger from '../media_manager/MediaManagerTrigger.vue';

export default {
  name: 'Top',
  data() {
    return {};
  },
  components: {
    'media-manager-trigger': MediaManagerTrigger
  },
  computed: {
    ...mapGetters([
        'username',
        'currentLanguage',
        'isLoggedIn'
      ]
    )
  },
  created() {
    if (this.$store.dispatch('checkLoggedInStatus')) {
      // 取得当前登陆用户的基本信息
      this.fetchUser();
    } else {
      this.destroyTokenAndRedirectToLoginPage();
    }
  },
  methods: {
    ...mapActions([
        'updateUsername',
        'checkLoggedInStatus',
        'switchLanguage'
      ]
    ),
    destroyTokenAndRedirectToLoginPage() {
      this.$auth.destroyToken();
      this.$router.push('/');
    },
    handleSelect(key, keyPath) {
      // 主菜单的点击处理
      switch (keyPath[0]) {
        case 'logout':
          this.destroyTokenAndRedirectToLoginPage();
          break;
        case 'switch':
          // Key Path 表示子菜单的 index 的值, 即 cn 或 en
          this.$store.dispatch('switchLanguage',{lang: key});
          this.$store.dispatch('fetchCategoriesTree');
          break;
        default:
      };

      switch (key) {
        case 'categories':
          this.$router.push({name:'CreateCategory'});
          break;
        case 'basic_settings':
          this.$router.push({name:'EditSite'});
          break;
        default:
      };
    },
    fetchUser() {
      // 这个方法是用来获取当前登陆用户信息的, 不过通过的方式是在 header 中的 jwt 来完成的
      this.$store.dispatch('fetchUser');
    }
  }
}
