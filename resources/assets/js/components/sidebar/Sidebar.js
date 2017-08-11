import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'currentCategoriesTree'
      ]
    ),
    ownProperty() {
      return 'ownProperty';
    }
  },
  created() {
    this.getCategoriesTree();
  },
  methods: {
    getCategoriesTree: function() {
      // 通过 categories 的 mudule 的 action 去服务器取得数据
      this.$store.dispatch('fetchCategoriesTree');
    },
    handleOpen: function () {

    },
    handleClose: function () {

    }
  }
}
