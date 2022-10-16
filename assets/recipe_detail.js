// API information
var recipeApiKey = "77c5a014f3mshe2cbb253b24258ap111cdbjsn8a0643730e6e";
var recipeApiHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
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
  var getRecipeUrl = "https://" + recipeApiHost + "/recipes/479101/information";

  fetch(getRecipeUrl, recipeApiOptions).then(function (response) {
    if (response.ok) {
      response
        .json()
        .then(function (data) {
          console.log(data);

          if (data.length !== 0) {
            // assign value to the html elements
            console.log(data[0].id);
            console.log(data[0].image);
            console.log(data[0].title);
            console.log(data[0].instructions);
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  });

  renderSimilarList(recipeID);

  renderVideoList(data[0].title);
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
    "&type=video&key=" +
    youtubeApiKey;

  // for testing the api only
  var requestUrl =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&q=Lemon-Pepper Fettucine Alfredo&type=video&key=" +
    youtubeApiKey;

  fetch(requestUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      for (var i = 0; i < data.items.length; i++) {
        // render elements for similar recipe list in here
        console.log(data.items[i].id.videoId);
        console.log(data.items[i].snippet.thumbnails.medium.url);
        console.log(data.items[i].snippet.title);

        // set the href attribute for playing the video in the player
        // or use iframe to play the vedio within our web page
      }
    });
  });
}

//getRecipeID();
