<template>
  <div class="header">
    <img
      src="https://compareplanodesaude.com.br/wp-content/uploads/2020/07/omint-logotipo.jpg"
      alt="omint logo"
    />
  </div>
</template>

<script>
export default {
  name: "Header",
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
