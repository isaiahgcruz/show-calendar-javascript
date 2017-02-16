<template>
  <nav class="nav">
    <div class="nav-left">
      <a class="nav-item">
        Calendar
      </a>
    </div>

    <div class="nav-right" v-if="user">
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