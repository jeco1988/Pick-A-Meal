// API information 
var recipeApiKey = 'e997f9e02dmsh36310832249fb62p1d185ajsn9739a2708183'; 
var recipeApiHost = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
const recipeApiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': recipeApiKey,
        'X-RapidAPI-Host': recipeApiHost
    }
};

// declare elements in the html
var searchResultEl = document.querySelector('#search-result'); 
var favouritesEl = document.querySelector('#favourites'); 
var searchBtn = document.querySelector('#search-button'); 

// favourite list from local storage 
var favouriteList = new Array(); 

init(); 

function init(){
    renderFavouriteList(); 

    renderRandomRecipe(); 
}

// call the below function after clicking the search button 
function searchRecipe(event) {
    event.preventDefault(); 

    //capture variables from screen
    var queryStr = 'query=' + [get from html element]; 
    var cuisineStr = '&cuisine=' + [get from html element]; 
    var dietStr = '&diet=' + [get from html element];
    var intoleranceStr = '&intolerances=' + [get from html element];  
    var typeStr = '&type=' + [get from html element];
    
    var searchRcpUrl = 'https://' + recipeApiHost + '/recipes/complexSearch?' + queryStr + cuisineStr + dietStr + intoleranceStr + typeStr; 

    // for testing the API only
    var searchRcpUrl = 'https://' + recipeApiHost + '/recipes/complexSearch?query=pasta&cuisine=italian&diet=vegetarian&intolerances=gluten&type=main%20course'; 

    fetch(searchRcpUrl, recipeApiOptions).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data); 
                for (var i = 0; i < data.results.length; i++) {
                    //create elements and populate the results
                    console.log(data.results[i].id); 
                    console.log(data.results[i].image); 
                    console.log(data.results[i].title); 

                    // set the href attribute to the recipe detail page 
                    [image a element].setAttribute('href', './recipe_detail.html?recipeID=' + data.results[i].id)
                }
            })
            .catch(function(err) {
                console.error(err)
            })
        }
    })
}

// call the below functions when the user click the favourite icon 
function favouriteClick(event) {
    var element = event.target;

    // if click on the star
    if (element.matches([favourite icon element])) {
        saveFavourite(element.dateset.recipeID, element.dataset.image, element.dataset.title, element.dataset.selected)

        if (element.dataset.selected) {
            //remove the recipe ID from the local storage
            if (favouriteList !== null) {
                for (var i = 0; i < favouriteList.length; i++) {
                    if (favouriteList[i].id == element.dataset.recipeID) {
                        favouriteList.splice(i, 1); 
                        break;
                    }
                }
                // save to local storage 
                localStorage.setItem("favourites", JSON.stringify(favouriteList));
                
                element.setAttribute('data-selected', 'false')
            }
        } else {        
            //add the favouriteItem to the local storage
            var favouriteItem = {
                id: element.dataset.recipeID,
                image: element.dataset.image, 
                title: element.dataset.title 
            }; 

            if (favouriteList === null) {
                favouriteList = new Array(); 
                favouriteList.push(favouriteItem);    
            } else {
                favouriteList.push(favouriteItem);
            }
        
            // save to local storage 
            localStorage.setItem("favourites", JSON.stringify(favouriteList));
        }
    
        renderFavouriteList();     
    }
}

function renderFavouriteList() {
    favouritesEl.innerHTML = ""; 

    favouriteList = JSON.parse(localStorage.getItem("favourites")); 

    if (favouriteList !== null) {
        for (var i = 0; i < favouriteList.length; i++) {
            //rendering elements showing in the favourite list 
            console.log(favouriteList.id); 
            console.log(favouriteList.image); 
            console.log(favouriteList.title); 

            var li = document.createElement("li");

            // set the href attribute to the recipe detail page 
            [image a element].setAttribute('href', './recipe_detail.html?recipeID=' + data.id);

            favouritesEl.appendChild(li);
        }
    }
}

function renderRandomRecipe(){
    searchResultEl.innerHTML = ""; 

    //call API to get the recipe randomly and rendering elements on the screen
    var getRandomRcpUrl = 'https://' + recipeApiHost + '/recipes/random?number=4'; 
     
    fetch(getRandomRcpUrl, recipeApiOptions).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data); 
                for (var i = 0; i < data.recipes.length; i++) {
                    //rendering elements showing in the favourite list 
                    console.log(data.recipes[i].id); 
                    console.log(data.recipes[i].image); 
                    console.log(data.recipes[i].title); 

                    var li = document.createElement("li");

                    // set the href attribute to the recipe detail page 
                    [image a element].setAttribute('href', './recipe_detail.html?recipeID=' + data.id);

                    searchResultEl.appendChild(li);
                }
            })
            .catch(function(err) {
                console.error(err)
            })
        }
    })        
}

searchBtn.addEventListener('click', searchRecipe); 
searchResultEl.addEventListener('click', favouriteClick); 
favouritesEl.addEventListener('click', favouriteClick); 
