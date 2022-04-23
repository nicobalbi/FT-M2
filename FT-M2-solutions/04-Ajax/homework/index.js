//CARGAR Y MOSTRAR LA LISTA DE AMIGOS

$("#boton").click(() => {
    //lo primero que hará será borrar el contenido de la lista para no duplicar 
    //los datos cuando toque el botón más de una vez.
    var list = $('#lista');
    list.empty();
    //ahora sí, el GET
    $.get("http://localhost:5000/amigos", data => {
        for (let i = 0; i < data.length; i++) {
            list.append(`<li>${data[i].name}</li>`) 
        }
     })
    });

//BUSCAR AMIGOS POR ID

$("#search").click(()=>{
    //guardo en una variable el valor del input de buscar
    let id = $('#input').val();
    //hago un GET a la ruta de amigos /id me devolvera un amigo
    $.get(`http://localhost:5000/amigos/${id}`, data =>{
        //accedo al span y defino su texto con el nombre del amigo
        $('#amigo').text(data.name);
    })
})

//BORRAR AMIGOS POR ID

$("#delete").click(()=>{
    //guardo en una variable el valor del input de borrar
    let id = $('#inputDelete').val();
    //hago un request de tipo DELETE a la ruta de amigos /id 
    $.ajax({
        url: `http://localhost:5000/amigos/${id}`,
        type: "DELETE",
        success: ()=>{
            $('#sucess').text(`el amigo numero ${id} fue borrado con éxito,
            refresque la lista para comprobarlo`)
        }
    })
})