<template>
<div class="wrapper">
    <div id="warning" v-if="empty">
        No Ingredients
    </div>
    <div v-else class="ingredient-container" >
        <div class="ingredient" v-for="(ingredient, index) in ingredients" :key="ingredient.id">
               <div class="ingredient-name">
                    <label>Ingredient</label>
                    <p></p>
                    <input id="name-box" v-model="ingredientName[index]"> 
                    <p></p>
               </div>
               <div class="ingredient-quantity">
               <label>Amount</label>
               <p></p>
               <input id="quantity-box" v-model="ingredientQuantity[index]" >
               <select v-model="ingredientUnit[index]" name="units" id="units" placeholder="units">
                    <option  value="cups" selected>cups</option>
                    <option value="teaspoons">tsp</option>
                    <option value="tablespoons">tbsp</option>
                    <option value="cans">cans</option>
                    <option value="package">pckg</option>
                    <option value="oz">oz</option>
                    <option value="liter">liters</option>
                    <option value="unit">of item</option>
                    <option value="pinch">pinch/dash</option>
                    <option value="none">other</option>
            </select> <button>X</button>
               <p></p>
               </div>

            
        </div>  
    </div>
</div>
</template>

<script>
export default {
  name: 'AddedIngredientList',
  data() {
    return {
        ingredientName:[],
        ingredientQuantity:[],
        ingredientUnit:[],

    }
  },
  props: {
    ingredients: Array,
  },
   computed: {
      empty(){
        return (this.ingredients.length == 0);
      },
    
  },
  methods: {
  returnData(){
        let updatedIngredient = this.ingredients;
        console.log("before return loop");
         for(let i = 0; i < this.ingredients.length; i++){
              updatedIngredient[i] = {ingredient: this.ingredientName[i], quantity: this.ingredientQuantity[i], measurement: this.ingredientUnit[i]}
         }
        console.log("updating works " + updatedIngredient.length)
        return updatedIngredient;
     },

    // removeItem(ingredient) {
    //   let id = ingredient.ingredient;
    //   this.$root.$data.ingredients = this.$root.$data.ingredients.filter( item => item.ingredient != id);
    // }
  }
}
</script>

<style scoped>
.wrapper {
  
  display: flex;
  align-content: center;
}
#warning{
  width: 100%;
  margin-top: 75px;
  color: #f0f0f0;
  text-align: center;
  font-size: 28px;
}
.ingredient-container{
    display:flex;
    flex-direction: column;
    width: 100%;
}
.ingredient{
    
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
}
.ingredient input{
    margin-right: 5px;
}

#quantity-box{
    width: 60px;
   
}
.auto {
  margin-left: auto;
}
</style>