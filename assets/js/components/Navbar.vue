<template>
  <nav class="nav">
    <div class="nav-left">
      <a class="nav-item is-brand">
        <span class="icon">
          <i class="fa fa-calendar"></i>
        </span> &nbsp;
        Calendar
      </a>
    </div>

    <span class="nav-toggle" @click="toggle" :class="{ 'is-active': isToggled }" v-if="user">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <div class="nav-right nav-menu" v-if="user" :class="{ 'is-active': isToggled }">
      <span class="nav-item"> {{ user.name }} </span>
      <a href="/auth/logout" class="nav-item">
        Logout
      </a>
    </div>
  </nav>
</template>

<script>
  export default {
    props: {
      user: {
        required: true,
      },
    },

    data() {
      return {
        isToggled: false,
      };
    },

    methods: {
      toggle() {
        this.isToggled = !this.isToggled;
      }
    }
  };
</script>