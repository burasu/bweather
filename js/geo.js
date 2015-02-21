/**
 * Este archivo se encargará de atacar a la API de http://freegeoip.net y así obtener
 * la posición a partir de la IP facilitada por el dispositivo.
 *
 * Created by burasu on 21/2/15.
 */

function ipGeo ()
{
    console.log('-- HACEMOS USO DE LA IP --');
    $.ajax({
        url: '//freegeoip.net/json',
        type: 'POST',
        dataType: 'jsonp',
        async: false,
        success: function(data) {

            /**
             * nos devolverá un objeto, y sus propiedades son:
             * ip
             * country_code
             * country_name
             * region_code
             * region_name
             * city
             * zip_code
             * time_zone
             * latitude
             * longitude
             * metro_code
             */
            console.log(data);

            // Aqui se debe llamar a tu función de validación que hará lo que sea
            // con esos datos.
            locationSuccess(data);
        },
        error: function (err) {
            // Aquí debe ir la función preparada en caso que tenga un error la llamada
            locationError(err);
        }
    });
}