<template>
  <nav class="panel">
    <p class="panel-heading">
      My Shows
    </p>
    <span class="panel-block" v-for="show in shows">
      <div class="column is-paddingless is-11-mobile">
        {{ show.title }}
      </div>
      <div class="column is-paddingless is-1">
        <span class="icon is-small is-pointer" @click="deleteShow(show)">
          <i class="fa fa-remove"></i>
        </span>
      </div>
    </span>
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