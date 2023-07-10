<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <ruta-table-detalle></ruta-table-detalle>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RutaTableDetalle from "./components/RutaTableDetalle.vue";
export default {
    name: "rutaDetalle",
    components: {
        RutaTableDetalle
    }        
}
</script>

<style lang="scss" scoped>

</style>