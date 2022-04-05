<template>
<div class="page">


<div class="add-recipe-container">
 
    <div  class="form-container">
      <h1>Add a Recipe</h1>
      
    <div v-if="recipeMain()"  class="recipe-main">
      <div class="heading">
          <div class="circle">1</div> 
          <p>First some general information...</p>
      </div>

      <div class="form">
          <label>Recipe Name</label>
        
        <input v-model="name">
        <p></p>
        <label>Recipe Desription</label>
              
              <input v-model="description">
              <p></p>
              <label>Total Cook Time</label>
              
              <input v-model="time">
              <p></p>
              <label>Cost ($, $$, $$$, or $$$$)</label>
            
              <input v-model="cost">
              <p></p>
              <label>Image</label>
              <input id="image-upload" type="file" name="photo" @change="fileChanged">
              <p></p>
        
      </div>
            <div class="buttons">
              <button @click="upload()">Next</button>
            </div>
      
      <div class="upload" v-if="addItem">
        <p>Upload Successful</p>
        
      </div>
      
    </div>
    <div v-if="ingredientPage()" class="wrapper">
      <div class="heading-tag">
          <div class="circle">3</div> 
          <p>Add some ingredients...</p>
      </div>
      <div class="add-ingredient">
        
          <div class="ingredient-list">
              <AddedIngredientList :ingredients="ingredients" ref="ingredientWindow" />
          </div>
          <div class="ingredient-buttons">
            <button @click="newIngredient()">+ Add Ingredient</button>
            
          </div>
          
          
        <div class="recipe-buttons">
          <button @click="pageMain()">Previous</button>
          
          <router-link to="/recipes">
            <button @click="saveRecipe()">Save</button>
          </router-link>
        </div>
      </div>
          
    </div>
    <div v-if="tagPage()" class="tag-wrapper">
      <div class="heading-tag">
          <div class="circle">2</div> 
          <p>Choose some tags...</p>
      </div>
      <div class="tag-container">
          <div class="container">
              <ul class="ks-cboxtags">

            <li><input type="checkbox" id="breakfast" value="breakfast" v-model="tags"> <label for="breakfast">Breakfast</label></li>
            <li><input type="checkbox" id="lunch" value="lunch"  v-model="tags"> <label for="lunch">Lunch</label></li>
            <li><input type="checkbox" id="dinner" value="dinner"  v-model="tags"> <label for="dinner">Dinner</label></li>
            <li><input type="checkbox" id="dessert" value="dessert" v-model="tags"> <label for="dessert">Dessert</label></li>
            <li><input type="checkbox" id="sideDish" value="sideDish" v-model="tags"> <label for="sideDish">Side Dish</label></li>
            <li><input type="checkbox" id="budget" value="budget" v-model="tags"> <label for="budget">Budget</label></li>
            <li><input type="checkbox" id="underThirty" value="underThirty" v-model="tags"><label for="underThirty">Under 30 minutes</label></li>
            <li><input type="checkbox" id="fancy" value="fancy" v-model="tags"><label for="fancy">Fancy</label></li>
            <li><input type="checkbox" id="vegetarian" value="vegetarian" v-model="tags"><label for="vegetarian">Vegetarian</label></li>
            <li><input type="checkbox" id="mexican" value="mexican" v-model="tags"><label for="mexican">Mexican</label></li>
            <li><input type="checkbox" id="italian" value="italian" v-model="tags"><label for="italian">Italian</label></li>
            <li><input type="checkbox" id="asian" value="asian" v-model="tags"><label for="asian">Asian</label></li>
            <li><input type="checkbox" id="pasta" value="pasta" v-model="tags"><label for="pasta">Pasta</label></li>
            <li><input type="checkbox" id="chicken" value="chicken" v-model="tags"><label for="chicken">Chicken</label></li>
            <li><input type="checkbox" id="curry" value="curry" v-model="tags"><label for="curry">Curry</label></li>
              </ul>
          </div>
        
        <div class="recipe-buttons">
            <button @click="pageMain()">Previous</button>
            <button @click="saveTags()">Next</button>
        </div>
      </div>
          
    </div>
  </div>
    
