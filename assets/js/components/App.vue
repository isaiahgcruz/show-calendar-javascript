<template>
  <div>
    <navbar></navbar>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue';

  export default {
    components : {
      Navbar,
    },
    ready() {
      alert.log('READY!');
    },
  }
</script>