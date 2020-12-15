var city = $('#searchTerm').val();
// var apiKey = '094c0e947aebbdb148d3e7ffcfc49be7';
var apiKey = 'ed0adc15d17ec7dd70dba3b837bf6bd6'
// var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=bujumbura&appid='+ apiKey +'&units=imperial'

var date = new Date();
$('#searchTerm').on('click', function (event) {
    if (event.KeyCode === 13) {
        event.preventDefault();
        $('#searchBtn').onclick();
    }
});
$('#searchBtn').on('click', function () {
    $('#forecastH4').addClass('show');

    var city = $('#searTerm').val();
    // to clear input box
    $('#searchTerm').val('');
    // api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={API key}

    var queryurl = 'https://api.openweathermap.org/data/2.5/Weather?q=' + city + apiKey + '&units=imperial'
    $.ajax({
        url: queryurl,
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
        makeLi();
    })
});
function makList() {
    var li = $('<li>').addClass(list - group - item).text(city);
    $('.li').append(li);
}
function checkCurrentConditions(WeatherData) {
    temF = Math.floor(tempF).toFixed(2)

    $('#currentCity').text('');

    var card = $('<div>').addClass('card');
    var cardBody = $('<div>').addClass('card-body');
    var city = $('<h4>').addClass('card-title').text(WeatherData.name);
    var cityDate = $('<h4>').addClass('card-title').text(date.toLocaleDateString('en-US'));
    var temperature = $('<p>').addClass('card-text current-temp').text('Temperature');
    var humidity = $('<p>').addClass('card-text current-humidity').text('Humidity: ' + WeatherData.main.humidity + '%');
    var wind = $('<p>').addClass('card-text current-wind').text('wind Speed:' + WeatherData.wind.speed + 'MPH')
    var img = $('<img>').attr('src', 'https://openweathermap.org/img/w/' + WeatherData.weather[0].icon + '.png');
    //adding to  page
    cardBody.append(cityDate, image, temrature, humidity);
    card.append(cardBody);
    $('#forecast').append(card)
}
function checkCurrnetForecast() {

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey + '&units=imperial'
        method: 'GET',

    }).then(function (WeatherData) {
        console.log(WeatherData)
        console.log(WeatherData.date)
        $('#forecast').text('');

        //hold WeatherData.list
        var results = WeatherData.list;
        console.log(results)

        //declare start date to check against
        //startDate = 15
        //have end date, endDate = startDate + 5
        for (var i = 0; i < results.length; i++) {
            var day = Number(results[i].date - txt.split('-')[2].split('')[0]);
            var hour = results[i].date - txt.split('-')[2].split('')[1];
            console.log(day);
            console.log(hour);
            if (results[i].date - txt.indexof('12:00:00') !== -1) {

                var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                var tempF = Math.floor(temp).toFixed(2)

                const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
                const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

                const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);

            }
        }
    });
}
