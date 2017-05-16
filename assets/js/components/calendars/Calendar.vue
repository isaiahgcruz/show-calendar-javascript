<template>
  <nav class="panel">
    <p class="panel-heading">
      Google Calendar
    </p>
    <span class="panel-block">
      <p class="control">
        <span class="select is-fullwidth">
          <select v-model="calendar">
            <option disabled selected>Select a calendar</option>
            <option v-for="calendar in calendars" :value="calendar.id">
              {{ calendar.summary }}
            </option>
          </select>
        </span>
      </p>
    </span>
    <span class="panel-block">
      <p class="control is-pulled-right">
        <button class="button" :disabled="!canSync">
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
        calendar: {},
      };
    },

    computed: {
      canSync() {
        return !_.isEmpty(this.calendar);
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
