<template>
    <div class="container">

        <div class="modal">

            <h3>Número de cotação</h3>
            <strong>{{numeroCotacao || 12312321321}}</strong>
            <h5>Prêmio</h5>
            <p>{{premio || 38.15}}</p>

            <button v-on:click="$router.replace({ path: '/quotations' })">
            <p>Obrigado!</p> 
            </button>

        </div>

    </div>

    
</template>

<script>
export default {

    name: 'QuoteModal',


    props: {

        numeroCotacao: '',
        premio: ''

    },


        
}
</script>

<style scoped>

    .container {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        
        

        background-color: rgba(255, 255, 255, 0.9);
    }


    .modal {

        display: flex;
        flex-direction: column;
        align-items: center;        
        background: #fff;
        width: 80%;
        height: 150px;
        border-radius: 10px;

        padding: 20px;

        -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
        box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.3);

        


    }

    .modal * {
        margin: 0;
    }

    .modal h3 {

        margin-bottom: 5px;
    }

    .modal  strong{

        margin-bottom: 15px;
    }

    

    .modal h5 {
        margin-bottom: 5px;
    }

    .modal button {
        margin-top: 15px;
        width: 130px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        background: #05286A;
        color: #fff;
        border: 1px solid #05286A;
        border-radius: 5px;

        transition: opacity .2s;

        cursor: pointer;

    }

    .modal button:hover {

        opacity: 0.8;


    }


</style>