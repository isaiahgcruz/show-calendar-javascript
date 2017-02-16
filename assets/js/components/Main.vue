<template>
  <div class="container">
    <h1 class="title">Home</h1>
    <hr>
    <div class="columns">
      <div class="column is-one-quarter">
        <shows-panel></shows-panel>
        <hr>
        <add-show></add-show>
      </div>
      <div class="column is-three-quarters">
        <h2 class="title">Episodes</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import ShowsPanel from './shows/Panel.vue';
  import AddShow from './shows/AddShow.vue';

  export default {
    components: {
      ShowsPanel, AddShow,
    },
  }
</script>