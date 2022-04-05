<template>
<div>
  <h1 class="title">Your Recipes</h1>
  <div class="wrapper">
    
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
    </div>

  </div>
  <div class="add-button">
    <router-link to="/addrecipe">
          <button>Add new recipe</button>
    </router-link>
  </div>
      
  <RecipeList class="recipes" :recipes="searchRecipes" />
</div>
</template>

<script>
import RecipeList from "../components/RecipeList.vue";
import axios from 'axios';
export default {
  name: 'Home-view',
  components: {
    RecipeList
  },
    data() {
    return {
      searchText: '',
      recipes: [],
    }
  },
  created(){
      this.getRecipes();
  },
  methods: {
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
  searchRecipes() {
    return this.recipes.filter(product => product.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
  }
  },
  
}
</script>

<style scoped>
.wrapper {
  margin-top: 4em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.title{
  color: #f4a261;
  font-size: 48px;
  margin-left: 200px;
  margin-top: 60px;
}
.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}
.add-button{
  margin-top: 20px;
  width: 100%;
  
  display: flex;
  justify-content: center;
}
.add-button button{
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  background: #e76f51;
  padding: 10px;
  height: 60px;
  width: 275px;
  border: none;
  font-size: 30px;
  border-radius: 30px;
  color: white;
  transition: all .2s ease-in-out;  
}
.recipes{
  flex-wrap: wrap;
  justify-content: space-around;
}
.add-button button:hover{
  transform: scale(1.1);
  background-color: #e78851;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>