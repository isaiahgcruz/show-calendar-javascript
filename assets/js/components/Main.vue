<template>
  <div class="container">
    <notification></notification>

    <h1 class="title">Home</h1>
    <hr>
    <div class="columns">
      <div class="column is-one-quarter">
        <shows-panel></shows-panel>
        <hr>
        <add-show></add-show>
        <hr>
        <calendar></calendar>
      </div>
      <div class="column is-three-quarters">
        <upcoming ref="upcoming"></upcoming>
      </div>
    </div>
  </div>
</template>

<script>
  import ShowsPanel from './shows/Panel.vue';
  import AddShow from './shows/AddShow.vue';
  import Notification from './Notification.vue';
  import Upcoming from './episodes/Upcoming.vue';
  import Calendar from './calendars/Calendar.vue';

  export default {
    components: {
      ShowsPanel,
      AddShow,
      Notification,
      Upcoming,
      Calendar,
    },
  };
</script>
