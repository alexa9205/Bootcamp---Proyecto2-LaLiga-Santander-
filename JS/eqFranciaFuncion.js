console.log(franciaEquipos.teams);

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
crearEquipos(franciaEquipos.teams);