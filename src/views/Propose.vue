<template>

  <div class="container">

    <loading :active.sync="isLoading"
          :can-cancel="false"
          :on-cancel="onCancel"
          :is-full-page="fullPage"></loading>

    <header-component/>
    <router-link to="/proposes" class="left-icon-propose">
        <left-icon size="1.6x" />
        <p id="back">Back</p>
    </router-link>

    <div class="content-propose">

      <div class="propose-container">


        <div class="simplified-propose">

          <div class="proponente-box">
            <strong>Proponente</strong>
            <p>{{this.proponente}}</p>
          </div>
          <div class="line-container">

          </div>
          <div class="proposta-status-box">
            <div class="proposta-box">
              <strong>Proposta</strong>
              <p>{{this.proposta}}</p>
            </div>
            <div class="status-box">
              <strong>Status</strong>
              <p>{{this.status}}</p>
            </div>
          </div>

        </div>

      </div>

      <div class="follow-up-container">
        <div class="follow-up">
          <h1>Follow Up</h1>
        </div>
      <ul v-for="(item) in followUp" :key="item.ID_Follow_Up">
        <li class="follow-up-status">
          <div>
          <strong>{{item.Data}}</strong>
          <p>{{item['Histórico de Follow-Up da Cotação']}}</p>
        </div>
        </li>
      </ul>

      </div>

    </div>

    <menu-component/>
  </div>

</template>

<script>
import Header from '../components/Header.vue'
import axios from 'axios';
import store from '../store/index';
import Loading from 'vue-loading-overlay';
import { ChevronLeftIcon } from 'vue-feather-icons'
import Menu from '../components/Menu.vue'

import 'vue-loading-overlay/dist/vue-loading.css';



export default {
  name: 'Propose',

  components: {
    'header-component': Header,
    'left-icon': ChevronLeftIcon,
    'menu-component': Menu,
    Loading
  },

  data() {

    return {
      id: this.$route.params.id,
      status: '',
      cpfCnpj: '',
      proponente: '',
      proposta: '',
      isLoading: true,
      fullPage: true,
      followUp: [],
      historico: "Histórico\de\Follow-Up\da\Cotação"

    }
  },

  async created () {

    const propose = store.state.proposes.find(propose => propose.nr_proposta === this.id);
    this.status = propose.nm_fase;
    this.cpfCnpj = propose.nr_cpf;
    this.proponente = propose.nm_pessoa;
    this.proposta = propose.nr_proposta;

    await this.buscarFollowUp(propose.nr_proposta);


  },
  methods: {

    async buscarFollowUp(numeroProposta){

      console.log('cheguei')

      const sessionIdInLocalStorage = localStorage.getItem('@corretor-session-id');

      const { data } = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
        "SessionID": sessionIdInLocalStorage,
        "screenIdentification":"SASVI0051",
        "Parameters":[
          {"parametername":"nr_proposta", "parametervalue": numeroProposta},
          {"parametername":"cd_tp_consulta","parametervalue":"2"},
          {"parametername":"dt_inicio","parametervalue":""}
        ]
        });

      if(data.ResponseCode === 999 && data.ResponseDescription === "Usuário sem autorização para executar a funcionalidade informada. "){
        this.isLoading = false;
        this.$router.replace({path: '/'})
        alert('Sessão expirada')

      }
      else {

        const followUpList = data.ResponseJSONData;

        this.isLoading = false;

        this.followUp = followUpList;

      }



    }

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
  height: 100vh;
  background: grey;

}

.content-propose {

    text-align: left;
    width: 100%;

    background:  grey;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 100px;
}

.propose-container {

  background: grey;
  padding: 1px 1px 5px 1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;



}

.simplified-propose {



  background: #fff;
  padding: 1px 1px 5px 1px;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  width: 85%;

}

.proponente-box {
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;

}

.proponente-box p {
  margin-top: 3px;
  font-size: 14px;
}

.proponente-box strong {
  font-size: 14px;
}

.proposta-status-box {
  display: flex;
  align-items: center;

}

.line-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 95%;
  height: 1px;
  background: grey;
  opacity: 0.3;
}

.proposta-box {
  padding: 10px;
}

.proposta-box p {

  margin-top: 3px;
  font-size: 14px;

}

.proposta-box strong {
  font-size: 14px;
}

.status-box {
  padding-left: 50px;
  padding-right: 20px;

}

.status-box strong {
  font-size: 14px;
}

.status-box p {
  margin-top: 3px;
  font-size: 14px;
}

@media (max-width: 325px) {
  .status-box p {
    margin-top: 0px;
    font-size: 10px;
  }
}

.follow-up-container {

  width: 85%;
  background: #fff;
  padding: 1px 1px 5px 1px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 60px;


}

.follow-up {
  width: 85%;
  background: #fff;
  padding: 1px 1px 5px 1px;
  border-radius: 5px;
}

.follow-up h1 {
  padding: 10px;
  font-size: 14px;
}


.follow-up-status {
  margin-top: 30px;
  list-style-type: none;
}

.follow-up-status p {
  margin-top: 3px;
  margin-bottom: 0;
  padding-right: 20px;
}






</style>
