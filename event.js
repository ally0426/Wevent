


// function to grab the current location automatically
$.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {

        $('#location').val(location.city);
        console.log("location.city: " + location.city);
    }
});



$("#location").on("click", function () {
    $("#location").val("");
});

// By default (upon load) show the name stored in localStorage using "localStorage.getItem"
// $(".jumbotron").text(localStorage.getItem("city"));


$("#from").datepicker();
$("#to").datepicker();


// When users click "save-name"
$("#search").on("click", function (event) {
    // This line prevents the page from refreshing when a user hits "enter".
    event.preventDefault();



    var dateFormat = "YYYYMMDD",
        from = $("#from")
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 3
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
        to = $("#to").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3
        })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }   

        return date;
    }


    
console.log("FROMDATEGOESHERE##############");
console.log( moment($(from).val()).format(dateFormat) );


var start = moment($(from).val()).format(dateFormat);
var end = moment($(to).val()).format(dateFormat);

// moment js
var days = moment($(to).val()).diff(moment($(from).val()), 'days');  // 3

console.log("daysinfogoeshere##############")
console.log(days)


// Clear the HTML from the jumbotron
// $(".jumbotron").html("");

// Grab the user input
var userCity = $("#location").val().trim();
var radius = $("#radius").val().trim();


console.log("userCity:", userCity);

// initialize the input values
$("#location").val("");
$("#radius").val("10 mi");
$("#from").val("");
$("#to").val("");

// Weather api
// from Dan!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Eventful api
var eventAPPKey = "8K4g8J4q2z2RFfZf";
console.log("*******************");
console.log(from);
console.log(to);


var eventsURL = "http://api.eventful.com/rest/events/search?...&date=" + start + "-" + end + "&page_size=10&location=" + userCity + "&within=" + radius + "&api_key=" + eventAPIKey;

console.log("startdategoeshere$$$$$$$");
console.log(start);

console.log("eventsURLgoeshere$$$$$$$$$$$$$$$$$$$$$$$");
console.log(eventsURL);


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

        const eventInfo = $("<tr>").html("<td><strong>" + event[i].title + "</strong></td><td>" + description + "</td><td> " + event[i].venue_name + "</td><td> " + venueAddress + "</td><td> " + event[i].start_time + "</td>**********************<br>");

        // const eventInfo = $("<div>").html("<div><p><strong>" + event[i].title + "</strong></p><p>" + description + "</p><p>By: " + event[i].venue_name + "</p><p>Where: " + venueAddress + "</p><p>Starting at: " + event[i].start_time + "</p></div>**********************<br>");
        $("#well-section").append(eventInfo);
    }
    //       // Log the data in the console as well
    console.log(responseJSON.events.event[0].title);
    console.log(responseJSON.events.event[0].description);
    console.log(responseJSON.events.event[0].venue_name);
    console.log(responseJSON.events.event[0].venueAddress);
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


