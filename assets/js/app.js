import styles from '../sass/app.scss';

window.Vue = require('vue');

window.axios = require('axios');

window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
};

import App from './components/App.vue';

const bus = new Vue();
Vue.prototype.$bus = bus;

const app = new Vue({
  render: h => h(App),
  template: '<App/>',
  components: {
    App
  },
}).$mount('#app');