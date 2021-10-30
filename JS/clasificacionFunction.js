function getFetch(){
    const url = "https://api.football-data.org/v2/competitions/2014/standings"
    fetch(url,{
        method: "GET",
        headers: {
            "X-Auth-Token" : "059e535324dc40b6ad400487fc71dc33"
        }
    }).then(response =>{
        if(response.ok){
            return response.json();
        }
    }).then(data =>{
        let partidos = data.standings[0].table;
        quitarspinner();
        crearTablaClasificacion(partidos);
       
    }).catch(err =>{
        console.log(err);
        alert("Ha ocurrido un ERROR, vuelve a recargar la pagina !")
    })
}
getFetch();

function crearTablaClasificacion(clasificacion) {

    let tabla = document.getElementById("tabla2");

    for (let i = 0; i < clasificacion.length; i++) {

        const tr = document.createElement("tr");

        let equipoImg = document.createElement("img");
        equipoImg.setAttribute("src", clasificacion[i].team.crestUrl);
        equipoImg.classList.add("imgLocal");
        let posicion = clasificacion[i].position;
        let equipos = clasificacion[i].team.name;
        let pjugados = clasificacion[i].playedGames;
        let pganados = clasificacion[i].won;
        let pempatados = clasificacion[i].draw;
        let pperdidos = clasificacion[i].lost;
        let golesfavor = clasificacion[i].goalsFor;
        let golescontra = clasificacion[i].goalsAgainst;
        let goldiferencia = clasificacion[i].goalDifference;
        let puntos = clasificacion[i].points;

        let ultpartidos = clasificacion[i].form;
        ultpartidos = ultpartidos.replace(/D/g,"🟡");
        ultpartidos = ultpartidos.replace(/W/g,"🟢");
        ultpartidos = ultpartidos.replace(/L/g,"🔴");
        ultpartidos = ultpartidos.replace(/,/g,"");


        let estadisticas = [
            posicion,
            equipoImg,
            equipos,
            pjugados,
            pganados,
            pempatados,
            pperdidos,
            golesfavor,
            golescontra,
            goldiferencia,
            puntos,
        ]

        for (let j = 0; j < estadisticas.length; j++) {
            const td = document.createElement("td");
            td.append(estadisticas[j]);
            tr.appendChild(td);
        }

        tabla.appendChild(tr);
    }
}

function quitarspinner(){
    document.getElementById("preloader").style.display="none";
    document.getElementById("loader").style.visibility="hidden";
}

