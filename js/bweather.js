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

$(function()
{
    // Configuración básica.
    var geo = navigator.geolocation;

    // En primer lugar vamos a determinar si podemos localizar el dispositivo.
    if (geo)
    {
        geo.getCurrentPosition(locationSuccess, locationError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }
    else
    {
//        showError("Your browser does not support Geolocation!");
        console.log('No se admite geolocalización');
    }


    // Si hubo exito en detectar la posición del usuario y el pronostico.
    function locationSuccess(position)
    {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

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


    // Si hubo algún error.
    function locationError()
    {
        console.log('Hubo un error al generar la geoposicion')
        $('span.location').html('No disponible');

    }

});

// Función con la que tratamos los datos de la localización que hemos recibido
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


// Función con la que extraemos los datos del tiempo según la geoposición.
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


// Funcion con la que tramitamos los valores recibidos y pintamos las etiquetas.
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

    var markup = '<i class="climacon ' + weatherIcon[code] + '"></i>'+
        ' <p class="day">' + temp + '</p> <p class="cond">condition</p>';

    $('#clima').append(markup);

}