crearEstadisticas(dataPartidos.matches);

function crearEstadisticas(partidos) {
    // let partidos = dataPartidos;

    let estadisticasPartido = []; // La array vacía que cogerá los datos 
    // Hacemos el for para iterar por todos los partidos
    // con la condición de que si el partido no esta acabado pasamos a mirar el siguiente 

    for (let i = 0; i < partidos.length; i++) {
        let estadoPartido = partidos[i].status;
        if (estadoPartido !== "FINISHED") {
            continue
        } 
            //declarar las variables con los datos que necesitamos 

            let idEqLocal = partidos[i].homeTeam.id;
            let idEqVisitante = partidos[i].awayTeam.id;

            let nombreEqLocal = partidos[i].homeTeam.name;
            let nombreEqVisitante = partidos[i].awayTeam.name;

            let golesEqLocal = partidos[i].score.fullTime.homeTeam;
            let golesEqVisitante = partidos[i].score.fullTime.awayTeam;


            let eqLocalEncontrado;
            // recoremos el array con un bucle forEach o bien con un for loop 
            // para encontrar el objeto con el mismo id que el equipo local del partido

            //  for (let m = 0; m < estadisticasPartido.length; m++){
            //  if (idEquipoLocal == estadisticasPartido[m].id){
            //      eqLocalEncontrado = estadisticasPartido[m];
            //   }
            // }

            estadisticasPartido.forEach(localEncontrado => {
                if (localEncontrado.id === idEqLocal) {
                    eqLocalEncontrado = localEncontrado
                }
            })

            // si el objeto buscado no se encuentra crearlo y añadirlo al array con estas keys ( id, nombre, goles y partido)

            if (eqLocalEncontrado == undefined) {
                estadisticasPartido.push({
                    id: idEqLocal,
                    name: nombreEqLocal,
                    goals: golesEqLocal,
                    matches: 1
                })

            } else { // Si existe actualizamos los goles y los partidos
                eqLocalEncontrado.matches++ //(eqLocalEncontrado.matches = eqLocalEncontrado.matches + 1)
                eqLocalEncontrado.goals += golesEqLocal; //(eqLocalEncontrado.goals = eqLocalEncontrado.goals + golesEqLocal)
            }


            //se hace igual que con el equipo Local: recorrer array, si no encontrado crear y añadir, si existe actualizamos datos
            let eqVisitanteEncontrado;
            estadisticasPartido.forEach(visitanteEncontrado => {
                if (visitanteEncontrado.id === idEqVisitante) {
                    eqVisitanteEncontrado = visitanteEncontrado
                }
            })
            if (eqVisitanteEncontrado == undefined) {
                estadisticasPartido.push({
                    id: idEqVisitante,
                    name: nombreEqVisitante,
                    goals: golesEqVisitante,
                    matches: 1
                })
            } else {
                eqVisitanteEncontrado.matches++ //(eqVisitanteEncontrado.matches = eqLocalEncontrado.matches + 1)
                eqVisitanteEncontrado.goals += golesEqVisitante; //(eqVisitanteEncontrado.goals + golesEqLocal)
            }
        

    }

    // recoremos el array creado para calcular la media de goles
    for (let j = 0; j < estadisticasPartido.length; j++) {
        let mediaGoles = estadisticasPartido[j].goals / estadisticasPartido[j].matches
        // Añadir la key avg a cada objeto, con el valor goals/matches
        
        // let mediaObjeto = {
        //     avg: mediaGoles.toFixed(3)
        // }

        // Object.assign(estadisticasPartido[j], mediaObjeto);
        estadisticasPartido[j].avg = mediaGoles;
      

    }
    estadisticasPartido.sort((a, b) => b.avg - a.avg)

    console.log(estadisticasPartido); 

    top5mejoresAvgGoles(estadisticasPartido);
}

function top5mejoresAvgGoles(estadisticasPartido){

    let top5estadisticas = estadisticasPartido.slice(0,5);

    let crearTabla = document.getElementById("tablaEstadistica");

    for(let i = 0; i<top5estadisticas.length; i++){
        const tr = document.createElement("tr");

        let equipos = top5estadisticas[i].id;

        let escudoEq = document.createElement("img");
        escudoEq.setAttribute("src", "https://crests.football-data.org/" + equipos + ".svg");
        escudoEq.classList.add("imgEquiposEst");

        let datosTablaEq = [
            escudoEq,
            top5estadisticas[i].name,
            top5estadisticas[i].goals,
            top5estadisticas[i].matches,
            top5estadisticas[i].avg.toFixed(2)
        ]
        
        for(let j = 0; j<datosTablaEq.length; j++){
            const td = document.createElement("td");
            td.append(datosTablaEq[j]);
            tr.appendChild(td);
            crearTabla.appendChild(tr); 
        }
    }
}
top5mejores(estadisticasPartido);



