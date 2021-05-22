function getFetch() {
    const url = "https://api.football-data.org/v2/competitions/2014/matches"
    fetch(url, {
        method: "GET",
        headers: {
            "X-Auth-Token": "059e535324dc40b6ad400487fc71dc33"
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        let partidos = data.matches;

        quitarspinner()
        crearEstadisticas(partidos);
        calcularEstadisticas2(partidos);

    }).catch(err => {
        console.log(err);
        alert("Ha ocurrido un ERROR, vuelve a recargar la pagina !")
    })
}
getFetch();

function crearEstadisticas(partidos) {
    let estadisticasPartido = [];

    for (let i = 0; i < partidos.length; i++) {
        let estadoPartido = partidos[i].status;
        if (estadoPartido !== "FINISHED") {
            continue
        }

        let idEqLocal = partidos[i].homeTeam.id;
        let idEqVisitante = partidos[i].awayTeam.id;

        let nombreEqLocal = partidos[i].homeTeam.name;
        let nombreEqVisitante = partidos[i].awayTeam.name;

        let golesEqLocal = partidos[i].score.fullTime.homeTeam;
        let golesEqVisitante = partidos[i].score.fullTime.awayTeam;

        let eqLocalEncontrado;
        estadisticasPartido.forEach(localEncontrado => {
            if (localEncontrado.id === idEqLocal) {
                eqLocalEncontrado = localEncontrado
            }
        })

        if (eqLocalEncontrado == undefined) {
            estadisticasPartido.push({
                id: idEqLocal,
                name: nombreEqLocal,
                goals: golesEqLocal,
                matches: 1
            })

        } else {
            eqLocalEncontrado.matches++
            eqLocalEncontrado.goals += golesEqLocal;
        }

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
            eqVisitanteEncontrado.matches++
            eqVisitanteEncontrado.goals += golesEqVisitante;
        }


    }

    for (let j = 0; j < estadisticasPartido.length; j++) {
        let mediaGoles = estadisticasPartido[j].goals / estadisticasPartido[j].matches
        estadisticasPartido[j].avg = mediaGoles;


    }
    estadisticasPartido.sort((a, b) => b.avg - a.avg)
    // console.log(estadisticasPartido);
    top5mejoresAvgGoles(estadisticasPartido);
}

function top5mejoresAvgGoles(estadisticasPartido) {

    let top5estadisticas = estadisticasPartido.slice(0, 5);
    let crearTabla = document.getElementById("tablaEstadistica");

    for (let i = 0; i < top5estadisticas.length; i++) {
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

        for (let j = 0; j < datosTablaEq.length; j++) {
            const td = document.createElement("td");
            td.append(datosTablaEq[j]);
            tr.appendChild(td);
            crearTabla.appendChild(tr);
        }
    }
}

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

function quitarspinner() {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("loader").style.visibility = "hidden";
}