<template>
  <div>
    <div class="card">
      <div class="card-header pb-0">
        <div class="pe-md-3 d-flex align-items-center ms-md-auto">
          <div class="input-group">

          </div>
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="col-12 row container">
          <div class="col-12 ">
            <div class="table-responsive p-0 ms-3">
              <h4>Billetes/Monedas </h4>
              <table class="table table-sm table-condensed">
                <thead>
                <tr>
                  <th scope="col">Valor</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">cantidad</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row" class="text-end">20.000</th>
                  <td>
                    <input type="number" class="form-control" min="1" pattern="^[0-9]" v-model="efectivo['20000']" @keypress="noPermitirIngresoNumeroNegativo($event)" >
                  </td>
                  <td class="text-end">{{ efectivo["20000"] * 20000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">10.000</th>
                  <td>
                    <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['10000']" @keypress="noPermitirIngresoNumeroNegativo($event)" >
                  </td>
                  <td class="text-end">{{ efectivo['10000'] * 10000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">5.000</th>
                  <td>
                    <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['5000']" @keypress="noPermitirIngresoNumeroNegativo($event)" >
                  </td>
                  <td class="text-end">{{ efectivo['5000'] * 5000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">2.000</th>
                  <td>
                    <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['2000']" @keypress="noPermitirIngresoNumeroNegativo($event)" >
                  </td>
                  <td class="text-end">{{ efectivo['2000'] * 2000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">1.000</th>
                  <td>
                    <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['1000']" @keypress="noPermitirIngresoNumeroNegativo($event)" >
                  </td>
                  <td class="text-end">{{ efectivo['1000'] * 1000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">500</th>
                  <td>
                    <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['500']" @keypress="noPermitirIngresoNumeroNegativo($event)" >
                  </td>
                  <td class="text-end">{{ efectivo['500'] * 500 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">100</th>
                  <td>
                    <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['100']" @keypress="noPermitirIngresoNumeroNegativo($event)" >
                  </td>
                  <td class="text-end">{{ efectivo['100'] * 100 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">50</th>
                  <td>
                    <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['50']" @keypress="noPermitirIngresoNumeroNegativo($event)" >
                  </td>
                  <td class="text-end">{{ efectivo['50'] * 50 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">10</th>
                  <td>
                    <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['10']" @keypress="noPermitirIngresoNumeroNegativo($event)" >
                  </td>
                  <td class="text-end">{{ efectivo['10'] * 10 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end"></th>
                  <td class="text-end">
                    Total
                  </td>
                  <td class="text-end">
                    {{efectivo["20000"] * 20000
                     +  efectivo['10000'] * 10000 
                    + efectivo['5000'] * 5000 
                  + efectivo['2000'] * 2000 
                + efectivo['1000'] * 1000 
              + efectivo['500'] * 500
            + efectivo['100'] * 100 
          + efectivo['50'] * 50 
        + efectivo['10'] * 10}}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group table-responsive">
              <h4>Depositos MAE </h4>
              <table class="table table-sm table-condensed">
                <thead>
                <tr>
                  <th>No Dep</th>
                  <th>Fecha/Hora</th>
                  <th>Monto</th>
                  <th></th>
                </tr>
                </thead>
                <tbody id="opc-dev-body">
                <tr id="linea-dev-" name="linea-dev">
                  <td class="has-success">
                    <input type="text" class="form-control" v-model="depositoMaeItem.num" >
                  </td>
                  <td class="has-success">
                    <input type="date" class="form-control" v-model="depositoMaeItem.fec" >
                  </td>
                  <td class="has-success">
                    <input type="number" class="form-control" v-model="depositoMaeItem.mon" >
                  </td>
                  <td style="display: inline-flex">
                    <button class="btn btn-primary btn-sm" type="button" @click.prevent="agregarDepositoMae()" >
                      <i class="fas fa-plus"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
              <table class="table table-condensed">
                <tbody id="opc-dev-body">
                <tr id="linea-dev" name="linea-dev" v-for="depositoMae in depositosMaeLts" :key="depositoMae.num">
                  <td class="has-success">
                    <input type="text" class="form-control" v-model="depositoMae.num" :disabled="true" >
                  </td>
                  <td class="has-success">
                    <input type="text" class="form-control" v-model="depositoMae.fec" :disabled="true" >
                  </td>
                  <td class="has-success">
                    <input type="number" class="form-control" v-model="depositoMae.mon" :disabled="true" >
                  </td>
                  <td style="display: inline-flex">
                    <button class="btn btn-danger btn-sm" title="Eliminar deposito" type="button" @click.prevent="eliminarDepositoMae(depositoMae)" >
                      <i class="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12">
              <div class="form-group table-responsive">
                <h4>Cierres TransBank </h4>
                <table class="table table-sm table-condensed">
                  <thead>
                  <tr>
                    <th>Terminal</th>
                    <th>Fecha/Hora</th>
                    <th>Monto</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody id="opc-dev-body">
                  <tr id="linea-dev-" name="linea-dev">
                    <td class="has-success">
                      <input type="text" class="form-control" v-model="cierreTransBankItem.cod" >
                    </td>
                    <td class="has-success">
                      <input type="date" class="form-control" v-model="cierreTransBankItem.fec" >
                    </td>
                    <td class="has-success">
                      <input type="number" class="form-control" v-model="cierreTransBankItem.mon" >
                    </td>
                    <td style="display: inline-flex">
                      <button class="btn btn-primary btn-sm" type="button" @click.prevent="agregarCierreTransBank()" >
                        <i class="fas fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table class="table table-condensed">
                  <tbody id="opc-dev-body">
                  <tr id="linea-dev" name="linea-dev" v-for="cierreTransBank in cierresTransBankLts" :key="cierreTransBank.cod">
                    <td class="has-success">
                      <input type="text" class="form-control" v-model="cierreTransBank.cod" :disabled="true" >
                    </td>
                    <td class="has-success">
                      <input type="text" class="form-control" v-model="cierreTransBank.fec" :disabled="true" >
                    </td>
                    <td class="has-success">
                      <input type="number" class="form-control" v-model="cierreTransBank.mon" :disabled="true" >
                    </td>
                    <td style="display: inline-flex">
                      <button class="btn btn-danger btn-sm" title="Eliminar cierre" type="button" @click.prevent="eliminarCierreTransBank(cierreTransBank)" >
                        <i class="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button type="button" class="btn btn-success" @click.prevent="guardarCierre()">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>
          Guardar
        </button>
      </div>
    </div>

    <div class="modal fade" id="modalResuemnCierre" tabindex="-1" aria-labelledby="modalResuemnCierre" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Resumen </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="col-12 row container">
              <div class="col-12 ">
                <div class="table-responsive p-0 ms-3">
                  <h4>Billetes/Monedas </h4>
                  <table class="table table-sm table-condensed">
                    <thead>
                    <tr>
                      <th scope="col">Valor</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">cantidad</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th scope="row" class="text-end">20.000</th>
                      <td>
                        <input type="number" class="form-control" min="1" pattern="^[0-9]" v-model="efectivo['20000']" @keypress="noPermitirIngresoNumeroNegativo($event)" disabled >
                      </td>
                      <td class="text-end">{{ efectivo["20000"] * 20000 }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-end">10.000</th>
                      <td>
                        <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['10000']" @keypress="noPermitirIngresoNumeroNegativo($event)" disabled >
                      </td>
                      <td class="text-end">{{ efectivo['10000'] * 10000 }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-end">5.000</th>
                      <td>
                        <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['5000']" @keypress="noPermitirIngresoNumeroNegativo($event)" disabled >
                      </td>
                      <td class="text-end">{{ efectivo['5000'] * 5000 }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-end">2.000</th>
                      <td>
                        <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['2000']" @keypress="noPermitirIngresoNumeroNegativo($event)" disabled >
                      </td>
                      <td class="text-end">{{ efectivo['2000'] * 2000 }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-end">1.000</th>
                      <td>
                        <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['1000']" @keypress="noPermitirIngresoNumeroNegativo($event)" disabled >
                      </td>
                      <td class="text-end">{{ efectivo['1000'] * 1000 }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-end">500</th>
                      <td>
                        <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['500']" @keypress="noPermitirIngresoNumeroNegativo($event)" disabled >
                      </td>
                      <td class="text-end">{{ efectivo['500'] * 500 }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-end">100</th>
                      <td>
                        <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['100']" @keypress="noPermitirIngresoNumeroNegativo($event)" disabled >
                      </td>
                      <td class="text-end">{{ efectivo['100'] * 100 }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-end">50</th>
                      <td>
                        <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['50']" @keypress="noPermitirIngresoNumeroNegativo($event)" disabled >
                      </td>
                      <td class="text-end">{{ efectivo['50'] * 50 }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-end">10</th>
                      <td>
                        <input type="number" class="form-control" min="1" pattern="^[0-9]+" v-model="efectivo['10']" @keypress="noPermitirIngresoNumeroNegativo($event)" disabled >
                      </td>
                      <td class="text-end">{{ efectivo['10'] * 10 }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-end"></th>
                      <td class="text-end">
                        Total
                      </td>
                      <td class="text-end">
                        {{efectivo["20000"] * 20000
                         +  efectivo['10000'] * 10000 
                        + efectivo['5000'] * 5000 
                      + efectivo['2000'] * 2000 
                    + efectivo['1000'] * 1000 
                  + efectivo['500'] * 500
                + efectivo['100'] * 100 
              + efectivo['50'] * 50 
            + efectivo['10'] * 10}}
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group table-responsive">
                  <h4>Depositos MAE </h4>
                  <table class="table table-condensed">
                    <tbody id="opc-dev-body">
                    <tr id="linea-dev" name="linea-dev" v-for="depositoMae in depositosMaeLts" :key="depositoMae.num">
                      <td class="has-success">
                        <input type="text" class="form-control" v-model="depositoMae.num" :disabled="true" >
                      </td>
                      <td class="has-success">
                        <input type="text" class="form-control" v-model="depositoMae.fec" :disabled="true" >
                      </td>
                      <td class="has-success">
                        <input type="number" class="form-control" v-model="depositoMae.mon" :disabled="true" >
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-12">
                  <div class="form-group table-responsive">
                    <h4>Cierres TransBank </h4>
                    <table class="table table-condensed">
                      <tbody id="opc-dev-body">
                      <tr id="linea-dev" name="linea-dev" v-for="cierreTransBank in cierresTransBankLts" :key="cierreTransBank.cod">
                        <td class="has-success">
                          <input type="text" class="form-control" v-model="cierreTransBank.cod" :disabled="true" >
                        </td>
                        <td class="has-success">
                          <input type="text" class="form-control" v-model="cierreTransBank.fec" :disabled="true" >
                        </td>
                        <td class="has-success">
                          <input type="number" class="form-control" v-model="cierreTransBank.mon" :disabled="true" >
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-primary" @click.prevent="redireccionACierre()">Aceptar</button> -->
            <a class="btn btn-primary" :href="'/ruta/cierre/'+this.$route.params.id" >Aceptar</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import $ from 'jquery';

export default {
  name: 'cierre',
  mounted: function () {
    this.getCierre();
  },
  data: function () {
    return {
      efectivo: {
        20000: 0,
        10000: 0,
        5000: 0,
        2000: 0,
        1000: 0,
        500: 0,
        100: 0,
        50: 0,
        10: 0
      },

      depositosMaeLts: [],
      depositoMaeItem: {
        num: '',
        fec: '',
        mon: 0,
      },
      depositoMaeDefault: {
        num: '',
        fec: '',
        mon: 0,
      },

      cierresTransBankLts: [],
      cierreTransBankItem: {
        cod: '',
        fec: '',
        mon: 0,
      },
      cierreTransBankDefault: {
        cod: '',
        fec: '',
        mon: 0,
      }
    }
  },
  methods: {
    agregarDepositoMae() {
      if (!this.depositoMaeItem.num) {
        alert('Debe ingresar el numero deposito');
        return;
      }
      if (!this.depositoMaeItem.fec) {
        alert('Debe ingresar la fecha deposito');
        return;
      }
      if (!this.depositoMaeItem.mon) {
        alert('Debe ingresar el mont deposito');
        return;
      }

      this.depositosMaeLts.push(this.depositoMaeItem);
      this.depositoMaeItem = Object.assign({}, this.depositoMaeDefault);

    },
    eliminarDepositoMae(item) {
      const objWithIdIndex = this.depositosMaeLts.findIndex((obj) => obj.num === item.num);

      if (objWithIdIndex > -1) {
        this.depositosMaeLts.splice(objWithIdIndex, 1);
      }
    },
    agregarCierreTransBank() {
      if (!this.cierreTransBankItem.cod) {
        alert('Debe ingresar el codigo de cierre');
        return;
      }
      if (!this.cierreTransBankItem.fec) {
        alert('Debe ingresar la fecha de cierre');
        return;
      }
      if (!this.cierreTransBankItem.mon) {
        alert('Debe ingresar el monto de cierre');
        return;
      }

      this.cierresTransBankLts.push(this.cierreTransBankItem);
      this.cierreTransBankItem = Object.assign({}, this.cierreTransBankDefault);

    },
    eliminarCierreTransBank(item) {
      const objWithIdIndex = this.cierresTransBankLts.findIndex((obj) => obj.cod === item.cod);

      if (objWithIdIndex > -1) {
        this.cierresTransBankLts.splice(objWithIdIndex, 1);
      }
    },
    noPermitirIngresoNumeroNegativo(evento) {
      const elemento = evento.target;
      const teclaPresionada = evento.key;
      const teclaPresionadaEsUnNumero =
          Number.isInteger(parseInt(teclaPresionada));

      const sePresionoUnaTeclaNoAdmitida =
          teclaPresionada != 'ArrowDown' &&
          teclaPresionada != 'ArrowUp' &&
          teclaPresionada != 'ArrowLeft' &&
          teclaPresionada != 'ArrowRight' &&
          teclaPresionada != 'Backspace' &&
          teclaPresionada != 'Delete' &&
          teclaPresionada != 'Enter' &&
          !teclaPresionadaEsUnNumero;
      const comienzaPorCero =
          elemento.value.length === 0 &&
          teclaPresionada == 0;

      if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault();
      }
    },
    getCierre() {

      let bodyFormData = new FormData();
      bodyFormData.append("usr_id", localStorage.getItem("usr_id"));
      bodyFormData.append("api_key", localStorage.getItem("token"));
      var rut_id = null;
      if (this.$route.params.id) {
        rut_id = this.$route.params.id;
      }
      bodyFormData.append("rut_id", rut_id);

      axios.post('http://localhost/app-9/api/rutas/getCierre', bodyFormData)
          .then( data => {
            if (data.data.exito) {
              console.log(data);
              this.efectivo[10] = data.data.efectivo.cant_10;
              this.efectivo[50] = data.data.efectivo.cant_50;
              this.efectivo[100] = data.data.efectivo.cant_100;
              this.efectivo[500] = data.data.efectivo.cant_500;
              this.efectivo[1000] = data.data.efectivo.cant_1000;
              this.efectivo[2000] = data.data.efectivo.cant_2000;
              this.efectivo[5000] = data.data.efectivo.cant_5000;
              this.efectivo[10000] = data.data.efectivo.cant_10000;
              this.efectivo[20000] = data.data.efectivo.cant_20000;

              for (let index = 0; index < data.data.mae.length; index++) {
                const element = data.data.mae[index];
                let mae = {
                  num: element.mae_num,
                  mon: element.mae_mon,
                  fec: element.mae_fec
                };
                this.depositosMaeLts.push(mae);                
              }

              for (let index = 0; index < data.data.tb.length; index++) {
                const element = data.data.tb[index];
                console.log(element);
                let tb = {
                  cod: element.tb_cod,
                  mon: element.tb_mon,
                  fec: element.tb_fec
                }
                this.cierresTransBankLts.push(tb);
              }
              // this.$router.push({ name: 'Cierre', params: { id: rut_id } });
            }
          });

    },
    guardarCierre() {

      let bodyFormData = new FormData();
      bodyFormData.append("usr_id", localStorage.getItem("usr_id"));
      bodyFormData.append("api_key", localStorage.getItem("token"));

      var rut_id = null;
      if (this.$route.params.id) {
        rut_id = this.$route.params.id;
      }
      bodyFormData.append("rut_id", rut_id);

      for (let i = 0; i < this.efectivo.length; i++) {
        const dev = this.efectivo[i];
        console.log(dev)

      }

      // bodyFormData.append(`efectivo`, this.efectivo);
      for ( var key in this.efectivo ) {
        bodyFormData.append(`efectivo[${key}]`, this.efectivo[key]);
      }

      for (let i = 0; i < this.depositosMaeLts.length; i++) {
        const dev = this.depositosMaeLts[i];
        bodyFormData.append(`mae[${i}][num]`, dev.num);
        bodyFormData.append(`mae[${i}][fec]`, dev.fec);
        bodyFormData.append(`mae[${i}][mon]`, dev.mon);
      }

      for (let i = 0; i < this.depositosMaeLts.length; i++) {
        const dev = this.depositosMaeLts[i];
        bodyFormData.append(`tb[${i}][cod]`, dev.cod);
        bodyFormData.append(`tb[${i}][fec]`, dev.fec);
        bodyFormData.append(`tb[${i}][mon]`, dev.mon);
      }

      axios.post('http://localhost/app-9/api/rutas/guardarCierre', bodyFormData)
      .then( data => {
        if (data.data.exito) {
          console.log('entro if exitoso');
          console.log(data);
          $("#modalResuemnCierre").modal('show');
          // this.$router.push({ name: 'Cierre', params: { id: rut_id } });
        }
      });

    },
    redireccionACierre() {
      console.log('entra en metodo');
      var rut_id = null;
      if (this.$route.params.id) {
        rut_id = this.$route.params.id;
        console.log('rut_id', rut_id);
      }
      $("#modalResuemnCierre").modal('hide');
      setTimeout(() => {
        this.$router.push({ name: 'Cierre', params: { id: rut_id } });
      }, 300);
      // this.$router.push({ name: 'Cierre', params: { id: rut_id } });
      // window.location.href = 'http://localhost:8080/ruta/cierre/'+rut_id;

    }
  }
}
</script>

<style scoped lang="scss">

</style>