<template>
  <div class="container">
    <header-component />

    <p id="first-p">Você está no modo <strong id="online">ONLINE</strong></p>
    <p id="second-p">Último atualização: 20/11/2020</p>

    <div class="content">
      <h1>Olá! Este é um resumo do seu trabalho nos últimos 30 dias</h1>

      <div class="container-work">
        <strong>Cotação</strong>

        <div class="graph-container">
          <apexchart
            class="gauge-graph"
            height="300"
            type="radialBar"
            :options="chartOptions"
            :series="series"
          />
        </div>

        <div class="legends">
          <ul id="color-list">
            <li v-for="color in colors" :key="color">
              <div
                id="color-container"
                v-bind:style="{ 'background-color': color }"
              />
            </li>
          </ul>

          <p id="digitalizacao">Em digitalização</p>
          <p id="assinatura">Em assinatura</p>
          <p id="aceito">Aceito</p>
          <p id="declinado">Declinado</p>
        </div>
      </div>

      <div class="container-work">
        <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :is-full-page="fullPage"
        ></loading>
        <strong>Propostas</strong>

        <div class="graph-container">
          <apexchart
            class="gauge-graph"
            height="300"
            type="radialBar"
            :options="chartOptions"
            :series="series2"
          />
        </div>

        <div class="legends">
          <ul id="color-list">
            <li v-for="color in colors" :key="color">
              <div
                id="color-container"
                v-bind:style="{ 'background-color': color }"
              />
            </li>
          </ul>

          <p id="digitalizacao">Em digitalização</p>
          <p id="assinatura">Em assinatura</p>
          <p id="aceito">Aceito</p>
          <p id="declinado">Declinado</p>
        </div>
      </div>
    </div>
    <menu-move />
  </div>
</template>

<script>
import Vue from "vue";
import Header from "../components/Header.vue";
import Menu from "../components/Menu";
import store from "../store";
import axios from "axios";
import router from "../router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);

