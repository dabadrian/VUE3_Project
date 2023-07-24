<template>
    <div>
        <h5>Editar preventa </h5>
        <div class="row card p-2" style="max-width: 650px;">
            <h6>Formulario editar preventa</h6>
            <form class="col s12" @submit.prevent="saveOrder()">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="name" type="date" class="validate" v-model="payload.date">
                        <label for="name"> Fecha</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <select v-model="payload.customersId">
                            <option value="" disabled selected>Elija un cliente</option>
                            <option v-for="(value, key) in customers" :key="key" :value="value.id">{{ value.name }}
                            </option>
                        </select>
                        <label>Cliente</label>
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

        <h5>Detalle </h5>
        <button data-target="modal1" class="btn modal-trigger">
            Agregar <i class="material-icons right">add</i>
        </button>

        <table class="highlight responsive-table card">
            <thead>
                <tr>
                    <th>Cod. Prod.</th>
                    <th>Cantidad</th>
                    <th>Descripcion</th>
                    <th>P.U.</th>
                    <th>Total</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in details">
                    <td>{{ item.productsId }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.products.name }}</td>
                    <td>{{ item.products.price }}</td>
                    <td>{{ item.quantity * item.products.price }}</td>
                    <td>
                        
                        <i class="material-icons" style="color: red" @click="deleteDetail(item.id)">delete_forever</i>
                    </td>
                </tr>
            </tbody>
        </table>
        <pre>{{payloadDetail}}</pre>
        <div id="modal1" class="modal">
            <div class="">
                <h5>Agregar un producto a la orden de preventa</h5>
                <form @submit.prevent="saveDetail()">
                    <div class="row">
                        <div class="input-field col s12">
                            <select v-model="payloadDetail.productsId">
                                <option value="" disabled selected>Elija un producto</option>
                                <option v-for="(value, key) in products" :key="key" :value="value.id">
                                    {{ value.name }}
                                </option>
                            </select>
                            <label>Producto</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            Cantidad:
                            <div class="input-field inline">
                                <input id="email_inline" type="number" style="width: 50px;" class="validate" v-model="payloadDetail.quantity">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <button class="modal-close btn waves-effect waves-light" type="submit" name="action">Agregar
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

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
            customers: [],
            details: [],
            products: [],
            items: [],
            payload: {

            },
            payloadDetail:{
                ordersId: null,
                productsId: null,
                quantity:1,
            }
        }
    },
    methods: {
        deleteDetail(id){
            if(confirm("Esta seguro de eliminar este item.")){
            this.axios({
                method: 'delete',
                url: this.api + '/details/'+id
            })
                .then((response) => {
                    this.getDetails();
                });
            }
        },
        saveDetail(){
            this.axios({
                method: 'post',
                url: this.api + '/details',
                data: this.payloadDetail
            })
                .then((response) => {
                    this.payloadDetail.productsId = null;
                    this.payloadDetail.quantity = 1;
                    this.getDetails();
                    console.log(response);
                });
        },
        getProducts() {
            this.axios({
                method: 'get',
                url: this.api + '/products'
            })
                .then((response) => {
                    this.products = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        getItem() {
            this.axios({
                method: 'get',
                url: this.api + '/orders/' + this.$route.params.id
            })
                .then((response) => {
                    this.payload = response.data;
                    this.payloadDetail.ordersId = this.payload.id;
                    setTimeout(function () {
                        M.updateTextFields();
                    });
                    this.getDetails();
                    console.log(response);
                });
        },
        getDetails() {
            this.axios({
                method: 'get',
                url: this.api + '/details?_expand=products&ordersId=' + this.$route.params.id
            })
                .then((response) => {
                    this.details = response.data;
                    setTimeout(function () {
                        M.updateTextFields();
                    });
                    console.log(response);
                });
        },
        getCustomers() {
            this.axios({
                method: 'get',
                url: this.api + '/customers'
            })
                .then((response) => {
                    this.customers = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        saveOrder() {
            this.axios({
                method: 'patch',
                url: this.api + '/orders/' + this.$route.params.id,
                data: this.payload
            })
                .then((response) => {
                    this.$router.push('/order');

                    console.log(response);
                });
        }

    },
    mounted() {
        this.getItem();
        this.getCustomers();
        this.getProducts();
    },
    components: {

    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
            var modals = document.querySelectorAll('.modal');
            var instances = M.Modal.init(modals);
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