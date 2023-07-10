<template>
    <div class="card">
      <div class="card-header pb-0">
        <div class="pe-md-3 d-flex align-items-center ms-md-auto">
          <div class="input-group">
            <!-- <input
              type="date"
              class="form-control"
              v-model="fechaInput"
              @keydown.enter.prevent="obtenerRutas()"
            />
            <button class="btn btn-sm mb-0 shadow-sm input-group-text" @click="obtenerRutas">
              <i class="fas fa-search" aria-hidden="true"></i>
            </button> -->
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
                  <span class="text-secondary text-xs font-weight-bold">${{ detalle.rut_mon_doc }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ detalle.estado.est_nom }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">${{ detalle.rut_mon_pag }}</span>
                </td>
                <td class="align-middle">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click.prevent="openModal()" >
                    Launch demo modal
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="modal fade" id="modalDetalleRuta" tabindex="-1" aria-labelledby="modalDetalleRuta" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import $ from 'jquery';

  export default {
    name: "ruta-detalle-table",
    data: function() {
        return {
          detallesRutas: [],
        }
    },
    mounted: function () {
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
            console.log(data);
            if (data.data.exito) {
                this.detallesRutas = data.data.docs;
            } else {
                this.detallesRutas = [];
            }
        });
    },
    methods: {
      openModal () {
            console.log("openModal");
            $("#modalDetalleRuta").modal('show');
            // this.editedItem = Object.assign({}, this.defaultItem);
        },
        closeModal () {
          console.log("closeModal");
            $("#modalDetalleRuta").modal('hide');
            setTimeout(() => {
                // this.editedItem = Object.assign({}, this.defaultItem);
            }, 300)
        },
    }
  };
  </script>
  