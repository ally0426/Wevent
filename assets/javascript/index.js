


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


    
// console.log("FROMDATEGOESHERE##############");
// console.log( moment($(from).val()).format(dateFormat) );


var start = moment($(from).val()).format(dateFormat);
var end = moment($(to).val()).format(dateFormat);

// moment js
var days = moment($(to).val()).diff(moment($(from).val()), 'days');  // 3

// console.log("daysinfogoeshere##############")
// console.log(days)


// Clear the HTML from the jumbotron
// $(".jumbotron").html("");

// Grab the user input
var userCity = $("#location").val().trim();
var radius = $("#radius").val().trim();


// console.log("userCity:", userCity);

// initialize the input values
$("#location").val("");
$("#radius").val("10 mi");
$("#from").val("");
$("#to").val("");

// This is our API key
var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database (every 3 hours for 5 days: total 40 forecasts)
var weatherURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
    userCity + "&cnt=" + days + "&units=imperial&appid=" + weatherAPIKey;

    // console.log("days&&&&&&&&&&&&&&&&");
    // console.log(days);
    // console.log("weatherURLgoeshere&&&&&&&&&&&&");
    // console.log(weatherURL);

// Current weather:
//    api.openweathermap.org/data/2.5/weather?q=London


// Call 7 days(cnt: 1-16 days, daily forecast): 
// api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=imperial&cnt=7;


console.log(weatherURL)
// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: weatherURL,
    method: "GET"
})
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
        console.log(response)
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


        // console.log("******************");
        // console.log("response", response);




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

        //     $("#weatherInfo").append(weatherDiv);
        //     weatherDiv.append(weatherCity);
        //     weatherDiv.append(weatherDay);
        //     weatherDiv.append(weatherSky);
        //     weatherDiv.append(weatherTemp);
        //     weatherDiv.append(weatherImage);
        // // }
        // console.log("LOOK HERE!!!")
        // console.log(response.list)
        // console.log("0000000000000000000000000000")


        const results = response.list;

        //grab the 1st 3hr weatherInfo
        
    
        results.forEach(function(result) {
            const weatherDiv = $("<div>").html("<p><strong>" + response.city.name + "</strong></p><br><p>Low: " + Math.round(results.temp.min) +
             " F </p><p>High: " + Math.round(results.temp.max) + " F </p><p>Sky: " + 
            results.weather[0].description + "</p><p><img src='http://openweathermap.org/img/w/" + results.weather[0].icon + ".png'></p>");
        //     console.log("******************");
        //     console.log("weatherDiv: ", weatherDiv);

         $("#weatherInfo").append(weatherDiv);

        // for (var j = 0; j < results.length; j++) {
        //     console.log("******************");
        //     console.log("result.dt_txt", results[0].dt_txt);
        //     console.log("Temperature: ", Math.round(results[0].main.temp));

        //     const weatherDiv = $("<div>").html("<div><p><strong>" + response.city.name + "</strong></p><br><p>Date: " + results[j].dt_txt + "</p><p>Temperature: " + Math.round(results[j].main.temp) + " ° F</p><p>Sky: " + results[j].weather[0].main + "</p><p><img src='http://openweathermap.org/img/w/" + results[j].weather[0].icon + ".png'></p></div>****************************<br>");

        //     console.log("******************");
        //     console.log("weatherDiv: ", weatherDiv);

        

        // }

        // var currentDate = moment();
        // console.log("Current Date: " + currentDate.format("ll"));

        // var pickedDate = $('.datepicker').val();
        // console.log("Date Picked: ", pickedDate);

        // var pickedDate2 = JSON.stringify(pickedDate);
        // console.log(pickedDate2);

        // var daysAway = moment(pickedDate).fromNow();
        //     console.log(daysAway);

        // var formattedPickedDate = moment(pickedDate).format("l");
        // console.log(formattedPickedDate);

        // var diffDate = moment(pickedDate).fromNow('minutes');
        // console.log(diffDate);



    });

// Eventful api
var eventAPIKey = "SHMWgQLH9C3kfzc4";
// console.log("*******************");
// console.log(from);
// console.log(to);

// var eventsURL = "http://eventful.com/events?date=" + start + "00-" + end + "00&page_size=10&location=" + userCity + "&within=" + radius + "&api_key=" + eventAPIKey;

