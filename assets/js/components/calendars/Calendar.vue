<template>
  <nav class="panel">
    <p class="panel-heading">
      Google Calendar
    </p>
    <span class="panel-block">
      <p class="control">
        <span class="select is-fullwidth">
          <select v-model="selectedCalendar">
            <option disabled selected>Select a calendar</option>
            <option v-for="calendar in calendars" :value="calendar">
              {{ calendar.summary }}
            </option>
          </select>
        </span>
      </p>
    </span>
    <span class="panel-block">
      <p class="control is-pulled-right">
        <button class="button" :disabled="!canSync" @click="handleSync">
          Sync
        </button>
      </p>
    </span>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        calendars: [],
        selectedCalendar: {},

      };
    },

    computed: {
      canSync() {
        return !_.isEmpty(this.selectedCalendar) && !_.isEmpty(this.$parent.$refs.upcoming.episodes);
      },
    },

    methods: {
      handleSync() {
        this.$bus.$emit('confirmModalOpen', {
          callback: this.deleteShowSuccessful,
          message: `This action will delete all events on ${this.selectedCalendar.summary} and add all the shows' schedules. Proceed?`,
          title: 'Sync Calendar',
          axiosConfig: {
            method: 'post',
            url: `/api/calendars/${this.selectedCalendar.id}`,
            data: this.$parent.$refs.upcoming.episodes,
          },
        });
      },

      syncCalendarSuccessful() {
        this.$bus.$emit('notify', {
          message: 'Calendar synced successfully',
          class: 'is-success',
        });
      },
    },

    mounted() {
      axios.get('/api/calendars/')
        .then(({ data }) => {
          this.calendars = data;
        });
    },
  };
</script>
