/**
 * Archivo que gestionará los datos de la geoposicion,
 * bien a traves de la API, bien por la IP
 * Created by burasu on 23/2/15.
 */

var DEBUG;

function bGeoposition (d)
{
    console.log(d);
    DEBUG = (d) ? d : false;

    debug('Inicio de las nuevas funciones de geolocalización');

    // capturamos el objeto navigator.geolocation en una variable.
    var geo = navigator.geolocation;

    if ( ! geo)
    {
        debug('El navegador tiene soporte de la API de geolocalización.');

        geo.getCurrentPosition(locationSuccess, locationError, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 75000
        });
    }
    else
    {
        debug('El navegador no tiene soporte de la API de geolocalización.');

        // Lanzamos la función de geoposición por IP.
        ipGeo();
    }
}

function ipGeo ()
{
    debug('Obtenemos la posición por IP.');

    $.ajax({
        url: '//freegeoip.net/json/',
        type: 'POST',
        dataType: 'jsonp',
        success: function(data) {
            var coords = [];

            coords['ip']           = data.ip;
            coords['country_code'] = data.country_code;
            coords['country_name'] = data.country_name;
            coords['region_code']  = data.region_code;
            coords['region_name']  = data.region_name;
            coords['city']         = data.city;
            coords['zip_code']     = data.zip_code;
            coords['time_zone']    = data.time_zone;
            coords['longitude']    = data.longitude;
            coords['latitude']     = data.latitude;
            coords['metro_code']   = data.metro_code;

            if (DEBUG)
            {
                console.log('--- DEBUG: ');
                console.log(coords);
            }

            locationSuccess(coords);
        }
    });
}

/*
 Función con la que gestionamos si la localización tuvo algún tipo de error.
 */
function locationError (err)
{
    debug('No se pudo obtener la posicion. Devolvió un código de error: ' + err.code);

    switch (err.code)
    {
        case err.PERMISSION_DENIED:
            debug('No se ha permitido el acceso a la posición del usuario. Se busca por IP.');
            ipGeo();
            break;
        case err.POSITION_UNAVAILABLE:
            debug('No se ha podidio acceder a la información de su posición. Se busca por IP.');
            ipGeo();
            break;
        case err.TIMEOUT:
            debug('DEBUG: El servicio ha tardado demasiado tiempo en responder. Se busca por IP.');
            ipGeo();
            break;
        default:
            debug('Error no controlado. Se manda excepción y no mostramos el tiempo.');
            $('span.location').html('No disponible');
            $('#app').fadeIn(2000);
            $('#loading').hide();
            break;
    }
}

/*
    Función que muestra en la consola los mensajes de traza
 */
function debug (mensaje)
{
    console.log(DEBUG);
    if (DEBUG == true)
        console.log('--- DEBUG: ' + mensaje);
}