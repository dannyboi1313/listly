<template>
<div class="wrapper">
  <div class="recipes">
    <EditRecipeView v-show="isModalVisible" :recipe="currRecipe" @close="closeModal" ref="editWindow"/>
    <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
      
      <div class="image">
              <div class="overlay"> 
              <p>{{recipe.time}}</p>
              <button @click="editRecipe(recipe)" class="fas fa-edit"> </button>
            </div>
            <img :src="recipe.image">
        </div>
      <div class="info">
      <star-rating class="stars" 
                  @rating-selected ="setRating"
                   active-color="#e9c46a"
                   star-size = 25
                   v-bind:increment="0.5"
                   v-bind:show-rating=false>
        </star-rating>
        <h1>{{recipe.name}}</h1>
        <div class="description">
          <h2>{{recipe.description}}</h2> 
          <p>{{recipe.cost}}</p>     
        </div>
       
          <button @click="addItem(recipe)" class="auto">Add Recipe</button>
          
         <div class="buttons">
        
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import StarRating from 'vue-star-rating'
import EditRecipeView from '../views/EditRecipeView.vue';
export default {
  name: 'RecipeList',
  props: {
    recipes: Array,
  },
  components: {
    StarRating,
    EditRecipeView
  },
  data() {
      return {
        isModalVisible: false,
        currentRecipe: null,
      };
    },
  computed: {
    tagsToString(tags){
        let str = "";
        for(let i = 0; i < tags.length; i++){
            str = str + " " +tags[i]; 
        }
        return str;
    },
    currRecipe(){
        return this.currentRecipe;
    },
  },
  methods: {
      setRating(rating) {
       console.log(rating);
       this.rating = rating;
     },
    editRecipe(recipe){
      this.currentRecipe = recipe;
      this.$refs.editWindow.updateData(recipe);
      this.isModalVisible = true;
      
    },
    
    closeModal() {
        this.isModalVisible = false;
      },
    addItem(recipe) {
      let id = recipe._id;
      let exists = false;
      this.$root.$data.selected.forEach(element => {
        if(element._id === id){
          exists = true;
        }
      });
      if(exists){
        alert("Recipe Already Added");
        return;}
      this.$root.$data.selected.push(recipe);

    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.stars {
  margin-left: auto;
  margin-right: auto;
}
.tags{
  width: 100%;
  height: 10px;
  background: #f4a261;
  display: flex;
}

.recipes {
  margin-top: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.recipe {
  margin: 10px;
  margin-top: 10px;
  width: 300px;
  height: 400px;
  background: white;
  text-align: center;
  box-shadow: 10px 10px 8px #888888;
  transition: all .2s ease-in-out; 
}

.recipe:hover {
   
     box-shadow: 12px 12px 10px #7e7d7d;
     transform: scale(1.05); 
}

.recipe img {
  height: 200px;
  width: 300px;
  object-fit: cover;
  margin-left: 0;
}
.recipe img, .overlay {
    box-sizing: border-box; /* required */
    width: 100%; /* required */
    flex: none; /* required */
    z-index: 10;
}
.overlay p{
  color: white;
}

.overlay {
  padding-left: 15px;
  z-index: 11;
  background: rgba(38, 70, 83, 0.75);
  position: absolute;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.recipe .image {
  margin-bottom: 5px;
  position: relative;
  z-index: 10;
}

.info {
  color: #264653;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

.description{
  height: 65px;
  width: 100%;
}

.info h1 {
  font-size: 18px;
}

.info h2 {
  font-size: 16px;
}

.info p {
  margin: 4px;
  font-size: 12px;
}


.price {
  display: flex;
}

.info button {
  height: 35px;
  border-radius: 5%;
  background: #f4a261;
  color: white;
  border: none;
  font-size: 24px;
  margin-left: auto;
  margin-right: auto;
}
.buttons{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.overlay button{
  background-color: transparent;
  color: white;
  border: none;
  
}
.overlay p{
  margin-top: 10px;
}

button:hover{
  background: #d78a4a;  
}

.overlay button:hover{
  color: #888888;
  background: none;
}
.auto {
  margin-left: auto;
}
</style>