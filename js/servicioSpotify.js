  
let uri = "https://accounts.spotify.com/api/token";

let dato1="grant_type=client_credentials";
let dato2="client_id=fa4586c5382a492890f1c1e8f774354b";
let dato3="client_secret=8ccb3c2e330a4a04b91392abdbdb7f80";

let parametrosPeticion={
    method : "POST",
    headers : {
        "Content-Type" : "application/x-www-form-urlencoded" 
    },
    body : dato1+"&"+dato2+"&"+dato3
    //body : `${dato1}&$dato2+&+dato3`
}

fetch(uri,parametrosPeticion)
.then(function(respuesta){
    return(respuesta.json())
})
.then(function(respuesta){
     console.log(respuesta)
    obtenerToken(respuesta);
})
.catch(function(error) {
    console.log(error);
})

function obtenerToken(datos) {
    let token = datos.token_type+" "+datos.access_token;
    console.log(token);
    pedirCanciones(token);
}
function pedirCanciones(token){
    // let uri = "https://api.spotify.com/v1/artists/60d24wfXkVzDSfLS6hyCjZ/top-tracks?market=US";
    let uri = "https://api.spotify.com/v1/artists/60d24wfXkVzDSfLS6hyCjZ/top-tracks?market=US";

    let parametrosPeticion={
        method : "GET",
        headers : {
            Authorization : token
        }
    }
    fetch(uri,parametrosPeticion)
    .then(function (respuesta) {
    return( respuesta.json());
    })
    .then(function(respuesta) {
        console.log(respuesta);
        pintarDatos(respuesta.tracks);
    })
    .catch(function(error) {
        console.log(error);
    })
}
function pintarDatos(datos){
    // Traversing metodo para pintar etiquetas html 
    let fila = document.getElementById("fila");
    datos.forEach(function (cancion) {
        let columna = document.createElement("div");
        columna.classList.add("col");
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-150");
        let imagen = document.createElement("img");
        imagen.classList.add("card-img-top");
        imagen.src=cancion.album.images[0].url;
        let cuerpo = document.createElement("div");
        cuerpo.classList.add("card-body");
        let titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.innerHTML = cancion.name;
        let descripcion = document.createElement("p");
        descripcion.classList.add("card-text");
        descripcion.innerHTML = "Fecha de lanzamiento: "+cancion.album.release_date+"</br> Álbum: "+cancion.album.album_type;
        let barra = document.createElement("div");
        barra.classList.add("progress");
        let progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.classList.add("progress-bar-striped");
        progressBar.classList.add("progress-bar-animated");
        progressBar.classList.add("bg-warning");

        progressBar.setAttribute("role","progressbar");
        progressBar.setAttribute("aria-valuenow",cancion.popularity);
        progressBar.setAttribute("aria-valuemin","0");
        progressBar.setAttribute("aria-valuemax","100");
        progressBar.style.width=cancion.popularity+"%";
        progressBar.innerHTML = "Popularidad "+cancion.popularity+"%";
        // progressBar.add.style.width(cancion.popularity);
        // crear audio
        let audio = document.createElement("audio");
        audio.classList.add("w-100");
        audio.src=cancion.preview_url;
        audio.setAttribute("controls","controls");

        // PADRES E HIJOS 
        // Se empieza de adentro a afuera, comenzando por la imagen porque es lo que van en el centro
        // Agregar barra de popularidad https://getbootstrap.com/docs/5.1/components/progress/
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(barra);
        barra.appendChild(progressBar);
        tarjeta.appendChild(audio);
        columna.appendChild(tarjeta);
        imagen.appendChild(cuerpo);
        fila.appendChild(columna);

    });
}
