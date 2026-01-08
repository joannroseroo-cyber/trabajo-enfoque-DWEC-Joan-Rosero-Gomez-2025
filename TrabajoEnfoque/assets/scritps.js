//Creamos las variables para obtener los campos del formulario
let fechaCita = document.getElementById("fechaHoraCita");
let horaCita = document.getElementById("horaCita");
let nombrePaciente = document.getElementById("nombrePaciente");
let apellidoPaciente = document.getElementById("apellidoPaciente");
let dniPaciente = document.getElementById("dniPaciente");
let telefonoPaciente = document.getElementById("telefonoPaciente");
let nacimientoPaciente = document.getElementById("date_paciente");
let obsPacientes = document.getElementById("obs_pacientes");
let btnEnviar = document.getElementById("btnEnviar");

//Creamos un constructor de objetos Cita
function Cita(idCita, fecha, hora, nombrePaciente, apellidoPaciente, dniPaciente, telefonoPaciente, nacimientoPaciente, obsPacientes){
   this.idCita = idCita;
   this.fecha = fecha;
   this.hora = hora;
   this.nombrePaciente = nombrePaciente;
   this.apellidoPaciente = apellidoPaciente;
   this.dniPaciente = dniPaciente;
   this.telefonoPaciente = telefonoPaciente;
   this.nacimientoPaciente = nacimientoPaciente;
   this.obsPacientes = obsPacientes;
}

//Un Array donde agregaremos las citas que se almacenen en LocalStorage
let registroCitas = [];
for(let i = 0;i< registroCitas.length; i++){
    console.log(registroCitas[i].hora)
}

btnEnviar.addEventListener("click", validarFormulario)

//Función para validar el campo fecha
function validarInputFecha(){
    //Utilizamos Date.parse para convertir el valor del input fecha tiene un formato validado para ser una fecha y lo almacenamos en una variable
    let stringFechaHora = Date.parse(fechaCita.value);
    //la variable anterior contiene el valor de el input, lo convertirmos en una valor de tipo fecha y se almacena en la variable valorFechaHora
    let valorFechaHora = new Date(stringFechaHora);
    let fechaActua = new Date();
    if(valorFechaHora < fechaActua){
        alert("Fecha no valida");
        fechaCita.style.border = "5px solid red";
    }//Usamos isNaN para comprobar que el campo no esté vacio
    else if(isNaN(valorFechaHora.getTime())){
        //Como el valor es NaN el campo del formulario se pone en rojo en forma de aviso
        alert("Fecha no valida");
        fechaCita.style.border = "5px solid red";
        return null;
    }else{
        //Como el valor no NaN, se restablece el color del borde
        fechaCita.style.border ="none";
        //Obtenemos los valores de la fecha, año, mes, día
        let valorYear = valorFechaHora.getFullYear();
        let valorMes = valorFechaHora.getMonth() + 1; 
        let valorDia = valorFechaHora.getDate();
        //Creamos un String con los valores de la fecha
        let contenidoFecha =  valorDia + "/" + valorMes + "/" + valorYear;
        //Devolvemos la variable
        return contenidoFecha;
    }
}

//Función para validar el campo hora
function validarInputHora(){
    //obtenemos el valor del campo input, usamos trim() para eliminar los espacios y los almacenamos en una variable
    let contenidoHoraCita = horaCita.value.trim();
    //dividimos la variable que contiene la hora del formulario y las almacenamos en un array
    let partesHora = contenidoHoraCita.split(":");
    //Esta variable obtiene el primer valor del array anterior, que es la hora introducida en el formulario
    let valorHora = parseInt(partesHora[0]);
    let textoHora = valorHora.toString();
    //Esta variable obtiene el segundo valor del array anterior, que son los minutos introducidos en el formulario
    let valorMinutos = parseInt(partesHora[1]);
    let textoMinutos = valorMinutos.toString();
    //Esta variable almacena una cadena de texto con la hora y los minutos
    let mostrarHora = textoHora.padStart(2, "0") + ":" + textoMinutos.padStart(2, "0");
    //Este if comprueba que el valor de las variables no este vacio
    if(valorHora === "" && valorMinutos === ""){
        //Si estan vacios se destaca el campo del formulario pintandolo de rojo
        horaCita.style.border = "5px solid red";
        return null;
    }
    //Este if se usa para no permitir citas fuera del horario laboral
    else if(valorHora >= 9 && valorHora <= 20){
        horaCita.style.border = "none";
        return mostrarHora;
    }
    else{
        horaCita.style.border = "5px solid red";
        alert("La hora establecida no es valida");
    }
}

