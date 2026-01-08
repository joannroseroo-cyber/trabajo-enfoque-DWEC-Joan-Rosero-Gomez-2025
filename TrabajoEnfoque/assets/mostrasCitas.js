
//Variables de los elementos del DOM
let tablaCita = document.getElementById("tablaCita");
let srcImgEditar = "/img/iconos/iconEditar.png";
let srcImgBorrar = "img/iconos/iconBorrar.png";

//Variables formulario
let fechaCita = document.getElementById("fechaCita");
let horaCita = document.getElementById("horaCita");
let nombrePaciente = document.getElementById("nombrePaciente");
let apellidoPaciente = document.getElementById("apellidoPaciente");
let dniPaciente = document.getElementById("dniPaciente");
let telefonoPaciente = document.getElementById("telefonoPaciente");
let nacimientoPaciente = document.getElementById("date_paciente");
let obsPacientes = document.getElementById("obs_pacientes");

//Variables popUp
let popDesplegable = document.querySelector(".pop_desplegable");
let btnGuardarEdicion = document.getElementById("guardarEdicion");
let btnCancelar = document.getElementById("btnCancelar");

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

//Array con las citas
registroCitas = [];

//Variable idCita
let valorIdCitaEditada;

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
        return null;
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
        return null;
    }
}


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

