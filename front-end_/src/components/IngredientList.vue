<template>
<div class="wrapper">
    <div  class="list-container">
<table  class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Item</th>
                    <th></th>
                    <th></th>
                    <th>Quantity</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
          <tr v-for="ingredient in ingredients" :key="ingredient.ingredient">
                    <td>{{ingredient.ingredient}}</td>
                    <td> </td>
                    <td> </td>
                    <td>{{ingredient.quantity}} {{ingredient.measurement}}</td>
                    <td> </td>
                    <td><button @click="removeItem(ingredient)" class="auto">X</button></td>
          </tr>
          </tbody>
        </table>
    </div>
    
</div>
</template>

<script>
export default {
  name: 'IngredientList',
  props: {
    ingredients: Array
  },
   computed: {
      empty(){
        return (this.$root.$data.ingredients.length == 0);
      }
  },
  methods: {
    removeItem(ingredient) {
      let id = ingredient.ingredient;
      this.$root.$data.ingredients = this.$root.$data.ingredients.filter( item => item.ingredient != id);
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 50px;
  display: flex;
  align-content: center;
}
#warning{
  width: 100%;
  text-align: center;
}
.list-container{
  width: 600px;
  
  margin-left: auto;
  margin-right: auto;
}
table{
 margin-left: auto;
 margin-right: auto;
 width: 100%;


}
th{
  border-bottom: solid;
  font-size: 30px;
}
tr{
  font-size: 20px;
}

thead th:nth-child(0) {
  width: 60%;
  
}
thead th:nth-child(2) {
  margin-left: 10px;
  width: 10%;
}
thead th:nth-child(3) {
  margin-left: 10px;
  width: 10%;
}

tr:nth-child(even) {background: #CCC}
tr:nth-child(odd) {background: #FFF}




.table button{
  background: none;
  border: none;
  color: red;
}

.auto {
  margin-left: auto;
}
</style>