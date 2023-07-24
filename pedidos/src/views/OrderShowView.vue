<template>
  <div>
    <h5>ver order</h5>
    <div v-if="order !== null && city !== null">
      <p><b>Codigo orden:</b> {{ order.id }}</p>
      <p><b>Cliente:</b> {{ order.customers.name }}</p>
      <p><b>Departamento:</b> {{ city.states.name }}</p>
      <p><b>Ciudad:</b> {{ city.name }}</p>
      <p><b>Teléfono:</b> {{ order.customers.phone }}</p>

      <h5>Detalle</h5>
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
                    <td>{{ totalFx(item.quantity , item.products.price) }}</td>
                    
                </tr>
            </tbody>
        </table>
        <p><b>Total</b> {{ total }}</p>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'OrderShowView',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      order: null,
      city:null,
      total:0,
      details:[]
    }
  },
  components: {
  },
  methods:{
    totalFx(quantity, price){
      const result = quantity * price;
      // this.total = this.total + result;
      return result;
    },
    getOrder(){
      this.axios({
                method: 'get',
                url: this.api + '/orders/'+this.$route.params.id+"?_expand=customers"
            })
                .then((response) => {
                    this.order = response.data;
                    this.getCity(response.data.customers.citiesId);
                    this.getDetails(this.$route.params.id);
                    console.log(response);
                });
    },
    getCity(id){
      this.axios({
                method: 'get',
                url: this.api + '/cities/'+id+"?_expand=states"
            })
                .then((response) => {
                    this.city = response.data;
                    console.log(response);
                });
    },
    getDetails(orderId){
      this.axios({
                method: 'get',
                url: this.api + '/details?_expand=products&ordersId='+orderId
            })
                .then((response) => {
                    this.details = response.data;
                    for(var i=0 ; i<this.details.length; i++){
                      this.total += (this.details[i].quantity * this.details[i].products.price); 
                    }
                    console.log(response.data);
                });
    }
  },
  created(){
    this.getOrder();
  }
}
</script>
