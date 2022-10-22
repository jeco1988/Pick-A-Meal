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
var keywordInput = document.querySelector('#keyword-input'); 

// favourite list from local storage 
var favouriteList = new Array(); 

function init(){
    renderFavouriteList();
 
    renderRandomRecipe(); 
}

// call the below function after clicking the search button 

function searchRecipe(event) {
    event.preventDefault(); 

    //capture variables from screen
    if (keywordInput.value.trim() !== ''){
        var queryStr = 'query=' + keywordInput.value.trim(); 
    } else {
        $(document).ready(function(){
            $('#input-message').modal();
            $('#input-message').modal('open'); 
        });

        return; 
    }
//    var cuisineStr = '&cuisine=' + [get from html element]; 
//    var dietStr = '&diet=' + [get from html element];
//    var intoleranceStr = '&intolerances=' + [get from html element];  
//    var typeStr = '&type=' + [get from html element];
   
    var searchRcpUrl = 'https://' + recipeApiHost + '/recipes/complexSearch?' + queryStr + '&number=4&addRecipeInformation=true'; 

    fetch(searchRcpUrl, recipeApiOptions).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                for (var i = 0; i < data.results.length; i++) {
                    //create elements and populate the results
                    console.log(data.results[i].id); 
                    console.log(data.results[i].image); 
                    console.log(data.results[i].title); 
                    
                    var j = i + 1
                    var resultImage = document.getElementById("image-card-content-" + j);
                    var resultRecipeTitle = document.getElementById("title-card-" + j);
                    var resultSummary = document.getElementById("card-summary-" + j);
                    var resultLink = document.getElementById("a-" + j);
                    var resultStarEl = document.getElementById("star-" + j); 
                    resultRecipeTitle.innerHTML = data.results[i].title;
                    var summaryText = data.results[i].summary.split(".", 2) + "."
                    resultSummary.innerHTML = (summaryText.length > 90) ? summaryText.slice(1, 90) + '...' : summaryText;
                    resultImage.setAttribute("src", data.results[i].image);
                    resultLink.setAttribute('href', './recipe_detail.html?recipeID=' + data.results[i].id); 
                    resultStarEl.setAttribute('data-recipeid', data.results[i].id); 
                    if (isFavouriteItem(data.results[i].id)) {
                        resultStarEl.setAttribute('data-selected', '1');  
                        resultStarEl.setAttribute('class', 'fa-solid fa-star star');                            
                    } else {
                        resultStarEl.setAttribute('data-selected', '0');  
                        resultStarEl.setAttribute('class', 'fa-regular fa-star star');                            
                    }
                    resultStarEl.setAttribute('data-image', data.results[i].image);
                    resultStarEl.setAttribute('data-title', data.results[i].title); 
                }
            })
            .catch(function(err) {
                console.error(err)
            })
        }
    })
}


