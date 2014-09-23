// Componemos como variable la url para obtener la información desde yahoo query language
var base_url = "http://query.yahooapis.com/v1/public/yql?";

/*
    Función con la que obtenemos la posición del dispositivo del usuario.
 */
function obtenerGeoPosicion(lat, lon)
{
    var query = "SELECT * FROM geo.placefinder WHERE text='" + lat + ", " + lon + "'";
    query += " AND gflags='R'";
    query = encodeURIComponent(query);

    var opciones = {
        url: base_url + "q=" + query,
        dataType: 'jsonp',
        jsonpCallback: 'geocallback',
        data: {
            format : 'json'
        }
    }

    $.ajax(opciones);
}

function geocallback(datos) {
    var info   = datos.query.results.Result;
    var pais   = info.country;
    var ciudad = info.city;
    var woeid  = info.woeid;

    var tmp = '<p>'+ciudad+', ' + pais + '</p>';

    // Localizacion
    console.log(tmp);

    $('#city').prepend(tmp);

    obtenerClima(woeid);
}

function obtenerClima(woeid)
{
    var query = "SELECT * FROM weather.forecast WHERE woeid='" + woeid + "'";
    query += " AND u='c'";
    query = encodeURIComponent(query);

    var opciones = {
        url: base_url + "q=" + query,
        dataType: 'jsonp',
        jsonpCallback: 'climacallback',
        data: {
            format : 'json'
        }
    }

    $.ajax(opciones);
}

function climacallback(datos)
{
    var clima = datos.query.results.channel;
    var temp  = clima.item.condition.temp;
    var code  = clima.item.condition.code;
    var unit  = clima.units.temperature;

    console.log(clima);

    console.log(clima.item.condition.code);

    code = 13;

    // Procedemos a averiguar que icono mostrar
    if (code == 0)              // Tornado
    {
        $('#clima')
            .html('<i class="climacon tornado"></i>');
    }
    else if (code == 1)         // Tropical storm
    {
        $('#clima')
            .html('<i class="climacon downpour"></i>');
    }
    else if (code == 2)         // Hurricane
    {
        $('#clima')
            .html('<i class="climacon tornado"></i>');
    }
    else if (code == 3)         // Severe thunderstorms
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 4)         // Thunderstorms
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 5)         // Mixed rain and snow
    {
        $('#clima')
            .html('<i class="climacon showers"></i>');
    }
    else if (code == 6)         // Mixed rain and sleet
    {
        $('#clima')
            .html('<i class="climacon sleet"></i>');
    }
    else if (code == 7)         // Mixed snow and sleet
    {
        $('#clima')
            .html('<i class="climacon snow"></i>');
    }
    else if (code == 8)         // Freezing drizzle
    {
        $('#clima')
            .html('<i class="climacon drizzle"></i>');
    }
    else if (code == 9)         // Drizzle
    {
        $('#clima')
            .html('<i class="climacon drizzle"></i>');
    }
    else if (code == 10)        // Freezing rain
    {
        $('#clima')
            .html('<i class="climacon rain"></i>');
    }
    else if (code == 11)        // Showers
    {
        $('#clima')
            .html('<i class="climacon showers"></i>');
    }
    else if (code == 12)        // Showers
    {
        $('#clima')
            .html('<i class="climacon showers"></i>');
    }
    else if (code == 13)        // snow flurries
    {
        $('#clima')
            .html('<i class="climacon snow"></i>');
    }
    else if (code == 14)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 15)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 16)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 17)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 18)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 19)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 20)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 21)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 22)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 23)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 24)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 25)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 26)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 27)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 28)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 29)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 30)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 31)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 32)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 33)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 34)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 35)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 36)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 37)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 38)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 39)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 40)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 41)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 42)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 43)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 44)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 45)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 46)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else if (code == 47)
    {
        $('#clima')
            .html('<i class="climacon lightning"></i>');
    }
    else
    {
        $('#clima')
            .html('<i class="climacon"></i>');
    }
}