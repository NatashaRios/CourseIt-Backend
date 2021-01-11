const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Holi');
});

router.get('/user/:name', async function (req, res, next) {
  const { name } = req.params;
  const { pokemon } = req.query;

  const pokemones = pokemon.split(',');
  
  try{
   const user = await axios.get(`https://api.github.com/users/${name}`)
   
    const pokes = pokemones.map(async (pokemon) => {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      return data.data.sprites.front_default;
    });

   const finalPokemon = await Promise.all(pokes);

   const userData = {
     name: user.data.name,
     following: user.data.following,
     avatar: user.data.avatar_url,
     favPoke: finalPokemon
   }
   res.json(userData);
  }catch(e){
    console.log(e);
    res.sendStatus(400);
  };

  /* axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then(pokemon => {
    console.log(pokemon.data);
  }).catch((error) => {
    console.log(error);
  }); */
});

module.exports = router;
