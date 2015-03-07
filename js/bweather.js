/** Código en si de la app de tiempo */
var BASE_URL = "https://query.yahooapis.com/v1/public/yql?";
var DEG = 'C';      // c Celsius, f fahrenheit

$().ready(function () {

    var html5Options = { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 };
    geolocator.locate(locationSuccess, locationError, true, html5Options, null);

});


/*
    Si se tuvo exito y tenemos las coordenadas, mostramos el pronóstico.
 */
function locationSuccess(position)
{
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var query = "SELECT * FROM geo.placefinder WHERE text='" + lat + "," + lon + "' AND gflags='R' ";
    query = encodeURIComponent(query);

    var opciones = {
        url: BASE_URL + "q=" + query,
        dataType: 'jsonp',
        jsonpCallback: 'locationCallback',
        data: {
            format : 'json'
        }
    }

    $.ajax(opciones);
}



/*
    Callback que devuelve los datos de la localidad en la que se ubica el usuario.
 */
function locationCallback(position)
{
    var data      = position.query.results.Result;
    var city      = data.city;
    var country   = data.country;
    var woeid     = data.woeid;

    $('.temp h5').empty().append('<i class="fa fa-map-marker"></i> ' + city + ', ' + country);

    getWeather(woeid)
}


/*
    Obtenemos la predicción del tiempo a partir de la ID de la localidad.
 */
function getWeather(woeid)
{
    var query = "SELECT * FROM weather.forecast WHERE woeid='" + woeid + "'";
    query += " AND u='c'";
    query = encodeURIComponent(query);

    var opciones = {
        url: BASE_URL + "q=" + query,
        dataType: 'jsonp',
        jsonpCallback: 'weatherCallback',
        data: {
            format : 'json'
        }
    }

    $.ajax(opciones);
}


/*
    Método que pinta en pantalla la predicción establecida.
 */
function weatherCallback(data)
{
    var weather = data.query.results.channel;

    console.log(weather);

    var sunrise     = weather.astronomy.sunrise;
    var sunset      = weather.astronomy.sunset;

    var humidity    = weather.atmosphere.humidity;

    var temp        = weather.item.condition.temp;
    var code        = weather.item.condition.code;

    var temperature = weather.units.temperature;
    var speed       = weather.units.speed;

    var wind        = weather.wind.speed;
    var direction   = weather.wind.direction;

    // definimos la variable que nos da la fecha y hora actual del sistema.
    var dNow     = new Date();
    var dSunrise = new Date();
    var dSunset  = new Date();

    var hSunrise = sunrise.split(':')[0];
    var mSunrise = sunrise.split(':')[1].split(' ')[0];

    var hSunset  = parseInt(sunset.split(':')[0]) + 12;
    var mSunset  = sunset.split(':')[1].split(' ')[0];

    dSunrise.setHours(hSunrise);
    dSunrise.setMinutes(mSunrise);

    dSunset.setHours(hSunset);
    dSunset.setMinutes(mSunset);

    dNow = dNow.getTime();
    dSunrise = dSunrise.getTime();
    dSunset  = dSunset.getTime();

    var markup = setWeatherIcon(code);

    $('#iconW').removeClass().addClass('wi ' + markup + ' weather-icon');

    if (dNow >= dSunrise)
    {
        if (dNow >= dSunset)
        {
            $('#iconW').addClass('night');
        }
        else
        {
            $('#iconW').removeClass('night');
        }
    }
    else
    {
        $('#iconW').addClass('night');
    }

    var deg = '<i class="wi wi-celsius"></i>';

    // De momento se obtiene la medida dada por el json y no hacemos conversiones.
    DEG = temperature;
    if (DEG == 'C')
    {
        deg = '<i class="wi wi-celsius"></i>';
    }
    else
    {
        deg = '<i class="wi wi-fahrenheit"></i>';
    }


    $('#clima').append(markup);
    $('.temp h1').empty().append(temp + deg );

    // A continuación insertamos la humedad para el dia de hoy.
    humidity = parseFloat(humidity).toFixed(0); // Redondeamos a 0 decimales.
    $('.weather .fa-tint').after(' ' + humidity + '%');

    // En este punto pintamos la velocidad del viento, su medida y la dirección.
    wind = parseFloat(wind).toFixed(0); // Redondeamos a 0 decimales.
    var compass = getCompass(direction);
    console.log(compass);
    $('.weather .wi-strong-wind').after(' ' + wind + speed + ' ' + compass);


    // Procedemos a tramitar el estilo del forecast. Se descarta el indice 0 ya que es el del tiempo actual.
    var forecast = '<ul>'
    forecast += weatherForecast(weather.item.forecast[1]);
    forecast += weatherForecast(weather.item.forecast[2]);
    forecast += weatherForecast(weather.item.forecast[3]);
    forecast += weatherForecast(weather.item.forecast[4]);
    forecast += '</ul>';


    $('#forecast').append(forecast);
}

function weatherForecast(data)
{
    var day = data.day;
    var weather = '<div class="forecast_icon climacon ' + setWeatherIcon(data.code) + '"></div>';
    var min = data.low;
    var max = data.high;

    var deg;

    if (DEG == 'c')
    {
        deg = '<i class="climacon celcius"></i>';
    }
    else
    {
        deg = '<i class="climacon farenheit"></i>';
    }

    var markup = '<li class="next_day">';
    markup += '<div class="forecast_day">' + day + '</div>';
    markup += weather;
    markup += '<div class="forecast_temp"><i class="climacon thermometer medium-high"></i> ' + min + ' / ' + max + deg + '</div>';
    markup += '</li>';

    $('section').fadeIn(2000);
    $('#preloader').hide();

    return markup;
}

