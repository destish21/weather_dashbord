function getweather(city) {
    var apiKey = '&appid=ed0adc15d17ec7dd70dba3b837bf6bd6';
    var queryweatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var queryForcastURl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    var UviqueryURL = 'https://api.openweathermap.org/data/2.5/uvi?';
    var weatherUnit = "&units=imperial";
    var imgURL = 'https://openweathermap.org/img/w/';
    queryURL = queryweatherURL + city + weatherUnit + apiKey
    $.ajax({
        url: queryURL,
        method: 'GET',

    }).then(function (response) {
        console.log(response);
        var date = (response.dt)
        // console.log(date)
        var temp = (response.main.temp);
        // console.log(temp)
        var cityName = (response.name)
        // console.log(cityName)
        var countryName = (response.sys.country);
        // console.log(countryName)
        var nation = cityName + ', ' + countryName;
        var humidity = (response.main.humidity);
        // console.log(humidity)
        var pressure = (response.main.pressure);
        // console.log(pressure)
        var wind = (response.wind.speed);
        // console.log(wind)
        var lat = (response.coord.lat);
        // console.log(lat)
        var lon = (response.coord.lon)
        // console.log(lon)
        var icon = (response.weather[0].icon);
        // console.log(icon)
        makelist(nation);
        $('#currentCity').empty();
        console.log(nation)

        var card = $('<div>').addClass('card');
        var cardBody = $('<div>').addClass('card-body');
        var city = $('<h2>').addClass('card-title').text(nation);
        // var cityDate = $('<h4>').addClass('card-title').text(date.toLocaleDateString());
        var cityDate = $('<h4>').addClass('card-title').text (new Date((date)));

        var temperature = $('<p>').addClass('card-text current-temp').text('Temperature: ' + temp + " °F");
        var humidity1 = $('<p>').addClass('card-text current-humidity').text('Humidity: ' + humidity + '%');
        var wind1 = $('<p>').addClass('card-text current-wind').text('wind Speed: ' + wind + ' MPH ')
        var pressure1 = $('<p>').addClass('card-text current-pressure').text('Pressure: ' + pressure + ' Pa');
        var image = $('<img>').attr('src', 'https://openweathermap.org/img/w/' + icon + '.png');
        //adding to  page
        city.append(image)
        cardBody.append(cityDate, city, temperature, humidity1, wind1, pressure1);
        card.append(cardBody);
        $('#currentCity').append(card)
        UVIndex(lat, lon);

        // makelist(nation);
        // if (list.indexOf(city) === -1) {
        //     list.push(nation);
        //     window.localStorage.setItem("city", JSON.stringify(list));
        //     // makelist(nation);
        // }
    });

    queryURL2 = queryForcastURl + city + weatherUnit + apiKey
    $.ajax({
        url: queryURL2,
        method: 'GET',
    
    }).then(function (data) {
        console.log(data)
        var results = data.list;
        // console.log(results[0])
        console.log(new Date(data.list[0].dt_txt).toLocaleDateString())
        console.log(data.list[0].weather[0].icon)
        $("#forecast").html("<h3 id=\"forcastHeader\" class=\"mt-3\">5-Days Weather Forecasting:</h4>").append("<div class=\"row\">");
        //  forecasts (by 3-hour increments) loop
        for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                // create div for 5-Days weather forcasting
                var col = $("<div>").addClass("xyz col-md-3");
                var card = $("<div>").addClass("card bg-primary text-white");
                var body = $("<div>").addClass("card-body p-3");
                //create tags todays date, image, temp and humidity,windSpeed,Pressure.
                var title = $("<h2>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                var icon = $('<img>').attr('src', imgURL + data.list[i].weather[0].icon + '.png');
                var p1 = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp_max + " °F");
                var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + " %");
                var p3 = $("<p>").addClass("card-text").text("Wind Speed: " + data.list[i].wind.speed + ' MPH')
                var p4 = $("<p>").addClass("card-text").text("Pressure: " + data.list[i].main.pressure + "  Pa ");
                //apend the tags to the title,image, p1, p2,p3,p4, to body, body to card, card to col and finally col to the 5 days weeatherforecasting div
                $("#forecast .row").append(col.append(card.append(body.append(title, icon, p1, p2, p3, p4,))));
            }
        }
    });

    // for (var i = 0; i < city; i++) {
    //     if (city.length === -1) {
    // makeRow(nation);
    // var city = getweather(city);
    list.push(city);
    // console.log(list , 'x')
    window.localStorage.setItem('city', JSON.stringify(list));

    //     }
    // }
    // console.log(city)


    // var list = JSON.parse(window.localStorage.getItem("city")) || [];
    // if (city.length > 0) {
    //     getweather(list[list.length - 1]);
    // }
    // for (var i = 0; i <city.length; i++) {
    //     makelist(list[i]);
    // }

    // if (city > 0) {
    //     getweather(city);
    //     // makeRow(nation);
    //     $('body').append(city);
    // }
    // console.log(window.localStorage.getItem('city') ||[])

    function UVIndex(lat, lon) {
        var queryURL = UviqueryURL + apiKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (data) {
            //console.log(data.value);
            //create pagragragh for the uv index text and span tag for the data value number and append it to today's dayly only
            var uvText = $("<p>").text("UV Index: ");
            var mySpan = $("<span>").addClass("btn btn-sm").text(data.value);
            // change color depending on uv value
            if (data.value < 3) {
                mySpan.addClass("btn-success");
            } else if (data.value < 7) {
                mySpan.addClass("btn-warning");
            } else {
                mySpan.addClass("btn-danger");
            }
            $("#currentCity .card-body").append(uvText.append(mySpan));
        });
    }
}

$('#document').ready(function () {
    finalWeather()
})

function finalWeather() {
    var date = new Date();
    $('#searchBtn').on('click', function (e) {
        e.preventDefault();
        var city = $('#myCity').val();
        $('#myCity').val('');
        // console.log(city)
        getweather(city);
    });

    $(".list").on("click", "li", function () {
        getweather($(this).text());
    });
}
function makelist(name) {
    var li = $("<li>").addClass("list-group-item  list-group-item-action").text(name);
    li.attr('id', name);
    $(".list").prepend(li);
}


// var list = JSON.parse(window.localStorage.getItem('city') || []);
var list = JSON.parse(window.localStorage.getItem('city')) || [];
// console.log(list)
for (var i = 0; i < list.length; i++) {
    if (i === 0) {
        // console.log("doing the thing on list 0")
        getweather(list[i]);
    }
    //getweather(list[0])
    // makelist(list[i])
}

$('#clear').on('click', function () {
    if (localStorage.length !== 0) {
        var clear = confirm('press ok if you want to clear list!');
        if (clear) {
            $('list').empty();
            localStorage.setItem('city',[]);
        }
    }
});