// call the below functions when the user click the favourite icon 
function favouriteItemsClick(event) {
    var element = event.target;
    // if click on the star
    if (element.matches('i')) { 
        if (element.dataset.selected == '1') {
            //remove the recipe ID from the local storage
            if (favouriteList !== null) {
                //$('#remove-favourite').modal('open');
                for (var i = 0; i < favouriteList.length; i++) {
                    if (favouriteList[i].id == element.dataset.recipeid) {
                        favouriteList.splice(i, 1); 
                        break;
                    }
                }
                // save to local storage 
                localStorage.setItem("favourites", JSON.stringify(favouriteList));
                
                element.setAttribute('data-selected', '0')
                element.setAttribute('class', 'fa-regular fa-star star');        
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
                favouriteList.unshift(favouriteItem);    
            } else {
                favouriteList.unshift(favouriteItem);
            }
        
            // save to local storage 
            localStorage.setItem("favourites", JSON.stringify(favouriteList));

            element.setAttribute('data-selected', '1')
            element.setAttribute('class', 'fa-solid fa-star star');        
        }

        // check whether it is favourite item and set the icon element and data state
        for (var i = 1; i <= 4; i++) {
            var starEl = document.getElementById('star-' + i); 

            if (isFavouriteItem(starEl.dataset.recipeid)) {
                starEl.setAttribute('data-selected', '1'); 
                starEl.setAttribute('class', 'fa-solid fa-star star');        
            } else {
                starEl.setAttribute('data-selected', '0'); 
                starEl.setAttribute('class', 'fa-regular fa-star star');        
            }    
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
            ImageEl.setAttribute('style', 'border-radius:5px'); 

            var iconEl = document.createElement('i'); 
            iconEl.setAttribute('class', 'fa-solid fa-star star'); 
            iconEl.setAttribute('data-selected', '1'); 
            iconEl.setAttribute('data-recipeid', favouriteList[i].id); 
            iconEl.setAttribute('data-image', favouriteList[i].image);
            iconEl.setAttribute('data-title', favouriteList[i].title); 
            
            linkEl.appendChild(ImageEl); 

            favouriteItemEl.appendChild(iconEl); 
            favouriteItemEl.appendChild(titleEl); 
            favouriteItemEl.appendChild(linkEl); 

            favouriteItemsEl.appendChild(favouriteItemEl); 
        }
    }
}

