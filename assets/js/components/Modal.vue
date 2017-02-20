<template>
  <div class="modal" :class="{ 'is-active': isModalToggled }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" v-if="errors">Error</p>
        <p class="modal-card-title" v-else>{{ title }}</p>
        <button class="delete" @click="toggleModal"></button>
      </header>
      <section class="modal-card-body" v-if="errors">
        An error has occurred
      </section>
      <section class="modal-card-body" v-else>
        {{ message }}
      </section>
      <footer class="modal-card-foot" v-if="errors">
        <a class="button" :class="{ 'is-disabled': isLoading }" @click="toggleModal">Close</a>
      </footer>
      <footer class="modal-card-foot" v-else>
        <a class="button is-success" :class="{ 'is-loading': isLoading }" @click="yesModal">Yes</a>
        <a class="button" :class="{ 'is-disabled': isLoading }" @click="toggleModal">No</a>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        isModalToggled: false,
        callback: function() {},
        axiosConfig: false,
        errors: false,
        message: '',
        title: '',
        data: {},
      };
    },

    methods: {
      toggleModal() {
        this.isModalToggled = !this.isModalToggled;
      },

      yesModal(data) {
        this.isLoading = true;
        axios(this.axiosConfig)
          .then((response) => {
            this.isLoading = false;
            this.isModalToggled = false;
            this.callback(data);
          }).catch((response) => {
            this.isLoading = false;
            this.errors = true;
          })
      },
    },

    mounted() {
      this.$nextTick(() => {
        this.$bus.$on('confirmModalOpen', (event) => {
          this.isModalToggled = true;
          this.callback = event.callback;
          this.message = event.message;
          this.title = event.title;
          this.axiosConfig = event.axiosConfig;
          this.data = event.data;
        });
      })
    },
  }
</script>