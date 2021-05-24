# ***LaLiga Santander***  WebV1.0
![LaLiga Santander](https://github.com/alexa9205/Bootcamp---Proyecto2-LaLiga-Santander-/blob/master/Imagenes/laliga-santander-v-300x300.png) 
## Descripción de LaLiga Santander Web
 ***LaLiga Santander***  WebV1.0 consiste en un proyecto mediante cual el usuario puede acceder a la clasificación, a los resultados y las estadisticas de la Liga Española :soccer: . 

Facilita al usuario el acceso a las páginas web de los distintos equipos que conforman esta competición y una visualización rápida :eyes: de las últimas noticias que LaLiga publica en su cuenta de Facebook.

Para que el usuario disfrute aún más se añadieron los clubes de la Premier League (Liga Inglesa) y los clubes de la League 1 (Liga Francesa) , accediendo así a la web de cada equipo y poder estar al tanto de las ultimas noticias de los clubes más conocidos del mundo. 

Para visualizar el proyecto, pulsa [aquí](https://resultados-liga.netlify.app/)

## Funciónalidades

- Acceso a todas las paginas oficiales de los clubes de *LaLiga Santander*, *Premier League*, *League 1*.
- Acceso a la clasificación general de los equipos de *LaLiga Santader*, donde el usuario podrá visualizar en cualquier momento que puesto ocupa su equipo y si esta en posición para acceder a las competiciónes europeas como Champions League, Europa League o si esta en posición de descenso a la *Liga SmartBank*.
- Acceso a los resultados de todos los partidos de *LaLiga Santander*. El usuario puede filtrar los resultados en función del equipo que le interese, así como en función del resultado del mismo : ganados, empatados o perdidos.
- Acceso a unas tablas de estadisticas de golaveraje. El usuario puede ver top 5 equipos con mayor media de goles a favor por partido o top 5 equipos con menos goles en contra como visitante.
- Acceso al feed del Facebook de la cuenta oficial de LaLiga Santander.

## Tecnologias usadas
![metodologias2](https://user-images.githubusercontent.com/81650755/119335963-4c36c300-bc8d-11eb-9ef7-9d256827dcba.jpg)

- **HTML5** : para hacer el esqueleto de la pagina web
- **CSS3** : para el diseño de la interfaz
- **Bootstrap** : para el diseño de la interfaz y al mismo tiempo creando una web responsive capaz de adaptarse y que pueda ser accesible desde cualquier dispozitivo: tablets, smartphone, pc, etc.. 
- **VanillaJS** : para dar mejor rendimiento y dinamismo al sitio web y al mismo tiempo darle funciónalidad
- **Postman** : para coger la información y los datos que se muestran en la  web
- **Git** y **GitHub** : control de versiones y repositorio en remoto para trabajar en distintas branches
- **AlertifyJS** : libreria de JavaScript con la que se modificaron las alertas que se muestran al usuario.

## Descripción técnica 

Se han usado dos tipos de funciónalidades : genericas y especificas.

Como funcionalidades genericas podemos encontrar las siguientes funciones: `getFetch()`,`crearTabla()`, `quitarSpinner()`, `crearTablaClasificacion()`
- `getFetch()` usada en todos los archivos JS, es la función encargada de coger los datos en tiempo real de la API, sin necesidad de usar el POSTMAN.
- `crearTabla()` es la función encargada de crear la tabla con los equipos, cada vez que queremos filtrarlos por nombre del equipo, o bien los resultados: ganados, empatados, perdidos o proximos partidos. Interviene cada vez que es accionado alguno de los botones del filtro, pasandole un parametro ú otro. Esta función se podría volver a usar si queremos hacer lo mismo con los equipos de las otras ligas, arriba mencionadas.
- `quitarSpinner()` usada en todos los archivos JS, en los cual se cogen datos con la API. Su función es de "parar/ocultar" el spinner despues de recibir la respuesta de la API
-`crearTablaClasifiacion()` encargada de crear la tabla de clasifiacion de los equipos de LaLiga Santander, recogiendo datos como: posicion, nombre del equipo, partidos jugados, partidos ganados, empatados o perdidos, goles marcados, goles recibidos, diferencia de goles y puntos totales. Se podría volver a usar para hacer la tabla de clasifiación de las otras ligas.

Como funcionalidades especificas podemos encontrar las siguiente funciónes : 
- `limpiarTabla()` función usada para limpiar el *body* de la tabla, cada vez que realizamos una busqueda nueva, de esta manera solo nos aparecen los nuevos resultados. Sin esta función se añadirían filas a la tabla y para poder encontrar los resultados de nuestra busqueda tendriamos que hacer scroll hasta el final de la tabla. 
- `filtrarNombreEquipo()` esta función tiene 2 tareas : 

      - filtrar los equipos por nombre con los datos introducidos por el usuario
      - volver hacer otro filtro de la nueva array creada con los nombres del equipo en función de su resultado
   
- `resetearFiltro()` usada para resetear todos los filtros, limpiando el campo donde el usuario introduce el nombre de su equipo. Esta función se usa también en el caso de que algúna de las condiciónes no se cumplen y al usuario le salta alguna alerta. 
- `crearEstadisticas()` y `top5mejoresAvgGoles()` son las 2 funciónes encargadas de crear la tabla y filtrar los 5 equipos con mayor media de goles a favor por partido.
- `calcularEstadisticas2()` y `top5menosGvisitante()` las funciónes encargadas de crear la tabla y filtrar los 5 equipos con menos goles en contra como visitante.
- `crearEquipos()` es encargada de recorrer el array de los equipos y añadir las imagenes de los clubes junto con su nombre y poder acceder directamente a la web oficial de cada club.

## Versiones
v1.0 (26.05.2021) - Presentación proyecto

## TO-DO
- Clasificación League1 , Premier League
- Resultados y filtros League1, Premier League
- Filtrar resultados por fechas

