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
    'idProp': String
  },

}
</script>

<style>

  a {
    text-decoration: none;

  }



  strong {
    color: #05286A;
  }

  p {
    color: grey;
  }

  .link {
    display: flex;
    height: 100px;
    background: #000;
  }



  .propose-box {

    background: #fff;
    margin-top: 10px;
    padding: 20px;
    border-radius: 10px;
  }


</style>
