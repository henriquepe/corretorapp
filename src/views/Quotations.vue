<template>
  <div class="container">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    ></loading>
    <header-component />

    <h1>Cotações</h1>

    <div class="content">
      <div class="search-box">
        <search-icon size="1x" />
        <input
          id="search-input"
          type="text"
          placeholder="Digite algo para buscar"
          v-model="searchInput"
        />
      </div>

      <div class="quotations-box">
        <ul>
          <li v-for="quote in filtredItems" :key="quote.nr_cotacao">
            <router-link
              :to="{
                path: '/quotations/' + quote.dt_validade,
                params: { id: quote.dt_validade }
              }"
            >
              <quotation-box
                :corretor="quote.nm_usuario_proprietario"
                :status="quote.nm_fase"
                :proposta="quote.nr_cotacao"
                :proponente="quote.nm_pessoa"
                :validade="handleExpiresDate(quote.dt_validade)"
              />
            </router-link>
          </li>
        </ul>

        <p id="mensagem" v-if="!isLoading">{{ this.mensagem }}</p>
      </div>
    </div>

    <div id="blank-space" />

    <div class="actions-container">
      <router-link to="simulation" class="simulation-button-refresh">
        <refresh-icon size="1.4x" />
      </router-link>

      <router-link to="quotation" class="simulation-button">
        <plus-icon size="1.65x" />
      </router-link>
    </div>

    <menu-move />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import { SearchIcon, PlusIcon } from "vue-feather-icons";
import QuotationBox from "../components/QuotationBox.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import moment from "moment";

import axios from "axios";

import router from "../router";

import store from "../store";

export default {
  name: "Quotate",

  computed: {
    filtredItems() {
      console.log(this.state.quotes)

      if(!this.state.quotes){
        return [];
      }

      return this.state.quotes.filter(item => {
        return item.nr_cotacao?.indexOf(this.searchInput) > -1 || item.nm_fase?.indexOf(this.searchInput) > -1 || item.nm_pessoa?.indexOf(this.searchInput) > -1 || item.nm_usuario_proprietario?.indexOf(this.searchInput) > -1 || this.handleExpiresDate(item.dt_validade).indexOf(this.searchInput) > -1
      })
    }
  },

  components: {
    "header-component": Header,
    "menu-move": Menu,
    "search-icon": SearchIcon,
    "quotation-box": QuotationBox,
    "plus-icon": PlusIcon,
    Loading
  },
  methods: {
    async verifyExistentQuotes() {
      const sessionIdInLocalStorage = localStorage.getItem(
        "@corretor-session-id"
      );

      if (!this.state.quotes) {
        const { data } = await axios.post(
          "https://app-sas.omintseguros.com.br/api/SASData/Get_V2",
          {
            SessionID: sessionIdInLocalStorage,
            screenIdentification: "SASVI0081",
            Parameters: [
              { parametername: "nr_cotacao", parametervalue: "" },
              { parametername: "cd_fase", parametervalue: "" }
            ]
          }
        );

        console.log('data', data)

        if (
          data.ResponseCode === 999 &&
          data.ResponseDescription ===
            "Usuário sem autorização para executar a funcionalidade informada. "
        ) {
          await router.replace({ path: "/" });
          alert("Sessão expirada");
        } else if (data.ResponseCode === 0 && data.ResponseJSONData.Simulador_VI.Infos_Erro?.cd_erro === "999") {
          this.mensagem = "não há cotações para listar";
          this.isLoading = false;
        } 

        store.state.quotes = data.ResponseJSONData.Simulador_VI.Infos_simulacao;

      }

      this.isLoading = false
    },

    handleExpiresDate(date) {
      const [correctDate] = date.split("T");

      const formatedDate = moment(correctDate).format("DD/MM/YYYY");

      console.log(formatedDate);
      return formatedDate;
    }
  },

  data: () => {
    return {
      state: store.state,
      searchInput: '',
      isLoading: true,
      mensagem: ''
    };
  },

  async created() {
    await this.verifyExistentQuotes();
  }
};
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
  content: "";
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
  background: #e0e0e0;
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
  background: #e0e0e0;
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

.quotations-box li a {
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
  background-color: #05286a;
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

#mensagem {
  padding-left: 20px;
  font-size: 14px;
}

</style>
