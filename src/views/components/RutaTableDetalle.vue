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
                  <button type="button" class="btn btn-success btn-sm" @click.prevent="openModal(detalle)" >
                    <i class="fas fa-check"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="modal fade" id="modalDetalleRuta" tabindex="-1" aria-labelledby="modalDetalleRuta" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">DOC {{ detalleRuta ? detalleRuta.rut_doc_id : '' }} Total Documento: $ {{ detalleRuta ? detalleRuta.rut_mon_doc : '' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Estado:</label>
                <select class="form-select" v-model="itemRuta.est_id" @change="onChangeSelectEstado($event)">
                  <option v-for="estado in estados" :key="estado.est_id" :value="estado.est_id">{{ estado.est_nom }}</option>
                </select>
              </div>

              <div class="row hidden" id="opc-pago" name="opc-pago" v-show="mostrarPagos">
                <div class="col-sm-12">
                  <h4>Pagos <button class="btn btn-primary btn-sm" type="button" onclick="agregarLineaPago()" ><i class="fas fa-plus"></i></button></h4>
                  <table class="table table-condensed">
                    <thead>
                    <tr>
                      <th>Tipo pago</th>
                      <th>Monto</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody id="opc-pago-body">
                      <tr id="linea-pago-" name="linea-pago" v-for="pago in pagosDetalleLts" :key="pago.id">
                        <td class="has-success">
                          <select class="form-control" name="pago-estado" id="pago-estado-" @change="validarSelectPago($event)" >
                            <option value="">-- Seleccionar --</option>
                            <option v-for="pago in pagos" :key="pago.tip_id" :value="pago.tip_id">{{ pago.tip_nom }}</option>
                          </select>
                        </td>
                        <td class="has-success">
                          <input type="number" name="monto-pago" id="monto-pago-"  class="form-control" value="" onchange="validarInput(this)" >
                        </td>
                        <td style="display: inline-flex">
                          <input type="hidden" name="id-pago" id="id-pago-" value="">
                          <input type="file" id="soporte-" class="visually-hidden" onchange="validarSoporte(this, '')"  accept="image/*" value="">
                          <button class="btn btn-info btn-sm" type="button" onclick="$('#soporte-').click()" id="btn-soporte-" >
                            <i class="fas fa-camera"></i>
                          </button>
                          <button class="btn btn-danger btn-sm" title="Eliminar pago" onclick="eliminarLineaPago(0)" >
                            <i class="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr>
                </div>
              </div>

              <div class="form-group hidden" id="opc-prods" v-show="mostrarProductosDev">
                <h4>Productos devueltos <button class="btn btn-primary btn-sm" type="button" onclick="agregarLineaDevolucion()" ><i class="fas fa-plus"></i></button></h4>
                <table class="table table-condensed">
                  <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cant</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody id="opc-dev-body">
                    <tr id="linea-dev-" name="linea-dev">
                      <td class="has-success">
                        <select class="form-control" name="dev-prod" id="dev-prod-" onchange="validarSinRepetir(this)" >
                          <option value="">-- Seleccionar --</option>

                        </select>
                      </td>
                      <td class="has-success">
                        <input type="number" name="cant-dev" id="cant-dev-"  class="form-control" value="" onchange="validarInput(this)" max="" >
                        <input type="hidden" name="val-dev" id="val-dev-"  value="">
                      </td>
                      <td style="display: inline-flex">
                        <button class="btn btn-danger btn-sm" title="Eliminar devolución" type="button" onclick="eliminarLineaDev('0')" >
                          <i class="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="hidden" id="opc-devolucion" v-show="mostrarMotivoDev">
                <label>Motivo de devolucion</label><br>
                <div class="form-group" >
                  <table class="table table-condensed">
                    <tbody>
                    <tr>
                      <td class="form-group has-success">
                        <select class="form-control" id="devolucion-estado" onchange="validarInput(this)" >
                          <option value="">-- Seleccionar --</option>
                          <option v-for="motivo in motivos" :key="motivo.mot_id" :value="motivo.mot_id">{{ motivo.mot_nom }}</option>
                        </select>
                      </td>
                      <td>
                        <input type="file" id="soporte-dev" class="visually-hidden" onchange="validarSoporte(this, 'dev')"  accept="image/*" value="">
                        <button class="btn btn-success btn-sm" type="button" onclick="$('#soporte-dev').click()" id="btn-soporte-dev" >
                          <i class="fas fa-camera"></i>
                        </button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="form-group alert alert-info" id="opc-desc" v-show="mostrarDescuento">
                Total a cobrar: $ <span id="total-cobrar">0</span> <small><i class="fas fa-exclamation-circle"></i> NO están considerados los PLANES</small>
              </div>

              <div class="form-group alert alert-info">
                Total a cobrar: $ <span id="total-cobrar">{{ detalleRuta ? detalleRuta.rut_mon_doc : '' }}</span> <small><i class="fas fa-exclamation-circle"></i> NO están considerados los PLANES</small>
              </div>

              <div class="form-group">
                <hr>
                <label>Observación</label>
                <textarea class="form-control" id="obs-estado" v-model="detalleRuta.rut_obs" ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click.prevent="closeModal()">Cerrar</button>
              <button type="button" class="btn btn-primary">Guardar</button>
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
          detalleRuta: {
            rut_obs: ''
          },
          estados: [],
          motivos: [],
          pagos: [],
          pagosDetalleLts: [],
          itemRuta: {
            est_id: 1
          },

          mostrarPagos: false,
          mostrarProductosDev: false,
          mostrarMotivoDev: false,
          mostrarDescuento: false,
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
        this.getParametros();

        this.agregarPagoDetalle();
    },
    methods: {
      openModal (item) {
            $("#modalDetalleRuta").modal('show');
            this.detalleRuta = Object.assign({}, item);
        },
        closeModal () {
            $("#modalDetalleRuta").modal('hide');
            setTimeout(() => {
                this.detalleRuta = Object.assign({});
            }, 300)
        },
        getParametros() {
          let bodyFormData = new FormData();
          bodyFormData.append("usr_id", localStorage.getItem("usr_id"));
          bodyFormData.append("api_key", localStorage.getItem("token"));
          
          axios.post('http://localhost/app-9/api/rutas/parametros', bodyFormData)
          .then( data => {
              console.log(data);
              if (data.data.exito) {
                  this.estados = data.data.estados;
                  this.motivos = data.data.motivos;
                  this.pagos = data.data.pagos;
              } else {
                  this.estados = [];
                  this.motivos = [];
                  this.pagos = [];
              }
          });
        },
        onChangeSelectEstado(event) {
          var valueSelect = event.target.value;

          // pendiente
          if (valueSelect == 1) {
            this.mostrarProductosDev = false;
            this.mostrarMotivoDev = false;
            this.mostrarPagos = false;
            this.mostrarDescuento = false;
          } else if (valueSelect == 2) {
            // entregado
            this.mostrarProductosDev = false;
            this.mostrarMotivoDev = false;
            this.mostrarPagos = true;
            this.mostrarDescuento = false;
          } else if (valueSelect == 3) {
            // devuelto
            this.mostrarProductosDev = false;
            this.mostrarMotivoDev = true;
            this.mostrarPagos = false;
            this.mostrarDescuento = true;
          } else if (valueSelect == 4) {
            // parcial
            this.mostrarProductosDev = true;
            this.mostrarMotivoDev = true;
            this.mostrarPagos = true;
            this.mostrarDescuento = true;
          } else if (valueSelect == 5) {
            // en ruta
            this.mostrarProductosDev = false;
            this.mostrarMotivoDev = false;
            this.mostrarPagos = false;
            this.mostrarDescuento = false;
          } else {
            this.mostrarProductosDev = false;
            this.mostrarMotivoDev = false;
            this.mostrarPagos = false;
            this.mostrarDescuento = false;
          }
        },
        agregarPagoDetalle() {
          let idTmp = 'TMP-' + Date.now();
          var pagoNuevo = {
            id: idTmp
          };
          this.pagosDetalleLts.push(pagoNuevo);
        },
        validarSelectPago(event) {
          var valueSelect = event.target.value;
          console.log(valueSelect)
        }
    },
    computed: {
      
    }
  };
  </script>
  