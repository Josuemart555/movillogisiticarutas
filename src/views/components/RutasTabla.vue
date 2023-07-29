<template>
    <div class="card">
      <div class="card-header pb-0">
        <div class="pe-md-3 d-flex align-items-center ms-md-auto">
          <div class="input-group">
            <input
              type="date"
              class="form-control"
              v-model="fechaInput"
              @keydown.enter.prevent="obtenerRutas()"
            />
            <button class="btn btn-sm mb-0 shadow-sm input-group-text" @click="obtenerRutas">
              <i class="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ruta</th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Vehiculo</th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >Inicio</th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >Docs</th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >Kilos</th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ruta in rutas" :key="ruta.rut_id" >
                <td>
                    <span class="text-secondary text-xs font-weight-bold">{{ ruta.sucursal.suc_nom }}</span>
                </td>
                <td>
                    <span class="text-secondary text-xs font-weight-bold">{{ ruta.vehiculo.veh_pat }}</span>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="text-secondary text-xs font-weight-bold">{{ ruta.realizada.rut_fec_ini }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ ruta.realizada.rut_docs }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ ruta.realizada.rut_kgs }}</span>
                </td>
                <td class="align-middle">
                  <button class="btn btn-success btn-sm" data-toggle="tooltip" v-on:click="verRuta(ruta.rut_id)">
                    Ver
                  </button>
                  <button type="button" title="Cierre" class="btn btn-success btn-sm" @click.prevent="irCierre(ruta.rut_id)" >
                    Cierre
                  </button>
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
  export default {
    name: "rutas-table",
    data: function() {
        return {
            fechaInput: null,
            rutas: [],
            error: false,
            error_msg: ""
        }
    },
    methods: {
        obtenerRutas() {

            let bodyFormData = new FormData();
            bodyFormData.append("usr_id", localStorage.getItem("usr_id"));
            bodyFormData.append("api_key", localStorage.getItem("token"));
            bodyFormData.append("fec", this.fechaInput);
           
            axios.post('http://localhost/app-9/api/rutas/getRutasPorUsuario', bodyFormData)
            .then( data => {
                console.log(data);
                if (data.data.exito) {
                    this.rutas = data.data.rutas;
                } else {
                    this.rutas = [];
                }
            });
            
        },
        verRuta(rutaId) {
            this.$router.push({ name: 'RutaDetalle', params: { id: rutaId } });
        },
        irCierre(rutaId) {
          this.$router.push({ name: 'Cierre', params: { id: rutaId } });
        }
    }
  };
  </script>
  