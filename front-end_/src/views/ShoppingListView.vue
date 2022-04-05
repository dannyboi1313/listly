<template>
<div>
  <div v-if="empty" class="wrapper">

    
  </div>
  <div v-else class="wrapper">
      <IngredientList :ingredients="ingredients" />
  </div>
  
</div>
</template>

// <script>
import IngredientList from '../components/IngredientList.vue'
export default {
  name: 'list-view',
  components: {
    IngredientList
  },
  computed: {
  ingredients() {
    return this.$root.$data.ingredients;
  },
  empty() {
    return (this.$root.$data.ingredients.length == 0);
  }
  },
}
</script>

<style scoped>
.wrapper {
  height: 50em;
  text-align: center;
  width: 100%;
}
.warning{
  height: 40px;
  width: 100%;
  text-align: center;
margin-top: 10em;
}



</style>