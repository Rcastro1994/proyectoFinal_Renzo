function capturarInformacionUsuario(idUsuario)
{

    /*
    
    PREGUNTA 3
    Capturar informacion del usuario desde base de datos y llenar
    inputs dentro de la ventana modal de editar usuario, permiter que
    el usuario pueda editar los datos. No olvida de cargar el ID en el innerHTML
    dentro del elemento H1 cuyo id es cargaId

    Los campos a editar son:
    Nro de celular
    Profesion del usuario

    El resto de campos:
    Nombre
    Apellido
    Email
    Fecha Ingreso
    Colocarlos como solo lectura (propiedad readonly en el tag HTML)
    
    */

    console.log(idUsuario)
    fetch(`/conseguirInfoUsuario?idUsuario=${idUsuario}`)
    .then(response => response.json())
    .then(data => {
        let detallenombreUsuario = document.getElementById('detallenombreUsuario')
        let detalleapellidoUsuario = document.getElementById('detalleapellidoUsuario')
        let detalletipoUsuario = document.getElementById('detalletipoUsuario')
        let detalleemailUsuario = document.getElementById('detalleemailUsuario')
        let profesionUsuarioDetalle = document.getElementById('profesionUsuarioDetalle')
        let nroCelularDetalle = document.getElementById('nroCelularDetalle')
        let indUsuario = document.getElementById('indUsuario')

        detallenombreUsuario.value = data.nombreUsuario
        detalleapellidoUsuario.value = data.apellidoUsuario
        detalletipoUsuario.value = data.tipoUsuario
        detalleemailUsuario.value = data.emailUsuario
        profesionUsuarioDetalle.value = data.profesionUsuario
        nroCelularDetalle.value = data.nroCelular
        indUsuario.innerHTML = data.idUsuario    
    })
}

function actualizarInformacionUsuario()
{
    /*
    PREGUNTA 4
    Capturar los datos de los campos input's de la ventana de editar usuario,
    el id del usuario lo puedes capturar de la carga realizada en el elemento
    H1 cuyo id es cargaId. Con los datos capturados postearlos en la base de datos
    y actualizar la informacion del usuario
    */

    let profesionUsuarioDetalle = document.getElementById('profesionUsuarioDetalle')
    let nroCelularDetalle = document.getElementById('nroCelularDetalle')
    let indUsuario = document.getElementById('indUsuario')

    datos = {
        'profesionUsuario':profesionUsuarioDetalle.value,
        'nroCelular':nroCelularDetalle.value,
        'idUsuario':indUsuario.innerHTML,
    }
    console.log(datos)
    fetch(`/actualizarInfoUsuario`,{
        method:"POST",
        headers:{
            "X-Requested-With":"XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body:JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        render(request,'informacionUsuario.html')
   })

}

function getCookie(name)
{
    let cookieValue = null;
    if(document.cookie && document.cookie !== "")
    {
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++)
        {
            const cookie = cookies[i].trim();
            if(cookie.substring(0,name.length + 1) === (name + "="))
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue 
}