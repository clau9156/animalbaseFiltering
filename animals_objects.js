"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];
// MY PART
const Animal = { 
    name: "",
    desc: "",
    type: "unknown",
    age: 0
};

function start( ) {
    console.log("ready");

    loadJSON();

    document.querySelector("[data-filter=cat]").addEventListener("click", catButton);
    document.querySelector("[data-filter=dog]").addEventListener("click", dogButton);
    document.querySelector("[data-filter=all]").addEventListener("click", loadJSON);
}

function catButton() {
    const onlyCats = allAnimals.filter(isCat);
    displayList(onlyCats);
}

function dogButton() {
    const onlyDogs = allAnimals.filter(isDog);
    displayList(onlyDogs);
}

function loadJSON() {
    fetch("animals.json")
    .then( response => response.json() )
    .then( jsonData => {
        // when loaded, prepare objects
        prepareObjects( jsonData );
    });
}

function prepareObjects( jsonData ) {
    jsonData.forEach( jsonObject => {
        // TODO: Create new object with cleaned data - and store that in the allAnimals array
        // MY PART
        const animal = Object.create(Animal);
        // texts instead of text and skip "the"
        const texts = jsonObject.fullname.split(" ");
        animal.name = texts[0];
        animal.desc = texts[2];
        animal.type = texts[3];
        animal.age = jsonObject.age;

        // TODO: MISSING CODE HERE !!!
        allAnimals.unshift(animal);
    });

    displayList(allAnimals);
}

function displayList() {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    allAnimals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}


function isCat(animal) {
    if (animal.value === "cat") {
        return true;
    } else {
        return false;
    }
}

function isDog(animal) {
    if (animal.value === "dog") {
        return true;
    } else {
        return false;
    }
}