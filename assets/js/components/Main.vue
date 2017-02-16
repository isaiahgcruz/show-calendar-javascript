<template>
  <div class="container">
    <h1 class="title">Home</h1>
    <hr>
    <div class="columns">
      <div class="column is-one-quarter">
        <shows-panel></shows-panel>
      </div>
      <div class="column is-three-quarters">
        <h2 class="title">Episodes</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import ShowsPanel from './shows/Panel.vue';

  export default {
    components: {
      ShowsPanel,
    },
  }
</script>