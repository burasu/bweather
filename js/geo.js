/**
 * Archivo que gestionará los datos de la geoposicion,
 * bien a traves de la API, bien por la IP
 * Created by burasu on 23/2/15.
 */

function ipGeo ()
{
    console.log('DEBUG: Obtenemos la posición por IP.');
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
            console.log(coords);

            locationSuccess(coords);
        }
    });
}