/*
 Función con la que gestionamos si la localización tuvo algún tipo de error.
 */
function locationError (err)
{

    // Pendiente mostrar mensaje de error.
    console.log('No se pudo obtener la posicion.');

}


/*
    Función con la que ponemos el icono del tiempo correspondiente.
 */
function setWeatherIcon(condid)
{
    switch(condid) {
        case '0': var icon  = 'wi-tornado';
            break;
        case '1': var icon  = 'wi-storm-showers';
            break;
        case '2': var icon  = 'wi-tornado';
            break;
        case '3': var icon  = 'wi-thunderstorm';
            break;
        case '4': var icon  = 'wi-thunderstorm';
            break;
        case '5': var icon  = 'wi-snow';
            break;
        case '6': var icon  = 'wi-rain-mix';
            break;
        case '7': var icon  = 'wi-rain-mix';
            break;
        case '8': var icon  = 'wi-sprinkle';
            break;
        case '9': var icon  = 'wi-sprinkle';
            break;
        case '10': var icon  = 'wi-hail';
            break;
        case '11': var icon  = 'wi-showers';
            break;
        case '12': var icon  = 'wi-showers';
            break;
        case '13': var icon  = 'wi-snow';
            break;
        case '14': var icon  = 'wi-storm-showers';
            break;
        case '15': var icon  = 'wi-snow';
            break;
        case '16': var icon  = 'wi-snow';
            break;
        case '17': var icon  = 'wi-hail';
            break;
        case '18': var icon  = 'wi-hail';
            break;
        case '19': var icon  = 'wi-cloudy-gusts';
            break;
        case '20': var icon  = 'wi-fog';
            break;
        case '21': var icon  = 'wi-fog';
            break;
        case '22': var icon  = 'wi-fog';
            break;
        case '23': var icon  = 'wi-cloudy-gusts';
            break;
        case '24': var icon  = 'wi-cloudy-windy';
            break;
        case '25': var icon  = 'wi-thermometer';
            break;
        case '26': var icon  = 'wi-cloudy';
            break;
        case '27': var icon  = 'wi-night-cloudy';
            break;
        case '28': var icon  = 'wi-day-cloudy';
            break;
        case '29': var icon  = 'wi-night-cloudy';
            break;
        case '30': var icon  = 'wi-day-cloudy';
            break;
        case '31': var icon  = 'wi-night-clear';
            break;
        case '32': var icon  = 'wi-day-sunny';
            break;
        case '33': var icon  = 'wi-night-clear';
            break;
        case '34': var icon  = 'wi-day-sunny-overcast';
            break;
        case '35': var icon  = 'wi-hail';
            break;
        case '36': var icon  = 'wi-day-sunny';
            break;
        case '37': var icon  = 'wi-thunderstorm';
            break;
        case '38': var icon  = 'wi-thunderstorm';
            break;
        case '39': var icon  = 'wi-thunderstorm';
            break;
        case '40': var icon  = 'wi-storm-showers';
            break;
        case '41': var icon  = 'wi-snow';
            break;
        case '42': var icon  = 'wi-snow';
            break;
        case '43': var icon  = 'wi-snow';
            break;
        case '44': var icon  = 'wi-cloudy';
            break;
        case '45': var icon  = 'wi-lightning';
            break;
        case '46': var icon  = 'wi-snow';
            break;
        case '47': var icon  = 'wi-thunderstorm';
            break;
        case '3200': var icon  =  'wi-cloud';
            break;
        default: var icon  =  'wi-cloud';
            break;
    }

    return icon;

}

/*
    Función que devuleve la dirección del viento
 */
function getCompass(direction)
{
    var rotation = 360 - parseFloat(direction);
    var compass = parseFloat(rotation / 15).toFixed(0);

    console.log(compass);

    switch(compass) {
        // N
        case '0': var icon  = '_0-deg';
            break;
        case '1': var icon  = '_15-deg';
            break;
        case '2': var icon  = '_30_deg';
            break;
        case '3': var icon  = '_45_deg';
            break;
        case '4': var icon  = '_60-deg';
            break;
        case '5': var icon  = '_75-deg';
            break;
        // O
        case '6': var icon  = '_90-deg';
            break;
        case '7': var icon  = '_105-deg';
            break;
        case '8': var icon  = '_120-deg';
            break;
        case '9': var icon  = '_135-deg';
            break;
        case '10': var icon  = '_150-deg';
            break;
        case '11': var icon  = '_165-deg';
            break;
        // S
        case '12': var icon  = '_180-deg';
            break;
        case '13': var icon  = '_195-deg';
            break;
        case '14': var icon  = '_210-deg';
            break;
        case '15': var icon  = '_225-deg';
            break;
        case '16': var icon  = '_240-deg';
            break;
        case '17': var icon  = '_255-deg';
            break;
        // E
        case '18': var icon  = '_270-deg';
            break;
        case '19': var icon  = '_285-deg';
            break;
        case '20': var icon  = '_300-deg';
            break;
        case '21': var icon  = '_315-deg';
            break;
        case '22': var icon  = '_330-deg';
            break;
        case '23': var icon  = '_345-deg';
            break;
        // Empty
        default: var icon  =  '';
            break;
    }

    var icon_wind = '<i class="wi wi-wind-default ' + icon + '"></li>';

    return icon_wind;
}