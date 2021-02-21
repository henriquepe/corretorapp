<template>
  <div class="home">
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
          <input type="text" placeholder="Nome de usuário" />
        </div>
        <div class="input-login">
          <input type="text" placeholder="Senha" />
        </div>

        <a href="esqueciminhasenha">Esqueci a minha senha</a>

        <div class="button-login">
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>



<script lang="ts">
export default {
  name: 'Login'
}

</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: url("https://images.unsplash.com/photo-1519940616396-2bb690a63a0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80");
  background-image: cover;
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
}

.input-login {
  width: 58%;
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