var eventsURL = "http://api.eventful.com/json/events/search?date=" + start + "00-" + end + "00&page_size=10&location=" + userCity + "&within=10&app_key=" + eventAPIKey;

// console.log("startdategoeshere$$$$$$$");
// console.log(start);

// console.log("eventsURLgoeshere$$$$$$$$$$$$$$$$$$$$$$$");
// console.log(eventsURL);

console.log(eventsURL)
$.ajax({
    url: eventsURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
    var responseJSON = JSON.parse(response)

    // console.log("eventsURL: ", eventsURL);

    const { event } = responseJSON.events;

    console.log(event)

    for (var i = 0; i < event.length; i++) {
        const description = event[i].description ? event[i].description : "No Description Available.";
        const venueAddress = event[i].venue_address ? event[i].venue_address : "No Address Available.";

        const eventInfo = $("<tr>").html("<td><strong>" + event[i].title + "</strong></td><td>" + description + "</td><td> " + 
        event[i].venue_name + "</td><iframe width='600' height='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDwCKEyy5bmqNtKpj_zaIYN8QL-DSE0DAc&q=" + 
        response.events.venue_name + " allowfullscreen'></iframe><td>" + event[i].start_time + "</td>**********************<br>");

        // const eventInfo = $("<div>").html("<div><p><strong>" + event[i].title + "</strong></p><p>" + description + "</p><p>By: " + event[i].venue_name + "</p><p>Where: " + venueAddress + "</p><p>Starting at: " + event[i].start_time + "</p></div>**********************<br>");
        $("#well-section").append(eventInfo);
    }
    //       // Log the data in the console as well
    // console.log(responseJSON.events.event[0].title);
    // console.log(responseJSON.events.event[0].description);
    // console.log(responseJSON.events.event[0].venue_name);
    // console.log(responseJSON.events.event[0].venueAddress);
    // console.log(responseJSON.events.event[0].start_time);


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



// different version for Events js

// var eventAPIKey = "R2SmVPVrHGFhKdGX";
// var eventsURL = "http://api.eventful.com/json/events/search?...&date=" + fromDate + "-" + toDate + "&page_size=10&location=" + userCity + "&app_key=" + eventAPIKey;

// // output format to JSON see: http://api.eventful.com/docs/formats 


// $.ajax({
//     url: eventsURL,
//     method: "GET"
//     }).then(function (response) {
//         var responseJSON = JSON.parse(response)
//         console.log("eventsURL: ", eventsURL);

//         const { event } = responseJSON.events;

//         for (var i = 0; i < event.length; i++) {
//             var e = event[i];
//             var description = e.description ? e.description : "No Description yet. Come check later!";

//             // This is an object constructor to create each event retrieved from the API as an object
//             function EventDisplayed(id, icon, title, description, start) {
//                 this.id = id;
//                 this.icon = icon;
//                 this.title = title;
//                 this.description = description;
//                 this.start = start;
//             }

//             // and this is how objects can be dynamically created with properties of the constructor and elements of the API + the "for loop"
//             var newEvent = new EventDisplayed(
//                 "<td id='obj-" + i + ">",
//                 "<td class='icon'> <i class='material-icons' id='icon" + i + "'>" + "favorite_border" + "</i>",
//                 e.title,
//                 description,
//                 e.start_time,
//             )
//             // those are variable to add html tags dynamically
//                 var eInfo = "<tr class='event'>"; 
//                 var idTag = "<td id='obj-"; 
//                 // var iconTag = "<td class='icon'> <i class='material-icons'>" + newEvent.icon
//                 var eEmphasis = "<td class='title'><strong>"
//                 var eDescription = "<td class ='description'>"
//                 var eDate = "<td class='date'>"
                
//                 // and here I create the row with the attributes of the object + the HTML tags
//                 var eRow = `${eInfo} ${newEvent.id} ${newEvent.icon} ${eEmphasis} ${newEvent.title} ${eDescription} ${newEvent.description} ${eDate} ${newEvent.start}`;
//                 console.log(eRow);
            
//                 $("#event-list").append(eRow);

//                 // the goal is to be able to #1 have an id for each event #2 have the icon as an attribute (that can then be changed)
//         }
//     });
// });
// $(document).on("click", ".material-icons", function (){
//     getId = ($(this).attr("id"))
//     console.log(getId);
// });




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


});