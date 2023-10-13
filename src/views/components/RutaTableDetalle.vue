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
              <button type="button" v-bind:class="claseBotonRutaDetalle(detalle)" @click.prevent="openModal(detalle)" >
                <i class="fas fa-check"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="modalDetalleRuta" tabindex="-1" data-dismiss="modal" data-toggle="modal" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <div class="row">
              <h5 class="modal-title col-12">DOC {{ detalleRuta ? detalleRuta.rut_doc_id : '' }} </h5>
              <h5 class="modal-title col-12">Total Documento: {{ detalleRuta ? formatearMoneda(detalleRuta.rut_mon_doc) : '' }}</h5>
            </div>
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
                <div class="col-12 row">
                  <div class="col-8">
                    <h4>Pagos </h4>
                  </div>
                  <div class="col-4">
                    <!--<button class="btn btn-primary btn-sm" type="button" @click.prevent="agregarPagoDetalle()" >-->
                    <button class="btn btn-primary btn-sm" type="button" @click.prevent="abrirModalAddPago()" >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>

                <!--<table class="table table-condensed">
                  <thead>
                  <tr>
                    <th>Tipo pago</th>
                    <th>Monto</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody id="opc-pago-body">
                  <tr id="linea-pago-" name="linea-pago" >
                    <td class="has-success">
                      &lt;!&ndash;@change="validarSelectPago($event)"&ndash;&gt;
                      <select class="form-control" name="pago-estado" v-model="pagoItem.tipo" >
                        <option value="">&#45;&#45; Seleccionar &#45;&#45;</option>
                        <option v-for="pago in pagos" :key="pago.tip_id" :value="pago.tip_id" :selected="pago.tip_id === pago.tipo">{{ pago.tip_nom }}</option>
                      </select>
                    </td>
                    <td class="has-success">
                      &lt;!&ndash;onchange="validarInput(this)"&ndash;&gt;
                      <input type="number" name="monto-pago" v-model="pagoItem.monto" class="form-control" >
                    </td>
                    <td style="display: inline-flex">
                      <input type="hidden" name="id-pago" value="">
                      &lt;!&ndash;onchange="validarSoporte(this, '')"&ndash;&gt;
                      <input type="file" id="soporte" class="visually-hidden" accept="image/*" @change="onSelectFile($event)" >
                      <button class="btn btn-info btn-sm" type="button" onclick="$('#soporte').click()" >
                        <i class="fas fa-camera"></i>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>-->

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
                      <!--@change="validarSelectPago($event)"-->
                      <select class="form-control" name="pago-estado" v-model="pago.tipo" :disabled="true" >
                        <option value="">-- Seleccionar --</option>
                        <option v-for="pago in pagos" :key="pago.tip_id" :value="pago.tip_id" >{{ pago.tip_nom }}</option>
                      </select>
                    </td>
                    <td class="has-success">
                      <!--onchange="validarInput(this)"-->
                      <input type="text" name="monto-pago" :value="formatearMoneda(pago.monto)" class="form-control" :disabled="true" >
                    </td>
                    <td style="display: inline-flex">
                      <button class="btn btn-danger btn-sm" title="Eliminar pago" @click.prevent="eliminarPagoDetalle(pago)" >
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
              <div class="col-12 row">
                <div class="col-8">
                  <h4>Productos devueltos </h4>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary btn-sm" type="button" @click.prevent="abrirModalAddProductoDev()" >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <!--<table class="table table-condensed">
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
                    <select class="form-control" name="dev-prod" v-model="productoDevItem.prod" >
                      <option value="">&#45;&#45; Seleccionar &#45;&#45;</option>
                      <option v-for="producto in productosDetalleRutaLts" :key="producto.KOPRCT" :value="producto.KOPRCT">{{ producto.NOKOPR }}</option>
                    </select>
                  </td>
                  <td class="has-success">
                    <input type="number" name="cant-dev" class="form-control" v-model="productoDevItem.cant" max="" >
                    <input type="hidden" name="val-dev" id="val-dev" value="">
                  </td>
                </tr>
                </tbody>
              </table>-->

              <table class="table table-condensed">
                <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant</th>
                  <th></th>
                </tr>
                </thead>
                <tbody id="opc-dev-body">
                <tr id="linea-dev" name="linea-dev" v-for="productoDev in productosDevueltosLts" :key="productoDev.pro">
                  <td class="has-success">
                    <!-- onchange="validarSinRepetir(this)" -->
                    <select class="form-control" name="dev-prod" id="dev-prod" v-model="productoDev.prod" :disabled="true" >
                      <option value="">-- Seleccionar --</option>
                      <option v-for="producto in productosDetalleRutaLts" :key="producto.KOPRCT" :value="producto.KOPRCT">{{ producto.NOKOPR }}</option>
                    </select>
                  </td>
                  <td class="has-success">
                    <!-- onchange="validarInput(this)" -->
                    <input type="number" class="form-control" v-model="productoDev.cant" max="" :disabled="true" >
                    <!-- <input type="hidden" name="val-dev" id="val-dev"  value=""> -->
                  </td>
                  <td style="display: inline-flex">
                    <button class="btn btn-danger btn-sm" title="Eliminar devolución" type="button" @click.prevent="eliminarProductoDev(productoDev)" >
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
                      <!-- onchange="validarInput(this)"  -->
                      <select class="form-control" id="devolucion-estado" v-model="itemRuta.motivo_dev" >
                        <option value="">-- Seleccionar --</option>
                        <option v-for="motivo in motivos" :key="motivo.mot_id" :value="motivo.mot_id">{{ motivo.mot_nom }}</option>
                      </select>
                    </td>
                    <td>
                      <input type="file" id="soporte-dev" class="visually-hidden" accept="image/*" @change="onSelectFileMotivoDev($event)">
                      <button class="btn btn-success btn-sm" type="button" onclick="$('#soporte-dev').click()" id="btn-soporte-dev" >
                        <i class="fas fa-camera"></i>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="form-group alert alert-info">
              Total a cobrar: <span id="total-cobrar">{{ formatearMoneda(montoMostrarMensaje) }}</span> <small><i class="fas fa-exclamation-circle"></i> NO están considerados los PLANES</small>
            </div>

            <div class="form-group">
              <hr>
              <label>Observación</label>
              <textarea class="form-control" id="obs-estado" v-model="detalleRuta.rut_obs" ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click.prevent="closeModal()">Cerrar</button>
            <button type="button" class="btn btn-primary" @click.prevent="guardarEstadoRutaDetalle()">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalAgregarProductoDev" data-backdrop="static" data-dismiss="modal" data-toggle="modal" tabindex="-1" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar Producto Devuelto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="col-12 row container">
              <div class="col-12 ">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">Producto</label>
                  <select class="form-control" name="dev-prod" v-model="productoDevItem.prod" >
                    <option value="">&#45;&#45; Seleccionar &#45;&#45;</option>
                    <option v-for="producto in productosDetalleRutaLts" :key="producto.KOPRCT" :value="producto.KOPRCT">{{ producto.NOKOPR }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">Cantidad</label>
                  <input type="number" name="cant-dev" class="form-control" v-model="productoDevItem.cant" max="" >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger btn-sm" type="button" @click.prevent="cerrarModalAddProductoDev()" >
              Cancelar
            </button>
            <button class="btn btn-primary btn-sm" type="button" @click.prevent="agregarProductoDevolucion()" >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalAgregarPago" tabindex="-1" data-dismiss="modal" data-toggle="modal" data-backdrop="static" style="background:
    rgba(0,0,0,0.5);" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar Pago </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="col-12 row container">
              <div class="col-12 ">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">Tipo</label>
                  <select class="form-control" name="pago-estado" v-model="pagoItem.tipo" >
                    <option value="">-- Seleccionar --</option>
                    <option v-for="pago in pagos" :key="pago.tip_id" :value="pago.tip_id" :selected="pago.tip_id === pago.tipo">{{ pago.tip_nom }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">Monto</label>
                  <input type="number" name="monto-pago" v-model="pagoItem.monto" class="form-control" >
                </div>
                <div class="col-md-6">

                  <input type="file" id="soporte" class="visually-hidden" accept="image/*" @change="onSelectFile($event)" >
                  <button class="btn btn-info btn-sm" type="button" onclick="$('#soporte').click()" >
                    <i class="fas fa-camera"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger btn-sm" type="button" @click.prevent="cerrarModalAddPago()" >
              Cancelar
            </button>
            <button class="btn btn-primary btn-sm" type="button" @click.prevent="agregarPagoDetalle()" >
              Guardar
            </button>
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
      productosDetalleRutaLts: [],
      productosDevueltosLts: [],
      itemRuta: {
        est_id: 1,
        motivo_dev: ''
      },
      pagoItem: {
        id: '',
        tipo: '',
        monto: 0,
      },
      pagoDefault: {
        id: '',
        tipo: '',
        val: 0,
      },
      productoDevItem: {
        prod: '',
        cant: 0,
        val: 0,
        lin: ''
      },
      productoDevDefault: {
        prod: '',
        cant: 0,
        val: 0,
        lin: ''
      },
      detalleRutaDoc: {},

      mostrarPagos: false,
      mostrarProductosDev: false,
      mostrarMotivoDev: false,
      mostrarDescuento: false,
    }
  },
  mounted: function () {

    this.getDetalleRutas();
    this.getParametros();
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

      this.$swal.fire({
        title: 'Espera por favor...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timerProgressBar: true,
      });
      this.$swal.showLoading();

      let rut_id = null;
      if (this.$route.params.id) {
        rut_id = this.$route.params.id;
      }
      bodyFormData.append("rut_id", rut_id);

      axios.post(process.env.VUE_APP_API_URL+'rutas/detalleRuta', bodyFormData)
          .then( data => {
            if (data.data.exito) {
              this.detallesRutas = data.data.docs;
              for (let index = 0; index < this.detallesRutas.length; index++) {
                const element = this.detallesRutas[index];

                let bodyFormData2 = new FormData();
                bodyFormData2.append("usr_id", localStorage.getItem("usr_id"));
                bodyFormData2.append("api_key", localStorage.getItem("token"));
                bodyFormData2.append("id", element.rut_det_id);
                axios.post(process.env.VUE_APP_API_URL+'rutas/getPagos', bodyFormData2)
                .then( data => {
                  if (data.data.exito) {
                    element.pagos = data.data.pagos;
                    var suma = 0;
                    for (const pago of element.pagos) {
                      suma += pago.pag_mon;
                    }
                    element.rut_mon_pag = suma;
                  } else {
                    this.$swal.fire({
                      icon: "error",
                      title: "Error al obtener pagos",
                      text: false,
                      timer: false
                    });
                    element.pagos = [];
                  }
                });
              }
              this.$swal.fire({
                icon: "info",
                title: "Ruta Detalles Obtenidas",
                text: false,
                timer: false
              });
            } else {
              this.detallesRutas = [];
              this.$swal.fire({
                icon: "error",
                title: "Error al obtener ruta detalles",
                text: false,
                timer: false
              });
            }
            this.$swal.close();
          }).catch( err => {
        this.$swal.fire({
          icon: "error",
          title: "Error al obtener ruta detalles",
          text: err,
          timer: false
        });
      });
    },
    openModal (item) {

      this.getDetalleRuta(item);
      this.itemRuta.est_id = item.rut_est_id;
      this.onChangeSelectEstado2(item.rut_est_id);
      console.log(" opneModal = ", item.pagos);
      for (const pago of item.pagos) {
        var pag = {
          tipo: pago.tip_pag_id,
          monto: pago.pag_mon
        }
        this.pagosDetalleLts.push(pag);
      }
      // this.pagosDetalleLts = item.pagos;
      setTimeout(() => {
        $("#modalDetalleRuta").modal('show');
        this.detalleRuta = Object.assign({}, item);
      }, 300);

    },
    closeModal () {
      $("#modalDetalleRuta").modal('hide');
      setTimeout(() => {
        this.detalleRuta = Object.assign({});
        this.pagosDetalleLts = [];
        this.productosDevueltosLts = [];
        this.itemRuta.est_id = 0;
      }, 300)
    },

    abrirModalAddPago() {
      setTimeout(() => {
        this.pagoItem = Object.assign({}, this.pagoDefault);
        $("#modalAgregarPago").modal('show');
        $("modalDetalleRuta").addClass("custom-class");
      }, 300);
    },
    abrirModalAddProductoDev() {
      setTimeout(() => {
        this.productoDevItem = Object.assign({}, this.productoDevDefault);
        $("#modalAgregarProductoDev").modal('show');
        $("modalDetalleRuta").addClass("custom-class");
      }, 300);
    },
    cerrarModalAddPago() {
      setTimeout(() => {
        this.pagoItem = Object.assign({}, this.pagoDefault);
        $("#modalAgregarPago").modal('hide');
        $("modalDetalleRuta").removeClass("custom-class");
      }, 300);
    },
    cerrarModalAddProductoDev() {
      setTimeout(() => {
        this.productoDevItem = Object.assign({}, this.productoDevDefault);
        $("#modalAgregarProductoDev").modal('hide');
        $("modalDetalleRuta").removeClass("custom-class");
      }, 300);
    },
    getParametros() {
      let bodyFormData = new FormData();
      bodyFormData.append("usr_id", localStorage.getItem("usr_id"));
      bodyFormData.append("api_key", localStorage.getItem("token"));

      this.$swal.fire({
        title: 'Espera por favor...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timerProgressBar: true,
      });
      this.$swal.showLoading();

      axios.post(process.env.VUE_APP_API_URL+'rutas/parametros', bodyFormData)
          .then( data => {
            if (data.data.exito) {
              this.estados = data.data.estados;
              this.motivos = data.data.motivos;
              this.pagos = data.data.pagos;
            } else {
              this.estados = [];
              this.motivos = [];
              this.pagos = [];
              this.$swal.fire({
                icon: "error",
                title: "Error al obtener parametros",
                text: false,
                timer: false
              });
            }
            this.$swal.close();
          });
    },
    getDetalleRuta(detalleRuta) {
      this.detalleRutaDoc = detalleRuta;
      let bodyFormData = new FormData();
      bodyFormData.append("usr_id", localStorage.getItem("usr_id"));
      bodyFormData.append("api_key", localStorage.getItem("token"));
      bodyFormData.append("rut_doc_id", detalleRuta.rut_det_id);
      bodyFormData.append("rut_doc_tip", detalleRuta.rut_doc_tip);

      this.$swal.fire({
        title: 'Espera por favor...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timerProgressBar: true,
      });
      this.$swal.showLoading();

      axios.post(process.env.VUE_APP_API_URL+'rutas/detalleDoc', bodyFormData)
          .then( data => {
            if (data.data.exito) {
              this.productosDetalleRutaLts = data.data.detalle;
            } else {
              this.productosDetalleRutaLts = [];
              this.$swal.fire({
                icon: "error",
                title: "Error al obtener detalle",
                text: false,
                timer: false
              });
            }
            this.$swal.close();
          }).catch( err => {
        this.$swal.fire({
          icon: "error",
          title: "Error al obtener detalle",
          text: err,
          timer: false
        });
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
    onChangeSelectEstado2(valor) {
      var valueSelect = valor;

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

      if (!this.pagoItem.tipo || !this.pagoItem.monto) {
        alert("Debe ingresar tipo ó monto!");
      } else {
        if (!this.pagoItem.id) {
          let idTmp = 'TMP-' + Date.now();
          this.pagoItem.id = idTmp;
        }
        this.pagosDetalleLts.push(this.pagoItem);

        this.cerrarModalAddPago();

      }

    },
    agregarProductoDevolucion() {

      if (!this.productoDevItem.prod || !this.productoDevItem.cant) {
        alert("Debe seleccionar producto ó ingresar cantidad!");
      } else {

        if (this.validarNorePetidoProdDev(this.productoDevItem)) {
          alert("No se puede agregar un producto repetido!");
        } else if (this.validarCantidadProDev(this.productoDevItem)) {
          alert("No se puede ingresar una cantidad mayor del producto!");
        } else {

          const obj = this.productosDetalleRutaLts.find((obj) => obj.KOPRCT === this.productoDevItem.prod);

          this.productoDevItem.lin = obj.NULIDO;
          this.productoDevItem.val = parseInt(obj.PPPRBR) * this.productoDevItem.cant;

          this.productosDevueltosLts.push(this.productoDevItem);

          this.cerrarModalAddProductoDev();
        }

      }

    },
    eliminarPagoDetalle(item) {

      const objWithIdIndex = this.pagosDetalleLts.findIndex((obj) => obj.id === item.id);

      if (objWithIdIndex > -1) {
        this.pagosDetalleLts.splice(objWithIdIndex, 1);
      }

    },
    eliminarProductoDev(item) {

      const objWithIdIndex = this.productosDevueltosLts.findIndex((obj) => obj.pro_cod === item.pro_cod);

      if (objWithIdIndex > -1) {
        this.productosDevueltosLts.splice(objWithIdIndex, 1);
      }

    },
    validarSelectPago(event) {
      var valueSelect = event.target.value;
      console.log(valueSelect);
    },
    onSelectFile(e){

      this.pagoItem.soporte = e.target.files[0];

    },
    onSelectFileMotivoDev(e){

      this.itemRuta.soporte = e.target.files[0];

    },
    validarNorePetidoProdDev(item) {

      if (this.productosDevueltosLts.length > 0) {

        const objRepetido = this.productosDevueltosLts.find((obj) => obj.prod === item.prod);

        if (objRepetido) {
          return true;
        }
      }
      return false;

    },
    validarCantidadProDev(item) {

      const obj = this.productosDetalleRutaLts.find((obj) => obj.KOPRCT === item.prod);

      if (item.cant > obj.CAPRCO2) {
        return true;
      }

      return false;

    },
    ingresoValoresProDev() {
      
      if (this.productoDevItem) {
        
        const obj = this.productosDetalleRutaLts.find((obj) => obj.KOPRCT === this.productoDevItem.prod);
      
        if (obj) {
      
          this.productoDevItem.lin = obj.NULIDO;

          this.productoDevItem.val = parseInt(obj.PPPRBR) * this.productoDevItem.cant;
      
        }

      } else {
        this.productoDevItem = Object.assign({}, this.productoDevDefault);
      }
    },
    guardarEstadoRutaDetalle() {

      this.$swal.fire({
        title: 'Espera por favor...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timerProgressBar: true,
      });
      this.$swal.showLoading();

      // pendiente
      if (this.itemRuta.est_id == 1) {
        console.log('entro pendiente guardar');
      } else if (this.itemRuta.est_id == 2) {
        // entregado
        if (this.pagosDetalleLts.length < 0) {
          alert('Tiene que ingresar los pagos realizados!');
          return;
        }
      } else if (this.itemRuta.est_id == 3) {
        // devuelto
        if (!this.itemRuta.est_id)  {
          alert('Debe seleccionar un motivo de devolucion!');
          return;
        }
      } else if (this.itemRuta.est_id == 4) {
        // parcial
        if (!this.itemRuta.est_id)  {
          alert('Debe seleccionar un motivo de devolucion!');
          return;
        }
        if (this.pagosDetalleLts.length < 0) {
          alert('Tiene que ingresar los pagos realizados!');
          return;
        }
      } else if (this.itemRuta.est_id == 5) {
        // en ruta
        console.log('entro en ruta guardar');
      }

      let bodyFormData = new FormData();
      bodyFormData.append("usr_id", localStorage.getItem("usr_id"));
      bodyFormData.append("api_key", localStorage.getItem("token"));
      bodyFormData.append("id", this.detalleRutaDoc.rut_det_id);

      const objEstado = this.estados.find((obj) => obj.est_id == this.itemRuta.est_id);
      if (objEstado) {
        bodyFormData.append("estado", objEstado.est_cod);
      }
      bodyFormData.append("dev", this.itemRuta.motivo_dev);
      bodyFormData.append("soporteDev", this.itemRuta.soporte);

      for (let i = 0; i < this.pagosDetalleLts.length; i++) {
        const pago = this.pagosDetalleLts[i];
        bodyFormData.append(`pagos[${i}][tipo]`, pago.tipo);
        bodyFormData.append(`pagos[${i}][monto]`, pago.monto);
        pago.soporte && bodyFormData.append(`pagos[${i}][soporte]`, pago.soporte);
        pago.pag_id && bodyFormData.append(`pagos[${i}][pag_id]`, pago.pag_id);
      }

      for (let i = 0; i < this.productosDevueltosLts.length; i++) {
        const dev = this.productosDevueltosLts[i];
        bodyFormData.append(`devs[${i}][prod]`, dev.prod);
        bodyFormData.append(`devs[${i}][cant]`, dev.cant);
        bodyFormData.append(`devs[${i}][val]` , dev.val );
        bodyFormData.append(`devs[${i}][lin]` , dev.lin );
      }

      axios.post(process.env.VUE_APP_API_URL+'rutas/cambioEstadoDelPedido', bodyFormData)
          .then( data => {
            if (data.data.exito) {
              this.$swal.close();
              this.$swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Guardado con Exito',
                showConfirmButton: false,
                timer: 1500
              });
              this.closeModal();
              this.detallesRutas = [];
              this.getDetalleRutas();
            }
          }).catch( err => {
        console.error(err)
        this.$swal.close();
      });

    },
    claseBotonRutaDetalle(item) {
      if (item.rut_est_id == 1) {
        // pendiente
        return 'btn btn-info btn-sm';
      } else if (item.rut_est_id == 2) {
        // entregado
        return 'btn btn-success btn-sm';
      } else if (item.rut_est_id == 3) {
        // devuelto
        return 'btn btn-danger btn-sm';
      } else if (item.rut_est_id == 4) {
        // parcial
        return 'btn btn-warning btn-sm';
      } else if (item.rut_est_id == 5) {
        // en ruta
        return 'btn btn-primary btn-sm';
      }
      return 'btn btn-success btn-sm';
    },
    formatearMoneda(valor) {
      return new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(valor);
    }
  },
  computed: {
    montoMostrarMensaje() {
      if (this.detalleRuta && this.itemRuta) {
        if (this.itemRuta.est_id == 3) {
          return 0;
        } else if (this.itemRuta.est_id == 4) {
          let totalDevolucion = 0;
          for (let i = 0; i < this.productosDevueltosLts.length; i++) {
            const dev = this.productosDevueltosLts[i];
            totalDevolucion =+ (dev.cant * dev.val);
          }
          return (this.detalleRuta.rut_mon_doc - totalDevolucion);
        }
        return this.detalleRuta.rut_mon_doc;
      }
      return 0;
    }
  },
};
</script>

<style>

</style>
  