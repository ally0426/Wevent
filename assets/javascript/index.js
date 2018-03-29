
// By default (upon load) show the name stored in localStorage using "localStorage.getItem"
// $(".jumbotron").text(localStorage.getItem("city"));

// When users click "save-name"
$("#save-city").on("click", function (event) {
    // This line prevents the page from refreshing when a user hits "enter".
    event.preventDefault();

    // Clear the HTML from the jumbotron
    $(".jumbotron").html("");

    // Grab the user input
    var userCity = $("#your-city").val().trim();
    var radius = $("#radius").val().trim();


    // initialize the input values
    $("#your-city").val("");
    $("#radius").val("10");

    // This is our API key
    var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        userCity + "&units=imperial&appid=" + weatherAPIKey;


    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: weatherURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log("weatherURL: " + weatherURL);

            // Log the resulting object
            console.log(response);




            // Clear absolutely everything stored in localStorage using localStorage.clear()
            localStorage.clear();

            // Store the userCity into localStorage using "localStorage.setItem"
            localStorage.setItem("city", userCity);


            console.log("userCity: " + userCity);
            console.log("radius: " + radius);

            // And display that city for the user using "localStorage.getItem"
            // $(".jumbotron").text(localStorage.getItem("city"));

            $(".jumbotron").html("<h1>" + response.name + "</h1><br><h3>Temperature (F): " + Math.round(response.main.temp) + "</h3><h3>Humidity (%): " + response.main.humidity + "</h3><h3>Wind Speed (m/s): " + Math.round(response.wind.speed) + "</h3><h3>Condition: " + response.weather[0].description + "</h3><h1><img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'></h1>");


            // Log the data in the console as well
            console.log("userCity: " + response.name);
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
            console.log("Details: " + response.weather[0].description);
            console.log("Icon_Number: " + response.weather[0].icon);
        });

    var eventAPIKey = "8K4g8J4q2z2RFfZf";

    var eventsURL = "http://api.eventful.com/rest/events/search?...&date=today&page_size=10&location=" + userCity + "&within=" + radius + "&api_key=" + eventAPIKey;


    // Here we run our AJAX call to the Eventful API
    $.ajax({
        url: eventsURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log("eventsURL: " + eventsURL);

            // Log the resulting object
            console.log(response);

            $("#well-section").html("<h1>" + response.events.title + "</h1><br><h3>" + response.events.description + "</h3><h3>By " + response.events.venue_name + "</h3><h3>" + response.events.start_time + "</h3><h3> ~ " + response.events.stop_time + "</h3><h4>" + response.events.url);

            //       // Log the data in the console as well
            console.log("Title: " + response.events.title);
            console.log("Description: " + response.events.description);
            console.log("Venue: " + response.events.venue_name);
            console.log("From: " + response.events.start_time);
            console.log("To: " + response.events.stop_time);
            console.log("Event URL: " + response.events.url);

        });

});



// Eventful API Authentication (api_key needed, but no OAuth needed; outdoor category exists!)
// api_key: http://api.eventful.com/docs/auth
// api_key: 8K4g8J4q2z2RFfZf
// parameters: http://api.eventful.com/docs/events/search



// Eventbrite API Authentication (api_key & OAuth needed)
// Ref: https://www.eventbrite.com/developer/v3/api_overview/authentication/#ebapi-oauth-token-flow
// APP NAME: Group3		
// KEYS: 33EV54ISFBIHKJNZHQ
// Client secret: RIHQBFLXFSN5BO6X2WC56N5WP7FIUAIINJGYIW3NADUSKQWUWI
// Your personal OAuth token: EK4PGCYQL5OFOX6QYAX6
// Anonymous access OAuth token: PF5UH4TWVTSWZ7ZEUJAI





