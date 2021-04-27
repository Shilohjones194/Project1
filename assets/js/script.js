var randoBtnEl = $("#randoBtn");
var randoURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

function drinkFetcher() {
    fetch(
        randoURL
    )
        .then(function (response) {
            if (response.status !== 200) {
                console.log("There was a problem successfully loading your drink. Code: " +
                    response.status);
                return;
            }

            response.json().then(function (data) {
                displayCocktail(data);
            });
        }
        )
        .catch(function (err) {
            console.log("Fetch error", err);
        });
}

function displayCocktail(cocktail) {
    console.log(cocktail.drinks[0].strDrink);
    // updating `drinkTitle` to the name of the drink returned from the API then updating the DOM with it
    drinkTitle = cocktail.drinks[0].strDrink;
    $("#titleP").replaceWith("<h4>" + drinkTitle + "</h4>");

    // Updating the image using the API data then putting it on the page
    var drinkImg = document.createElement("img");
    drinkImg.src = cocktail.drinks[0].strDrinkThumb;
    $("#drinkImg").replaceWith(drinkImg);

    // There's some mathmatical offsetting being done in this for loop.  The indredients array starts at 1, not the index of 0.  So `i` starts at  1.  Also, we don't know how many ingredients each will have, but we know 15 is the max.  That means we loop through less than 16 times.
    for (var i = 1; i < 16; i++) {
        if (cocktail.drinks[0][`strIngredient${i}`] == null) {
            console.log("oops");
            break;
        }
        var ingredient = document.createElement("ons-list-item");
        // using a template literal to grab the ingredients as we iterate through them
        ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`] + ": " + cocktail.drinks[0][`strIngredient${i}`];
        $("#ingredients").remove();
        $("#ingredients-container").append(ingredient);
    }

    var instructions = document.createElement("p");
    instructions.innerHTML = cocktail.drinks[0].strInstructions;
    $("#removeInstructions").remove();
    $("#instructionsPTag").append(instructions);
}


$(randoBtnEl).click(function (event) {
    event.preventDefault();
    drinkFetcher();
});

// function gifGrab() {
//     fetch(
//         'https://api.giphy.com/v1/gifs/search?q=cocktails&api_key=W1Byjf3yzHSrqwWY2xZyUV9zb93154ls'
//     )
// }

