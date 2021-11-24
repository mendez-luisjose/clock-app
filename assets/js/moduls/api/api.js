//Api del Clima para obtener la Region del Usuario
let apiKey = "";
let api;
const lang = "es";

const countryField = document.querySelector(".country");

//Funcion Spinner
const spinnerUp = () => {
    const container = document.querySelector(".container");
    const spinner = document.querySelector(".div-spinner-container");
    spinner.style.display = "none";
    container.style.display = "block";
}

//ProcessData Function 
const processData = Details => {
    if(Details.cod == "404") {
        alert("Lo Siento, Pero Hubo un Error, Intentalo Actualizar la Pagina");
    } else {
        spinnerUp();
        countryField.innerText = `${Details.timezone}`;
    }
}

//Fectch Function
const fetchData = () => {
    fetch(api).then(res => res.json()).then(Details => processData(Details)).catch(error => alert("Lo Siento, Pero Hubo un Error, Intentalo Actualizar la Pagina"));
}


//Funcion onSucces que se ejecuta cuando el usuario permite la geolocalizacion
const onSuccess = position => {
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}`;
    fetchData(api);
}

//Funcion onError que se ejecuta cuando el usuario obtiene un error en la geolocalizacion
const onError = error => {
    alert("Lo Siento, Pero Hubo un Error, Intentalo Actualizar la Pagina");
}


//Obtiene la localizacion del usuario para poder colocarlo en el reloj
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    alert("Recuerda Activar Tu Ubicacion Para que el Reloj Pueda Funcionar");
    
} else {
    alert("Lo Siento, pero tu Navegador no Soporta la API de Geolocalizacion para que el Reloj Funcione");
}

