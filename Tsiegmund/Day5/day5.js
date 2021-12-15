 //import express js
const express = require('express');
//create express app object
const app = express()

app.set("view engine", "ejs");
//global variables

class GameMatch {
  constructor() {
    this.turn = 0; //this is the index of the turn
    this.id = gameList.length + 1000; //this is the game ID
    this.players = [];
    this.round = 0;
  }
}


class Character {
  constructor(name, race, characterClass) {
  this.id = characterList.length + 1000;
  this.name = name
  this.race = race
  this.characterClass = characterClass
  this.equipment = {
    head: {},
    chest: {},
    legs: {},
    arm_p: {},
    arm_s: {},
    two_handed:{}
  }
  this.inventory = []
  this.abilities = []
  this.stats = {
  attack:5,
  defense:6,
  speed: 5,
  hp_current:20,
  hp_max:20,
}
  this.pickupItem = function(searchName)  {
    for (var item of equipment_list) {
      console.log(item.name)
      if (item.name == searchName) {
        console.log('found match')
        this.inventory.push(item)
        break;
      }
    }
  }
  this.unequipItem = function(slot) {
    for (var slotName in this.equipment) {
      console.log(slotName)
      if (slotName == slot) {
        console.log('found item slot, removing')
        this.equipment.slotName = {}
        }
      }
    }
  }
}



//holds all possible items
var equipment_list = [
  {name: 'Longsword',
   slot: 'two_handed',
   bonuses: {
     defense: 5,
     attack: 5
   }
 },
{
  name: 'shield',
   slot: 'arm_s',
   bonuses: {
     defense: 5
   }
 },
 {
   name: 'shortsword',
   slot: 'arm_p',
   bonuses: {

   }
 }
];


/*if (character.equipment.two_handed) {
  character.equipment.arm_p = {}
  character.equipment.arm_s = {}
}*/

//create character list with two default characters

var gameList= [];

var characterList = []
characterList.push(new Character('Jack', 'Human', 'Knight'))
characterList.push(new Character('James', 'human', 'conqueror'))

for (var character of characterList) {
  character.pickupItem('shortsword')
}

app.get('/game', (req, res) =>{
  var foundgame = gameList.find(game => game.id == req.query.gameid)
  //search for game in games list
  console.log(foundgame)

  if (foundgame) {
    //if game is found, we can edit values of it. Also checks to see if the user used addcharacter form (?gameid=xxxx&addcharacter=xxxx)
    if (req.query.addcharacter) {
      if (foundgame.players.length < 2) {
        //check to see if there is more than two characters in the game
        var foundProfile = characterList.find(character => character.id == req.query.addcharacter)
        //find the character with the given addcharacter ID
        if (foundProfile){
          //if character is found, add the character's ID to this list
            foundgame.players.push(foundProfile.id)
        }
      }
    }
  //renders template called game from the views folder
  //sends data from sendData
  res.render('game', {sendData: foundgame})
} else {
  res.redirect('/newgame')
}
})

app.get('/newgame', (req, res) => {
  gameList.push(new GameMatch());
  res.redirect('/game/?gameid=' + gameList[gameList.length - 1].id)
})

//creates get endpoint
app.get('/profile', (req, res) => {
  console.log(req.query.characterid)

  var foundProfile = characterList.find(character => character.id == req.query.characterid)
  console.log(foundProfile)

  if (foundProfile) {


  //renders template called profile from the views folder
  res.render('profile', {sendData: foundProfile})
} else {
  res.redirect('/newprofile')
}
});

//this endpoint makes a new character
app.get('/newprofile', (req, res) => {
  characterList.push(new Character('James', 'human', 'conqueror'))
  res.redirect('/profile/?characterid=' + characterList[characterList.length - 1].id)
})
//starts an http listen server
app.listen(1000)
