import Lockr from 'lockr';
var jwtDecode = require('jwt-decode');

var AuthPlugin = {
  setToken: function (token, expiration) {
    Lockr.set('authToken', token);
    Lockr.set('authTokenExpiration', expiration);
  },
  destroyToken: function () {
    Lockr.rm('authToken');
    Lockr.rm('authTokenExpiration');
  },
  getToken: function () {
    let token = Lockr.get('authToken');
    let expiration = Lockr.get('authTokenExpiration');

    if (!token || !expiration)
      return null;

    if (Date.now() > parseInt(expiration)) {
      this.destroyToken();
      return null;
    } else {
      return token;
    }
  },
  loggedIn: function () {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }
};

export default function (Vue) {
  Vue.auth = AuthPlugin;

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: function () {
        return Vue.auth;
      }
    }
  });
}
