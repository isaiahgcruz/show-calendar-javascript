<template>
  <nav class="panel">
    <p class="panel-heading">
      My Shows
    </p>
    <a class="panel-block is-active" v-for="show in shows">
      {{ show.title }}
    </a>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        shows: false,
      };
    },

    created() {
      axios.get('/api/shows')
        .then((response) => {
          this.shows = response.data;
        })
    },
  }
</script>