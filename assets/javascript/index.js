// $('.demo').fireworks({
//   sound: true, // sound effect
//   opacity: 0.9,
//   width: '100%',
//   height: '100%'
// });

// $("body").animate({opacity: 0}, 3000, function(){
//     $(this).css({'background-image': "url('https://i1.wp.com/captiontool.com/wp-content/uploads/2018/02/Captions-For-Event.jpg?resize=768%2C341&ssl=1')"})
//                .animate({opacity: 1},{duration: 3000});
//  });


$.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {

        $('#location').val(location.city);
        console.log("location.city: " + location.city);
    }
});



// var userCity ="";

$("#findButton").on("click", function () {
    $("#location").val("");
});

// By default (upon load) show the name stored in localStorage using "localStorage.getItem"
// $(".jumbotron").text(localStorage.getItem("city"));

// When users click "save-name"
$("#findButton").on("click", function (event) {
    // This line prevents the page from refreshing when a user hits "enter".
    event.preventDefault();


    // Clear the HTML from the jumbotron
    // $(".jumbotron").html("");

    // Grab the user input
    var userCity = $("#location").val().trim();
    var radius = $("#radius").val().trim();


    // initialize the input values
    $("#location").val("");
    $("#radius").val("10");

    // This is our API key
    var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
        userCity + "&units=imperial&appid=" + weatherAPIKey;


    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: weatherURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            // console.log("weatherURL: ", weatherURL);

            // // Log the resulting object
            // console.log(response);




            // // Clear absolutely everything stored in localStorage using localStorage.clear()
            // localStorage.clear();

            // // Store the userCity into localStorage using "localStorage.setItem"
            // localStorage.setItem("city", userCity);


            // console.log("userCity: " + userCity);
            // console.log("radius: " + radius);

            // And display that city for the user using "localStorage.getItem"
            // $(".jumbotron").text(localStorage.getItem("city"));


            console.log("******************");
            console.log("response", response);

            var results = response.list;

            console.log("******************");
            console.log("results: response.list", response.list);

            console.log("******************");
            console.log("response.city.name", response.city.name);

            for (var j = 0; j < results.length; j++) {
                console.log("******************");
                console.log("results[0].dt_txt", results[0].dt_txt);
                console.log("Temperature: ", Math.round(results[0].main.temp));

                var weatherDiv = $("<div>").html("<div><p><strong>" + response.city.name + "</strong></p><br><p>Date: " + results[j].dt_txt + "</p><p>Temperature: " + Math.round(results[j].main.temp) + " ° F</p><p>Sky: " + results[j].weather[0].main + "</p><p><img src='http://openweathermap.org/img/w/" + results[j].weather[0].icon + ".png'></p></div>****************************<br>");

                console.log("******************");
                console.log("weatherInfo==>", weatherInfo);

                $("#weatherInfo").append(weatherDiv);

            }

            // $(".jumbotron").html("<h2>" + response.name + "</h2><br><h4>Temperature: " + Math.round(response.main.temp) + " F </h4><h4>Humidity: " + response.main.humidity + " % </h4><h4>Wind Speed: " + Math.round(response.wind.speed) + " m/s </h4><h4>Condition: " + response.weather[0].description + "</h4><h4><img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'></h4>");

        });

    // Eventful api
    var eventAPPKey = "8K4g8J4q2z2RFfZf";

    var eventsURL = "http://api.eventful.com/json/events/search?date=today&page_size=10&location=" + userCity + "&within=" + radius + "&app_key=" + eventAPPKey;


    $.ajax({
        url: eventsURL,
        method: "GET"
    }).then(function (response) {
        var responseJSON = JSON.parse(response)

        console.log("eventsURL: ", eventsURL);

        const { event } = responseJSON.events;

        for (var i = 0; i < event.length; i++) {
            const description = event[i].description ? event[i].description : "No Description Available.";
            const venueAddress = event[i].venue_address ? event[i].venue_address : "No Address Available.";

            const eventInfo = $("<div>").html("<div><p><strong>" + event[i].title + "</strong></p><p>" + description + "</p><p>By: " + event[i].venue_name + "</p><p>Where: " + venueAddress + "</p><p>Starting at: " + event[i].start_time + "</p></div>**********************<br>");
            $("#well-section").append(eventInfo);
        }

        //       // Log the data in the console as well
        console.log(responseJSON.events.event[0].title);
        console.log(responseJSON.events.event[0].description);
        console.log(responseJSON.events.event[0].venue_name);
        console.log(responseJSON.events.event[0].start_time);


        // function initMap() {
        //     var uluru = { lat: event[0].latitude, lng: event[0].longitude };
        //     var map = new google.maps.Map($('#map'), {
        //         zoom: 4,
        //         center: uluru
        //     });
        //     var marker = new google.maps.Marker({
        //         position: uluru,
        //         map: map
        //     });
        // }




    });

});



// Meetup API
// APP key: 46151b4431f28d6e5f33668147529


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


// Version 2 for weatherInfo

            // var results = response.list;

            // for (var i = 0; i < results.length; i++) {

            //     var city = response.city.name
            //     var date = results[i].dt_txt;
            //     var temp = Math.floor(results[i].main.temp);
            //     var sky = results[i].weather[0].main;
            //     var image = results[i].weather[0].icon

            //     console.log(city);
            //     console.log(date);
            //     console.log(temp + "° F");
            //     console.log(sky);
            //     console.log(image);

            //     var weatherDiv = $("<div>");
            //     var weatherImage = $("<img>");
            //     var weatherCity = $("<p>").text(city);
            //     var weatherDay = $("<p>").text("Date: " + date);
            //     var weatherSky = $("<p>").text("Sky: " + sky)
            //     var weatherTemp = $("<p>").text("Temperature: " + temp + "° F");

            //     weatherImage.attr("src", "http://openweathermap.org/img/w/" + image + ".png")

            //     $(".jumbotron").append(weatherDiv);
            //     weatherDiv.append(weatherCity);
            //     weatherDiv.append(weatherDay);
            //     weatherDiv.append(weatherSky);
            //     weatherDiv.append(weatherTemp);
            //     weatherDiv.append(weatherImage);
            // }


