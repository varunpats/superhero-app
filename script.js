const superhero = document.getElementById("superhero");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");
const display = document.getElementById("display");
const searchDiv = document.getElementById("searchDiv");
const favourites = document.getElementById("favourites");
const favBtn = document.getElementById("favBtn");

display.style.display = "none";
favourites.style.display = "none";
searchBtn.addEventListener("click", fetchData);
favBtn.addEventListener("click", displayFav);
let superheros = [];

async function fetchData() {
    const res = await fetch(`https://www.superheroapi.com/api.php/1839789829730107/search/${superhero.value}`);
    const data = await res.json();
    superheros = data.results;
    data.results.forEach((ele, i) => {
        superHero(ele, i);
    });
}

function superHero(arr, i) {
    let div = document.createElement('div');
    div.onclick = () => {
        renderSuperherodetails(arr)
    }
    div.setAttribute("id", i);
    div.classList.add('container')
    div.innerHTML = `
        <h3>${arr.name}</h3>
        <img src="${arr.image.url}" height="250px" width="250px"/>
    `
    result.appendChild(div);
}

function renderSuperherodetails(data) {
    let div = document.createElement('div');
    div.classList.add('container');
    div.innerHTML = `
    <h3>${data.name}</h3>
    <img src="${data.image.url}" height="250px" width="250px"/>
    <button onclick = "addFav(${data.id})" class = "favBtn">Add to Favourites</button>
    `
    result.style.display = "none";
    searchDiv.style.display = "none";
    display.style.display = "block";
    display.appendChild(div);
}

function addFav(id) {
    let flag = false;
    const obj = superheros.find(e => e.id == id);
    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) {
        existingEntries = [];
        existingEntries.push(obj);
        localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    }
    else {
        existingEntries.forEach(e => {
            console.log(e, id);
            if (e.id == id) {
                flag = true;
            }
        })
        if (!flag) {
            existingEntries.push(obj);
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        }
    }
}

function displayFav() {
    let data = JSON.parse(localStorage.getItem("allEntries"));
    let div = document.createElement('div');
    div.style.marginBottom = "50px";
    div.style.textAlign = "center";
    div.innerHTML = `
        <h2>Favourites</h2>
    `
    favourites.appendChild(div);
    data.forEach(e => {
        let div = document.createElement('div');
        div.classList.add('container')
        div.style.marginBottom = "10px";
        div.innerHTML = `
        <h3>${e.name}</h3>
        <img src="${e.image.url}" height="250px" width="250px"/>
        `
        favourites.appendChild(div);
    })
    result.style.display = "none";
    searchDiv.style.display = "none";
    display.style.display = "none";
    favBtn.style.display = "none";
    favourites.style.display = "block";
}