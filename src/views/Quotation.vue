<template>
  <div class="container">
    <loading :active.sync="isLoading" :can-cancel="false" :on-cancel="onCancel" :is-full-page="fullPage">
    </loading>
    <form class="content" @submit="submit($event)">
      <header-component/>
      <router-link to="/quotations" class="left-icon">
        <left-icon size="1.6x" />
        <p>Back</p>
      </router-link>

      <div class="product-contract">
        <h2>Produtos</h2>
        <div class="form">
          <label for="product">Produto*</label>

          <select @change="handleContractOfProductAndCoberturas(productInProducts)" v-model="product" class="list-products-contracts">
              <option v-for="(productInProducts, index) in this.state.products" :key="productInProducts[index]" :value="productInProducts.nm_produto">
                {{productInProducts.nm_produto}}
              </option>
          </select>

          <label for="contract">Contrato*</label>
          <select v-model="contract" class="list-products-contracts">
              <option :value="contract">
                {{contract}}
              </option>
          </select>

        </div>
      </div>

      <div class="proponent-container">
        <h2>Informações do Proponente</h2>

        <div class="form-proponent">
          <label for="product">Nome*</label>
          <input v-on:input="handleNomeInputChange($event)" type="text">


          <label for="profession">Profissão*</label>
          <select @change="handleProfessionCode" v-model="profession" class="list-products-contracts">
              <option v-for="(profession, index) in this.state.professions" :key="profession[index]" :value="profession.descricao">
                {{profession.descricao}}
              </option>
          </select>


          <label for="renda">Renda Mensal*</label>
          <input required v-on:input="handleRendaInputChange($event)" type="number" placeholder="R$ 0,00" />

          <label  for="data">Data de Nascimento*</label>
          <input v-on:input="handleDateInputChange($event)" type="date"/>

          <label for="sex">Sexo*</label>
          <select @change="handleChangeSex" v-model="sexCode" class="list-products-contracts">
              <option v-for="individualSex in this.state.sex" :key="individualSex.cd_sexo" :value="individualSex.cd_sexo">
                {{individualSex.nm_sexo}}
              </option>
          </select>

          <label for="data">E-mail</label>
          <input v-on:input="handleEmailInputChange($event)" type="text"/>

          <label for="data">CPF</label>
          <input v-on:input="handleCPFInputChange($event)" type="text"/>
        </div>

      </div>

      <div class="chargers-container">
        <h2>Carregamentos Comerciais</h2>

        <div class="form-proponent">
          <label for="fatorCarregamento">Fator de Carregamento*</label>
          <select @change="handleFatorDeCarregamentoId" v-model="fatorCarregamento" class="list-products-contracts">
              <option v-for="fator in this.state.fatoresDeCarregamento" :key="fator.id_fator_carregamento" :value="fator.cd_Fator">
                {{fator.cd_Fator}}
              </option>
          </select>

          <label for="Corretor">Corretor*</label>
          <select @change="handleCorretorNRS" v-model="corretor" class="list-products-contracts">
              <option v-for="(corretorInCorretores, index) in this.state.corretores" :key="corretorInCorretores[index]" :value="corretorInCorretores.nm_co_corretor">
                {{corretorInCorretores.nm_co_corretor}}
              </option>
          </select>
        </div>
      </div>

      <div class="seguros-container">
        <h2>Seguros Vigentes</h2>
          <label>Seguro de Vida Vigente</label>
          <md-switch v-model="array" class="md-primary" value="valueCheckbox"/>
      </div>

      <div class="proponent-container">
        <h2>Coberturas</h2>

        <div class="form-proponent">

          <ul class="coberturas">
            <li v-for="cobertura in this.state.coberturas" :key="cobertura.id_produto_cobertura" class="cobertura">
              <label for="cobertura">{{cobertura.nm_cobertura}}</label>
              <input v-on:input="handle($event, cobertura.id_produto_cobertura)" placeholder="0,00" id="input-cobertura" type="text">
            </li>
          </ul>

        </div>

      </div>

      

        <quote-modal v-if="existQuote"   :numeroCotacao="cotacao" :premio="premio"></quote-modal>

     

      
      
      <div class="confirm-button">
        <button type="submit">CONFIRMAR</button>
      </div>


    </form>
    <menu-component/>
  </div>

</template>

<script>

import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue';
import QuoteModal from '../components/QuoteModal.vue'

