<template>
  <nav class="panel">
    <p class="panel-heading">
      &nbsp;
    </p>
    <div class="panel-block">
      <p class="control">
        <input class="input" type="text" placeholder="Search">
      </p>
    </div>
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
      }
    },

    created() {
      axios.get('/api/shows')
        .then((response) => {
          this.shows = response.data;
        })
    }
  }
</script>