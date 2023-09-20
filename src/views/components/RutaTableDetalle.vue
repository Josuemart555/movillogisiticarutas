<template>
    <div class="card">
      <div class="card-header pb-0">
        <div class="pe-md-3 d-flex align-items-center ms-md-auto">
          <div class="input-group">
            <a :href="'/rutas'" class="btn btn-primary btn-sm" >
              <i class="fas fa-arrow-left"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#</th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Tipo</th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >Doc</th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >Monto</th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >Estado</th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >Pagado</th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(detalle, index) in detallesRutas" :key="detalle.id" >
                <td>
                    <span class="text-secondary text-xs font-weight-bold">{{ (index + 1) }}</span>
                </td>
                <td>
                    <span class="text-secondary text-xs font-weight-bold">{{ detalle.rut_doc_tip }}</span>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="text-secondary text-xs font-weight-bold">{{ detalle.rut_doc_id }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ formatearMoneda(detalle.rut_mon_doc) }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ detalle.estado.est_nom }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ formatearMoneda(detalle.rut_mon_pag) }}</span>
                </td>
                <td class="align-middle">
                  <!--<button type="button" v-bind:class="claseBotonRutaDetalle(detalle)" @click.prevent="openModal(detalle)" >-->
                  <!--  <i class="fas fa-check"></i>-->
                  <!--</button>-->
                  <modal :detalle="detalle" :key="detalle.id"></modal>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </template>
  
  <script>
  import axios from 'axios';

  import modal from "@/views/components/RutalDetalleModal";

  export default {
    name: "ruta-detalle-table",
    components: {
      modal
    },
    data: function() {
        return {
          detallesRutas: [],

          detalleRutaDoc: {},

        }
    },
    mounted: function () {

      this.getDetalleRutas();

        this.montoMostrarMensaje;

    },
    created() {
      this.montoMostrarMensaje;
    },
    methods: {
      getDetalleRutas() {
        let bodyFormData = new FormData();
        bodyFormData.append("usr_id", localStorage.getItem("usr_id"));
        bodyFormData.append("api_key", localStorage.getItem("token"));

        let rut_id = null;
        if (this.$route.params.id) {
          rut_id = this.$route.params.id;
        }
        bodyFormData.append("rut_id", rut_id);

        axios.post('http://localhost/app-9/api/rutas/detalleRuta', bodyFormData)
            .then( data => {
              if (data.data.exito) {
                this.detallesRutas = data.data.docs;
                this.$swal.fire({
                  icon: "info",
                  title: "Ruta Detalles Obtenidas",
                  text: false,
                  timer: false
                });
              } else {
                this.detallesRutas = [];
              }
            }).catch( err => {
          this.$swal.fire({
            icon: "error",
            title: "Error al obtener ruta detalles",
            text: err,
            timer: false
          });
        });;
      },
      formatearMoneda(valor) {
        return new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(valor);
      }
    },
    computed: {

    },
  };
  </script>
  