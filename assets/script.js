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
var favouriteItemsEl = document.querySelector('#favourite-items'); 
var searchBtn = document.querySelector('#search-button'); 

// favourite list from local storage 
var favouriteList = new Array(); 

function init(){
    renderFavouriteList(); 
    $('.modal').modal();
    //renderRandomRecipe(); 
}

// call the below function after clicking the search button 
/*
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
*/

// call the below functions when the user click the favourite icon 
function favouriteItemsClick(event) {
    var element = event.target;

    // if click on the star
    if (element.matches('i')) { 
        if (element.dataset.selected) {
            //remove the recipe ID from the local storage
            if (favouriteList !== null) {
                $('#remove-favourite').modal('open');
                for (var i = 0; i < favouriteList.length; i++) {
                    if (favouriteList[i].id == element.dataset.recipeid) {
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
                id: element.dataset.recipeid,
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
    favouriteItemsEl.innerHTML = ""; 

    favouriteList = JSON.parse(localStorage.getItem("favourites")); 

    if (favouriteList !== null) {
        for (var i = 0; i < favouriteList.length; i++) {
            //rendering elements showing in the favourite list 
            var favouriteItemEl = document.createElement('div'); 
            favouriteItemEl.setAttribute('class', 'favourite-item card z-depth-4'); 
            
            var titleEl = document.createElement('h6'); 
            titleEl.setAttribute('id', 'favourite-title'); 
            titleEl.innerHTML = favouriteList[i].title; 

            var linkEl = document.createElement('a'); 
            linkEl.setAttribute('href', './recipe_detail.html?recipeID=' + favouriteList[i].id); 

            var ImageEl = document.createElement('img'); 
            ImageEl.setAttribute('class', 'responsive-img'); 
            ImageEl.setAttribute('src', favouriteList[i].image); 

            var iconEl = document.createElement('i'); 
            iconEl.setAttribute('class', 'fa-solid fa-star star'); 
            iconEl.setAttribute('data-selected', true); 
            iconEl.setAttribute('data-recipeid', favouriteList[i].id); 
            iconEl.setAttribute('data-image', favouriteList[i].image);
            iconEl.setAttribute('data-title', favouriteList[i].title); 
            
            linkEl.appendChild(ImageEl); 

            favouriteItemEl.appendChild(titleEl); 
            favouriteItemEl.appendChild(linkEl);
            favouriteItemEl.appendChild(iconEl);  

            favouriteItemsEl.appendChild(favouriteItemEl); 
        }
    }
}
/*
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
*/
//searchBtn.addEventListener('click', searchRecipe); 
searchResultEl.addEventListener('click', favouriteItemsClick); 
favouriteItemsEl.addEventListener('click', favouriteItemsClick); 

init(); 