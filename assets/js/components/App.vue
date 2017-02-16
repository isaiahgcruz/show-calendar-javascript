<template>
  <div>
    <navbar></navbar>
    <section class="section">
      <div class="container">
        <div v-if="!user">
            <p class="control">
              <center>
                <a class="button is-large" href="/auth/google">
                  <span>Google Login</span>
                </a>
              </center>
            </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue';

  export default {
    components : {
      Navbar,
    },

    data() {
      return {
        user: false,
      }
    },

    created() {
      axios.get('/users/')
        .then((response) => {
          this.user = response.data;
        }).catch((response) => {
          console.log(response);
          this.user = false;
        });
    },
  }
</script>