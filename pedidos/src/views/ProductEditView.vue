<template>
    <div>
        <h5>Editar Producto </h5>
        <div class="row card p-2" style="max-width: 650px;">
            <h6>Formulario editar cliente</h6>
            <form class="col s12" @submit.prevent="saveProduct()">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="name" type="text" class="validate" v-model="payload.name">
                        <label for="name"> Nombre</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="phone" type="number" class="validate" v-model="payload.price">
                        <label for="phone"> Precio</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <select v-model="payload.categoriesId" >
                            <option value="" disabled selected>Elija una categoria</option>
                            <option v-for="(value, key) in categories" :key="key" :value="value.id">{{ value.name }}
                            </option>
                        </select>
                        <label>Categoria</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Enviar
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'Customer',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            categories: [],
            payload: {
                
            }
        }
    },
    methods: {

        getItem() {
            this.axios({
                method: 'get',
                url: this.api + '/products/'+this.$route.params.id
            })
                .then((response) => {
                    this.payload = response.data;
                    setTimeout(function () {
                        M.updateTextFields();
                    });
                    console.log(response);
                });
        },
        getCategories() {
            this.axios({
                method: 'get',
                url: this.api + '/categories'
            })
                .then((response) => {
                    this.categories = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        saveProduct() {
            this.axios({
                method: 'patch',
                url: this.api + '/products/'+this.$route.params.id,
                data: this.payload
            })
                .then((response) => {
                   this.$router.push('/product');

                    console.log(response);
                });
        }
        
    },
    mounted() {
        this.getItem();
        this.getCategories();
        
    },
    components: {
        
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style scoped lang="scss">
i {
    cursor: pointer;
    margin-right: 10px;

}
</style>