export default {
  name: "Dashboard",

  components: {
    "header-component": Header,
    apexchart: VueApexCharts,
    "menu-move": Menu,
    Loading
  },

  // created: () => {

  // },

  data: function() {
    return {
      isLoading: true,
      fullPage: true,
      quantityOfProposes: 0,
      state: store.state,
      digitalizacao: 0,
      assinatura: 0,
      aceito: 0,
      declinado: 0,
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Em digitalização", "Em assinatura", "Aceito", "Declinado"],
      series: [],
      series2: [],
      chartOptions: {
        chart: {
          type: "radialBar",
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2
              }
            },
            dataLabels: {
              name: {
                fontSize: "14px",
                show: true
              },
              value: {
                offsetY: -60,
                fontSize: "22px"
              }
            }
          }
        },
        grid: {
          padding: {
            top: 0
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
          }
        },
        colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
        labels: ["Em digitalização", "Em assinatura", "Aceito", "Declinado"]
      }
    };
  },

  methods: {
    async handleGraphicStatus() {
      

      const sessionIdInLocalStorage = localStorage.getItem(
        "@corretor-session-id"
      );

      const { data } = await axios.post(
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

      if (
        data.ResponseCode === 999 &&
        data.ResponseDescription ===
          "Usuário sem autorização para executar a funcionalidade informada. "
      ) { 
        await router.replace({ path: "/" });
        alert("Sessão expirada");
      } else if (data.ResponseCode === 0 && data.ResponseJSONData.Proposta_VI.Infos_Erro?.cd_erro === "999") {

        this.isLoading = false;
      } 

      this.state.proposes = data.ResponseJSONData.Proposta_VI.Infos_Proposta;

      const { data: quoteData } = await axios.post(
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

      if (
        quoteData.ResponseCode === 999 &&
        quoteData.ResponseDescription ===
          "Usuário sem autorização para executar a funcionalidade informada. "
      ) {
        await router.replace({ path: "/" });
        alert("Sessão expirada");
      } else if (quoteData.ResponseCode === 0 && quoteData.ResponseJSONData.Simulador_VI.Infos_Erro?.cd_erro === "999") {

        this.isLoading = false;
      } 
        
      this.state.quotes = quoteData.ResponseJSONData.Simulador_VI.Infos_simulacao;     

      
    },

    handleEmDigitalizacaoPercentage() {
      console.log('entrei em digitalização')

      if (!this.state.proposes) {
        console.log('entrei errado aqui')
        return;
      } else {
        const emDigitalizacaoData = this.state.proposes.filter(
          propose => propose.nm_fase === "Em Digitalizacao"
        );

        const propostaEmDigitalizacaoPorcentagem =
          (emDigitalizacaoData.length * 100) / this.state.proposes.length;

        this.state.propostaEmDigitalizacao = Math.round(
          propostaEmDigitalizacaoPorcentagem
        );

        if (!this.state.quotes) {
          return;
        } else {
          const cotacaoEmDigitalizacaoData = this.state.quotes.filter(
            quote => quote.nm_fase === "Em Digitação"
          );

          console.log(
            "cotacao em digitalizacao:" + cotacaoEmDigitalizacaoData.length
          );

          const cotacaoEmDigitalizacaoPorcentagem =
            (cotacaoEmDigitalizacaoData.length * 100) /
            this.state.quotes.length;

          this.state.cotacaoEmDigitacao = Math.round(
            cotacaoEmDigitalizacaoPorcentagem
          );
        }
      }
    },

    handleEmAssinaturaPercentage() {

      console.log('entrei em assinatura')

      console.log('this.state.proposes.length', this.state.proposes.length);
      console.log('this.state.quotes', this.state.quotes);

      if (!this.state.proposes) {
        return;
      } else {
        const emAssinaturaData = this.state.proposes.filter(
          propose => propose.nm_fase === "Em Assinatura"
        );

        const propostaEmAssinaturaPorcentagem =
          (emAssinaturaData.length * 100) / this.state.proposes.length;

        this.state.propostaEmAssinatura = Math.round(
          propostaEmAssinaturaPorcentagem
        );

        if (!this.state.quotes) {
          return;
        } else {
          const cotacaoEmAssinaturaData = this.state.quotes.filter(
            quote => quote.nm_fase === "Em Assinatura"
          );

          console.log(
            "cotacao em assinatura:" + cotacaoEmAssinaturaData.length
          );
          const cotacaoEmAssinaturaPorcentagem =
            (cotacaoEmAssinaturaData.length * 100) / this.state.quotes.length;

          this.state.cotacaoEmAssinatura = Math.round(
            cotacaoEmAssinaturaPorcentagem
          );
        }
      }
    },

    handleEmDeclinadoPercentage() {

      console.log('entrei em declinado')

      if (!this.state.proposes) {
        return;
      } else {
        const emDeclinadoData = this.state.proposes.filter(
          propose => propose.nm_fase === "Cancelada"
        );

        const propostaEmDeclinadoPorcentagem =
          (emDeclinadoData.length * 100) / this.state.proposes.length;

        this.state.propostaDeclinado = Math.round(
          propostaEmDeclinadoPorcentagem
        );

        if (!this.state.quotes) {
          return;
        } else {
          const cotacaoEmDeclinadoData = this.state.quotes.filter(
            quote => quote.nm_fase === "Cancelada"
          );

          console.log("cotacao em declinado:" + cotacaoEmDeclinadoData.length);

          const cotacaoEmDeclinadoPorcentagem =
            (cotacaoEmDeclinadoData.length * 100) / this.state.quotes.length;

          this.state.cotacaoEmDeclinado = Math.round(
            cotacaoEmDeclinadoPorcentagem
          );
        }
      }
    },

    handleEmAceitoPercentage() {

      console.log('entrei em aceito')

      if (!this.state.proposes) {
        return;
      } else {
        const emAceitoData = this.state.proposes.filter(
          propose => propose.nm_fase === "Aceito"
        );

        const propostaEmAceitoPorcentagem =
          (emAceitoData.length * 100) / this.state.proposes.length;

        this.state.propostaAceito = Math.round(propostaEmAceitoPorcentagem);

        if (!this.state.quotes) {
          return;
        } else {
          const cotacaoEmAceito = this.state.quotes.filter(
            quote => quote.nm_fase === "Aceito"
          );

          console.log("cotacao em aceito:" + cotacaoEmAceito.length);
          const cotacaoEmAceitoPorcentagem =
            (cotacaoEmAceito.length * 100) / this.state.quotes.length;

          this.state.cotacaoEmAceito = Math.round(cotacaoEmAceitoPorcentagem);
        }
      }
    },

    async handleGraphicsValue() {
      console.log("executada");

      console.log('this.state.quotes', this.state.quotes);
      console.log('this.state.proposes', this.state.proposes);

      Vue.set(this.series, 0, this.state.cotacaoEmDigitacao);
      Vue.set(this.series, 1, this.state.cotacaoEmAssinatura);
      Vue.set(this.series, 2, this.state.cotacaoEmDeclinado);
      Vue.set(this.series, 3, this.state.cotacaoEmAceito);

      

      Vue.set(this.series2, 0, this.state.propostaEmDigitalizacao);
      Vue.set(this.series2, 1, this.state.propostaEmAssinatura);
      Vue.set(this.series2, 2, this.state.propostaDeclinado);
      Vue.set(this.series2, 3, this.state.propostaAceito);

      console.log('this.state.propostaDigitalizacao', this.state.propostaEmDigitalizacao);


      this.isLoading = false;

      return true;
    },

    async handlePercentages() {
      await this.handleGraphicStatus();

      this.handleEmAssinaturaPercentage();
      this.handleEmDeclinadoPercentage();
      this.handleEmAceitoPercentage();
      this.handleEmDigitalizacaoPercentage();

      return true;
    }
  },

  async created() {
    await this.handlePercentages();

    setTimeout(async () => {
      await this.handleGraphicsValue();
    }, 7000);
  }
};
</script>

<style scoped>
.container {
  text-align: left;
  width: fit-content;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#first-p {
  padding-top: 10px;
  padding-left: 5%;
}

#second-p {
  padding-top: 10px;
  padding-left: 5%;
}

#online {
  color: #032667;
}

.container p {
  line-height: 0;
}

.content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
}

.content h1 {
  padding: 30px;
  text-align: center;
  color: #032691;
}

.container-work {
  width: 80%;
  max-width: 500px;
  height: 240px;
  padding: 20px;
  margin-top: 20px;

  -webkit-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.3);
}

.legends {
  display: block;
}
.legends ul {
  display: flex;
  width: 100%;
}

.legends ul li {
  list-style-type: none;
}

#color-list {
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 20px;
  margin-block-start: 1em;
  padding-left: 0;
}

#digitalizacao {
  position: relative;
  top: -50px;
  right: -5%;
  font-size: 14px;
  margin: 0;
}

#assinatura {
  position: relative;
  top: -50px;
  right: -68%;
  font-size: 14px;
  margin: 0;
}

#aceito {
  position: relative;
  top: -20px;
  right: -68%;
  font-size: 14px;
  margin: 0;
}

#declinado {
  position: relative;
  top: -20px;
  right: -5%;
  font-size: 14px;
  margin: 0;
}

#label-container {
  display: inline-block;
  width: 100%;
}

#color-container {
  height: 10px;
  width: 10px;
  border-radius: 20px;
}
</style>
