<template>

  <div class="container">

    <header-component/>
    <router-link to="/quotations" class="left-icon-propose">
        <left-icon size="1.6x" />
        <p id="back">Back</p>
    </router-link>

    <div class="content-propose">

      <div class="propose-container">


        <div class="simplified-propose">

          <h3>Detalhes</h3>

          <div>
            <strong>Cotação</strong>
            <p>{{this.proposta}}</p>
          </div>

          <div>
            <strong>Segurado</strong>
            <p>{{this.proponente}}</p>
          </div>

          <div>
            <strong>Produto</strong>
            <p>{{this.produto}}</p>
          </div>

          <div>
            <strong>Estipulante</strong>
            <p>{{this.estipulante}}</p>
          </div>

        </div>

        <ul v-for="cobertura in coberturas" :key="cobertura.nm_cobertura">
          <li>
            <strong>cobertura.nm_cobertura</strong>
          </li>
        </ul>

      </div>

    </div>

    <menu-component/>
  </div>

</template>

<script>
import Header from '../components/Header.vue'
import store from '../store/index';
import { ChevronLeftIcon } from 'vue-feather-icons'
import Menu from '../components/Menu.vue'

import axios from 'axios';

export default {
  name: 'Propose',

  components: {
    'header-component': Header,
    'left-icon': ChevronLeftIcon,
    'menu-component': Menu
  },

  data() {

    return {
      id: this.$route.params.id,
      status: '',
      cpfCnpj: '',
      proponente: '',
      proposta: '',
      followUp: [],
      produto: '',
      estipulante: '',
      historico: "Histórico\de\Follow-Up\da\Cotação",
      coberturas: [],

    }
  },

  async created () {

    const quote = store.state.quotes.find(quoteInState => quoteInState.dt_validade === this.id);
    this.status = quote.nm_fase;
    this.cpfCnpj = quote.nr_cpf;
    this.proponente = quote.nm_pessoa;
    this.proposta = quote.nr_cotacao;
    this.produto = quote.cd_produto;
    this.estipulante = quote.nm_usuario_proprietario;

    this.handleCoberturasData();


  },

  methods: {
    async handleCoberturasData(){

      const sessionID = localStorage.getItem('@corretor-session-id');

      const response = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
        "SessionID": sessionID,
        "screenIdentification":"SASVI0063",
        "Parameters":[
          {"parametername":"nr_cotacao","parametervalue": this.proposta}
        ]}
      );

      this.coberturas = response.data.ResponseJSONData.Simulador_VI.Infos_Simulador.sim.Infos_Coberturas.c;



    },
  }



}
</script>

<style scoped>

.left-icon-propose {
  display: flex;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 10px;
  color: #fff;
}

#back {
  color: #fff;
}

.container {
  width: 100%;
  height: 100%;
  background: #fff;


}

.content-propose {
    text-align: left;
    width: 95%;
    height: 100%;
    background: #E0E0E0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

}

.propose-container {

  background: grey;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110%;
  height: 100%;
  padding-bottom: 100px;

}

.simplified-propose {


  height: 100vh;
  background: #fff;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  width: 85%;


}

.simplified-propose h3 {
  padding-left: 10%;
  color: #000;
  font-weight: bold;
}

.simplified-propose div {



  padding-left: 10%;
}

.simplified-propose div strong {

  color: #666;
  font-size: 14px;


}



.simplified-propose div p {

  padding-right: 20px;
  padding-top: 0px;
  margin-top: 5px;
  font-size: 14px;


}







</style>
