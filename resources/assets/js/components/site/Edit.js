const SAVE_OK = 100;

export default {
    name: 'EditSite',
    data() {
      return {
        site: {
          title: '',
          keyword: '',
          description: '',
          author: '',
          copyright: '',
          info: '',
          quote_request_handler: ''
        }
      };
    },
    created() {
      this.$http.get(
        '/api/get_site'
      ).then(res => {
        return res.json();
      }).then(dataInJson => {
        this.site.title = dataInJson.title;
        this.site.keyword = dataInJson.keyword;
        this.site.description = dataInJson.description;
        this.site.author = dataInJson.author;
        this.site.copyright = dataInJson.copyright;
        this.site.info = dataInJson.info;
        this.site.quote_request_handler = dataInJson.quote_request_handler;
      });
      // 提醒一下
      this.$notify.info({
          title: '消息',
          message: '您在修改网站设置, 请谨慎操作'
        });
    },
    methods: {
      onSubmit: function() {
        this.$http.post(
          '/api/save_site',
          this.site
        ).then(res => {
          return res.json();
        }).then(dataInJson => {
          if(dataInJson.error_no === SAVE_OK){
            this.$notify({
              title: '成功',
              message: '网站设置已经保存成功',
              type: 'success'
            });
          }else{
            this.$notify.error({
              title: '错误',
              message: '网站设置已经保存错误, 请稍候重试!'
            });
          }
        });
      }
    }
}
