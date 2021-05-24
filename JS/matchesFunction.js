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

        let partidos = data.matches

        let buscar = document.getElementById("boton");
        buscar.addEventListener("click", () => {
            filtrarNombreEquipo(partidos);
        })

        let resetear = document.getElementById("botonreset");
        resetear.addEventListener("click", () => {
            resetearFiltros();
            crearTabla(partidos);
        })

        quitarSpinner();
        crearTabla(partidos);

    }).catch(err => {
        console.log(err);
        alert("Ha ocurrido un ERROR, vuelve a recargar la pagina !")
    })
}
getFetch();

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

function limpiarTabla() {
    document.getElementById("tableMatches").innerText = "";
}

function filtrarNombreEquipo(partidos) {
    let datosEntrada = document.querySelector("input").value;
    let radioBoton = document.querySelector("input[type=radio]:checked")

    if (datosEntrada == "") {
        alertify.alert("⚠️ Por favor, introduzca el nombre del equipo que desea buscar😀")
        return crearTabla(partidos);
    }

    if (!isNaN(datosEntrada)) {
        alertify.alert("⚠️ Solo letras, por favor 😀");
        resetearFiltros();
        return crearTabla(partidos);
    }

    let nombreEquipoInput = partidos.filter((p) => {
        if (p.homeTeam.name.toLowerCase().includes(datosEntrada.toLowerCase()) || p.awayTeam.name.toLowerCase().includes(datosEntrada.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    });

    if (nombreEquipoInput.length == 0) {
        alertify.alert("⚠️ El equipo que buscas no juega en <i>LaLiga Santander</i>☹️");
        resetearFiltros();
        return crearTabla(partidos);

    }

    if (radioBoton === null) {
        return crearTabla(nombreEquipoInput);
    }

    let filtroInput = nombreEquipoInput.filter(partidos => {
        if (radioBoton.value === "Ganado") {
            if ((partidos.homeTeam.name.toLowerCase().includes(datosEntrada.toLowerCase()) && partidos.score.winner == "HOME_TEAM") 
            || (partidos.awayTeam.name.toLowerCase().includes(datosEntrada.toLowerCase()) && partidos.score.winner == "AWAY_TEAM")) {
                return true;
            }
         } 

        if (radioBoton.value === "Perdido") {
            if ((partidos.homeTeam.name.toLowerCase().includes(datosEntrada.toLowerCase())&& partidos.score.winner == "AWAY_TEAM") 
            || (partidos.awayTeam.name.toLowerCase().includes(datosEntrada.toLowerCase())&& partidos.score.winner == "HOME_TEAM")) {
                return true;
            }
        }


        if (partidos.status === "SCHEDULED" && radioBoton.value === "Proximos") {
             return true
        }

        if (partidos.score.winner === "DRAW" && radioBoton.value === "Empatado") {
            return true;
        }

        if ((partidos.status === "SCHEDULED") == false && radioBoton.value === "Proximos") {
            alertify.alert("¡No hay próximos partidos para mostrar!☹️ <p>La temporada vigente se ha acabado, pero próximamente tendrás el nuevo calendario disponible. ¡Hasta entonces puedes seguir viendo los resultados de esta temporada de tu equipo favorito!😀</p>")
            return crearTabla(filtroInput);  
        }

    })
    crearTabla(filtroInput);
}

function resetearFiltros() {
    document.getElementById("filtro").value = "";
    var radioBoton = document.getElementsByName("estadoPartido");
    for (value in radioBoton) {
        radioBoton[value].checked = false;
    }
}

function quitarSpinner() {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("loader").style.visibility = "hidden";
}