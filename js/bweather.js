/** Código en si de la app de tiempo */
var BASE_URL = "https://query.yahooapis.com/v1/public/yql?";
var DEG = 'c';      // c Celsius, f fahrenheit

var weatherIcon = [
    'tornado', 'tornado', 'tornado', 'lightning', 'lightning', 'snow', 'hail', 'hail',
    'drizzle', 'drizzle', 'rain', 'rain', 'rain', 'snow', 'snow', 'snow', 'snow',
    'hail', 'hail', 'fog', 'fog', 'fog', 'fog', 'wind', 'wind', 'snowflake',
    'cloud', 'cloud moon', 'cloud sun', 'cloud moon', 'cloud sun', 'moon', 'sun',
    'moon', 'sun', 'hail', 'sun', 'lightning', 'lightning', 'lightning', 'rain',
    'snowflake', 'snowflake', 'snowflake', 'cloud', 'rain', 'snow', 'lightning'
];


$().ready(function () {

    // capturamos el objeto navigator.geolocation en una variable.
    var geo = navigator.geolocation;

    if (geo)
    {
        console.log('DEBUG: El navegador tiene soporte de la API de geolocalización.');

        geo.getCurrentPosition(locationSuccess, locationError, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 75000
        });
    }
    else
    {
        console.log('DEBUG: El navegador no tiene soporte de la API de geolocalización.');

        // Lanzamos la función de geoposición por IP.
        ipGeo();
    }


});


/*
    Función con la que gestionamos si la localización tuvo algún tipo de error.
 */
function locationError (err)
{
    console.log('DEBUG: No se pudo obtener la posicion. Devolvió un código de error: ' + err.code);

    switch (err.code)
    {
        case err.PERMISSION_DENIED:
            console.log('DEBUG: No se ha permitido el acceso a la posición del usuario. Se busca por IP.');
            ipGeo();
        break;
        case err.POSITION_UNAVAILABLE:
            console.log('DEBUG: No se ha podidio acceder a la información de su posición. Se busca por IP.');
            ipGeo();
        break;
        case err.TIMEOUT:
            console.log('DEBUG: El servicio ha tardado demasiado tiempo en responder. Se busca por IP.');
            ipGeo();
        break;
        default:
            console.log('DEBUG: Error no controlado. Se manda excepción y no mostramos el tiempo.');
            $('span.location').html('No disponible');
            $('#app').fadeIn(2000);
            $('#loading').hide();
        break;
    }

}

/*
    Si se tuvo exito y tenemos las coordenadas, mostramos el pronóstico.
 */
function locationSuccess(position)
{
    var lat;
    var lon;

    // Este es el objeto de geoposición que habremos recibido.
    console.log(position);

    // Si entramos por la API de freegeoip, no tenemos definido coords.
    if ( ! position.coords)
    {
        console.log('FREEGEOAPI');

        lat = position['latitude'];
        lon = position['longitude'];
    }
    else
    {
        console.log('GEOAPI');
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    }

    console.log('Hemos obtenido las coordenadas');
    console.log(lat);
    console.log(lon);

    var query = "SELECT * FROM geo.placefinder WHERE text='" + lat + "," + lon + "' AND gflags='R' ";
    console.log(query);
    query = encodeURIComponent(query);

    console.log(BASE_URL + "q=" + query);

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
    var country   = data.country;
    var city      = data.city;
    var woeid     = data.woeid;

    var tmp = city + ', ' + country;

    // Localizacion
    console.log(tmp);

    $('span.location').html(tmp);

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

    var markup = '<i class="climacon ' + weatherIcon[code] + '"></i>';

    var deg;

    if (DEG == 'c')
    {
        deg = '<i class="climacon celcius"></i>';
    }
    else
    {
        deg = '<i class="climacon farenheit"></i>';
    }

    $('#clima').append(markup);
    $('#temperature').append('<i class="climacon thermometer medium-high"></i> ' + temp + ' ' + deg );


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
    var weather = '<div class="forecast_icon climacon ' + weatherIcon[data.code] + '"></div>';
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

    $('#app').fadeIn(2000);
    $('#loading').hide();

    return markup;
}