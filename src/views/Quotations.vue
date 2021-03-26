<template>

  <div class="container">

    <header-component/>

    <h1>Cotações</h1>

    <div class="content">

      <div class="search-box">
        <search-icon size="1x"/>
        <input id="search-input" type="text" placeholder="Digite algo para buscar"/>
      </div>

      <div class="quotations-box">

        <ul>
          <li v-for="(quote) in this.state.quotes" :key="quote.nr_cotacao">
            <router-link :to="{path: '/quotations/' + quote.dt_validade, params: {id: quote.dt_validade} }">
              <quotation-box :corretor="quote.nm_usuario_proprietario" :status="quote.nm_fase"  :proposta="quote.nr_cotacao" :proponente="quote.nm_pessoa" :validade="handleExpiresDate(quote.dt_validade)"/>
            </router-link>

          </li>
        </ul>

      </div>

    </div>

    <div id="blank-space" />

    <div class="actions-container">

      <router-link to="simulation" class="simulation-button-refresh">
        <refresh-icon size="1.4x"/>
      </router-link>

      <router-link to="quotation" class="simulation-button">
        <plus-icon size="1.65x"/>
      </router-link>


    </div>

    <menu-move/>

  </div>


</template>

<script>

import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue';
import { SearchIcon, PlusIcon } from 'vue-feather-icons';
import QuotationBox from '../components/QuotationBox.vue';

import moment from 'moment';

import axios from 'axios';

import router from '../router'

import store from '../store';

export default {
  name: 'Quotate',

  components: {
    'header-component': Header,
    'menu-move': Menu,
    'search-icon': SearchIcon,
    'quotation-box': QuotationBox,
    'plus-icon': PlusIcon,

  },
  methods: {

    async verifyExistentQuotes(){

      const sessionIdInLocalStorage = localStorage.getItem('@corretor-session-id');

      if(this.state.quotes.length === 0){

        const { data } = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2',
          {"SessionID": sessionIdInLocalStorage,"screenIdentification":"SASVI0081",
          "Parameters":[
          {"parametername":"nr_cotacao","parametervalue":""},
          {"parametername":"cd_fase","parametervalue":""}
          ]})

        if(data.ResponseCode === 999 && data.ResponseDescription === "Usuário sem autorização para executar a funcionalidade informada. "){

          await router.replace({path: '/'})
          alert('Sessão expirada')
        }



        store.state.quotes = data.ResponseJSONData.Simulador_VI.Infos_simulacao;

      }

    },

    handleExpiresDate(date){
      const [correctDate, ] = date.split('T');

      const formatedDate = moment(correctDate).format("DD/MM/YYYY")

      console.log(formatedDate)
      return formatedDate;
    }

  },

  data: () => {
    return {
      state: store.state
    }
  },

  async created(){

    await this.verifyExistentQuotes();
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

  .quotations-box {
    width: 95%;
    margin-top: 20px;
    background: #E0E0E0;
    padding: 1px 1px 5px 1px;
    border-radius: 5px;

  }

  .quotations-box ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .quotations-box li {
    list-style-type: none;
    width: 100%;
    text-decoration: none;

  }

  .quotations-box li a{
    text-decoration: none;

  }

  .quotations-box li:hover {
    opacity: 0.6;
  }

  .actions-container {
    display: flex;
    width: 90%;
    position: fixed;
    top: 80%;
    justify-content: space-between;
    padding-left: 20px;
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



</style>>


