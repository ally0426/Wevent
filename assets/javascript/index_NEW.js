
$.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {

        $('#yourCity').val(location.city);
        
    }
});


$("#saveCity").on("click", function (event) {
    event.preventDefault();

   
    $(".jumbotron").html("");

    var userCity = $("#yourCity").val().trim();
    var radius = $("#radius").val().trim();


    $("#yourCity").val("");
    $("#radius").val("10");


    var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

    
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
        userCity + "&units=imperial&appid=" + weatherAPIKey;

    
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
            
            var results = response.list;

            for (var i = 0; i < results.length; i++) {

                var city = response.city.name
                var date = results[i].dt_txt;
                var temp = Math.floor(results[i].main.temp);
                var sky = results[i].weather[0].main;
                var image = results[i].weather[0].icon

                console.log(city);
                console.log(date);
                console.log(temp + "° F");
                console.log(sky);
                console.log(image);

                var weatherDiv = $("<div>");
                var weatherImage = $("<img>");
                var weatherCity = $("<p>").text(city);
                var weatherDay = $("<p>").text("Date: " + date);
                var weatherSky = $("<p>").text("Sky: " + sky)
                var weatherTemp = $("<p>").text("Temperature: " + temp + "° F");

                weatherImage.attr("src", "http://openweathermap.org/img/w/" + image + ".png")

                $("#description").append(weatherDiv);
                weatherDiv.append(weatherCity);
                weatherDiv.append(weatherDay);
                weatherDiv.append(weatherSky);
                weatherDiv.append(weatherTemp);
                weatherDiv.append(weatherImage);
            }

        });


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
            const eventInfo = $("<div>").html("<div><p><strong>" + event[i].title + "</strong></p><p>" + description + "</p><p>By: " + event[i].venue_name + "</p><p>Where: " + venueAddress + "</p><p>Starting at: " + event[i].start_time + "</p></div><br>");
            $("#description").append(eventInfo);
        }



    });

});


