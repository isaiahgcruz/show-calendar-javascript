<template>
  <div class="container">
    <navbar :user="user"></navbar>
    <modal></modal>
    <section class="section">
      <div class="container">
        <div v-if="!user">
            <p class="control is-text-center">
              <a class="button is-large" href="/auth/google">
                <span class="icon">
                  <i class="fa fa-google"></i>
                </span>
                <span>Google Login</span>
              </a>
            </p>
        </div>
        <main-view v-if="user._id"></main-view>
      </div>
    </section>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue';
  import MainView from './Main.vue';
  import Modal from './Modal.vue';

  export default {
    components : {
      Navbar, MainView, Modal,
    },

    data() {
      return {
        user: {},
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