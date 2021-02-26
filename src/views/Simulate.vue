<template>

  <div class="container">

    <header-component/>

    <h1>Minhas Simulações</h1>

    <div class="content">



      <div class="search-box">
        <search-icon size="1x"/>
        <input id="search-input" type="text" placeholder="Digite algo para buscar"/>
      </div>

      <div class="simulations-box">

        <package-icon size="10x"/>

        <h2>NÃO HÁ SIMULAÇÕES A SEREM EXIBIDAS</h2>

      </div>

      <div class="actions-container">

        <router-link to="simulation" class="simulation-button">
          <refresh-icon size="1.4x"/>
        </router-link>

        <router-link to="simulation" class="simulation-button">
          <plus-icon size="1.65x"/>
        </router-link>


      </div>



    </div>

    <div id="blank-space" />



    <menu-move/>

  </div>


</template>

<script>

import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue';

import { SearchIcon, PackageIcon, PlusIcon, RefreshCwIcon } from 'vue-feather-icons'

export default {
  name: 'Simulate',

  components: {
    'header-component': Header,
    'menu-move': Menu,
    'search-icon': SearchIcon,
    'plus-icon': PlusIcon,
    'package-icon': PackageIcon,
    'refresh-icon': RefreshCwIcon
  }



}
</script>

<style scoped>

  #blank-space {
    height: 100px;
    background: #fff;
  }

  .container {
    width: 100%;

    height: 100vh;


  }

  .content {



    padding-left: 10px;
    text-align: left;
    width: 95%;
    height: 100%;



    display: flex;
    flex-direction: column;
    align-items: center;


  }


  .container h1 {

    color: #666;
    letter-spacing: 4px;
    text-align: left;
    padding-left: 20px;

  }

  .container h1:before {
    content: '';
    width: 7%;
    height: 1px;
    background: orange;
    position: absolute;
    top: 13%;
  }

  .search-box {
    display: flex;
    align-items: center;
    width: 95%;
    height: 30px;
    background: #E0E0E0;
    padding-left: 1px;
    padding-right: 1px;
    border-radius: 5px;

  }

  .search-box svg {
    padding-left: 5px;
  }

  .search-box input {

    border: 0;
    background: transparent;
    outline: 0;
    padding-left: 10px;

  }

  .simulations-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 95%;
    margin-top: 20px;
    height: 100%;
    padding: 1px 1px 5px 1px;
    border-radius: 5px;


  }

  .simulations-box svg {
    justify-content: center;
    padding-top: 25%;
    padding-bottom: 10%;
  }

  .simulations-box h2 {
    font-size: 18px;
    text-align: center;
  }

  .actions-container {
    display: flex;
    width: 90%;
    margin-top: 10%;
    position: fixed;
    top: 72%;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 40px;



  }

  .simulation-button {
    display: flex;
    background-color: #05286A;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    border: 0;
  }

  .simulation-button svg {
    color: #fff;
  }





</style>


