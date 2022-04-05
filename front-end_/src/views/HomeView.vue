<template>

  <div class="wrapper">
    <div class="intro">
      <h1>Welcome!</h1>
      <p>Its never been easier to create your weekly shopping list!</p> <p>Simply find some recipes you are wanting to make, click "Add Recipe" to add a recipe to your selected recipes.</p> <p> When you have all the recipes you are wanting to make, click "Generate List", and watch the magic happen. </p>
      </div>
    <div class="title">
    <h1>Under 30 Mins</h1>
      </div>
    <div class="Container">
      <div class="items">
        <RecipeList class="recipes" :recipes="recipesFast" />
        </div>
      </div>
    <div class="title">
    <h1>Dinner</h1>
      </div>
    <div class="Container">
      <div class="items">
      <RecipeList :recipes="recipesDinner"/>
    </div></div>
    <div class="title">
    <h1>Lunch</h1>
      </div>
    <div class="Container">
      <div class="items">
      <RecipeList :recipes="recipesLunch"/>
    </div></div>
    <div class="title">
    <h1>Breakfast</h1>
      </div>
    <div class="Container">
      <div class="items">
      <RecipeList :recipes="recipesBreakfast"/>
    </div></div>
    <div class="title">
    <h1>Budget</h1>
      </div>
    <div class="Container">
      <div class="items">
    <RecipeList :recipes="recipesBudget"/>
    </div></div>
    <div class="title">
    <h1>Mexican</h1>
      </div>
    <div class="Container">
      <div class="items">
    <RecipeList :recipes="recipesMexican"/>
    </div></div>
    <div class="title">
    <h1>Asian</h1>
      </div>
    <div class="Container">
      <div class="items">
    <RecipeList :recipes="recipesAsian"/>
    </div>
    
  </div>
  
</div>
</template>

<script>
import RecipeList from "../components/RecipeList.vue"
import axios from 'axios'
export default {
  name: 'Home-view',
  components: {
    RecipeList
  },
    data() {
    return {
      tag: '',
      tagUnderThirty:[],
      tagDinner:[],
      tagLunch:[],
      tagBreakFast:[],
      tagBudget:[],
      tagMexican:[],
      tagAsian:[],
      tagOther:[],
      
    }
  },
  created(){
      this.fillData();
  },
  computed: {
  recipesFast() {
    return this.tagUnderThirty.filter(element => {return element !== null;})
    },
  recipesDinner() {
    return this.tagDinner.filter(element => {return element !== null;})
  },
  recipesLunch() {
    return this.tagLunch.filter(element => {return element !== null;})
  },
  recipesBreakfast() {
    return this.tagBreakFast.filter(element => {return element !== null;})
  },
  recipesBudget() {
    return this.tagBudget.filter(element => {return element !== null;})
  },
  recipesMexican() {
    return this.tagMexican.filter(element => {return element !== null;})
  },
  recipesAsian() {
    return this.tagAsian.filter(element => {return element !== null;})
  },
  recipesOther() {
    return this.tagOther.filter(element => {return element !== null;})
  },
  containsTag(tags,tag){
      for(let i = 0; i < tags.length; i ++){
        if(tags[i]===tag){
          return true;
        }
      }
      return false;

    }
  },
  methods: {
    fillData(){
      this.getUnderThirty();
      this.getDinner();
      this.getLunch();
      this.getBreakfast();
      this.getBudget();
      this.getMexican();
      this.getAsian();
      this.getOther();

    },
    async getUnderThirty() {
      try {
        let response = await axios.get("/api/recipebytag/underThirty");
        this.tagUnderThirty = response.data;
        
      } catch (error) {
        console.log(error);
      }
    },
    async getDinner() {
      try {
        let response = await axios.get("/api/recipebytag/dinner");
        this.tagDinner = response.data;
        
      } catch (error) {
        console.log(error);
      }
    },
    async getLunch() {
      try {
        let response = await axios.get("/api/recipebytag/lunch");
        this.tagLunch = response.data;
        
      } catch (error) {
        console.log(error);
      }
    },
    async getBreakfast() {
      try {
        let response = await axios.get("/api/recipebytag/breakfast");
        this.tagBreakFast = response.data;
        
      } catch (error) {
        console.log(error);
      }
    },
    async getBudget() {
      try {
        let response = await axios.get("/api/recipebytag/budget");
        this.tagBudget = response.data;
        
      } catch (error) {
        console.log(error);
      }
    },
    async getMexican() {
      try {
        let response = await axios.get("/api/recipebytag/mexican");
        this.tagMexican = response.data;
        
      } catch (error) {
        console.log(error);
      }
    },
    async getAsian() {
      try {
        let response = await axios.get("/api/recipebytag/asian");
        this.tagAsian = response.data;
        
      } catch (error) {
        console.log(error);
      }
    },
    async getOther(currTag) {
      try {
        let response = await axios.get("/api/recipebytag/" +currTag);
        this.tagOther = response.data;
        
      } catch (error) {
        console.log(error);
      }
    },

    

  }
}
</script>
<style scoped>
.wrapper {
  margin-top: 2em;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  margin-top: 100px;
  width: 100%;
  text-align: left;
  color: #264653;
}
.title h1{
  margin-left: 100px;
}
.Container{
      width:80%;
      height:29em;
      background: #F0F0F0;
      
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      word-wrap: break-word;
      overflow-x: auto;
      overflow-y: hidden;
      
     
      
   }
  
   .intro {
     margin-left: 200px;
     margin-right: 200px;
     color: #264653;
     font-size: 24px;
   }
   .intro h1{
     color: #f4a261;
   }
 .items{
     flex: 0 0 auto;
   }
   /* Mobile Styles */
  @media only screen and (max-width: 600px){
   .intro{
     margin: 10px;
     font-size: 28px;
   }
   .intro h1{
     margin-left: 50px;
   }

  
  }


</style>
  

   