import Vue from 'vue'
import VueMaterial from 'vue-material';
import axios from 'axios';
import store from '../store';
import Loading from 'vue-loading-overlay';


import { ChevronLeftIcon } from 'vue-feather-icons'

import router from '../router';

Vue.use(VueMaterial)

export default {
  name: 'Quotation',

  components: {
    'header-component': Header,
    'left-icon': ChevronLeftIcon,
    'menu-component': Menu,
    'quote-modal': QuoteModal,
    Loading
  },
  data: () => {
    return {
      array: [],
      state: store.state,
      valueCheckbox: 0,
      product: '',
      contract: '',
      cotacao: '',
      premio: '',
      existQuote: false,
      profession: '',
      cdProduct: '',
      cdContract: '',
      cdProfession: '',
      id_canal_venda: '',
      fatorCarregamento: '',
      id_fator_carregamento: '',
      corretor: '',
      nr_cnpj_co_corretor: '',
      sex: '',
      sexCode: '',
      cobertura: '',
      id_cobertura: '',
      valorCobertura: '',
      professions: [],
      coberturaList: [],
      event: Event,
      nome: '',
      renda: '',
      birth: '',
      email: '',
      cpf: '',
      isLoading: true,
      fullPage: true


    }


  },

  methods: {

      async submit(e){

        e.preventDefault();

        this.isLoading = true;

        const sessionId = localStorage.getItem('@corretor-session-id');

        const response = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
          "SessionID": sessionId,
          "screenIdentification":"SASVI0074",
          "Parameters":[
            { "parametername":"id_simulador_cotacao", "parametervalue":"" },
            { "parametername":"id_canal_venda", "parametervalue": this.id_canal_venda },
            { "parametername":"cd_contrato", "parametervalue": this.cdContract },
            { "parametername":"cd_produto", "parametervalue": this.cdProduct },
            { "parametername":"id_fator_carregamento", "parametervalue": this.id_fator_carregamento },
            { "parametername":"nr_cnpj_corretor", "parametervalue": this.nr_cnpj_co_corretor },
            { "parametername":"nm_proponente", "parametervalue": this.nome },
            { "parametername":"dt_nasc", "parametervalue": this.birth },
            { "parametername":"cd_sexo", "parametervalue": this.sexCode },
            { "parametername":"cd_ocupacao", "parametervalue": this.cdProfession },
            { "parametername":"vl_renda_mensal", "parametervalue": this.renda },
            { "parametername":"nm_email", "parametervalue": this.email },
            { "parametername":"nr_cpf", "parametervalue": this.cpf },
            { "parametername":"ic_seg_vida_vigente", "parametervalue":"0" },
            { "parametername":"id_seguradora", "parametervalue":"0" },
            { "parametername":"vl_capital_outra_seguradora", "parametervalue":"0" },
            { "parametername":"coberturaList", "parameterlist": this.coberturaList}
          ]
        });


        // console.log(response.data)
        // console.log(response.data.ResponseJSONData.Simulacao_VI.Infos_Simulacao.sim.nr_cotacao)
        // console.log(response.data.ResponseJSONData.Simulacao_VI.Premio_Total.Total.vl_premio_total)

        


        if(response.data.ResponseCode === 999 && response.data.ResponseDescription === "Usuário sem autorização para executar a funcionalidade informada. "){

          await router.replace({path: '/'})
          alert('Sessão expirada')

        }

        else {

          this.isLoading = false;

          this.cotacao = `${response.data.ResponseJSONData.Simulacao_VI.Infos_Simulacao.sim.nr_cotacao}`

          this.premio = `${response.data.ResponseJSONData.Simulacao_VI.Premio_Total.Total.vl_premio_total}`

          this.existQuote = true;

        }

        


      },



      handleCPFInputChange(e){

        this.cpf = e.target.value.toString();

        console.log('cpf:', this.cpf)

      },


      handleEmailInputChange(e){

        this.email = e.target.value.toString();

        console.log('email:', this.email)

      },

      handleRendaInputChange(e){

        this.renda = e.target.value.toString();

        console.log('renda:', this.renda)

      },


      handleNomeInputChange(e){

        this.nome = e.target.value.toString();

        console.log('nome:', this.nome)

      },

      handleDateInputChange(e){

        const data = e.target.value.split('-')

        const formatedDate = `${data[0]}${data[1]}${data[2]}`

        this.birth = formatedDate.toString();

        console.log('data de nascimento:', this.birth)

      },


      async handle(e, id){

        await this.handleChange(e);

        const cobertura =
        {"parametername":"cobertura",
          "parameterlist":[
            {"parametername":"id_cobertura", "parametervalue": id.toString() },
            { "parametername":"vl_capital_segurado", "parametervalue": e.target.value.toString() }
          ]
        }

        console.log('id passado:', id.toString())

        const coberturaExists = this.coberturaList.find(coberturaInList => coberturaInList.parameterlist[0].parametervalue === id.toString());
        const coberturaIndexExists = this.coberturaList.findIndex(coberturaInList => coberturaInList.parameterlist[0].parametervalue === id.toString());

        if(!coberturaExists){
          this.coberturaList.push(cobertura);

        }
        else {
          this.coberturaList.splice(coberturaIndexExists, 1);
          this.coberturaList.push(cobertura)

          console.log(this.coberturaList)

        }

      },


      async handleChange(e){

        this.valorCobertura = e.target.value.toString();

      },


      async handleContractOfProductAndCoberturas(n){

        const matchedProduct = this.state.products.find(product => product.nm_produto === this.product);

        this.contract = matchedProduct.nm_contrato.toString();
        this.cdContract = matchedProduct.cd_contrato.toString();
        this.cdProduct = matchedProduct.cd_produto.toString();
        this.id_canal_venda = matchedProduct.Canal_Venda.cv.id_canal_venda.toString();

        console.log('código contrato:', this.cdContract);
        console.log('código produto:', this.cdProduct);
        console.log('id canal de venda:', this.id_canal_venda);


          await this.handleProfessions();
          await this.handleCoberturas();
          await this.handleFatoresDeCarregamento();





      },

      async handleCoberturas(){

        const sessionId = localStorage.getItem('@corretor-session-id')

        this.isLoading = true;

        const { data: coberturasData } = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
          "SessionID": sessionId,
          "screenIdentification":"SASVI0068",
          "Parameters":[
            {"parametername":"cd_produto", "parametervalue": this.cdProduct}
          ]})

          if(coberturasData){
            this.isLoading = false;
          }


        this.state.coberturas = coberturasData.ResponseJSONData;


      },

      async handleSex(){

        const sessionId = localStorage.getItem('@corretor-session-id');

        const { data: sexData } = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
          "SessionID": sessionId,
          "screenIdentification":"SASVI0059",
          "Parameters":[]}
        )

        this.state.sex = sexData.ResponseJSONData;


      },

      handleChangeSex(){

        this.sexCode = this.sexCode.toString();

        console.log('cd sexo:', this.sexCode);

      },

      async handleCorretores(){

        const sessionId = localStorage.getItem('@corretor-session-id');

        const { data: corretoresData } = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
          "SessionID": sessionId,
          "screenIdentification":"SASVI0116",
          "Parameters":[
            {"parametername":"nr_cnpj_corretor", "parametervalue":""}
          ]})



        store.state.corretores = corretoresData.ResponseJSONData;

      },

      async handleCorretorNRS(){

        const matchedCorretor = this.state.corretores.find(corretor => corretor.nm_co_corretor === this.corretor)

        this.nr_cnpj_co_corretor = matchedCorretor.nr_cnpj_co_corretor.toString();

        console.log('nr cnpj co-corretor:', this.nr_cnpj_co_corretor);

      },

      async handleFatoresDeCarregamento(){

        const sessionId = localStorage.getItem('@corretor-session-id')

        const { data: fatoresDeCarregamentoData } = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
          "SessionID": sessionId,
          "screenIdentification":"SASVI0069",
          "Parameters":[{"parametername": "id_canal_venda","parametervalue": this.id_canal_venda}]})

        store.state.fatoresDeCarregamento = fatoresDeCarregamentoData.ResponseJSONData;

      },

      async handleFatorDeCarregamentoId(){

        const matchedFator = this.state.fatoresDeCarregamento.find(fator => fator.cd_Fator === this.fatorCarregamento);


        this.id_fator_carregamento = matchedFator.id_fator_carregamento.toString();

        console.log('id fator carregamento:', this.id_fator_carregamento);

      },

      async handleProfessions(){

        const sessionId = localStorage.getItem('@corretor-session-id')

        this.isLoading = true;

        const { data: professionsData } = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
        "SessionID":sessionId,
        "screenIdentification":"SASVI0147",
        "Parameters":[
          {"parametername":"cd_produto", "parametervalue": this.cdProduct}
        ]})

        if(professionsData){
          this.isLoading = false;
        }

        if(professionsData.ResponseCode === 999 && professionsData.ResponseDescription === "Usuário sem autorização para executar a funcionalidade informada. "){

          await router.replace({path: '/'})
          alert('Sessão expirada')
        }


        store.state.professions = professionsData.ResponseJSONData;



      },

      handleProfessionCode(){

        const matchedProfession = this.state.professions.find(profession => profession.descricao === this.profession);

        this.cdProfession = matchedProfession.codigo.toString();

        console.log('cd profissao:', this.cdProfession);

      }
  },

  async created() {

    store.state.coberturas = [];
    store.state.professions = [];

    const sessionId = localStorage.getItem('@corretor-session-id')

      const {data:productsData} = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
        "SessionID": sessionId,
	      "screenIdentification":"SASVI0075",
	      "Parameters": [
	        {"parametername": "cd_tp_consulta", "parametervalue": "2"}
        ]})

      if(productsData){
        this.isLoading = false;
      }

      if(productsData.ResponseCode === 999 && productsData.ResponseDescription === "Usuário sem autorização para executar a funcionalidade informada. "){

        await router.replace({path: '/'})
        alert('Sessão expirada')
      }

      this.state.products = productsData.ResponseJSONData.Produtos.prod;



      await this.handleCorretores();
      await this.handleSex();







  },


}
</script>

