<template>
  <nav class="nav">
    <div class="nav-left">
      <a class="nav-item">
        Calendar
      </a>
    </div>

    <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <div class="nav-right nav-menu" v-if="user">
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
  };
</script>