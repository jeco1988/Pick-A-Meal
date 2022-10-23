//HTML elements in recipe_detail HTML page
var recipeTitle = document.getElementById("title");
var recipeServings = document.getElementById("servings");
var recipeReadyInMins = document.getElementById("ready");
var recipeImagePath = document.getElementById("imageRecipe");
var recipeIngredients = document.getElementById("ingredients");
var recipeInstructions = document.getElementById("cookingInstructions");

var suggestedVideosEl = document.getElementById("suggested-videos");
var videoPlayerEl = document.getElementById("player");

// API information
//var recipeApiKey = "d08811ab10234d4aa3a95a01418962e0";
var recipeApiKey = "e997f9e02dmsh36310832249fb62p1d185ajsn9739a2708183";
var recipeApiHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
//var recipeApiHost = "api.spoonacular.com";
const recipeApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": recipeApiKey,
    "X-RapidAPI-Host": recipeApiHost,
  },
};
var youtubeApiKey = "AIzaSyCRMSFCRZ3BqQzY6fOgaV4UhnJwR0mlasw";

var getRecipeID = function () {
  //capture the query string from the url
  var queryString = document.location.search;
  var recipeID = queryString.split("=")[1];

  if (recipeID) {
    getRecipeDetail(recipeID);
  } else {
    document.location.replace("./index.html");
  }
};

// Call the api to get the recipeDetail and populate to the page
function getRecipeDetail(recipeID) {
  var getRecipeUrl =
    "https://" + recipeApiHost + "/recipes/" + recipeID + "/information";

  //for testing the api only
  /* var getRecipeUrl =
    "https://" +
    recipeApiHost +
    "/recipes/649850/information?apiKey=" +
    recipeApiKey; */

  fetch(getRecipeUrl, recipeApiOptions).then(function (response) {
    if (response.ok) {
      response
        .json()
        .then(function (data) {
          if (data.length !== 0) {
            // assign value to the html elements
            recipeTitle.innerHTML = data.title;

            recipeServings.innerText = "Servings: " + data.servings;
            recipeReadyInMins.innerHTML =
              "Cooking time: " + data.readyInMinutes + " minutes";
            recipeImagePath.setAttribute("src", data.image);

            //recipeIngredients.innerHTML = data.extendedIngredients;
            for (i = 0; i < data.extendedIngredients.length; i++) {
              var recipeIngredientsOL = document.createElement("li");
              recipeIngredientsOL.setAttribute("class", "collection-item");
              recipeIngredientsOL.innerHTML =
                data.extendedIngredients[i].amount +
                "   " +
                data.extendedIngredients[i].unit +
                "   " +
                data.extendedIngredients[i].name;
              recipeIngredients.appendChild(recipeIngredientsOL);
            }
            //UPDATE THIS SECTION WHEN API KEY WORKS
            if (data.instructions !== null) {
              var cookInstruction = data.instructions.split(".");

              for (count = 0; count < cookInstruction.length; count++) {
                //check for empty string

                if (cookInstruction[count] != "") {
                  //console.log(cookInstruction[count]);
                  var recipeInstructionsOL = document.createElement("li");
                  recipeInstructionsOL.setAttribute("class", "collection-item");
                  recipeInstructionsOL.innerHTML = cookInstruction[count];
                  recipeInstructions.appendChild(recipeInstructionsOL);
                }
              }
            }
            // console.log(data[0].id);
            // console.log(data[0].image);
            //console.log(data.title);
            // console.log(data[0].instructions);

            renderVideoList(data.title);
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  });

  //renderSimilarList(recipeID);
}

function renderSimilarList(RecipeID) {
  // call api to get similar recipes and show on the page
  var similarRcpUrl =
    "https://" + recipeApiHost + "/recipes/" + recipeID + "/similar";

  //for testing the api only
  var similarRcpUrl = "https://" + recipeApiHost + "/recipes/479101/similar";

  fetch(similarRcpUrl, recipeApiOptions).then(function (response) {
    if (response.ok) {
      response
        .json()
        .then(function (data) {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            // render elements for similar recipe list in here
            console.log(data.id);
            console.log(data.image);
            console.log(data.title);

            // set the href attribute to the recipe detail page
            //[image a element].setAttribute('href', './recipe_detail.html?recipeID=' + data.id);
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  });
}

function renderVideoList(searchText) {
  // call youtube api to get a search list from youtube and show the list on the page
  var requestUrl =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
    searchText +
    "&type=video&videoEmbeddable=true&key=" +
    youtubeApiKey;

  fetch(requestUrl).then(function (response) {
    if (response.status == 200) { 
      response.json().then(function (data) {
        for (var i = 0; i < data.items.length; i++) {
          // render elements for video list in here
          var videoItemEl = document.createElement('div'); 
          videoItemEl.setAttribute('id', 'video-item'); 
          videoItemEl.setAttribute('class', 'card'); 

          var videoLink = document.createElement('a'); 
          videoLink.setAttribute('href', '#player'); 

          var videoThumbsnail = document.createElement('img'); 
          videoThumbsnail.setAttribute('src', data.items[i].snippet.thumbnails.medium.url); 
          videoThumbsnail.setAttribute('class', 'responsive-img'); 
          videoThumbsnail.setAttribute('data-link', 'https://www.youtube.com/embed/' + data.items[i].id.videoId + '?autoplay=1');


          var videoTitle = document.createElement('h6'); 
          videoTitle.setAttribute('id', 'video-title'); 
          videoTitle.innerHTML = data.items[i].snippet.title; 

          videoLink.appendChild(videoThumbsnail); 
          videoItemEl.appendChild(videoLink); 
          videoItemEl.appendChild(videoTitle); 
          
          suggestedVideosEl.appendChild(videoItemEl); 

          // set the href attribute for playing the video in the player
          // or use iframe to play the vedio within our web page
          if (i === 0) {
            videoPlayerEl.setAttribute(
              "src",
              "https://www.youtube.com/embed/" + data.items[i].id.videoId
            );
          }
        }
      });
    } else {
      var errorEl = document.createElement('p'); 

      errorEl.innerHTML = "Videos cannot be loaded at this moment.  Please try later."
      suggestedVideosEl.appendChild(errorEl);
    }
  });
}

function playVideo(event){
  var element = event.target; 

  if (element.matches('img')) {
      videoPlayerEl.setAttribute('src', element.dataset.link); 
  }
}

suggestedVideosEl.addEventListener('click', playVideo); 

getRecipeID();