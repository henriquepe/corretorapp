<template>
  <div class="quotate-box">
    <div class="status">
      <p>{{status}}</p>
      <strong>{{proposta}}</strong>
    </div>

    <strong>VALIDADE</strong>
    <p id="validade">{{validade}}</p>

    <strong >CORRETOR</strong>
    <p>{{corretor}}</p>

    <strong >PROPONENTE</strong>
    <p>{{proponente}}</p>

  </div>

</template>

<script>

import axios from 'axios';

export default {
  name: 'QuotationBox',

  data(){

    return {
      coberturas: [],
    }

  },

  props: {
    'proponente': String,
    'corretor': String,
    'validade': String,
    'status': String,
    'proposta': String
  },

}
</script>

<style>

 a{
   color: #000;
 }

  .quotate-box {
    background: #fff !important;
    margin-top: 10px !important;
    padding: 20px !important;
    border-radius: 10px !important;

  }

  .quotate-box a {
    text-decoration: none !important;
    outline: 0 !important;
  }

  .quotate-box p {
    font-weight: bold;
    font-size: 16px;
    color: grey;
    padding-bottom: 15px;
  }

  .quotate-box strong {

    font-weight: bold !important;
    color: #05286A !important;

  }

  .status {
    display: flex !important;
    align-items: center !important;
    padding-bottom: 20px !important;

  }

  .status p {

    flex: 1 !important;


  }


  .status strong {
    padding-left: 120px !important;
    font-size: 20px !important;
    color: grey !important;
    font-weight: bold !important;
    color: #05286A !important;
  }

  #validade {
    font-weight: bold !important;
  }



</style>
