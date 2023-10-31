document.getElementById("resumenx").addEventListener("click", calcular)
document.getElementById("borrar").addEventListener("click", borrar)

let cantidad = 0;

cantidad = document.getElementById("cantidad").value 
console.log(cantidad)

let descuento = 0;

let categoria = "";

let resultado = 0;

let select = document.getElementById('categoria');
select.addEventListener('change',
  function(){
    var selectedOption = this.options[select.selectedIndex];
    console.log("este el el value " + selectedOption.value);
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
    
    if(cantidad < 1 || cantidad === "") {
        document.getElementById('resu').innerHTML = "Debe introducir una cantidad";
    } else {    
    resultado = cantidad * (200 - (200*descuento))
    document.getElementById('resu').innerHTML = resultado;   
   
    console.log("Abona " + resultado) 
    document.getElementById('resu').innerHTML = resultado + " (Importe total: $" + (200*cantidad) + ", descuento total = $" + (200*descuento*cantidad) + " ).";  
}
};

function borrar(){
  console.log("dfadf")
  document.getElementById('resu').innerHTML = "";
  document.getElementById('nombre').value = "";
  document.getElementById('apellido').value = "";
  document.getElementById('correo').value = "";
  document.getElementById('cantidad').value = "";
  document.getElementById('categoria').value = "";
}

