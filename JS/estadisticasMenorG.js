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
// nueva funcion para la tabla donde le pasamos como paramtro el array resultado 
// usar slice() para devolver las 5 primeras posiciones del array 




calcularEstadisticas2(dataPartidos.matches);

function calcularEstadisticas2(matches) {

    let estadisticasPartido2 = [];

    for (let i = 0; i < matches.length; i++) {
        let estadoPartido2 = matches[i].status;
        if (estadoPartido2 !== "FINISHED") {
            continue
        }
        let golesLocal = matches[i].score.fullTime.homeTeam;

        let idEquipoVisitante = matches[i].awayTeam.id;
        let nombreVisitante = matches[i].awayTeam.name;

        let awayTeamEncontrado;

        estadisticasPartido2.forEach(visitanteEncontrado => {
            if (visitanteEncontrado.id === idEquipoVisitante) {
                awayTeamEncontrado = visitanteEncontrado
            }
        })

        if (awayTeamEncontrado == undefined) {
            estadisticasPartido2.push({
                id: idEquipoVisitante,
                name: nombreVisitante,
                goals: golesLocal,
                matches: 1
            })
        } else {
            awayTeamEncontrado.goals += golesLocal;
            awayTeamEncontrado.matches++
        }


    }

    estadisticasPartido2.sort((a, b) => a.goals - b.goals);
    console.log(estadisticasPartido2);
    top5menosGvisitante(estadisticasPartido2);
}

function top5menosGvisitante(estadisticasPartido2) {

    let top5menosG = estadisticasPartido2.slice(0, 5);

    let crearTabla2 = document.getElementById("tablaEstadistica2");

    for (let i = 0; i < top5menosG.length; i++) {
        const tr = document.createElement("tr");

        let equipos = top5menosG[i].id;

        let escudoEq = document.createElement("img");
        escudoEq.setAttribute("src", "https://crests.football-data.org/" + equipos + ".svg");
        escudoEq.classList.add("imgEquiposEst");

        let datosTablaEq2 = [
            escudoEq,
            top5menosG[i].name,
            top5menosG[i].goals,
            top5menosG[i].matches
        ]

        for (let j = 0; j < datosTablaEq2.length; j++) {
            const td = document.createElement("td");
            td.append(datosTablaEq2[j]);
            tr.appendChild(td);
            crearTabla2.appendChild(tr);
        }
    }
}
top5menosGvisitante(estadisticasPartido2);