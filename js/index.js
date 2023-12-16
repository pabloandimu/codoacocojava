
// <!-- CREAR OPERADOR -->

    
    crearOperador = () => {
        const orador = {
             nombre:  document.getElementById("nombre").value,
             apellido: document.getElementById("apellido").value,
             email: document.getElementById("email").value,
             tema: document.getElementById("tema").value
        };

        //debo enviar estos datos al sevidor: https://www.freecodecamp.org/espanol/news/tutorial-de-fetch-api-en-javascript-con-ejemplos-de-js-fetch-post-y-header/
        fetch(`http://localhost:8080/web-app-23544/api/orador`, {
            method: "POST",
            body: JSON.stringify(orador),
        })
        .then(response => response.json()) 
        .then(json => {
            alert(`Alta de orador id:${json.id} correcta`);
            listarOradores();
            limpiarCampoCrear();
        })
        .catch(err => console.log(err));
    }

    document.getElementById("btnCrear").addEventListener('click',crearOperador);

    limpiarCampoCrear  = () => {
        document.getElementById("nombre").value = "";
         document.getElementById("apellido").value = "";
        document.getElementById("email").value = "";
        document.getElementById("tema").value = "";
    }


//<!--listado-->
//<!-- LISTADO -->

    
    function listarOradores() {/*f2*/
        //1 preparar
        const respuesta = fetch(`http://localhost:8080/web-app-23544/api/orador`);

        //2 invocar
        respuesta
            .then(response => response.json())
            .then(data => procesarListado(data))//fulfilled
            .catch(error => dibujarError(error))//rejected
    }       

    function procesarListado(data) {

        //guardo en localStorage
        saveOradoresInFromLocal('oradores', data);

        const listarOradores = data;
        let rows = '';
        for(let orador of listarOradores) {
            console.log(orador);
            rows += `
            <tr>
                <th scope="row">${orador.id}</th>
                <td>${orador.nombre}</td>
                <td>${orador.apellido}</td>
                <td>${orador.mail}</td>
                <td>${orador.tema}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editar(${orador.id})">
                        Editar
                    </button>
                    <button onclick="eliminarOrador(${orador.id})" type="button" class="btn btn-danger">
                        Eliminar
                    </button>
                </td>
            </tr>
            `
        }
        document.getElementById('usersRows').innerHTML = rows;
    }

    function dibujarError(error) {
        console.log(error);
        const alerta = `<div class="alert alert-danger" role="alert">
            ${error.toString()}
        </div>`;
        document.getElementById('msj').innerHTML = alerta;
    }

    document.getElementById('btnGetUsers').addEventListener('click',listarOradores);


//<!--eliminar-->
//<!-- ELIMINAR ORADOR -->

    eliminarOrador = (id) => {
        if(!confirm('SEGURO?')) {
            return;
        }

        fetch(`http://localhost:8080/web-app-23544/api/orador?id=${id}`, {
            method: "DELETE",
        })
        .then(response => response) 
        .then(json => {
            alert(`se ha eliminado el orador id: ${id}`);
            listarOradores();
        })
        .catch(err => console.log(err));
    }


//<!--actualizar-->

    const getOradoresFromLocal = () => {
        const oradores = localStorage.getItem('oradores')
        if(oradores) {
            return JSON.parse(oradores);//esto es un array si es que existe, y ya comprobé arriba que existe
        }
        return [];
    }
    const getOradorSeleccionado = () => { // funcion cortita, solo sabe ir a buscar en el local storage y devolver
        const obj = localStorage.getItem('oradorBuscado')
        if(obj) {
            return JSON.parse(obj);
        }
        return null;
    }
    const removeOradorSeleccionado = () => {
        localStorage.removeItem('oradorBuscado');
    }

    const saveOradoresInFromLocal = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));//esto si lo guarda como texto
    }

    const editar = (id) => {
        const oradores = getOradoresFromLocal();// ya sabemos que devuelve un ARRAY []
        const oradorBuscado = oradores.find(o => o.id === id); // uso el find porque si existe el ID, hay uno solo, y ya está
        
        //si quiero actualizar algo en un html (.innerHTML o .value - cuando es un INPUT, uso value - )
        document.getElementById('nombreActualizar').value = oradorBuscado.nombre;
        document.getElementById('apellidoActualizar').value = oradorBuscado.apellido;
        document.getElementById('mailActualizar').value = oradorBuscado.mail;
        document.getElementById('temaActualizar').value = oradorBuscado.tema;

        //guardo el id/orador (o el objeto entero) del orador que se quiere actualizar
        saveOradoresInFromLocal('oradorBuscado', oradorBuscado);
    }

    const actualizarOrador = () => {
        const oradorSeleccionado = getOradorSeleccionado();
        if(!oradorSeleccionado) {
            return
        }

        //obtengo los datos del formulario que esta en el modal - para luego armar el objeto
        const nombre = document.getElementById('nombreActualizar').value;
        const apellido = document.getElementById('apellidoActualizar').value;
        const email = document.getElementById('mailActualizar').value;
        const tema = document.getElementById('temaActualizar').value;

        // armo el objeto con los datos que actualicé recién

        const orador = {
            nombre,
            apellido,
            email,
            tema,
        };

        //ahora puedo enviar al backend para actualizar
        //debo enviar estos datos al sevidor: https://www.freecodecamp.org/espanol/news/tutorial-de-fetch-api-en-javascript-con-ejemplos-de-js-fetch-post-y-header/
        fetch(`http://localhost:8080/web-app-23544/api/orador?id=${oradorSeleccionado.id}`, { // le agrego como parámetro el id $
            method: "PUT",
            body: JSON.stringify(orador),
        })
        .then(response => response) //status code 200
        .then(json => {
            alert(`Se ha modificado el orador id:${oradorSeleccionado.id}`);
            //cargar la lista 
            listarOradores();
            removeOradorSeleccionado();
            cerrarModal();
        })
        .catch(err => console.log(err));
    }
    const cerrarModal = () => {
        document.getElementById('btnCerrarModal').click();
    }

    // MOSTRAR LISTADO OCULTO DE ORADORES
    const mostrarListado = () => {
        document.getElementById("listadoAparecido").style.display="block"; 
        document.getElementById("conocerALosOradores").style.display="none";
        document.getElementById("btnGetUsers").style.display="none";        
        document.getElementById('btnGetUsers').click();
        
        setTimeout(() => {
            llevarAncla ();
          }, "50");

    }

    // DESPLAZAR A ANCLAR MOSTRAR LISTADO
    const llevarAncla = () => {
        document.getElementById('listadoOradoresVisible').click(); 
    }