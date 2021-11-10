

const jokeUrl = 'https://api.chucknorris.io/jokes/random';

const urlUsuarios = 'https://reqres.in/api/users?page=2';

const apiKey = 'gthbl9uc';
const cloudUrl = 'https://api.cloudinary.com/v1_1/dz8cfmq6z/upload/'

const obtenerChiste = async() => {


    try {

        const resp = await fetch(jokeUrl);

        if (!resp.ok)  throw 'No se pudo realizar la peticion';

        return await resp.json();

    } catch (err) {

        throw err;
        
    }

}

const obtenerUsuarios = async() => {

    try {
        const resp = await fetch(urlUsuarios);
        if(!resp.ok) throw 'No se puede realizar la peticion';
        return await resp.json();

    }catch (err) {
        throw err;
    }
}


const subirImagen = async( archivo ) => {

    const formData = new FormData();
    formData.append('upload_preset', apiKey);
    formData.append('file', archivo);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( resp.ok) {
            const cloudResp = await resp.json();
            console.log(cloudResp);
            return cloudResp.secure_url
        } else {
            throw await resp.json()
        }



    } catch (err){

        throw err;
    }

    
}



export {
    obtenerChiste,
    obtenerUsuarios,
    subirImagen
}