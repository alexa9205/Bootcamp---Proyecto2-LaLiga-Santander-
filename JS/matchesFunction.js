quitarAlerta1();
quitarAlerta2();
quitarAlerta3();
quitarAlerta4();

function getFetch(url) {
    mostrarSpinner();
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
        buscar.onclick = "null";
        buscar.addEventListener("click", () => {
            filtrarNombreEquipo(partidos);
        })

        buscar.removeEventListener("click", () =>{
            limpiarTabla();
        })
       
        let resetear = document.getElementById("botonreset");
        resetear.addEventListener("click", () => {
            resetearFiltros();
            crearTabla(partidos);
            quitarAlerta1();
            quitarAlerta2();
            quitarAlerta3();
            quitarAlerta4();
        })

        quitarSpinner();
        crearTabla(partidos);

    }).catch(err => {
        console.log(err);
        alert("Ha ocurrido un ERROR, vuelve a recargar la pagina !")
    })
}

getFetch("https://api.football-data.org/v2/competitions/2014/matches");

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
        return alert4();
    }

    if (!isNaN(datosEntrada)) {
        return alert3();
    }

    let nombreEquipoInput = partidos.filter((p) => {
        if (p.homeTeam.name.toLowerCase().includes(datosEntrada.toLowerCase()) || p.awayTeam.name.toLowerCase().includes(datosEntrada.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    });

    if (nombreEquipoInput.length === 0) {
        return crearTabla(partidos);
    }

    if (radioBoton === null) {
        return crearTabla(nombreEquipoInput);
    }

    let filtroInput = nombreEquipoInput.filter(partidos => {
        if (radioBoton.value === "Ganado") {
            if ((partidos.homeTeam.name.toLowerCase().includes(datosEntrada.toLowerCase()) && partidos.score.winner == "HOME_TEAM") ||
                (partidos.awayTeam.name.toLowerCase().includes(datosEntrada.toLowerCase()) && partidos.score.winner == "AWAY_TEAM")) {
                return true;
            }
        }

        if (radioBoton.value === "Perdido") {
            if ((partidos.homeTeam.name.toLowerCase().includes(datosEntrada.toLowerCase()) && partidos.score.winner == "AWAY_TEAM") ||
                (partidos.awayTeam.name.toLowerCase().includes(datosEntrada.toLowerCase()) && partidos.score.winner == "HOME_TEAM")) {
                return true;
            }
        }


        if (partidos.status === "SCHEDULED" && radioBoton.value === "Proximos") {
            return true
        }

        if (partidos.score.winner === "DRAW" && radioBoton.value === "Empatado") {
            return true;
        }


    })

    if ((filtroInput.length == 0) && radioBoton.value === "Proximos") {
        return alert2();
    }

    crearTabla(filtroInput);
}

function resetearFiltros() {
    document.getElementById("filtro").value = "";
    var radioBoton = document.getElementsByName("estadoPartido");
    for (i in radioBoton) {
        radioBoton[i].checked = false;
    }
}

function mostrarSpinner() {
    document.getElementById("preloader").style.display = "block";
    document.getElementById("loader").style.visibility = "visible";
}

function quitarSpinner() {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("loader").style.visibility = "hidden";
}

function alert1() {
    let alert = document.getElementById("alerta1");
    alert.style.display = "block";
}

function alert2() {
    let alert2 = document.getElementById("alerta2");
    alert2.style.display = "block";
}

function alert3() {
    let alert3 = document.getElementById("alerta3");
    alert3.style.display = "block";
}

function alert4() {
    let alert = document.getElementById("alerta4");
    alert.style.display = "block";
}



function quitarAlerta1() {
    let alert = document.getElementById("alerta1");
    alert.style.display = "none"
}

function quitarAlerta2() {
    let alert2 = document.getElementById("alerta2");
    alert2.style.display = "none"
}

function quitarAlerta3() {
    let alert3 = document.getElementById("alerta3");
    alert3.style.display = "none"
}

function quitarAlerta4() {
    let alert = document.getElementById("alerta4");
    alert.style.display = "none"
}


let league1 = document.getElementById("league1");
league1.addEventListener("click", () => {
    const url2 = "https://api.football-data.org/v2/competitions/2015/matches";
    getFetch(url2);

})

let premierLeague = document.getElementById("premierLeague");
premierLeague.addEventListener("click", () => {
    const url3 = "https://api.football-data.org/v2/competitions/2021/matches";
    getFetch(url3);
})

let ligaSantander = document.getElementById("ligaSantander");
ligaSantander.addEventListener("click", () => {
    getFetch("https://api.football-data.org/v2/competitions/2014/matches");
    filtrarNombreEquipo(partidos);
})

