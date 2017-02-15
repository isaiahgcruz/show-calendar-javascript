import styles from '../sass/app.scss';

window.Vue = require('vue');

import App from './components/App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
  template: '<App/>',
  components: {
    App
  }
})