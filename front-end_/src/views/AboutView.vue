<template>
<div class="admin">
      <h1>The Admin Page!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
        <p></p>
        <input v-model="description" placeholder="Description">
        <p></p>
        <input v-model="time" placeholder="Time">
        <p></p>
        <input v-model="cost" placeholder="Cost">
        <p></p>
        <input v-model="rating" placeholder="Rating">
        <p></p>
        <input v-model="timesUsed" placeholder="Times Used">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.name}}</h2>
        <p>{{addItem.description}}</p>
        <p>{{addItem.time}} {{addItem.units}}</p>
        <p>{{addItem.rating}}</p>
        <p>{{addItem.timesUsed}}</p>
        <img :src="addItem.image" />
      </div>
    </div>
    
</div>

</template>


<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
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
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
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

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>


<script>
import axios from 'axios';
export default {
  name: 'about-view',
    data() {
    return {
      name: "",
      description: "",
      time: "",
      cost: 0,
      image: null,
      rating: 0,
      timesUsed: 0,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
      findDescription: ""
    }
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
  fileChanged(event) {
    this.file = event.target.files[0];
    },
  async upload() {
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