export default {
    name: 'Signin',
    data() {
        return {
            loginForm: {
              email: '',
              password: '',
              rememberMe: false
            }
        };
    },
    created: function() {
      // 检查本地是否有 jwt-token 存在
    },
    methods: {
      login(event) {
        event.preventDefault();
        this.$http.post(
          'api/login',
          this.loginForm
        ).then(res => {
          // 登陆成功
          this.$auth.setToken(res.body.token, Date.now() + 1440000);  // Token 的有效时间为4小时
          this.$router.push('/dashboard/articles/101');  // 默认提取 category id 为84的信息页面
        }, res => {
          // Error
          if (res.status == 422) {
            // 验证失败
            // let result = res.body;
            // let errorKeys = Object.keys(result);
            // for (var idx in errorKeys) {
            //   if (errorKeys.hasOwnProperty(idx)) {
            //     this.notify(result[errorKeys[idx]]);
            //     break;
            //   }
            // }
          }
        }).catch(res => {
          console.log('catch');
        });
      },
      notify(obj) {
        for (let idx in obj) {
          if (obj.hasOwnProperty(idx)) {
            this.$notify.error({
              title: '错误',
              message: obj[idx]
            });
          }
        }
      }
    }
}
