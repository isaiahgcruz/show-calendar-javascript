import styles from '../sass/app.scss';

window.Vue = require('vue');

window.axios = require('axios');

window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
};

import App from './components/App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
  template: '<App/>',
  components: {
    App
  }
})