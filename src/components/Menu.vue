<template>
  <div class="container">
    <router-link class="icon-container" to="corretor">
      <home-icon size="2x"/>
      <p>Home</p>
    </router-link>
    <router-link class="icon-container" to="simulate">
      <graph-icon size="2x"/>
      <p>Simulações</p>
    </router-link>
    <router-link class="icon-container" to="corretor">
      <quotation-icon size="2x"/>
      <p>Cotações</p>
    </router-link>
    <router-link class="icon-container" to="proposes">
      <propose-icon size="2x"/>
      <p>Propostas</p>
    </router-link>
    <router-link class="icon-container" to="corretor">
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    position: fixed;
    top: 90%;



    background-color: #fff;


    -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);

  }

  .icon-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 16px;
    padding-bottom: 10px;
    text-decoration: none;
    color: #000;

    height: 70px;
  }

  .icon-container:hover {
    opacity: 0.7;
  }

  .icon-container {
    font-size: 12px;
  }
</style>
