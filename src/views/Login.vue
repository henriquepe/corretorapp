<template>
  <div class="home">

    <loading :active.sync="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"></loading>

    <div class="background-opacity">
      <img
        id="logo"
        src="https://compareplanodesaude.com.br/wp-content/uploads/2020/07/omint-logotipo.jpg"
        alt="logo omint"
      />

      <p id="welcome">Bem vindo,</p>
      <h1>corretor</h1>

      <p>Esse app é para você!</p>
      <p>Vamos começar!</p>
      <p id="login">Digite seu login e senha:</p>

      <form>
        <div class="input-login">
          <input name="usuario" id="usuario" type="text" placeholder="Nome de usuário" />
        </div>
        <div class="input-login">
          <input name="senha" id="senha" type="password" placeholder="Senha" />
        </div>

        <a href="esqueciminhasenha">Esqueci a minha senha</a>

          <!-- <router-link to="/corretor" class="button-login">



          </router-link> -->
        <div class="button-login">
          <button v-on:click="handleSubmit" type="submit">Entrar</button>
        </div>


      </form>

    </div>
  </div>
</template>



<script lang="ts">

import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';

import router from '../router';

import store from '../store'




interface handleSubmitProps{
  usuario: string;
  senha: string;
  errors: string[];
}

export default {
  name: 'Login',

  data: function(){
    return {
      usuario: '' as string,
      senha: '' as string,
      errors: [] as string[],
      isLoading: false,
      fullPage: false
    }
  },
  components:  {
    Loading
  },

  methods: {
    handleSubmit<handleSubmitProps>(e: Event){

      this.isLoading = true;

      this.usuario = (document.getElementById('usuario') as HTMLInputElement).value;

      this.senha = (document.getElementById('senha') as HTMLInputElement).value as any;



      this.errors = [] as any[];



      if(!this.usuario || !this.senha){
        this.errors.push('Usuario e senha são obrigatórios!');
      };

      if(this.errors.length <= 0){

        this.login(this.usuario, this.senha).then(
          loginStatus => {


            if(loginStatus && store.state.token){
              router.replace({path: '/corretor'})
              e.preventDefault();
            }

            else {
              this.errors.forEach(error => alert(error))
              e.preventDefault();
              return
            }

            e.preventDefault();
          }
        );




      }


      e.preventDefault();





    },

    async login(usuario: string, senha: string){

      // 3131181
      // Omint2020

      const authObj = {
        "screenIdentification":"SASVI0055",
          "Parameters":
          [
            {
              "parametername": "cd_Corretor",
              "parametervalue": usuario
            },
            {
              "parametername": "Senha",
              "parametervalue": senha
            }
          ]
      }

      const authResponse = await fetch('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(authObj)
      });

      const authResponseInJSON = await authResponse.json();

      if(authResponseInJSON.ResponseCode ===  999){
        this.errors.push('Usuário ou senha incorretos');
        this.isLoading = false;

        return false
      }

      console.log(authResponseInJSON)



      console.log(authResponseInJSON.ResponseCode);

      const { Token } =  JSON.parse(authResponseInJSON.ResponseJSONData);

      localStorage.setItem('@corretor-token', Token);

      const sessionObj = {
        "userToken": Token,
        "screenIdentification":"SASVI0056"
      };




        const sessionResponse = await fetch('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sessionObj)
        })

        const sessionResponseInJSON = await sessionResponse.json();


        const { SessionID } =  JSON.parse(sessionResponseInJSON.ResponseJSONData);

        console.log(SessionID)

        await store.dispatch('setTokenAndSessionId', {
          token: Token,
          sessionId: SessionID
        })

        localStorage.setItem('@corretor-session-id', SessionID);

        return true

    }


  },


}



</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  background: url("https://images.unsplash.com/photo-1519940616396-2bb690a63a0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

}

.background-opacity {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.3);
  height: 100%;
  width: 100%;
}

#logo {
  width: 15%;
  max-width: 100px;
  padding-top: 40px;
}

.background-opacity #welcome {
  padding: 40px 0px 10px 0px;
}

.background-opacity p {
  margin: 0;
  letter-spacing: 2px;
}

.background-opacity #login {
  padding-bottom: 10px;
}

.background-opacity h1 {
  line-height: 0;
  font-size: 60px;
  letter-spacing: 10px;
  font-weight: 0;
  padding-bottom: 10px;
}

form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
}

.input-login {
  width: 58%;
  max-width: 300px;
  background-color: transparent;
  border: 1px solid #fff;
  height: 40px;
  margin-top: 10px;
  display: flex;
  border-radius: 2px;
}

.input-login input {
  flex: 1;
  background-color: transparent;
  border: 0;
  padding-left: 20px;
  outline: 0;
  color: #fff;
}

.input-login input::placeholder {
  color: #fff;
}

form a {
  margin: 30px 0 15px 0;
  text-decoration: none;
  color: #fff;
}

.button-login {
  width: 58%;
  max-width: 300px;
  background-color: #032667;
  border: 1px solid #032667;
  height: 40px;
  display: flex;
  border-radius: 10px;
  transition: opacity 0.2s;

}

.button-login button {
  flex: 1;
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: 0;

}

.button-login:hover {
  opacity: 0.8;
}
</style>

