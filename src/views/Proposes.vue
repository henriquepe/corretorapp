<template>

  <div class="container">

    <header-component/>

    <h1>Minhas Propostas</h1>

    <div class="content">



      <div class="search-box">
        <search-icon size="1x"/>
        <input id="search-input" type="text" placeholder="Digite algo para buscar"/>
      </div>

      <div class="proposes-box">

        <div class="propose-box">

          <strong>Proposta</strong>
          <p>13028403280458</p>
          <strong>Proponente</strong>
          <p>HENRIQUE TESTE 1234</p>
          <strong>CPF/CNPJ</strong>
          <p>12345678910</p>
          <strong>Status</strong>
          <p>Em Assinatura</p>

        </div>

        <div class="propose-box">

          <strong>Proposta</strong>
          <p>13028403280458</p>
          <strong>Proponente</strong>
          <p>HENRIQUE TESTE 1234</p>
          <strong>CPF/CNPJ</strong>
          <p>12345678910</p>
          <strong>Status</strong>
          <p>Em Assinatura</p>

        </div>

        <div class="propose-box">

          <strong>Proposta</strong>
          <p>13028403280458</p>
          <strong>Proponente</strong>
          <p>HENRIQUE TESTE 1234</p>
          <strong>CPF/CNPJ</strong>
          <p>12345678910</p>
          <strong>Status</strong>
          <p>Em Assinatura</p>

        </div>

      </div>

    </div>

    <div id="blank-space" />



    <menu-move/>

  </div>


</template>

<script>

import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue';
import { SearchIcon } from 'vue-feather-icons'

export default {
  name: 'Proposes',

  components: {
    'header-component': Header,
    'menu-move': Menu,
    'search-icon': SearchIcon
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

    height: 100%;


  }

  .content {



    padding-left: 10px;
    text-align: left;
    width: 95%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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

  .proposes-box {
    width: 95%;
    margin-top: 20px;
    background: #E0E0E0;
    padding: 1px 1px 5px 1px;
    border-radius: 5px;


  }

  .propose-box {
    background: #fff;
    margin-top: 10px;
    padding: 20px;
    border-radius: 10px;
  }



</style>>


