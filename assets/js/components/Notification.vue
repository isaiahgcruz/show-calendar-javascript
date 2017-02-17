<template>
  <div v-bind:class="['notification', className ]" v-if="showNotification">
    <button class="delete" @click="showNotification = false"></button>
    {{ message }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
        className: '',
        showNotification: false,
      };
    },

    mounted() {
      this.$nextTick(() => {
        this.$bus.$on('notify', (event) => {
          if (!event.error) {
            this.message = event.message;
            this.className = event.class;
          } else {
            this.message = 'An error occurred';
            this.className = 'is-danger';
          }
          this.showNotification = true;
        });
      })
    },
  }
</script>