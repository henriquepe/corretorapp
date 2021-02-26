<template>
  <div class="propose-box">

    <strong>Proposta</strong>
    <p>{{proposeNumber}}</p>
    <strong>Proponente</strong>
    <p>{{proponentName}}</p>
    <strong>CPF/CNPJ</strong>
    <p>{{proponentCPF}}</p>
    <strong>Status</strong>
    <p>{{status}}</p>

  </div>

</template>

<script>
export default {
  name: 'ProposeBox',

  props: {
    'proposeNumber': String,
    'proponentName': String,
    'proponentCPF': String,
    'status': String,
  }



}
</script>

<style>

  .propose-box {
    background: #fff;
    margin-top: 10px;
    padding: 20px;
    border-radius: 10px;
  }

</style>
