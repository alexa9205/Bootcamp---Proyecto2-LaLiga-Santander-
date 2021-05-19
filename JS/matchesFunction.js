crearTabla(dataPartidos.matches);
filtrarNombreEquipo(dataPartidos.matches);
callEventButton();

function crearTabla(partidos) {

    let tabla = document.getElementById("tableMatches");
    limpiarTabla();

    for (let i = 0; i < partidos.length; i++) {
        const tr = document.createElement("tr");

        let equipoLocal = document.createElement("p");
        equipoLocal.innerHTML = partidos[i].homeTeam.name;

        let imgEquipoLocal = document.createElement("img");
        imgEquipoLocal.setAttribute("src", "https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg");
        imgEquipoLocal.classList.add("imgLocal");

        let equipoVisitante = document.createElement("p");
        equipoVisitante.innerHTML = partidos[i].awayTeam.name;

        let imgEquipoVisitante = document.createElement("img");
        imgEquipoVisitante.setAttribute("src", "https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg");
        imgEquipoVisitante.classList.add("imgVisitante");

        let diaJornadas = partidos[i].matchday;

        let fecha = new Date(partidos[i].utcDate);

        let resultadoPartidos = partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;
        if (resultadoPartidos === "null - null") {
            resultadoPartidos = "Proximamente";
        } else {
            resultadoPartidos.textContent = partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;
        }

        let resPartidos = [
            imgEquipoLocal,
            equipoLocal,
            resultadoPartidos,
            imgEquipoVisitante,
            equipoVisitante,
            fecha.toLocaleString(),
            diaJornadas
        ]

        for (let j = 0; j < resPartidos.length; j++) {
            const td = document.createElement("td");
            td.append(resPartidos[j]);
            tr.appendChild(td);

        }
        tabla.appendChild(tr);

    }

}

function callEventButton() {
    let buscar = document.getElementById("boton");
    buscar.addEventListener("click", () => {
        filtrarNombreEquipo(dataPartidos.matches);
    })
}

function limpiarTabla() {
    document.getElementById("tableMatches").innerText = "";
}


function filtrarNombreEquipo(matches) {
    let datosEntrada = document.querySelector("input").value;

    let radioBoton = document.querySelector("input[type=radio]:checked")

    let nombreEquipoInput = matches.filter((p) => {
        if (p.homeTeam.name.toLowerCase().includes(datosEntrada.toLowerCase()) || p.awayTeam.name.toLowerCase().includes(datosEntrada.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    });

    if (radioBoton === null) {
        return crearTabla(nombreEquipoInput);
    }

    let filtroInput = nombreEquipoInput.filter(partidos => {
        if (radioBoton.value === "Ganado") {
            if (partidos.homeTeam.name.toLowerCase().includes(datosEntrada) && partidos.score.winner == "HOME_TEAM" || partidos.awayTeam.name.toLowerCase().includes(datosEntrada) && partidos.score.winner == "AWAY_TEAM") {
                return true;
            }
        }

        if (radioBoton.value === "Perdido") {
            if (partidos.homeTeam.name.toLowerCase().includes(datosEntrada) && partidos.score.winner == "AWAY_TEAM" || partidos.awayTeam.name.toLowerCase().includes(datosEntrada) && partidos.score.winner == "HOME_TEAM") {
                return true;
            }
        }

        if (partidos.score.winner === null && radioBoton.value === "Proximos") {
            return true;
        }

        if (partidos.score.winner === "DRAW" && radioBoton.value === "Empatado") {
            return true;
        }
        
    })
    crearTabla(filtroInput);
}