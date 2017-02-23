<template>
  <div class="content">
    <h2>Upcoming Episodes</h2>
    <div v-if="isLoading && groups.length == 0">Loading...</div>
    <transition-group name="fade">
      <div v-for="group in groups" v-if="groups.length" v-bind:key="group" class="content">
        <h5>{{ group.date }}</h5>
        <ul>
          <li v-for="ep in group.episodes">{{ ep }}</li>
        </ul>
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

    computed: {
      groups() {
        const groups = [];
        this.upcomingEpisodes.map((el) => {
          if (groups.length > 0 && groups[groups.length-1]['date'] === moment(el.timestamp).format('MMM Do YYYY')) {
            groups[groups.length-1].episodes.push(el.title);
          } else {
            groups.push({
              date: moment(el.timestamp).format('MMM Do YYYY'),
              episodes: [ el.title ],
            })
          }
        })
        return groups;
      }
    }
  }
</script>