</div>
</div>
</template>





<script>
import axios from 'axios';
import AddedIngredientList from '../components/AddedIngredientList.vue'
export default {
  name: 'add-recipe-view',
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
      findTitle: "",
      findItem: null,
      findDescription: "",
      page: true,
      tagPageShow: false,
      ingredientPageShow: false,
      ingredientList: [],
      tags:[],
    }
  },
  created() {
    this.getItems();
  },
  components:{
    AddedIngredientList
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    },
    ingredients() {
      return this.ingredientList;
   },

  },
  methods: {
  fileChanged(event) {
    this.file = event.target.files[0];
    },
  recipeMain(){
    return this.page;
  },
  tagPage(){
    return this.tagPageShow;
  },
  ingredientPage(){
    return this.ingredientPageShow;
  },
  newIngredient(){
    let temp = {
      recipe: "this.addItem._id",
      ingredient: "test",
      quantity: 0,
      measurement: ""};
     this.ingredientList.push(temp);
  },
  pageMain(){
    if(this.tagPageShow){
      this.page = true;
      this.tagPageShow = false;
    }
    else{
      this.tagPageShow = true;
      this.ingredientPageShow= false;
    }
  },
  pageNext(){
    this.page = false;
    this.tagPageShow = true;
    this.ingredientPageShow= false;
  },
  saveTags(){
    this.ingredientPageShow= true;
    this.page = false;
    this.tagPageShow = false;
    for(let i=0; i< this.tags.length; i++){
      this.uploadTag(this.tags[i]);
    }
    
  },
  async uploadTag(currTag){
  try {
        let r1 =await axios.post('/api/tags', {
                recipe: this.addItem.name,
                tag: currTag,
                
              });
              
            console.log(r1)
            } catch (error) {
              console.log(error);
            }
  },
  async uploadIngredient(currIngredient){
  try {
  let r1 = await axios.post('/api/ingredients', {
          recipe: this.addItem.name,
          ingredient: currIngredient.ingredient,
          quantity: currIngredient.quantity,
          measurement: currIngredient.measurement,
        });
        
      this.addIngredient = r1;
      } catch (error) {
        console.log(error);
      }
  },
  saveRecipe(){
    let temp = this.$refs.ingredientWindow.returnData();
    console.log("got temp" + temp.length);
    for(let i =0;i < temp.length; i++){
        console.log(this.addItem.name);
        console.log(temp[i].ingredient);
        console.log(temp[i].quantity);
        console.log(temp[i].measurement);
     }
    
      for(let i =0;i < temp.length; i++){
        this.uploadIngredient(temp[i]);
      }

  },

  upload(){
      this.page = false;
      this.tagPageShow = true;
      this.ingredientPageShow= false;
      this.uploadRecipe();
  },
  async uploadRecipe() {
      
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        console.log(formData);
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/recipes', {
          name: this.name,
          description: this.description,
          time: this.time,
          cost: this.cost,
          image: r1.data.path,
          rating: this.rating,
          timesUsed: this.timesUsed,
        });
        
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/recipes");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
      this.findDescription ="";
    },
    // async deleteItem(item) {
    //   try {
    //     await axios.delete("/api/items/" + item._id);
    //     this.findItem = null;
    //     this.getItems();
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async editItem(item) {
    //   try {
    //     await axios.put("/api/items/" + item._id, {
    //       title: this.findItem.title, description:this.findItem.description,
    //     });
    //     this.findItem = null;
    //     this.getItems();
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

  }
}
</script>