<style scoped>

.left-icon {
  display: flex !important;
  align-items: center !important;
  position: absolute !important;
  top: 35px !important;
  left: 10px !important;
}

a {
  text-decoration: none !important;
}

 svg {
   color: #fff !important;
 }

p {
  color: #fff !important;
}

.container {
  width: 100% !important;
}

.content {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  width: 100% !important;

}

.product-contract {
  display: flex ;
  flex-direction: column;
  text-align: left;

  width: 90%;
  max-width: 86%;


  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
-moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.3);
}

.product-contract h2 {
  color: #05286A;
  padding-bottom: 35px;
}

.form {
  display: flex;
  flex-direction: column;
  height: 90%;

}

.form label {
  padding-left: 20px;
  padding-bottom: 5px;

}

.form input {
  border: 0;
  border-bottom: 1px solid #718090;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 85%;

  outline: 0;

}


.proponent-container {

  display: flex;
  flex-direction: column;
  text-align: left;
  width: 90%;
  max-width: 86%;
  margin-top: 30px;
  margin-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;

  -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.3);

}

.proponent-container h2 {
  color: #05286A;
  padding-left: 20px;
  padding-bottom: 35px;
}

.form-proponent {
  display: flex;
  flex-direction: column;
}

.form-proponent label {
  padding-left: 20px;
  padding-bottom: 5px;

}

