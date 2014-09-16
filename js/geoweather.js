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

    console.log(tmp);

    $('#city').prepend(tmp);

    obtenerClima(woeid);
}

function obtenerClima(woeid)
{
    var query = "SELECT * FROM weather.forecast WHERE woeid='"+woeid+"'";
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
    var img   = new Image();
    img.src   = "http://l.yimg.com/a/i/us/we/52/"+code+".gif";

    console.log(clima);

    $('#clima')
        .html('<strong>'+temp+'</strong> '+unit+'º')
        .prepend(img);
}