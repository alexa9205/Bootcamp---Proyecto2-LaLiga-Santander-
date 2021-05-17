//Top 5 equipos con menos goles en contra como visitante

//necesitamos recorrer el array 1ero para ver si el partido se ha jugado o no
// declarar el id del eq visitante
// declarar los goles marcados por el equipo local ()
// declarar el equipo visitante
// buscar en la array estadísticas el objeto con el mismo id que el visitante del partido y guardarlo en una variable
// si el objeto buscado no existe, crearlo con estos keys: id, name, goals, matches.
// rellenar cada key con el valor correspondiente
// si existe, actualizar los goles y los partidos
// usar sort() en el array resultante  por menor numero de goles y mayor nr de partidos
// usar slice() para devolver las 5 primeras posiciones del array 




calcularEstadisticas2(dataPartidos.matches);
function calcularEstadisticas2(matches){

    let estadisticasPartido2 = [];

    for(let i = 0; i<matches.length; i++){
        let estadoPartido2 = matches[i].status;
        if (estadoPartido2 !== "FINISHED") {
            continue
        } 


    }


}