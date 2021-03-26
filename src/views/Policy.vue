<template>

  <div class="container">

    <header-component/>
    <router-link to="/policies" class="left-icon-propose">
        <left-icon size="1.6x" />
        <p id="back">Back</p>
    </router-link>

    <div class="content-propose">

      <div class="propose-container">


        <div class="simplified-propose">

          <button v-on:click="openPolicyPDF" target="_blank" id="policy">
            <h1>Nº da Apólice</h1>
            <pdf-icon size="2.5x" color="red"/>
          </button>

          <p>{{this.apolice}}</p>

        </div>

      </div>

      <div class="follow-up-container">
        <div class="follow-up">
          <button v-on:click="handleChangeArrow" id="parcelas">
            <h1>Parcelas:</h1>
            <up-icon class="parcelas-icon" v-if="this.arrow"/>
            <down-icon class="parcelas-icon" v-if="this.arrow === false"/>
          </button>
        </div>

        <ul v-if="arrow === true"  class="parcelas-list">

          <li  v-for="parcela in state.premio" :key="parcela.nr_parcela"  class="parcelas-status">
            <div >
              <strong>R$ {{parcela.vl_total}}</strong>
              <div id="date-status">
                <p>{{parcela.nr_parcela}} - {{parcela.dt_vencimento}} - </p>
                <strong>{{parcela.nm_status_parcela}}</strong>
              </div>
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
import store from '../store/index';
import { ChevronLeftIcon, FileIcon, ArrowDownIcon, ArrowUpIcon } from 'vue-feather-icons'
import Menu from '../components/Menu.vue'
import axios from 'axios';
import * as jspdf from 'jspdf';

export default {
  components: {
    'header-component': Header,
    'left-icon': ChevronLeftIcon,
    'menu-component': Menu,
    'pdf-icon': FileIcon,
    'up-icon': ArrowUpIcon,
    'down-icon': ArrowDownIcon
  },

  data() {

    return {
      id: this.$route.params.id,
      status: '',
      cpfCnpj: '',
      proponente: '',
      apolice: '',
      apolicePDF64: '',
      arrow: false,
      state: store.state

      // vl_total: '',
      // dt_vencimento: '',
      // nr_parcela: '',
      // nm_status_parcela: ''
    }
  },



  async created () {



    const policy = store.state.policies.find(policy => policy.nr_apolice === this.id);
    this.status = policy.nm_status;
    this.cpfCnpj = policy.nr_cpf_cnpj;
    this.proponente = policy.nm_estipulante;
    this.apolice = policy.nr_apolice;



    await this.verifyExistentPolicy();





  },

  methods: {
    handleChangeArrow(){
      this.arrow = !this.arrow;
      console.log(this.arrow)
    },

    openPolicyPDF(){

      console.log(this.apolicePDF64)

      if(!this.apolicePDF64){
        alert('PDF ainda não foi carregado');
        return;
      }
      else {
        var imgData = this.apolicePDF64;
        var doc = new jspdf.jsPDF();

        doc.addImage(imgData, 'JPEG', 10, 30, 150, 76);

        doc.save('bilhete.pdf')



      }



    },

    async verifyExistentPolicy(){

      const sessionIdInLocalStorage = localStorage.getItem('@corretor-session-id');

      const { data: DataPdfApolice } = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2',
      {
	    "SessionID":sessionIdInLocalStorage,
      "screenIdentification":"SASVI0118A",
      "Parameters":[ {"parametername": "nr_apolice","parametervalue": this.apolice}, {"parametername": "nr_ramo","parametervalue": ""}, {"parametername": "cd_status","parametervalue": ""}, {"parametername": "nr_cpf","parametervalue": ""}, {"parametername": "nr_bilhete","parametervalue": ""}, {"parametername": "nr_CPF_CNPJ_login","parametervalue": ""}, {"parametername": "nr_contrato","parametervalue": ""}, {"parametername": "nr_sub","parametervalue": ""}, {"parametername": "nm_login","parametervalue": "3131181"} ]
      })




      this.apolicePDF64 = JSON.stringify(DataPdfApolice.ResponseJSONData.Apolice_Resumo_table_1[0].ValidaRamoVP.form_apolice_vp.form_apolice_vp);

      console.log(JSON.stringify(DataPdfApolice.ResponseJSONData.Apolice_Resumo_table_1[0].ValidaRamoVP.form_apolice_vp.form_apolice_vp))

      const { data } = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2',
      {
        "SessionID": sessionIdInLocalStorage,
        "screenIdentification":"SASVI0119A",
        "Parameters":[
          {"parametername": "nr_apolice","parametervalue": ""},
          {"parametername": "nr_parcela","parametervalue": ""},
          {"parametername": "nm_status","parametervalue": ""},
          {"parametername": "nr_cpf","parametervalue": ""},
          {"parametername": "nr_contrato","parametervalue": ""},
          {"parametername": "nr_ramo","parametervalue": ""},
          {"parametername": "nr_sub","parametervalue": ""},
          {"parametername": "nr_CPF_CNPJ_login","parametervalue": ""},
          {"parametername": "nm_login","parametervalue": "3131181"}
        ]
      })


      store.state.premio = data.ResponseJSONData.Apolice_Parcela_table_1;

      console.log(store.state.premio)



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
  text-decoration: none;
}

#back {
  color: #fff;
}

.container {
  width: 100%;
}

.content-propose {
    padding-left: 10px;
    text-align: left;
    width: 95%;
    padding-top: 20px;
    background: #E0E0E0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding-bottom: 120px;
    height: 100%;

}

.propose-container {

  background: #E0E0E0;
  padding: 1px 1px 5px 1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

}

.simplified-propose {


  height: 140px;
  background: transparent;
  padding: 1px 1px 5px 1px;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  width: 90%;


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

  width: 90%;
  height: 100%;
  background: #fff;
  padding: 1px 1px 5px 1px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding-bottom: 0px;

}

.follow-up {
  width: 100%;
  border-left: 2px solid #05286A;
}

.follow-up h1 {
  padding: 15px;
  text-align: left;

  font-size: 16px;
  color: grey;

}

@media (max-width: 280px) {
  .follow-up h1 {
  padding: 15px;
  text-align: left;

  font-size: 12px;
  color: grey;

  }
}

#parcelas {
  background: transparent;
  cursor: pointer;
  border: 0;
  width: 100%;
  height: 100%;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.parcelas-list {
  height: 100%;
  padding-bottom: 250px;
}

.parcelas-status {
  padding-top: 25px;
  border-bottom: 1px solid grey;
  margin-right: 30px;
  margin-left: 0px;
  padding-right: 20px;

  list-style-type: none;
}

.parcelas-status:last-child {
  border: 0;
}

#date-status {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}



#date-status p{
  margin-top: 5px;
  padding-right: 5px;


}

#date-status strong{
  margin-top: 5px;
  padding-right: 5px;

}

.parcelas-status p {
  margin-top: 3px;
  margin-bottom: 0;
}

#policy {
  display: flex;
  align-items: center;
  justify-content: space-between;

  text-decoration: none !important;
  color: #05286A;
  height: 40px;
  background: transparent;
  border: 0;
  width: 90%;
  outline: 0;
  padding: 0;

}

#policy h1 {
  letter-spacing: 0;
}

@media (max-width: 350px){
  #policy h1 {
    font-size: 24px;
  }

  #date-status p{
  margin-top: 5px;
  padding-right: 5px;
  font-size: 14px;

  }

  #date-status strong{
    margin-top: 5px;
    padding-right: 5px;
    font-size: 14px;
  }
}

.parcelas-icon {
  padding-right: 40px;
}







</style>
