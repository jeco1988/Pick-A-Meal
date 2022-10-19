//HTML Elements

var recipeApiKey = "e997f9e02dmsh36310832249fb62p1d185ajsn9739a2708183";
var recipeApiHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
const recipeApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": recipeApiKey,
    "X-RapidAPI-Host": recipeApiHost,
  },
};

window.addEventListener("load", (event) => {
  console.log("The page has fully loaded");
  var getRandomRcpUrl = "https://" + recipeApiHost + "/recipes/random?number=4";
  fetch(getRandomRcpUrl, recipeApiOptions).then(function (response) {
    if (response.ok) {
      response
        .json()
        .then(function (data) {
          console.log(data);

          for (var i = 0; i < data.recipes.length; i++) {
            //rendering elements showing in the favourite list
            console.log(data.recipes[i].id);
            console.log(data.recipes[i].image);
            console.log(data.recipes[i].title);
            console.log(data.recipes[i].summary);
            console.log(data.recipes[i].summary.split(".", 4));
            if (i == 0) {
              //declare HTML elements
              var randomImage = document.getElementById("image-card-content-1");
              var randomRecipeTitle = document.getElementById("title-card-1");
              var randomSummary = document.getElementById("card-summary-1");
              var randomLink = document.getElementById("link-summary-1");
              randomRecipeTitle.innerHTML = data.recipes[i].title;
              randomSummary.innerHTML =
                data.recipes[i].summary.split(".", 3) + ".";
              randomImage.setAttribute("src", data.recipes[i].image);
            } else if (i == 1) {
              //declare HTML elements
              var randomImage = document.getElementById("image-card-content-2");
              var randomRecipeTitle = document.getElementById("title-card-2");
              var randomSummary = document.getElementById("card-summary-2");
              var randomLink = document.getElementById("link-summary-2");
              randomRecipeTitle.innerHTML = data.recipes[i].title;
              randomSummary.innerHTML =
                data.recipes[i].summary.split(".", 3) + ".";
              randomImage.setAttribute("src", data.recipes[i].image);
            } else if (i == 2) {
              var randomImage = document.getElementById("image-card-content-3");
              var randomRecipeTitle = document.getElementById("title-card-3");
              var randomSummary = document.getElementById("card-summary-3");
              var randomLink = document.getElementById("link-summary-3");
              randomRecipeTitle.innerHTML = data.recipes[i].title;
              randomSummary.innerHTML =
                data.recipes[i].summary.split(".", 3) + ".";
              randomImage.setAttribute("src", data.recipes[i].image);
            } else if (i == 3) {
              var randomImage = document.getElementById("image-card-content-4");
              var randomRecipeTitle = document.getElementById("title-card-4");
              var randomSummary = document.getElementById("card-summary-4");
              var randomLink = document.getElementById("link-summary-4");
              randomRecipeTitle.innerHTML = data.recipes[i].title;
              randomSummary.innerHTML =
                data.recipes[i].summary.split(".", 3) + ".";
              randomImage.setAttribute("src", data.recipes[i].image);
            }

            //console.log(recipeSummary);
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  });
});
