/** Código en si de la app de tiempo */
var BASE_URL = "https://query.yahooapis.com/v1/public/yql?";
var DEG = 'c';      // c Celsius, f fahrenheit

var weatherIcon = [
    'wi-tornado', 'wi-tornado', 'wi-tornado', 'wi-lightning', 'wi-lightning', 'wi-snow', 'hail', 'hail',
    'drizzle', 'drizzle', 'rain', 'rain', 'rain', 'wi-snow', 'wi-snow', 'wi-snow', 'wi-snow',
    'hail', 'hail', 'fog', 'fog', 'fog', 'fog', 'wind', 'wind', 'snowflake',
    'cloud', 'cloud moon', 'cloud sun', 'cloud moon', 'cloud sun', 'moon', 'sun',
    'moon', 'sun', 'hail', 'sun', 'wi-lightning', 'wi-lightning', 'wi-lightning', 'rain',
    'snowflake', 'wi-snow', 'wi-snow', 'cloud', 'rain', 'wi-snow', 'wi-lightning'
];


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
    console.log(data);

    var weather = data.query.results.channel;
    var temp  = weather.item.condition.temp;
    var code  = weather.item.condition.code;
    var unit  = weather.units.temperature;

    console.log(weather);
    console.log(weather.item.condition.code);
    console.log(temp);

    var markup = setWeatherIcon(code);

    $('#iconW').removeClass().addClass('wi ' + markup + ' weather-icon');


    var deg = 'º';
/*
    // De momento no discriminamos entre ºC y ºF
    if (DEG == 'c')
    {
        deg = 'ºC';
    }
    else
    {
        deg = 'ºF';
    }
*/

//    $('#today').html(markup);
    $('#clima').append(markup);
    $('.temp h1').empty().append(temp + ' ' + deg );


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