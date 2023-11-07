
console.log("hola mundo")
// función del boton RESUMEN
document.getElementById("resumenBtn").addEventListener("click", calcular)
// función del botón BORRAR
document.getElementById("borrar").addEventListener("click", borrar)

let cantidad = 0;
let nombre = "";
let apellido = "";
let correo = "";

cantidad = document.getElementById("cantidad").value 
console.log(cantidad)

let descuento = 0;

let categoria = "";

let resultado = 0;

descuento = 0;
console.log("este es EL DESCUENTO : " + descuento);

let select = document.getElementById('categoria');

select.addEventListener('change',
  function(){
    var selectedOption = this.options[select.selectedIndex];
    console.log("este el el value " + selectedOption.value);

    if (selectedOption.value == "0"){
      descuento = 0;
    }
    
    if (selectedOption.value == "1"){
      descuento = 0.8;
    }
    if (selectedOption.value == "2"){
      descuento = 0.5;
    }
    if (selectedOption.value == "3"){
      descuento = 0.15;
    }
    console.log("Se le descuenta :" + descuento);
  });
  

  function calcular(){

    cantidad = document.getElementById("cantidad").value;    
    nombre = document.getElementById("nombre").value
    apellido = document.getElementById("apellido").value
    correo = document.getElementById("correo").value

    console.log("este es el nombre " + nombre)

    if(descuento == 0) {
      document.getElementById('resu').innerHTML =  "Debe elegir UNA CATEGORIA"

    } else if(nombre === "") {
      document.getElementById('resu').innerHTML =  "Debe colocar SU NOMBRE"

    } else if(apellido ==="") {
      document.getElementById('resu').innerHTML =  "Debe colocar SU APELLIDO"

    } else if(correo === "") {
      document.getElementById('resu').innerHTML =  "Debe colocar SU CORREO"

    } else if(cantidad < 1 || cantidad === "") {
        document.getElementById('resu').innerHTML = "Debe introducir una cantidad";
    } else {    
    resultado = cantidad * (200 - (200*descuento))
    document.getElementById('resu').innerHTML = resultado;   
   
    console.log("Abona " + resultado + "nombre" + nombre) 
    console.log(nombre + apellido + correo)
    document.getElementById('resu').innerHTML = resultado + " (Importe total: $" + (200*cantidad) + ", descuento total = $" + (200*descuento*cantidad) + " ).";  
}
};

function borrar(){
  console.log("se borro por el boton borrar")
  document.getElementById('resu').innerHTML = "";
  document.getElementById('nombre').value = "";
  document.getElementById('apellido').value = "";
  document.getElementById('correo').value = "";
  document.getElementById('cantidad').value = "";
  document.getElementById('categoria').value = "";
}

