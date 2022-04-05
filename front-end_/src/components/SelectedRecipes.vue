<template>
<div class="wrapper">
  <div class="recipes">
    <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
        <div class="button-container">
          <button @click="removeItem(recipe)" class="auto">X</button>
        </div>
        <div class="image">
            <img :src="recipe.image">
        </div>
        <div class="info">
          <h1>{{recipe.name}}</h1>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'RecipeList',
  props: {
    recipes: Array
  },
  methods: {
    removeItem(recipe) {
        //let temp =[];
        let id = recipe._id;
        
        this.$root.$data.selected = this.$root.$data.selected.filter(item => item._id != id);

        this.$root.$data.ingredients = this.$root.$data.ingredients.filter(item => item.recipe != recipe.name);
      }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
 
}

.recipes {
  margin-top: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
}

.recipe {
  margin: 10px;
  margin-bottom: 10px;
  padding: 5px;
  inline-size: 50px;
  overflow-wrap: break-word;
  color: #000;
  height: 150px;
  width: 150px;
  text-align: center;
  white-space: normal;
  position: relative;
}
.button-container{
  z-index: 1;
  height:40px;
  width: 130px;
  position:absolute;
  display: flex;
  flex-direction: row-reverse;
}
.button-container button{
  height:25px;
  width: 25px;
  text-align: center;
  border-radius: 50%;
  transition: all .2s ease-in-out;  
}
.button-container button:hover{
  background-color: red;
  transform: scale(1.1);
  
}

.recipe img {
  height: 100px;
  width: 100px;
  
  border-radius: 50%;
  
}


.recipe .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.recipe .image:hover {
  animation: shake 0.5s;
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
 
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
.info{
  width:150px;
  overflow-wrap:break-words;
  
}

.recipe h1 {
  font-size: 12px;
}

.recipe h2 {
  font-size: 14px;
  
}

.recipe p {
  margin: 0px;
  font-size: 10px;
}


.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>