//Esta función se utilizara para validar los campos de texto
function validarCampo(elementoInput){
    //obtenemos el valor del campo introducido, con trim() eliminamos los espacios y lo almacenamos en una variable
    let valorInput = elementoInput.value.trim();
    //Obtenemos el valor del placeHolder del elemento
    let valorPlaceHolder = elementoInput.getAttribute('placeholder');
    //Revisamos que no este vació
    if(valorInput === ""){
        //Usamos un alert y destacamos el campo pintandolo de rojo
        alert("El campo " + valorPlaceHolder + " está vació");
        elementoInput.style.border = "5px solid red";
        return null;
    }else{
        elementoInput.style.border = "none";
        return valorInput;
    }
}

//Está función genera un ID para el formulario
function generarID(){
    //esta variable obtiene la fecha actual
    let fechaActual = new Date();
    //el método .getTime() devuelve el número de milisegundos que han pasado de 1970 y se almacena en una variable
    let idCita = fechaActual.getTime();
    //se devuelve la variable que contiene los milisegundos para poder utilizarse fuera.
    return idCita;
}


//Función para guardar las citas en LocalStorage
function guardarCitaB(objeto){
    //Comprobamos que los parametros no tengan un valor null
    if(objeto != null){
        
        let datosCitaJSON = JSON.stringify(objeto);
        //se obtiene valor idCita del objeto y se almacena en la variable nombreId
        let nombreId = objeto.idCita;
        //Guardamos en LocalStorage el string con el contenido del objeto y su clave es el valor de idCita
        localStorage.setItem(nombreId, datosCitaJSON);
    }
}

//Esta función cargara el contenido de LocalStorage en un array para facilitar su posterior manipulación
function cargarCitas(){
    //esta variable almacena la longitud de LocalStorage
    let elementosLocalStorage = localStorage.length;
    //recorremos la variable con un bucle
    for(let i=0; i< elementosLocalStorage; i++){
        // en cada iteración se crea una variable con el valor key de cada elemento de LocalStorage
        let claveElemento = localStorage.key(i);
        //Usamos la variable anterior para obtener el objeto de LocalStorage y almacenarlo en una variable
        let valorElemento = localStorage.getItem(claveElemento);
        //con JSON.parse() convertimos una cadena de texto en formato JSON a un Objeto o Array utilizable con JavaScript
        //Una vez convertido se almacena en una variable
        let contenidoElemento = JSON.parse(valorElemento);
        //Agregamos al array el objeto que se encuentra en la variable anterior
        registroCitas.push(contenidoElemento);
    }
}
//Al cargar el html se ejecuta la función cargarCitas para cargar automáticamente los valores de LocalStorage 
document.addEventListener("DOMContentLoaded", cargarCitas);

function validarFormulario(event){
    
    event.preventDefault();
    //Almacenamos el id generado para el formulario
    let resultadoId = generarID();
    //Validamos los campos y almacenamos el valor devuelto por la función
    let resultadoFecha = validarInputFecha();
    let resultadoHora = validarInputHora();
    let resultadoNombre = validarCampo(nombrePaciente);
    let resultadoApellido = validarCampo(apellidoPaciente);
    let resultadoDni = validarCampo(dniPaciente);
    let resultadoTelefono = validarCampo(telefonoPaciente);
    let resultadoNacimiento = validarCampo(nacimientoPaciente);
    let resultadoObs = obsPacientes.value;
    
    let nuevaCita = new Cita(resultadoId, resultadoFecha, resultadoHora, resultadoNombre, resultadoApellido, resultadoDni, resultadoTelefono, resultadoNacimiento, resultadoObs);
    //Recorremos el array que contiene todas las citas
    for(let cita of registroCitas){
        //Comprueba si ya existe una cita para el mismo día y la misma hora 
        if(cita.fecha === resultadoFecha && cita.hora === resultadoHora){
            //Aviso de error
            alert("Horario no disponible");
            return null;
        }
    }
    if(resultadoFecha != null && resultadoHora != null && resultadoNombre != null && resultadoApellido != null && resultadoDni != null && resultadoTelefono != null
        && resultadoNacimiento != null && resultadoObs != null){
            guardarCitaB(nuevaCita);
            registroCitas.push(nuevaCita);
            alert("Cita creada correctamente");
        }else{
            alert("Error, revise los campos del formulario")
        }
}
