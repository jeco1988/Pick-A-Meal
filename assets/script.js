// API information 
var recipeApiKey = '77c5a014f3mshe2cbb253b24258ap111cdbjsn8a0643730e6e'; 
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
var searchBtn = document.querySelector([search button id]); 

// favourite list from local storage 
var favouriteList = new Array(); 

init(); 

function init(){
    renderFavouriteList(); 
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
        // call API to retrieve the recipe details; 
        saveFavourite(element.dateset.recipeID, element.dataset.selected)
    }
}

function saveFavourite(recipeID, isFavourite) {
    if (isFavourite) {
        //remove the recipe ID from the local storage
        if (favouriteList !== null) {
            for (var i = 0; i < favouriteList.length; i++) {
                if (favouriteList[i] == recipeID) {
                    favouriteList.splice(i, 1); 
                    break;
                }
            }
            // save to local storage 
            localStorage.setItem("favourites", JSON.stringify(favouriteList));
        }
    } else {        
        //add the recipe ID to the local storage  
        if (favouriteList === null) {
            favouriteList = new Array(); 
            favouriteList.push(recipeID);    
        } else {
            favouriteList.push(recipeID);
        }
    
        // save to local storage 
        localStorage.setItem("favourites", JSON.stringify(favouriteList));
    }

    renderFavouriteList(); 
} 

function renderFavouriteList() {
    favouritesEl.innerHTML = ""; 

    favouriteList = JSON.parse(localStorage.getItem("favourites")); 

    if (favouriteList !== null) {
        for (var i = 0; i < favouriteList.length; i++) {
            //call API to get the specific recipe and rendering elements on the screen
            var getRecipeUrl = 'https://' + recipeApiHost + '/recipes/' + favouriteList[i] + '/information'; 

            //for testing the api only 
            var getRecipeUrl = 'https://' + recipeApiHost + '/recipes/479101/information'; 
            
            fetch(getRecipeUrl, recipeApiOptions).then(function(response){
                if (response.ok) {
                    response.json().then(function(data){
                        console.log(data); 
                        for (var i = 0; i < data.results.length; i++) {
                            //rendering elements showing in the favourite list 
                            console.log(data.id); 
                            console.log(data.image); 
                            console.log(data.title); 
        
                            var li = document.createElement("li");

                            // set the href attribute to the recipe detail page 
                            [image a element].setAttribute('href', './recipe_detail.html?recipeID=' + data.id);

                            favouritesEl.appendChild(li);
                        }
                    })
                    .catch(function(err) {
                        console.error(err)
                    })
                }
            })        
        }
    }
}

searchBtn.addEventListener('click', searchRecipe); 
searchResultEl.addEventListener('click', favouriteClick); 