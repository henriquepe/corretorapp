import Vue from "vue";
import Vuex from "vuex";

import axios from 'axios';

Vue.use(Vuex);

interface ProposesProps {
  id: string;
  proposta: string;
  proponente: string;
  cpfCnpj: string;
  status: string;
}


export default new Vuex.Store({
  state: {
    proposes: [],
    quotes: [],
    policies: [],
    products: [],
    professions: [],
    coberturas: [],
    fatoresDeCarregamento: [],
    corretores: [],
    sex: [],
    token: '',
    sessionId: '',
    isOnline: false,
    premio: [],
    propostaEmDigitalizacao: 0,
    propostaEmAssinatura: 0,
    propostaDeclinado: 0,
    propostaAceito: 0,
    cotacaoEmDigitacao: 0,
    cotacaoEmAssinatura: 0,
    cotacaoEmDeclinado: 0,
    cotacaoEmAceito: 0,
    quoteCreated: false,
    coberturasSpecifQuotate: [],
    usuario: ''



  },
  mutations: {
    // findPropose (state, {id}){
    //   const propose = state.proposes.find(propose => propose.id === id)
    //   console.log(propose)
    //   return propose;
    // },

    setTokenAndSessionId(state, { token, sessionId }) {
      state.token = token;
      state.sessionId = sessionId;
    },

    getToken(state){
      console.log(state.token)
      return state.token
    },

    handleOnlineMode(state){
      state.isOnline = true
    },

    setProposes(state, proposesData){

      state.proposes = proposesData;


    }
  },
  actions: {
    find (context, id) {
      context.commit('findPropose', { id })
    },

    setTokenAndSessionId(context, { token, sessionId }) {
      context.commit('setTokenAndSessionId', {token, sessionId})
    },

    getToken(context){
      return context.state.token
    },

    handleOnlineMode(context){
      context.commit('handleOnlineMode');
    },


    setProposes(context, proposesData){
      context.commit('setProposes', proposesData);
    }


  },
  modules: {}
});
