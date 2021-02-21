<template>
  <div class="container">
    <header-component/>



    <p id="first-p">Você está no modo <strong id="online">ONLINE</strong> </p>
    <p>Último atualização: 20/11/2020 </p>

    <div class="content">

      <h1>Olá! Este é um resumo do seu trabalho nos últimos 30 dias</h1>

      <div class="container-work">
        <strong>Cotação</strong>

        <div class="graph-container">
          <apexchart class="gauge-graph" height="300"  type="radialBar" :options="chartOptions" :series="series"/>
        </div>

        <div class="legends">

          <ul id="color-list">
            <li v-for="color in colors" :key="color">
              <div id="color-container" v-bind:style="{ 'background-color': color}"/>
            </li>
          </ul>

          <p id="digitalizacao">Em digitalização</p>
          <p id="assinatura">Em assinatura</p>
          <p id="aceito">Aceito</p>
          <p id="declinado">Declinado</p>

        </div>

      </div>

      <div class="container-work">
        <strong>Propostas</strong>

        <div class="graph-container">
          <apexchart class="gauge-graph" height="300"  type="radialBar" :options="chartOptions" :series="series2"/>
        </div>

        <div class="legends">

          <ul id="color-list">
            <li v-for="color in colors" :key="color">
              <div id="color-container" v-bind:style="{ 'background-color': color}"/>
            </li>
          </ul>

          <p id="digitalizacao">Em digitalização</p>
          <p id="assinatura">Em assinatura</p>
          <p id="aceito">Aceito</p>
          <p id="declinado">Declinado</p>



        </div>

      </div>



    </div>

  </div>


</template>

<script>

import Vue from 'vue';
import Header from "../components/Header.vue";

import VueApexCharts from 'vue-apexcharts';

Vue.use(VueApexCharts);


export default {
  components: {
    "header-component": Header,
    'apexchart': VueApexCharts,

  },

  data: function() {
    return {

          colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
          labels: ['Em digitalização', 'Em assinatura', 'Aceito', 'Declinado'],
          series: [76, 80, 10, 40],
          series2: [100, 40, 80, 10],
          chartOptions: {
            chart: {
              type: 'radialBar',
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
                  strokeWidth: '97%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    color: '#999',
                    opacity: 1,
                    blur: 2
                  }
                },
                dataLabels: {
                  name: {
                    fontSize: '14px',
                    show: true,

                  },
                  value: {
                    offsetY: -60,
                    fontSize: '22px'
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
              type: 'gradient',
              gradient: {
                shade: 'light',
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 53, 91],

              },
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
            labels: ['Em digitalização', 'Em assinatura', 'Aceito', 'Declinado'],
          }}},


}
</script>

<style scoped>

  .container {

    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
    height: 100%;

  }



  #first-p {
    margin-top: 30px;
  }

   #online {
    color: #032667;
  }

  .container p  {
    line-height: 0;

  }

  .content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content h1 {
    padding: 30px;
    text-align: center;
    color: #032691;
  }

  .container-work{
    width: 80%;
    height: 240px;
    padding: 20px;
    margin-top: 20px;

    -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.6);


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