.form-proponent input {
  border: 0;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 85%;
  outline: 0;

}

.chargers-container {

  display: flex;
  flex-direction: column;
  text-align: left;
  width: 90%;
  max-width: 86%;
  margin-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;

  -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.3);

}

.chargers-container h2 {
  color: #05286A;
  padding-left: 20px;
  padding-bottom: 35px;
}

.seguros-container {

  display: flex;
  flex-direction: column;
  text-align: left;
  width: 90%;
  max-width: 86%;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;

  -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.3);

}

.seguros-container h2 {
  color: #05286A;
  padding-left: 20px;
  padding-bottom: 35px;
}


.confirm-button {
  width: 90%;
  max-width: 88%;
  height: 35px;
  margin-top: 20px;
  margin-bottom: 120px;
  background: #052768;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.confirm-button button {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}

.list-products-contracts {
  width: 80%;
  margin-left: 4%;
  margin-bottom: 20px;
  border: 0;
  outline: 0;

}

.coberturas {
  list-style-type: none;
  padding: 20px;

}

.cobertura {
  display: flex;
  flex-direction: column;


  font-size: 14px;
  padding-right: 10px;
}

.cobertura label {
  padding-left: 0;
  flex: 1;
  margin-top: 10px;
}

.cobertura #input-cobertura {
  margin-left: 0;
  margin-top: 10px;

}



</style>
