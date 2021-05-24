function getFetch() {
    const url = "https://api.football-data.org/v2/competitions/2015/teams";
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
        let partidos = data.teams;
        quitarspinner();
        crearEquipos(partidos);

    }).catch(err => {
        console.log(err);
        alert("Ha ocurrido un ERROR, vuelve a recargar la pagina !")
    })
}
getFetch();

function crearEquipos(equipos){

    const divEquipo = document.getElementById("contenedor2");

    for(let i = 0; i<equipos.length; i++){
        let link = document.createElement("a");
        link.href = equipos[i].website;
        link.style.color = "black";
        link.style.fontWeight = "700";
    

        let equipo = document.createElement("div");
        equipo.classList.add("col")

        let imgEquipo = document.createElement("img");
        imgEquipo.setAttribute("src", equipos[i].crestUrl);
        imgEquipo.classList.add("imgEquipos");

        let nombreEquipo = document.createTextNode(equipos[i].name);

        equipo.append(imgEquipo);
        equipo.append(nombreEquipo);
        link.append(equipo);
        divEquipo.append(link);
    }


}

function quitarspinner() {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("loader").style.visibility = "hidden";
}