function renderRandomRecipe(){
    //call API to get the recipe randomly and rendering elements on the screen
    var getRandomRcpUrl = 'https://' + recipeApiHost + '/recipes/random?number=4'; 
     
    fetch(getRandomRcpUrl, recipeApiOptions).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                for (var i = 0; i < data.recipes.length; i++) {
                    //rendering elements showing in the favourite list
                    if (i == 0) {
                        //declare HTML elements
                        var randomImage = document.getElementById("image-card-content-1");
                        var randomRecipeTitle = document.getElementById("title-card-1");
                        var randomSummary = document.getElementById("card-summary-1");
                        var randomLink = document.getElementById("a-1");
                        var randomStarEl = document.getElementById("star-1"); 
                        randomRecipeTitle.innerHTML = data.recipes[i].title;
                        var summaryText = data.recipes[i].summary.split(".", 2) + "."; 
                        randomSummary.innerHTML = (summaryText.length > 90) ? summaryText.slice(1, 90) + '...' : summaryText;
                        randomImage.setAttribute("src", data.recipes[i].image);
                        randomLink.setAttribute('href', './recipe_detail.html?recipeID=' + data.recipes[i].id); 
                        randomStarEl.setAttribute('data-recipeid', data.recipes[i].id); 
                        if (isFavouriteItem(data.recipes[i].id)) {
                            randomStarEl.setAttribute('data-selected', '1');  
                            randomStarEl.setAttribute('class', 'fa-solid fa-star star');                            
                        } else {
                            randomStarEl.setAttribute('data-selected', '0');  
                            randomStarEl.setAttribute('class', 'fa-regular fa-star star');                            
                        }
                        randomStarEl.setAttribute('data-image', data.recipes[i].image);
                        randomStarEl.setAttribute('data-title', data.recipes[i].title); 
                    } else if (i == 1) {
                        //declare HTML elements
                        var randomImage = document.getElementById("image-card-content-2");
                        var randomRecipeTitle = document.getElementById("title-card-2");
                        var randomSummary = document.getElementById("card-summary-2");
                        var randomLink = document.getElementById("a-2");
                        var randomStarEl = document.getElementById("star-2");                         randomRecipeTitle.innerHTML = data.recipes[i].title;
                        randomRecipeTitle.innerHTML = data.recipes[i].title;
                        var summaryText = data.recipes[i].summary.split(".", 2) + "."; 
                        randomSummary.innerHTML = (summaryText.length > 90) ? summaryText.slice(1, 90) + '...' : summaryText;
                        randomImage.setAttribute("src", data.recipes[i].image);
                        randomLink.setAttribute('href', './recipe_detail.html?recipeID=' + data.recipes[i].id); 
                        randomStarEl.setAttribute('data-recipeid', data.recipes[i].id); 
                        if (isFavouriteItem(data.recipes[i].id)) {
                            randomStarEl.setAttribute('data-selected', '1');  
                            randomStarEl.setAttribute('class', 'fa-solid fa-star star');                            
                        } else {
                            randomStarEl.setAttribute('data-selected', '0');  
                            randomStarEl.setAttribute('class', 'fa-regular fa-star star');                            
                        }
                        randomStarEl.setAttribute('data-image', data.recipes[i].image);
                        randomStarEl.setAttribute('data-title', data.recipes[i].title); 
                    } else if (i == 2) {
                        var randomImage = document.getElementById("image-card-content-3");
                        var randomRecipeTitle = document.getElementById("title-card-3");
                        var randomSummary = document.getElementById("card-summary-3");
                        var randomLink = document.getElementById("link-summary-3");
                        var randomLink = document.getElementById("a-3");
                        var randomStarEl = document.getElementById("star-3"); 
                        randomRecipeTitle.innerHTML = data.recipes[i].title;
                        var summaryText = data.recipes[i].summary.split(".", 2) + "."; 
                        randomSummary.innerHTML = (summaryText.length > 90) ? summaryText.slice(1, 90) + '...' : summaryText;
                        randomImage.setAttribute("src", data.recipes[i].image);
                        randomLink.setAttribute('href', './recipe_detail.html?recipeID=' + data.recipes[i].id); 
                        randomStarEl.setAttribute('data-recipeid', data.recipes[i].id); 
                        if (isFavouriteItem(data.recipes[i].id)) {
                            randomStarEl.setAttribute('data-selected', '1');  
                            randomStarEl.setAttribute('class', 'fa-solid fa-star star');                            
                        } else {
                            randomStarEl.setAttribute('data-selected', '0');  
                            randomStarEl.setAttribute('class', 'fa-regular fa-star star');                            
                        }
                        randomStarEl.setAttribute('data-image', data.recipes[i].image);
                        randomStarEl.setAttribute('data-title', data.recipes[i].title); 
                    } else if (i == 3) {
                        var randomImage = document.getElementById("image-card-content-4");
                        var randomRecipeTitle = document.getElementById("title-card-4");
                        var randomSummary = document.getElementById("card-summary-4");
                        var randomLink = document.getElementById("a-4");
                        var randomStarEl = document.getElementById("star-4"); 
                        randomRecipeTitle.innerHTML = data.recipes[i].title;
                        var summaryText = data.recipes[i].summary.split(".", 2) + "."; 
                        randomSummary.innerHTML = (summaryText.length > 90) ? summaryText.slice(1, 90) + '...' : summaryText;
                        randomImage.setAttribute("src", data.recipes[i].image);
                        randomLink.setAttribute('href', './recipe_detail.html?recipeID=' + data.recipes[i].id); 
                        randomStarEl.setAttribute('data-recipeid', data.recipes[i].id); 
                        if (isFavouriteItem(data.recipes[i].id)) {
                            randomStarEl.setAttribute('data-selected', '1');  
                            randomStarEl.setAttribute('class', 'fa-solid fa-star star');                            
                        } else {
                            randomStarEl.setAttribute('data-selected', '0');  
                            randomStarEl.setAttribute('class', 'fa-regular fa-star star');                            
                        }
                        randomStarEl.setAttribute('data-image', data.recipes[i].image);
                        randomStarEl.setAttribute('data-title', data.recipes[i].title); 
                    }            
                }
            })
            .catch(function(err) {
                console.error(err)
            })
        }
    })        
}

function isFavouriteItem(recipeID) {
    if (favouriteList !== null) {
        for (var i=0; i < favouriteList.length; i++) {
            if (recipeID == favouriteList[i].id) {
                return true; 
            }
        }
    }

    return false; 
}

searchBtn.addEventListener('click', searchRecipe); 
searchResultEl.addEventListener('click', favouriteItemsClick); 
favouriteItemsEl.addEventListener('click', favouriteItemsClick); 

init(); 
