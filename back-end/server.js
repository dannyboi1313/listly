const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/userRecipes', {
  useNewUrlParser: true
});
// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 20000000
  }
});
// Create a scheme for items in the museum: a title and a path to an image.
const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    time: String,
    cost: String,
    image: String,
    rating: Number,
    timesUsed: Number,
});

const ingredientSchema = new mongoose.Schema({
    recipe: String,
    ingredient: String,
    quantity: Number ,
    measurement: String
});

const tagSchema = new mongoose.Schema({
  recipe: String,
  tag: String,
});

// Create a model for items in the museum.
const Recipe = mongoose.model('Recipe', recipeSchema);
const Ingredient = mongoose.model('Ingredient', ingredientSchema);
const Tag = mongoose.model('Tag', tagSchema);
// Upload a photo
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  //console.log("api entered");
  if (!req.file) {
    return res.sendStatus(400);
  }
  console.log(req.file.filename);
  res.send({
    path: "/images/" + req.file.filename
  });
});
// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    time: req.body.time,
    cost: req.body.cost,
    image: req.body.image,
    rating: 0,
    timesUsed: 0,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/ingredients', async (req, res) => {
    const ingredient = new Ingredient({
      recipe: req.body.recipe,
      ingredient: req.body.ingredient,
      quantity: req.body.quantity ,
      measurement: req.body.measurement

    });
    try {
      await ingredient.save();
      res.send(ingredient);
    } catch (error) {
      //console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/tags', async (req, res) => {
    const tag = new Tag({
      recipe: req.body.recipe,
      tag: req.body.tag,
     
    });
    try {
      await tag.save();
      res.send(tag);
    } catch (error) {
      //console.log(error);
      res.sendStatus(500);
    }
  });

// Get a list of all of the items in the museum.
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/tags', async (req, res) => {
  try {
    let tags = await Tag.find();
    res.send(tags);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/ingredients/:name', async (req, res) => {
  try {
    
    let currName = req.params.name
    let ingredients = await Ingredient.find({ recipe: currName} );
    res.send(ingredients);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/recipebytag/:tag', async (req, res) => {
  try {
    
    let currTag = req.params.tag
    let recipes = await Tag.find({ tag: currTag} );
    let recipeContainer = [];
    for(let i = 0; i < recipes.length; i++){
       let recipeObj =  await Recipe.find({ name: recipes[i].recipe} );
       recipeContainer.push(recipeObj[0]);
    }
    res.send(recipeContainer);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.put('/api/recipes/:id', async (req, res) => {
  console.log("entered");
  try {
    let recipe = await Recipe.findOne({
      _id: req.params.id
    });
    console.log(req.body.name);
    if(req.body.name != null && req.body.name != "" ){
      recipe.name = req.body.name;
      recipe.description = req.body.description;
      recipe.time =  req.body.time;
      recipe.cost =  req.body.cost;
      recipe.time =  req.body.time;
      recipe.save();
    }
    
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.listen(3002);