function editarCita(idCita){
    valorIdCitaEditada = idCita;
    let datos = localStorage.getItem(idCita);
    let datosEditar = JSON.parse(datos);

    //popDesplegable.style.zIndex = "10";
    //popDesplegable.style.opacity = "1";
    
    popDesplegable.style.left = "0%";

    let fechaEditar = datosEditar.fecha; // "23/12/2025"
    let [dia, mes, año] = fechaEditar.split("/");
    let fechaMostrar = `${año}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    fechaCita.value = fechaMostrar;


    let horaEditar = datosEditar.hora;
    horaCita.value = horaEditar;

    let nombreEditar = datosEditar.nombrePaciente;
    nombrePaciente.value = nombreEditar;

    let apellidoEditar = datosEditar.apellidoPaciente;
    apellidoPaciente.value = apellidoEditar;

    let DniEditar = datosEditar.dniPaciente;
    dniPaciente.value = DniEditar;

    let telefonoEditar = datosEditar.telefonoPaciente;
    telefonoPaciente.value = telefonoEditar;

    let nacimientoEditar = datosEditar.nacimientoPaciente;
    nacimientoPaciente.value = nacimientoEditar;

    let obsEditar = datosEditar.obsPacientes;
    if(obsEditar === undefined){
        obsPacientes.value = "";
    }else{
        obsPacientes.value = obsEditar;
    }
    return idCita;
}

function cancelarEdicion(){
    popDesplegable.style.left = "-100%";
}

btnCancelar.addEventListener("click", cancelarEdicion);

function guardarCitaB( id, objeto){
    //Comprobamos que los parametros no tengan un valor null
    if(objeto != null){
        
        let datosCitaJSON = JSON.stringify(objeto);
        //se obtiene valor idCita del objeto y se almacena en la variable nombreId
        //let nombreId = objeto.idCita;
        //Guardamos en LocalStorage el string con el contenido del objeto y su clave es el valor de idCita
        localStorage.setItem(id, datosCitaJSON);
        //alert("ID objeto: " + nombreId + " id: " + id);
    }
}

function guardarEdicion(){
    //alert(valorIdCitaEditada);

    let valorInputFecha = validarInputFecha();
    let valorInputHora = validarInputHora();
    let valorInputNombre = validarCampo(nombrePaciente);
    let valorInputApellido = validarCampo(apellidoPaciente)
    let valorInputDni = validarCampo(dniPaciente);
    let valorInputTelefono = validarCampo(telefonoPaciente);
    let valorInputNacimiento = validarCampo(nacimientoPaciente);
    let valorInputObs = obsPacientes.value.trim();

    if(valorInputFecha != null && valorInputHora != null  && valorInputNombre != null && valorInputApellido != null && valorInputDni != null && 
        valorInputTelefono != null && valorInputNacimiento != null && valorInputObs != null){
            let citaEditada = new Cita(valorIdCitaEditada, valorInputFecha, valorInputHora, valorInputNombre, valorInputApellido, valorInputDni, 
            valorInputTelefono, valorInputNacimiento, valorInputObs);
            guardarCitaB(valorIdCitaEditada, citaEditada);
            alert("Cita editada correctamente");
            location.reload();
        }else{
            alert("Revise los campos del formulario");
        }

}

btnGuardarEdicion.addEventListener("click", guardarEdicion);

function borrarCita(idCita){
    localStorage.removeItem(idCita);
    location.reload();
}

function mostrarDatos(){
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
    for(let i=0; i<registroCitas.length; i++){

        let textoIdCita = registroCitas[i].idCita; 
        let textoFecha = registroCitas[i].fecha;
        let textoHora = registroCitas[i].hora;
        let textoNombrePaciente = registroCitas[i].nombrePaciente;
        let textoApellidoCita = registroCitas[i].apellidoPaciente;
        let textoDni = registroCitas[i].dniPaciente;
        let textoTeléfono = registroCitas[i].telefonoPaciente;
        let textoNacimiento = registroCitas[i].nacimientoPaciente;
        let textoObservaciones = registroCitas[i].obsPacientes;

        let elementoFila = document.createElement("tr");
        //elementoFila.setAttribute("contenteditable", "true");

        let elementoCeldaId = document.createElement("td");
        elementoCeldaId.innerHTML = textoIdCita;

        let elementoCeldaFecha = document.createElement("td");
        elementoCeldaFecha.innerHTML = textoFecha;
        
        let elementoCeldaHora = document.createElement("td");
        elementoCeldaHora.innerHTML = textoHora;

        let elementoCeldaNombre = document.createElement("td");
        elementoCeldaNombre.innerHTML = textoNombrePaciente;

        let elementoApellido = document.createElement("td");
        elementoApellido.innerHTML = textoApellidoCita;

        let elementoCeldaDni = document.createElement("td");
        elementoCeldaDni.innerHTML = textoDni;

        let elementoTelefono = document.createElement("td");
        elementoTelefono.innerHTML = textoTeléfono;

        let elementoCeldaNacimiento = document.createElement("td");
        elementoCeldaNacimiento.innerHTML = textoNacimiento;
        
        let elementoObservaciones = document.createElement("td");
        elementoObservaciones.innerHTML = textoObservaciones;

        let ImgEditar = document.createElement("img");
        ImgEditar.setAttribute("src", srcImgEditar);
        ImgEditar.setAttribute("class", "img_editar");
        
        ImgEditar.addEventListener("click", function(){
            editarCita(textoIdCita);
        })
            
        ImgEditar.style.width = "25px";
        ImgEditar.style.height = "25px";
        let elementoCeldaImgEditar = document.createElement("td");
        elementoCeldaImgEditar.appendChild(ImgEditar);

        let imgBorrar = document.createElement("img");
        imgBorrar.setAttribute("src", srcImgBorrar);
        imgBorrar.setAttribute("class", "img_eliminar");
        //imgBorrar.addEventListener("click", borrarCita(textoIdCita))
        imgBorrar.dataset.id = textoIdCita; 
        imgBorrar.addEventListener("click", function () {
            borrarCita(textoIdCita);
        });
        imgBorrar.style.width = "25px";
        imgBorrar.style.height = "25px"
        let elementoCeldaBorrar = document.createElement("td");
        elementoCeldaBorrar.appendChild(imgBorrar);
        
        elementoFila.append(elementoCeldaId, elementoCeldaFecha, elementoCeldaHora, 
            elementoCeldaNombre, elementoApellido, elementoCeldaDni, elementoTelefono, elementoCeldaNacimiento, 
            elementoObservaciones, elementoCeldaImgEditar, elementoCeldaBorrar);
        
        tablaCita.appendChild(elementoFila);
    }
}

document.addEventListener("DOMContentLoaded", mostrarDatos);



