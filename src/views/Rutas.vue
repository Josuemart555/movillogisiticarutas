<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <rutas-table></rutas-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RutasTable from "./components/RutasTabla.vue";
export default {
    name: "rutas",
    components: {
        RutasTable
    }        
}
</script>

<style lang="scss" scoped>

</style>