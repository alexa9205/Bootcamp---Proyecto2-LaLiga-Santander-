crearTabla(dataPartidos.matches);

function crearTabla(partidos) {

    let tabla = document.getElementById("tableMatches");

    for (let i = 0; i < partidos.length; i++) {
        const tr = document.createElement("tr");


        let equipoLocal = document.createElement("p");
        equipoLocal.innerHTML = partidos[i].homeTeam.name;

        let imgEquipoLocal = document.createElement("img");
        imgEquipoLocal.setAttribute("src", "https://crests.football-data.org/" + partidos[i].homeTeam.id+ ".svg");
        imgEquipoLocal.classList.add("imgLocal");

        let equipoVisitante = document.createElement("p");
        equipoVisitante.innerHTML = partidos[i].awayTeam.name;

        let imgEquipoVisitante = document.createElement("img");
        imgEquipoVisitante.setAttribute("src", "https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg");
        imgEquipoVisitante.classList.add("imgVisitante");

        let diaJornadas = partidos[i].matchday;

        let fecha = new Date(partidos[i].utcDate);

        let resultadoPartidos = partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;
        if (resultadoPartidos === "null - null"){
            resultadoPartidos = "Proximamente";
        }
        else{
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
// crearTabla(dataPartidos.matches);