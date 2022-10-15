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

var getRecipeID = function () {
    //capture the query string from the url 
    var queryString = document.location.search;
    var recipeID = queryString.split('=')[1];

    if (recipeID) {
        getRecipeDetail(recipeID);
    } else {
        document.location.replace('./index.html');
    }
};

// Call the api to get the recipeDetail and populate to the page 
function getRecipeDetail(recipeID) {
    var getRecipeUrl = 'https://' + recipeApiHost + '/recipes/' + recipeID + '/information'; 

    //for testing the api only 
    var getRecipeUrl = 'https://' + recipeApiHost + '/recipes/479101/information'; 
    
    fetch(getRecipeUrl, recipeApiOptions).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data); 
                for (var i = 0; i < data.length; i++) {
                    // assign value to the html elements
                    console.log(data.id); 
                    console.log(data.image); 
                    console.log(data.title); 
                    console.log(data.instructions); 
                }
            })
            .catch(function(err) {
                console.error(err)
            })
        }
    })        
}

getRecipeID(); 