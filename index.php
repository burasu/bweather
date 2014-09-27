<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="description" content="Aplicación de tiempo en HTML5, CSS3 y Javascript" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
    <title>bWeather by Blas Fernández</title>

    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/climacon.css"/>
</head>
<body>
    <header>
        <h1>bWeather <small>by Blas Fernández</small></h1>
        <h2>
            <i class="fa fa-map-marker"></i> <span class="location"></span>
        </h2>
    </header>

    <section id="weather">
        <article>
            <div id="clima"></div>
            <div id="temperature"></div>
        </article>
    </section>

    <section id="forecast"></section>

    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="js/bweather.js"></script>

</body>
</html>