<template>
  <div class="content">
    <h2>Upcoming Episodes</h2>
    <div v-if="isLoading && upcomingEpisodes.length == 0">Loading...</div>
    <transition-group name="fade">
      <div v-for="ep in upcomingEpisodes" v-if="upcomingEpisodes.length" v-bind:key="ep">
        {{ ep.title }}
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        episodes: [],
        upcomingEpisodes: [],
        isLoading: false
      }
    },

    created() {
      this.refreshEpisodes();
    },

    mounted() {
      this.$nextTick(() => {
        this.$bus.$on('refreshEpisodes', () => {
          this.refreshEpisodes();
        })
      })
    },

    methods: {
      refreshEpisodes() {
        this.isLoading = true;
        axios.get('/api/episodes')
          .then((response) => {
            this.episodes = response.data;
            this.getUpcomingEpisodes();
            this.isLoading = false;
          }).catch((response) => {
            this.$bus.$emit('notify', {
              error: true,
            });
            this.isLoading = false;
          })
      },

      getUpcomingEpisodes() {
        const tsToday = Math.floor(new Date().getTime()/1000);
        this.upcomingEpisodes = this.episodes.filter((el) => {
          if (Math.floor(new Date(el.timestamp).getTime()/1000) >= tsToday) {
            return el;
          }
        }).sort((a, b) => {
          return Math.floor(new Date(a.timestamp).getTime()/1000) - Math.floor(new Date(b.timestamp).getTime()/1000);
        })
      }
    },
  }
</script>