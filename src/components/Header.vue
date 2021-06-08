<template>
  <div class="header">
    <img
      src="https://compareplanodesaude.com.br/wp-content/uploads/2020/07/omint-logotipo.jpg"
      alt="omint logo"
    />

    <div v-on:click="handleLogOut" style="position: absolute; right: 20px; cursor: pointer;">
      <log-out-icon size="1.6x" color="white"></log-out-icon>
    </div>
  </div>
</template>

<script>

import { LogOutIcon } from 'vue-feather-icons'

export default {
  name: "Header",

  components: {
    LogOutIcon
  },

  methods: {
    handleLogOut() {
      this.$router.replace({path: '/'})
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background: #05286A;
  width: 100%;
}

.header img {
  padding-top: 40px;
  width: 10%;
  max-width: 100px;
}
</style>
