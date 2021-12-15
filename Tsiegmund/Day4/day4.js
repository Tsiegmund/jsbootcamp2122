
 //import express js
const express = require('express');
//create express app object
const app = express()

app.set("view engine", "ejs");
//global variables

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

var characterList = []
characterList.push(new Character('Jack', 'Human', 'Knight'))

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
];


/*if (character.equipment.two_handed) {
  character.equipment.arm_p = {}
  character.equipment.arm_s = {}
}*/
characterList[0].pickupItem('Longsword')
characterList[0].unequipItem('two_handed')
//creates get endpoint
app.get('/profile/:characterid', (req, res) => {
  console.log(req.params.characterid)

  var foundProfile = characterList.find(character => character.id == req.params.characterid)
  console.log(foundProfile)

  if (foundProfile) {


  //renders template called profile from the views folder
  res.render('profile', {sendData: foundProfile})
} else {
  res.redirect('/new')
}
});

//this endpoint makes a new character
app.get('/new', (req, res) => {
  characterList.push(new Character('James', 'human', 'conqueror'))
  res.redirect('/profile/' + characterList[characterList.length - 1].id)
})
//starts an http listen server
app.listen(1000)
