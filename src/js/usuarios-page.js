import { obtenerUsuarios } from "./http-provider";



const body  = document.body;
let tBody;
let correlativo = 0;



const crearHtml = () => {
    
    const html = `
    <h1 class="mt-5"> Usuarios</h1>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">email</th>
                <th scope="col">Nombre</th>
                <th scope="col">Avatar</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild( div );
    tBody = document.querySelector('tbody');

    
    // Crear una referencia al TBODY
    // ya que los TRs van dentro del tbody
            // querySelector('tbody');
            // Crear una variable para mantener la referencia?

      

}


// La función crearFilaUsuario debería de recibir un UNICO usuario
// con la siguiente estructura
    // usuario = {
    //     "id": 7,
    //     "email": "michael.lawson@reqres.in",
    //     "first_name": "Michael",
    //     "last_name": "Lawson",
    //     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"
    // }
const crearFilaUsuario = ( usuario ) => {

    correlativo ++

    
    // En la tabla deben de colocar un correlativo empezando en 1
    // También deben de colocar el avatar

    const html = `
        <td scope="col"> ${correlativo} </td>
        <td scope="col"> ${usuario.email} </td>
        <td scope="col"> ${usuario.first_name}  ${usuario.last_name} </td>
        <td scope="col">
            <img class="img-thumbnail" src="${usuario.avatar}">
        </td>
    `;

    const tr = document.createElement('tr');
    tr.innerHTML = html;

    tBody.append(tr);

    // Añadir el table row (tr) dentro del TBody creado anteriormente

}


export const init = async() => {

    crearHtml();
    correlativo = 0;

    // Obtener la lista de usuarios usando el servicio creado
    // Por cada usuario, llamar la función crearFila (for, forEach)
    // Colocar el init en el index.js, para que se ejecute la creación

    obtenerUsuarios().then(resp => {
        console.log(resp.data);
        resp.data.forEach(usuario => {
          crearFilaUsuario(usuario);
        });
    });
}

