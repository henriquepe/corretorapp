<template>
  <div class="container">
    <form class="content">
      <header-component/>
      <router-link to="/quotate" class="left-icon">
        <left-icon size="1.6x" />
        <p>Voltar</p>
      </router-link>

      <div class="product-contract">
        <h2>Produtos</h2>
        <div class="form">
          <label for="product">Produto*</label>

          <input list="products">
            <datalist id="products">
              <option value="Produto 1"/>
              <option value="Produto 2"/>
              <option value="Produto 3"/>
              <option value="Produto 4"/>
              <option value="Produto 5"/>
            </datalist>

          <label for="product">Contrato*</label>
          <input list="contracts">
            <datalist id="contracts">
              <option value="Contrato 1"/>
              <option value="Contrato 2"/>
              <option value="Contrato 3"/>
              <option value="Contrato 4"/>
              <option value="Contrato 5"/>
            </datalist>
        </div>
      </div>

      <div class="proponent-container">
        <h2>Informações do Proponente</h2>

        <div class="form-proponent">
          <label for="product">Nome*</label>

          <input type="text">


          <label for="product">Profissão*</label>
          <input type="text">


          <label for="renda">Renda Mensal*</label>
          <input type="number" placeholder="R$ 0,00" />

          <label for="data">Data de Nascimento*</label>
          <input type="date"/>

          <label>Sexo*</label>
          <input list="sexs" type="text" placeholder="M / F"/>
          <datalist id="sexs">
            <option value="M"/>
            <option value="F"/>
          </datalist>

          <label for="data">E-mail</label>
          <input type="text"/>

          <label for="data">CPF</label>
          <input type="text"/>
        </div>

      </div>

      <div class="chargers-container">
        <h2>Carregamentos Comerciais</h2>

        <div class="form-proponent">
          <label>Fator de Carregamento*</label>
          <input list="vals" type="text"/>
          <datalist id="vals">
            <option value="1"/>
            <option value="2"/>
          </datalist>

          <label>Corretor*</label>
          <input list="vals" type="text"/>
          <datalist id="vals">
            <option value="1"/>
            <option value="2"/>
          </datalist>
        </div>
      </div>

      <div class="seguros-container">
        <h2>Seguros Vigentes</h2>
          <label>Seguro de Vida Vigente</label>
          <md-switch v-model="array" class="md-primary" value="valueCheckbox"/>
      </div>

      <div class="confirm-button">
        <button>CONFIRMAR</button>
      </div>


    </form>
    <menu-component/>
  </div>

</template>

<script>

import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue';

import Vue from 'vue'
import VueMaterial from 'vue-material'


import { ChevronLeftIcon } from 'vue-feather-icons'

Vue.use(VueMaterial)

export default {
  name: 'Quotation',

  components: {
    'header-component': Header,
    'left-icon': ChevronLeftIcon,
    'menu-component': Menu
  },
  data: () => {
    return {
      array: [],
      valueCheckbox: 0
    }
  },

  methods: {
    handleSeguroVigente(){

    }
  }

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




</style>
