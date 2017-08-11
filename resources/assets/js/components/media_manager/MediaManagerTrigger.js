import { mapActions } from 'vuex';
// 加载配置文件
var config = require("json!./config.json");

export default {
  name: 'MediaManagerTrigger',
  props: {
    title: String   // trigger 按钮上的文字
  },
  data() {
    return {
      buttonTitle: ''  // 按钮上的文字
    };
  },
  created() {
    if(this.title === undefined){
      // 如果没有传递过来按钮的 title, 则使用默认的
      this.buttonTitle = config.trigger.title;
    }else{
      this.buttonTitle = this.title;
    }
  },
  methods: {
    ...mapActions(
      ['toggleMediaManager']
    )
  }
}
