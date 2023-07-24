<template>
    <div>
        <h5>Preventa</h5>
        <tabs>
            <template v-slot:lista>
                <filter-group>
                    <filter-item :items="customers" label="Clientes"
                        @onfilter="onFilterFx('customersId', $event)"></filter-item>
                </filter-group>
                <table class="highlight responsive-table card">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>fecha</th>
                            <th>cliente</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items">
                            <td>{{ item.id }}</td>
                            <td>{{ item.date }}</td>
                            <td>{{ item.customers.name }}</td>
                            <td>
                                <router-link :to="'/order/' + item.id + '/show'">
                                    <i class="material-icons">assignment</i>
                                </router-link>
                                <router-link :to="'/order/'+item.id">
                                    <i class="material-icons">create</i>
                                </router-link>
                                    <i class="material-icons" style="color: red" @click="eliminarItem(item.id)">delete_forever</i>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </template>
            <template v-slot:nuevo>
                <div class="row card p-2" style="max-width: 650px;">
                    <h6>Formulario nueva orden</h6>
                    <form class="col s12" @submit.prevent="saveOrder()">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="name" type="date" class="validate" v-model="payload.date">
                                <label for="name"> fecha</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <select v-model="payload.customersId" >
                                    <option value="" disabled selected>Elija un cliente</option>
                                    <option v-for="(value, key) in customers" :key="key" :value="value.id">{{ value.name }}
                                    </option>
                                </select>
                                <label>Cliente</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                                    <i class="material-icons right">enviar</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </template>
        </tabs>
    </div>
</template>
  
<script>

import Tabs from '@/components/Tabs.vue';
import Search from '@/components/Search.vue';
import FilterItem from '@/components/FilterItem.vue';
import FilterGroup from '@/components/FilterGroup.vue';
export default {
    name: 'Order',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            customers: [],
            toSearch: '',
            toFilter: '',
            payload: {
                date: null,
                customersId: null
            }
        }
    },
    methods: {

        onFilterFx(field, event) {
            if (event === '') {
                this.toFilter = '';
            } else {
                this.toFilter = '&' + field + '=' + event;
            }
            this.getItems();
        },
        getItems() {
            this.axios({
                method: 'get',
                url: this.api + '/orders?_expand=customers' + this.toSearch + this.toFilter
            })
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
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
                method: 'post',
                url: this.api + '/orders',
                data: this.payload
            })
                .then((response) => {
                    this.$router.push("/order/" + response.data.id);
                    this.payload = {
                        date: null,
                        customersId: null
                    };
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    this.getItems();

                    console.log(response);
                });
        },
        searchFx(event) {
            if (event === "") {
                this.toSearch = '';
            } else {
                this.toSearch = '&q=' + event;
            }
            this.getItems();
            console.log('search', event);
        },
        eliminarItem(id){
            if(confirm("Esta seguro que desea eliminar.")){
            this.axios({
                method: 'delete',
                url: this.api + '/orders/' + id
            })
                .then((response) => {
                    this.getItems();
                });
            }
        }
    },
    mounted() {
        this.getItems();
        this.getCustomers();
    },
    components: {
        Tabs, Search, FilterItem, FilterGroup
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style>

</style>