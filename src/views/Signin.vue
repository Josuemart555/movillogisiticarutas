<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Iniciar Sesión</h4>
                  <p class="mb-0">Ingresa tu usuario y contraseña para iniciar sesión</p>
                </div>
                <argon-alert color="info" icon="ni ni-like-2 ni-lg" v-show="mostrarAlertSeucce" >
                  Inicio sesion <strong>Exitoso!!</strong>
                </argon-alert>
                <argon-alert color="danger" icon="ni ni-fat-remove ni-lg" v-show="error" >
                  {{ error_msg ? error_msg : 'No se pudo iniciar sesión'}} <strong>Error!!</strong>
                </argon-alert>
                <div class="card-body">
                  <form role="form" v-on:submit.prevent="login">
                    <div class="mb-3">
                      <input type="text" class="form-control form-control-lg invalid" name="usuario" placeholder="Usuario" v-model="usuario">
                    </div>
                    <div class="mb-3">
                      <input type="password" class="form-control form-control-lg invalid" name="contrasena" placeholder="Contraseña" v-model="password">
                    </div>
                    <!-- <argon-switch id="rememberMe">Remember me</argon-switch> -->

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        
                      >Iniciar Sesión</argon-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                background-size: cover;"
              >
                <span class="mask bg-gradient-success opacity-6"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

import axios from 'axios';
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
  name: "signin",
  components: {
    ArgonButton,
    ArgonAlert
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
    this.error = false;
    this.mostrarAlertSeucce = false;
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  data: function() {
    return {
      usuario: "",
      password: "",
      error: false,
      error_msg: "",
      mostrarAlertSeucce: false,
    }
  },
  methods: {
    login() {

      let bodyFormData = new FormData();
      bodyFormData.append("usuario", this.usuario);
      bodyFormData.append("contrasena", this.password);

      axios.post(process.env.VUE_APP_API_URL+'auth/login', bodyFormData)
      .then( data => {
        if (data.data.exito) {

          this.error = false;
          this.mostrarAlertSeucce = true;

          localStorage.token = data.data.api_key;
          localStorage.usr_id = data.data.usr_id;
          
          setTimeout(() => {
            this.$router.push({name:'Rutas'})
          }, 2000);
          
        } else {
          this.mostrarAlertSeucce = false;
          this.error = true;
          this.error_msg = data.data.titulo ? data.data.error : data.data.error;
        }
      }).catch( err => {
        alert(err);
      });

    }
  }
};
</script>
