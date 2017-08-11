import Top from '../top/Top.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import MediaManager from '../media_manager/MediaManager.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Dashboard',
  components: {
    'v-top': Top,
    'v-sidebar': Sidebar,
    'media-manager': MediaManager
  },
  created() {

  }
}
