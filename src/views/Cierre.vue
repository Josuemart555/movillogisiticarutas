<template>
  <div>
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
        <div class="col-12 row">
          <div class="col-3 ">
          </div>
          <div class="col-6 ">
            <div class="table-responsive p-0">
              <table class="table">
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
                    <input type="number" class="form-control" v-model="efectivo['20000']" >
                  </td>
                  <td class="text-end">{{ efectivo["20000"] * 20000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">10.000</th>
                  <td>
                    <input type="number" class="form-control" v-model="efectivo['10000']" >
                  </td>
                  <td class="text-end">{{ efectivo['10000'] * 10000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">5.000</th>
                  <td>
                    <input type="number" class="form-control" v-model="efectivo['5000']" >
                  </td>
                  <td class="text-end">{{ efectivo['5000'] * 5000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">2.000</th>
                  <td>
                    <input type="number" class="form-control" v-model="efectivo['2000']" >
                  </td>
                  <td class="text-end">{{ efectivo['2000'] * 2000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">1.000</th>
                  <td>
                    <input type="number" class="form-control" v-model="efectivo['1000']" >
                  </td>
                  <td class="text-end">{{ efectivo['1000'] * 1000 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">500</th>
                  <td>
                    <input type="number" class="form-control" v-model="efectivo['500']" >
                  </td>
                  <td class="text-end">{{ efectivo['500'] * 500 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">100</th>
                  <td>
                    <input type="number" class="form-control" v-model="efectivo['100']" >
                  </td>
                  <td class="text-end">{{ efectivo['100'] * 100 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">50</th>
                  <td>
                    <input type="number" class="form-control" v-model="efectivo['50']" >
                  </td>
                  <td class="text-end">{{ efectivo['50'] * 50 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end">10</th>
                  <td>
                    <input type="number" class="form-control" v-model="efectivo['10']" >
                  </td>
                  <td class="text-end">{{ efectivo['10'] * 10 }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-end"></th>
                  <td class="text-end">
                    Total
                  </td>
                  <td class="text-end">1562135</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-3 ">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cierre',
  mounted: function () {

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
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>