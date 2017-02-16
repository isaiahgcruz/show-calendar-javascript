<template>
  <div>
    <navbar :user="user"></navbar>
    <section class="section">
      <div class="container">
        <div v-if="!user">
            <p class="control is-text-center">
              <a class="button is-large" href="/auth/google">
                <span>Google Login</span>
              </a>
            </p>
        </div>
        <main-view v-else></main-view>
      </div>
    </section>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue';
  import MainView from './Main.vue';

  export default {
    components : {
      Navbar, MainView
    },

    data() {
      return {
        user: false,
      }
    },

    created() {
      axios.get('/api/users/')
        .then((response) => {
          this.user = response.data;
        }).catch((response) => {
          console.log(response);
          this.user = false;
        });
    },
  }
</script>