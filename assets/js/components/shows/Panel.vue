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
      this.refreshShows();
    },

    mounted() {
      this.$nextTick(() => {
        this.$bus.$on('refreshShows', () => {
          this.refreshShows();
        })
      })
    },

    methods: {
      refreshShows() {
        axios.get('/api/shows')
          .then((response) => {
            this.shows = response.data;
          });
      },

      deleteShow(show) {
        this.$bus.$emit('confirmModalOpen', {
          callback: this.deleteShowSuccessful,
          message: `Are you sure you want to delete ${show.title}?`,
          title: 'Delete Show',
          axiosConfig: {
            method: 'delete',
            url: `/api/shows/${show._id}`,
          },
        })
      },

      deleteShowSuccessful() {
        this.$bus.$emit('notify', {
          message: 'Show removed successfully',
          class: 'is-success',
        });
        this.refreshShows();
      }
    },
  }
</script>