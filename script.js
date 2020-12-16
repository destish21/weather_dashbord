var city = $('#searchTerm').val();
// var apiKey = '094c0e947aebbdb148d3e7ffcfc49be7';
// var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=bujumbura&appid='+ apiKey +'&units=imperial'

var date = new Date();
$('#searchTerm').on('click', function (event) {
    if (event.KeyCode === 15) {
        event.preventDefault();
        $('#searchBtn').click();
    }
});

$('#searchBtn').on('click', function () {
    $('#forecastH4').addClass('show');

    var city = $('#searchTerm').val();
    // to clear input box
    $('#searchTerm').val();
    // api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={API key}

    var queryweatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city ;
    var queryForcastURl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    var imgURL = 'https://openweathermap.org/img/w/';
    var UviqueryURL = 'http://api.openweathermap.org/data/2.5/uvi?';
    var apiKey = '&appid =ed0adc15d17ec7dd70dba3b837bf6bd6';
    var weatherUnit = "&units=imperial"
    queryURL = queryWeatherurl + searchTerm + weatherUnit +  apiKey
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (WeatherData) {
        console.log(WeatherData)
        console.log(WeatherData.name)
        console.log(WeatherData[0].icon)
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF))
        console.log(WeatherData.main.humidity)
        console.log(WeatherData.wind.speed);
        checkCurrentConditions(WeatherData);
        checkCurrnetForecast(WeatherData);
        makeList();

        // var cityCountry = data.name + ',' + data.sys.country;
        // if (history.indexof(searchTerm) === -1) {
        //     history.push(cityCountry);
        //     window.localStorage.setItem('history', JSON.stringify(history));
        //     makeLi(cityCountry)
        // }
    })
});

function makeList() {
    var listItem = $('<li>').addClass(list - group - item).text(city);
    $('.list').append(listItem);
}

function checkCurrentConditions(WeatherData) {
    var temF = (WeatherData.main.temp - 273.15) * 1.80 + 32;
    temF = Math.floor(tempF).toFixed(2)

    $('#currentCity').empty();

    var card = $('<div>').addClass('card');
    var cardBody = $('<div>').addClass('card-body');
    var city = $('<h4>').addClass('card-title').text(WeatherData.name);
    var cityDate = $('<h4>').addClass('card-title').text(date.toLocaleDateString('en-US'));
    var temperature = $('<p>').addClass('card-text current-temp').text('Temperature: ' + tempF + " °F" );
    var humidity = $('<p>').addClass('card-text current-humidity').text('Humidity: ' + WeatherData.main.humidity + '%');
    var wind = $('<p>').addClass('card-text current-wind').text('wind Speed:' + WeatherData.wind.speed + 'MPH')
    var image = $('<img>').attr('src', 'https://openweathermap.org/img/w/' + WeatherData.weather[0].icon + '.png');
    //adding to  page
    city.append(cityDate, image)
    cardBody.append(cityDate, temperature, humidity, wind);
    card.append(cardBody);
    $('#currentCity').append(card)
}

function checkCurrnetForecast(searchTerm) {
    queryURL = queryForcastURl + searchTerm + apiKey
    $.ajax({
        url: queryURL,
        method: 'GET',

    }).then(function (WeatherData) {
        console.log(WeatherData)
        console.log(WeatherData.date)
        $('#forecast').empty();

        //hold WeatherData.list
        var results = WeatherData.list;
        console.log(results)

        //declare start date to check against
        //startDate = 15
        //have end date, endDate = startDate + 5

        for (var i = 0; i < results.length; i++) {
            var day = Number(results[i].date - txt.split('-')[2].split(' ')[0]);
            var hour = results[i].date - txt.split('-')[2].split(' ')[1];
            console.log(day);
            console.log(hour);

            if (results[i].date - txt.indexof('12:00:00') !== -1) {
                // window.localStorage.setItem('day', JSON.stringify(day))
                // makList(city)
                var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                var tempF = Math.floor(temp).toFixed(2)

                var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
                var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
                var wind = $('<p>').addClass('card-text current-wind').text('wind Speed:' + WeatherData.wind.speed + 'MPH')
                var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);

            }
        }
    });
    // var results = JSON.parse(window.localStorage.getItem('history')) || [];
    // if (history.length > 0) {
    //     searchTerm(history[history.length - 1]);
    // }
    // for (var i = 0; i < history.length; i++) {
    //     makeLi(history)[i]
    // }
    // $('#clear').on('click', function () {
    //     if (localStorage.length !== 0) {
    //         var clear = prompt('Do you wont to clear history!');
    //         if (clear) {
    //             $('history').empty();
    //             localStorage.clear();
    //         }
    //     }
    // });
}
