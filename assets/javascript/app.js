// TV shows to begin populating buttons
var televisionShows = ["The Office", "Seinfeld", "Arrested Development", "Rick and Morty", "It's Always Sunny in Philadelphia"];

// function to display the television show gif
function displayGif() {
    var televisionShow = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZSpvXe7OpA04vY54wsmWIUApVF2PHWpb&q=" + televisionShow + "&limit=10&offset=0&rating=PG&lang=en";

    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        var results = response.data;
        for (j = 0; j < results.length; j++) {
            var tvDiv = $("<div class='gif'>");
            var rated = results[j].rating;
            var pOne = $("<p>").text("Rating: " + rated);
            tvDiv.append(pOne);
            var gifStill = results[j].images.fixed_height_still;
            var gifAnimate = results[j].images.fixed_height;
            var gif = $("<img>").attr({ "src": gifStill, "data-still": gifStill, "data-animate": gifAnimate, "data-state": "still" });
            tvDiv.append(gif);
            $("#gifHere").prepend(tvDiv);
            $(".gif").on("click", function(){
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })
        }
    });
}

// function to display movie buttons
function displayButton() {
    $("#header").empty();
    for (var i = 0; i < televisionShows.length; i++) {
        var tvButtons = $("<button class='tvButton'>");
        tvButtons.attr("data-name", televisionShows[i]);
        tvButtons.text(televisionShows[i]);
        $("#header").append(tvButtons);
    }
}

// click function to add new movie buttons
$("#add-show").on("click", function (event) {
    event.preventDefault();
    var televisionShow = $("#show-input").val().trim();
    televisionShows.push(televisionShow);
    displayButton();
});

$(document).on("click", ".tvButton", displayGif);

displayButton();