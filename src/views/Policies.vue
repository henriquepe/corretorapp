<template>
  <div class="container">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    ></loading>

    <header-component />

    <h1>Minhas Apólices</h1>

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

      <div class="proposes-box">
        <ul v-if="state.policies">
          <li v-for="policy in filtredItems" :key="policy.nr_apolice">
            <router-link
              :to="{
                path: '/policies/' + policy.nr_apolice,
                params: { id: policy.nr_apolice }
              }"
            >
              <policy-box
                :idProp="policy.nr_apolice"
                :status="policy.nm_status"
                :proponentCPF="String(policy.nr_CNPJ_sub)"
                :proponentName="policy.nm_estipulante"
                :proposeNumber="policy.nr_apolice"
              />
            </router-link>
          </li>
        </ul>

        <p id="mensagem" v-if="!isLoading">{{ this.mensagem }}</p>
      </div>
    </div>

    <div id="blank-space" />

    <menu-move />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import { SearchIcon } from "vue-feather-icons";
import PolicyBox from "../components/PolicyBox.vue";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import store from "../store/index";

export default {
  name: "Policies",

  data: () => {
    return {
      state: store.state,
      isLoading: true,
      fullPage: true,
      mensagem: "",
      searchInput: ""
    };
  },

  computed: {
    filtredItems() {
      return this.state.policies.filter(item => {
        return (
          item.nm_status?.indexOf(this.searchInput) > -1 ||
          item.nr_apolice?.indexOf(this.searchInput) > -1 ||
          String(item.nr_CNPJ_sub)?.indexOf(this.searchInput) > -1 ||
          item.nm_estipulante?.indexOf(this.searchInput) > -1
        );
      });
    }
  },

  components: {
    "header-component": Header,
    "menu-move": Menu,
    "search-icon": SearchIcon,
    "policy-box": PolicyBox,
    Loading
  },

  methods: {
    async verifyExistentProposes() {
      const sessionIdInLocalStorage = localStorage.getItem(
        "@corretor-session-id"
      );

      if (this.state.policies.length === 0) {
        const response = await axios.post(
          "https://app-sas.omintseguros.com.br/api/SASData/Get_V2",
          {
            SessionID: sessionIdInLocalStorage,
            screenIdentification: "SASVI0118A",
            Parameters: [
              { parametername: "nr_apolice", parametervalue: "" },
              { parametername: "nr_ramo", parametervalue: "" },
              { parametername: "cd_status", parametervalue: "" },
              { parametername: "nr_cpf", parametervalue: "" },
              { parametername: "nr_bilhete", parametervalue: "" },
              { parametername: "nr_CPF_CNPJ_login", parametervalue: "" },
              { parametername: "nr_contrato", parametervalue: "" },
              { parametername: "nr_sub", parametervalue: "" },
              { parametername: "nm_login", parametervalue: this.state.usuario }
            ]
          }
        );

        store.state.policies =
          response.data.ResponseJSONData.Apolice_Resumo_table_1;

        if (
          response.data.ResponseJSONData.Apolice_Resumo_table_1.length === 0
        ) {
          this.mensagem = "não há apolices para listar";
          this.isLoading = false;
        } else {
          this.isLoading = false;
          return;
        }
      }

      this.isLoading = false;
    }
  },

  async created() {
    await this.verifyExistentProposes();
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

.proposes-box {
  width: 95%;
  margin-top: 20px;
  background: #e0e0e0;
  padding: 1px 1px 5px 1px;
  border-radius: 5px;
}

.proposes-box ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.proposes-box li {
  list-style-type: none;
  width: 100%;
}

.proposes-box li:hover {
  opacity: 0.6;
}

#mensagem {
  padding-left: 20px;
  font-size: 14px;
}
</style>
