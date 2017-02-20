<template>
  <nav class="panel">
    <p class="panel-heading">
      My Shows
    </p>
    <transition-group v-bind:name="panelTransition">
      <span class="panel-block" v-for="show in shows" v-bind:key="show">
        <div class="column is-paddingless is-11-mobile">
          {{ show.title }}
        </div>
        <div class="column is-paddingless is-1">
          <span class="icon is-small is-pointer" @click="deleteShow(show)">
            <i class="fa fa-remove"></i>
          </span>
        </div>
      </span>
    </transition-group>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        shows: [],
        panelTransition: 'fade',
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
            if (this.shows.length == 0) {
              this.shows = response.data;
            } else {
              this.panelTransition = 'list';
              let diff = []
              if (this.shows.length > response.data.length) {
                diff = _.differenceBy(this.shows, response.data, '_id');
              } else {
                diff = _.differenceBy(response.data, this.shows, '_id');
              }
              const diffIndex = _.findIndex(this.shows, (show) => {
                return show._id == diff[0]._id;
              });
              if (diffIndex >= 0) {
                this.shows.splice(diffIndex, 1);
              } else {
                this.shows.push(diff[0]);
              }
            }
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

      deleteShowSuccessful(show) {
        this.$bus.$emit('notify', {
          message: 'Show removed successfully',
          class: 'is-success',
        });
        this.refreshShows();
        this.$bus.$emit('refreshEpisodes', null);
      }
    },
  }
</script>