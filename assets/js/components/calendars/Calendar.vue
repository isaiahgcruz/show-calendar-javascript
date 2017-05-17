<template>
  <nav class="panel">
    <p class="panel-heading">
      Google Calendar
    </p>
    <span class="panel-block">
      <p class="control">
        <input type="text" class="input" placeholder="Calendar Name" v-model="calendar">
      </p>
    </span>
    <span class="panel-block">
      <p class="control is-pulled-right">
        <button class="button" :disabled="!canCreate" @click="handleCreateCalendar">
          Create
        </button>
      </p>
    </span>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        calendar: '',
      };
    },

    computed: {
      canCreate() {
        return !_.isEmpty(this.calendar);
      },
    },

    methods: {
      handleCreateCalendar() {
        this.$bus.$emit('confirmModalOpen', {
          callback: this.createCalendarSuccessful,
          message: `This action will create a calendar named ${this.calendar} to your Google Calendar. Proceed?`,
          title: 'Create Calendar',
          axiosConfig: {
            method: 'post',
            url: '/api/calendars/',
            data: {
              calendar: this.calendar,
              episodes: this.$parent.$refs.upcoming.episodes,
            },
          },
        });
      },

      createCalendarSuccessful() {
        this.$bus.$emit('notify', {
          message: 'Calendar created successfully',
          class: 'is-success',
        });
      },
    },
  };
</script>
