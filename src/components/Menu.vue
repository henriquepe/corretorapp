<template>

  <div class="container">
    <router-link class="icon-container" to="/corretor">
      <home-icon size="2x"/>
      <p>Home</p>
    </router-link>
    <!-- <router-link class="icon-container" to="/simulate">
      <graph-icon size="2x"/>
      <p>Simulações</p>
    </router-link> -->
    <router-link class="icon-container" to="/quotations">
      <quotation-icon size="2x"/>
      <p>Cotações</p>
    </router-link>
    <router-link class="icon-container" to="/proposes">
      <propose-icon size="2x"/>
      <p>Propostas</p>
    </router-link>
    <router-link class="icon-container" to="/policies">
      <policy-icon size="2x"/>
      <p>Apólices</p>
    </router-link>

  </div>
</template>

<script>

import { HomeIcon, TrendingUpIcon, AirplayIcon, FileTextIcon, LayersIcon } from 'vue-feather-icons';

export default {
  name: 'Menu',

  components: {
    'home-icon': HomeIcon,
    'graph-icon': TrendingUpIcon,
    'quotation-icon': AirplayIcon,
    'propose-icon': FileTextIcon,
    'policy-icon': LayersIcon
  }


}
</script>

<style scoped>
  .container {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr 1fr !important;
    position: fixed !important;
    top: 87% !important;
    padding-bottom: 80px;



    background-color: #fff !important;


    -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25) !important;
    -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25) !important;
    box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25) !important;

  }

  .icon-container {
    display: flex !important;
    align-items: center !important;
    flex-direction: column !important;
    padding-top: 16px !important;
    padding-bottom: 10px !important;
    text-decoration: none !important;
    color: #000 !important;

    height: 70px !important;
  }

  .icon-container:hover {
    opacity: 0.7 !important;
  }

  .icon-container {
    font-size: 12px !important;
  }
</style>
