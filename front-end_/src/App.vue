<template>
<div id="app">
  <div id="banner">
    <div id="title">
    <h1>Listly</h1>
    <p>Let us make your shopping list</p>
    </div>
    <div id="menu">
      <div id="side">
        <router-link to="/">
          <div class="menu-item">
            <button @click="hide()">Home</button>
          </div>
        </router-link>
        <router-link to="/recipes">
          <div class="menu-item">
            <button @click="hide()">Your Recipes</button>
          </div>
        </router-link>
        <router-link to="/list">
          <div class="menu-item">
            <button @click="show()">List</button>
          </div>
        </router-link>
        
      </div>
      <div class="listButton">
          <div class="list-num">{{total}}</div>
            <button @click="show()" class="fas fa-receipt"></button>
            <p>Selected Recipes</p>
        </div>
      </div>

    </div>
    <div v-if="showSelected" id="selected-recipes">
    
       
      <div id="selected-recipes-title">
        <h1>Selected Recipes</h1>
        
      </div>
      <div  id="selected-recipes-container">
        <div v-if="empty" class="empty">
          
          <h2 >No recipes selected</h2>
          <router-link to="/">
            <button @click="hide()">Find some recipes</button>
          </router-link>
        </div>
        
        <SelectedRecipes class="S-R" :recipes="recipes" v-else />
      </div>
      <div id="selected-recipes-button">
        <router-link to="/list">
          <button @click="generateList()">Generate List</button>
        </router-link>
        
      </div>
      <button id="hidebutton" @click="hide()" class="fas fa-chevron-up"></button>
    </div>
    <div v-else>
      <button id="hidebutton-show" @click="show()" class="fas fa-chevron-down"></button></div>
    
    <router-view /> 
</div>
</template>

<script>
  import SelectedRecipes from "../src/components/SelectedRecipes.vue"
  import axios from 'axios'
  export default {
    name: 'Home-view',
    components: {
      SelectedRecipes
    },
      data() {
      return {
        showSelected: false,
      }
    },
    computed: {
    recipes() {
      return this.$root.$data.selected;
    },
    selected() {
      return this.showSelected;
    },
    total(){
      return this.$root.$data.selected.length;  
    },

    empty(){
        return (this.$root.$data.selected.length ==0);
    }
    },
    methods:{
      hide(){
        this.showSelected = false;
      },
      show(){
        this.showSelected = true;
      },
      generateList(){
        for(let i = 0; i < this.$root.$data.selected.length; i++){
          this.getIngredients(this.$root.$data.selected[i].name)
        }
      },
    async getIngredients(name) {
      try {
        console.log(name);
        let response = await axios.get("/api/ingredients/"+name);
        this.addToList(response.data);
        
      } catch (error) {
        console.log(error);
      }
    },
    addToList(ingredients){
      for(let i =0; i < ingredients.length; i ++){
        this.$root.$data.ingredients.push(ingredients[i])
      }
    }
    },
  }
</script>

<style>

* {
  margin: 0;
  max-width: 100%;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#app{
  width:100%;
  box-sizing: border-box;
  margin-bottom: 4em;

}
#banner{
height: 18em;
width: 100%;
background-image: linear-gradient(0deg,rgba(38, 70, 83, 0.75) ,  rgba(38, 70, 83, 0.75)), url("/public/images/banner.jpg");
background-position: center;
background-size: cover;
display: flex;
flex-direction: column;
justify-content: flex-end;  
position: relative;
}
#title{
  color: white;
  font-size: 24px;
  text-align: center;
  margin: 0px;
}
#menu {
  width:100%;
  padding-left: 50px;
  margin-bottom: 10px;
}

#menu a {
  font-size: 24px;
  color: white;
  text-decoration: none;
}
#hidebutton{
  background: transparent;
  border: none;
  position: absolute;
  right: 0;
  font-size: 40px;
  margin-right: 50px;
  color: white;
  background-color: rgb(201, 198, 198);
  border-bottom: solid 2px #264653;
  box-shadow: #264653;
  border-radius:0px 0px 20px 20px;
  border-left: solid 2px #264653;
  border-right: solid 2px #264653;
  width: 100px;
}
#hidebutton:hover{
  transform: scale(1.1);
}
#hidebutton-show{
  background: transparent;
  border: none;
  position: absolute;
  right: 0;
  font-size: 40px;
  margin-right: 175px;
  color: white;
  background-color: rgb(201, 198, 198);
  border-bottom: solid 2px #264653;
  border-left: solid 2px #264653;
  border-right: solid 2px #264653;
  box-shadow: #264653;
  border-radius: 0px 0px 20px 20px;
  
  width: 100px;
}
#hidebutton-show:hover{
  transform: scale(1.1);
}

.listButton{
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
 
  margin-left: 50%;
  position: absolute;
  height: 100px;
  color:white;
  bottom: 0;
  right: 0;
  text-align: center;
}
.listButton button{
  background: none;
  border: none;
  color:white;
  font-size: 48px;
  text-align: center;
  transition: all .2s ease-in-out; 
}
.listButton button:hover{
  font-size: 51px;
}
.list-num{
  margin-right: 25px;
  text-align: right;
  color: white;
}
.active {
  
  color: #e76f51;
  
}

.empty{
  width: 100%;
  margin-top: 50px;
  text-align: center;
}
.empty button{
  margin-top: 10px;
  background: none;
  border: none;
  text-decoration: underline;
  color: #e76f51;
}
.empty button:hover{
  transform: scale(1.1);
  color: #e9c46a;
}
#side {
  grid-area: side;
  display: flex;
  transition: all .2s ease-in-out;  
}
#selected-recipes{
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: 24em;
  transition: all .8s ease-in-out;
  background-color: #f0f0f0;
  position: relative;
  border-radius: 0px 0px 30px 30px;
  border: solid 2px #264653; 
  border-top: none;
}

#selected-recipes h2{
  height: 30px;
} 
#selected-recipes-title{
  width: 50%;
  text-align: center;
  color: #264653;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  
}
#selected-recipes-title button{
  height: 20px;
  margin-bottom: auto;
  margin-top: auto;
  margin-left: 20px;

}

#selected-recipes-container{
  margin-left: auto;
  margin-right: auto;
  justify-self: center;
  overflow-x: auto;
  overflow-y: autp;
  white-space: nowrap;
  flex-wrap: nowrap;
  width: 50em;
  height: 12em;
  border: solid 2px #e9c46a;
  color: #264653;
  


}
#selected-recipes-button{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  
}
#selected-recipes-button button{
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
#selected-recipes-button button:hover{
  transform: scale(1.1);
  background-color: #e78851;
}



#side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}
.menu-item:hover {
  color: #e76f51;
}

.menu-item button {
  margin: 0px;
  margin-right: 50px;
  background-color: transparent;
  border: none;
}
/* Mobile Styles */
  @media only screen and (max-width: 600px){
    #banner h1,p,button{
      transform: scale(.6);
    }
    menu{
      margin-left: 0px;
    }
    .menu-item button{
      margin-right: 5px;
    } 
    .list-num{
      transform: scale(.6);
    }
    #hidebutton-show{
 
   
      font-size: 30px;
      margin-right: 50px;
   
}
    #hidebutton{
      
      margin-bottom: 50px;
      font-size: 30px;
      }
    #selected-recipes-title{
      font-size: 12px;
      height: 90px;
    }
  

  }

</style>
