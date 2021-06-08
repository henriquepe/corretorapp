<template>
  <div class="container">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    ></loading>
    <header-component />

    <h1>Minhas Propostas</h1>

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
        <ul>
          <li v-for="propose in filtredItems" :key="propose.nr_proposta">
            <router-link
              :to="{
                path: '/proposes/' + propose.nr_proposta,
                params: { id: propose.nr_proposta }
              }"
            >
              <propose-box
                :idProp="propose.nr_proposta"
                :status="propose.nm_fase || ' - '"
                :proponentCPF="propose.nr_cpf"
                :proponentName="propose.nm_pessoa"
                :proposeNumber="propose.nr_proposta"
              />
            </router-link>
          </li>
        </ul>
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
import ProposeBox from "../components/ProposeBox.vue";
import store from "../store";
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import router from "../router";

import axios from "axios";



export default {
  name: "Proposes",

  data() {
    return {
      state: store.state,
      searchInput: '',
      isLoading: true
    };
  },

  computed: {
    filtredItems() {
      return this.state.proposes.filter(item => {
        return item.nr_proposta?.indexOf(this.searchInput) > -1 || item.nm_fase?.indexOf(this.searchInput) > -1 || item.nr_cpf?.indexOf(this.searchInput) > -1 || item.nm_pessoa?.indexOf(this.searchInput) > -1
      })
    }
  },

  methods: {


    handleListBySearch(e) {
      console.log('searchInput', this.searchInput);
      console.log('e', e);
      this.proposesArray = this.proposesArray.filter(item => {
        item.nr_proposta === this.searchInput;
      })
    },

    async verifyExistentProposes() {

      console.log('this.state.proposes', this.state.proposes);

      const sessionIdInLocalStorage = localStorage.getItem(
        "@corretor-session-id"
      );

      if (this.state.proposes.length === 0) {
        console.log('entrei errado aqui denovo')
        const response = await axios.post(
          "https://app-sas.omintseguros.com.br/api/SASData/Get_V2",
          {
            SessionID: sessionIdInLocalStorage,
            screenIdentification: "SASVI0108",
            Parameters: [
              { parametername: "nr_proposta", parametervalue: "" },
              { parametername: "cd_fase", parametervalue: "" }
            ]
          }
        );

        console.log('response', response);

        if (
          response.data.ResponseCode === 999 &&
          response.data.ResponseDescription ===
            "Usuário sem autorização para executar a funcionalidade informada. "
        ) {
          await router.replace({ path: "/" });
          alert("Sessão expirada");
        }

        this.state.proposes = response.data.ResponseJSONData.Proposta_VI.Infos_Proposta;
      }

      this.isLoading = false;

      console.log('passei a verificação')
      // this.setProposesArray(response.data.ResponseJSONData.Proposta_VI.Infos_Proposta);

    }
  },

  async created() {
    await this.verifyExistentProposes();

    console.log('filtred', this.filtredItems)
    
  },

  // beforeCreate() {
  //   this.proposesArray = this.state.proposes;
  // },

  

  components: {
    "header-component": Header,
    "menu-move": Menu,
    "search-icon": SearchIcon,
    "propose-box": ProposeBox,
    Loading
  }

  // methods: {
  //   getProposesInStore(){
  //     return store.state.proposes;
  //   }
  // }
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

#nr_proposta {
  color: #000;
  height: 10px;
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
}</style
>>
