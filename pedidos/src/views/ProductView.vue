<template>
    <div>
        <h5>Productos</h5>
        <tabs>
            <template v-slot:lista>
                <search placeholder="Buscar producto" @searchtext="searchFx($event)"></search>
                <filter-group>
                    <filter-item :items="categories" label="Categoria"
                        @onfilter="onFilterFx('categoriesId', $event)"></filter-item>
                </filter-group>
                <table class="highlight responsive-table card">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items">
                            <td>{{ item.name }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.categories.name }}</td>
                            <td>
                                <router-link :to="'/product/'+item.id">
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
                    <h6>Formulario nuevo producto</h6>
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
                                <label for="phone"> precio</label>
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
    name: 'Product',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            categories: [],
            toSearch: '',
            toFilter: '',
            payload: {
                name: '',
                price: null,
                categoriesId: null
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
                url: this.api + '/products?_expand=categories' + this.toSearch + this.toFilter
            })
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
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
                method: 'post',
                url: this.api + '/products',
                data: this.payload
            })
                .then((response) => {
                    this.payload = {
                        name: '',
                        price: null,
                        categoriesId: null
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
                url: this.api + '/products/' + id
            })
                .then((response) => {
                    this.getItems();
                });
            }
        }
    },
    mounted() {
        this.getItems();
        this.getCategories();
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