<style scoped>
.page{
  background-image: linear-gradient(0deg,rgba(38, 70, 83, 0.5) ,  rgba(38, 70, 83, 0.5)), url("/public/images/background.png");
  background-size: cover;
  height:40em;
  padding-top: 50px;
}
.add-recipe-container{
  border: solid 1px #264653;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;

 background-color: white;
}

.recipe-main{
  width: 450px;
  padding: 0px 50px 0px 50px;
  margin-left: auto;
  margin-right: auto;
  
}
.wrapper{
    width: 450px;
    margin-left: auto;
    margin-right: auto;
}
.tag-wrapper{
  width: 450px;
  margin-left: auto;
  margin-right: auto;
 
  
}
.tag-container{
  width: 100%;  
}

.heading-tag{
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  
}
.heading-tag p{
  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #264653;
}


.heading{
  display: flex;
  flex-direction: row;
  
}
.heading p{
  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #264653;
}
 h1{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  text-align: center;
  color: #f4a261;
  
}

.add-ingredient{
display: flex;
flex-direction: column;
margin-top: 0px;

}

.ingredient-list{
  
  height: 200px;
  overflow-x:hidden;
  overflow-y: auto;
  white-space: nowrap;
  scrollbar-face-color: #12bbd4;
}

.buttons{
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.buttons button{
  width: 200px;
  height: 30px;
  font-size: 24px;
  background-color: #f4a261;
  border-radius: 25px;
  color: white;
  border: none;
}
.ingredient-buttons{
  display: flex;
  margin: 20px 0px 20px 0px;
  justify-content: space-around;
  
}
.ingredient-buttons button{
  height: 40px;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  font-size: 24px;
  border: none;
  background-color: transparent;
  color: #adadad;

}
.ingredient-buttons button:hover{
  color: #264653;
}
.recipe-buttons button{
  width: 150px;
  margin: 0px 10px 0px 10px;
  height: 30px;
  font-size: 24px;
  background-color: #f4a261;
  border-radius: 25px;
  color: white;
  border: none;
}

.buttons button:hover{
  background-color: #cf8f5b;

}
.form-container{
  margin-left: auto;
  margin-right: auto;
  height: 28em;
  background-color: rgba(255, 255, 255, .7);
  width: 100%;
}
.form{
  height: 270px;
  margin-bottom:25px;
  
  
  color: #264653;
}
.form input{
  width: 100%;
  margin-top: 5px;
  background-color: #F0F0F0;
  border: none;
}

#image-upload{
  background-color: white;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;

  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  
  border-radius: 50%;
  font-size: 12px;
  width: 20px;
  height: 20px;
 
  background: #264653;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}



.container {
    max-width: 640px;
    height: 300px;
    font-size: 13px;
   display: flex;
   justify-content: center;
}

ul.ks-cboxtags {
    list-style: none;
    padding: 20px;
}
ul.ks-cboxtags li{
  display: inline;
 
}
ul.ks-cboxtags li label{
    display: inline-block;
    background-color: rgba(255, 255, 255, .9);
    border: 2px solid rgba(139, 139, 139, .3);
    color: #adadad;
    border-radius: 25px;
    white-space: nowrap;
    margin: 3px 0px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: all .2s;
}

ul.ks-cboxtags li label {
    padding: 8px 12px;
    cursor: pointer;
    margin-bottom: 5px;
    margin-right: 5px;
}

ul.ks-cboxtags li label::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 12px;
    padding: 2px 6px 2px 2px;
    content: "\00002b";
    transition: transform .3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label::before {
    content: "\2713";
    transform: rotate(-360deg);
    transition: transform .3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label {
    border: 2px solid #1bdbf8;
    background-color: #12bbd4;
    color: #fff;
    transition: all .2s;
}

ul.ks-cboxtags li input[type="checkbox"] {
  display: absolute;
}
ul.ks-cboxtags li input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}
ul.ks-cboxtags li input[type="checkbox"]:focus + label {
  border: 2px solid #f4a261;
}

</style>