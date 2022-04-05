<template>
<transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">Edit Recipe!</slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>
        
        <div class="upload">
            <label>Recipe Name</label>
            <input v-model="editRecipe.name">
            <p></p>
            <label>Description</label>
            <input v-model="editRecipe.description"/>
            <p></p>
            <label>Recipe Name</label>
            <input v-model="editRecipe.time"/>
            <p></p>
            <label>Recipe Name</label>
            <input v-model="editRecipe.cost"/>
            <p></p>
        
      </div> 


      <footer class="modal-footer">

        <button type="button" class="btn-red" @click="deleteRecipe()"> Delete Recipe</button>
        <button type="button" class="btn-green" @click="saveData()"> Save Changes</button>
      </footer>
    </div>
  </div>
  </transition>
</template>





<script>
import axios from 'axios';

export default {
  name: 'edit-recipe-view',
  props: {
    recipe: Object,
  },
    data() {
    return {
      name: "",
      description: "",
      time: "",
      cost: null,
      image: null,
      rating: null,
      timesUsed: null,
      addItem: null,
      addIngredient: null,
      items: [],
      editRecipe: null,
      ingredientList: [],
      tags:[],
    }
  },
  created() {
    this.setData(this.recipe);
  },
  components:{
    
  },
  computed: {

  },
  methods: {
   close() {
        this.$emit('close');
      },
    setData(recipe){
        console.log("attempted");
        this.editRecipe = recipe;
    },
    updateData(recipe){
        console.log("updating data");
        console.log(this.recipe);
        this.editRecipe = recipe;
    },
    deleteRecipe(){
        this.deleteRecipeUpdate();
        this.$emit('close');
    },
    async deleteRecipeUpdate() {
      try {
        await axios.delete("/api/recipes/" + this.editRecipe._id);
        this.editRecipe = null;
        
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    saveData(){
        this.editItem();
        this.$emit('close');
    },
    async editItem() {
       try {
        console.log("this is id " + this.editRecipe._id);
         await axios.put("/api/recipes/" + this.editRecipe._id, {
           name: this.editRecipe.name, description:this.editRecipe.description,
           time: this.editRecipe.time, cost: this.editRecipe.cost, rating: 0,
           timesUsed: 0,
        });
        this.editRecipe = null;
        
        return true;
      } catch (error) {
        console.log(error);
      }
    },

  }
}
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    
    z-index: 250;
  }

  .modal {
    
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 500px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
   .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

.upload{
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    
    height: 270px;
    margin-bottom:25px;
  
  
  color: #264653;
}
.upload input{
    width: 100%;
    margin-top: 5px;
    background-color: #F0F0F0;
    border: none;
}

</style>