let uri = "https://api.spotify.com/v1/artists/60d24wfXkVzDSfLS6hyCjZ/top-tracks?market=US";

let token = "Bearer BQAgyRG5B19eSijuq9SXqppnq_SOzI4VQw3kFAZx_4oIe6e_8DnO6_sHIX0CXjPdj7bLw3ms7F2ayNayRsU5GyTSpbs8bO6R5QoOC61ocL9szSWqptKYWwSkKHSpQR7_fuG4gKSe5PgZyLbwaQNeV3MUTi214jNMb4yrac8";

let parametrosPeticion={
    method : "GET",
    headers : {
        Authorization : token
    }
}
// Fetch es una promesa, esta promesa puede no cumplirse esa es la razón del catch
// Esto es para la programación async (asincrona), para que el código pueda seguir con las otras tareas
fetch(uri,parametrosPeticion)
.then(function (respuesta) {
   return( respuesta.json());
})
.then(function(respuesta) {
    console.log(respuesta);//objeto
    pintarDatos(respuesta.tracks);
    // console.log(respuesta.tracks);//objeto
    // console.log(respuesta.tracks[0]);//Arreglo
    // console.log(respuesta.tracks[0].name);//Arreglo
    // console.log(respuesta.tracks[0].preview_url);//Arreglo
    // console.log(respuesta.tracks[0].album.images[0].url);//Arreglo
})
.catch(function(error) {
    console.log(error);
})
function pintarDatos(datos){
    let fila = document.getElementById("fila");
    datos.forEach(function (cancion) {
        let columna = document.createElement("div");
        columna.classList.add("col");
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100");
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
        descripcion.innerHTML = cancion.name;
        let pieCarta = document.createElement("div");
        pieCarta.classList.add("card-footer");
        let audio = document.createElement("audio");
        audio.classList.add("w-100");
        audio.setAttribute("controls","");
        audio.src=cancion.preview_url;
        // PADRES E HIJOS 
        // Se empieza de adentro a afuera, comenzando por la imagen porque es lo que van en el centro
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(pieCarta);
        pieCarta.appendChild(audio);
        columna.appendChild(tarjeta);
        imagen.appendChild(cuerpo);
        fila.appendChild(columna);

    });
}