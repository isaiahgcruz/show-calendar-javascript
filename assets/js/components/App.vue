<template>
  <div>
    <navbar></navbar>
    <div class="container">

    </div>
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

    ready() {

    },
  }
</script>