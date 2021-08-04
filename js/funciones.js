'use strict';

export const remover = (texto) =>{
    let newText = texto.trim(),respuesta;
    if(newText === "" && $gender.value === 'gender' && $status.value === 'status'){
        swal("Ocurrío un Error", "Por favor Ingresar un nombre", "error");
    }
    else{
        preUrl(newText);
    }
}

let $gender = document.getElementById("gender"),$status = document.getElementById("status"),
    $total = document.getElementById('totalResul'),$contResul = document.getElementById('resul');

const conexion = async (url) => {
    let $ultimo = $contResul.lastElementChild;
    const con = await fetch(`https://rickandmortyapi.com/api/character/${url}`);
    if(con.status !== 200)
    {
        swal("Sin Resultados :(", "", "error");
        $contResul.removeChild($ultimo);
        $total.textContent = "";
        return;
    }
    if($ultimo.className === 'resultados') $contResul.removeChild($ultimo);
    const res = await con.json();
    $total.textContent = `Resultados: ${res.info.count}`;
    let $fragmento = document.createDocumentFragment();
    let $divR = document.createElement('resultados');
    $divR.setAttribute("class",'resultados');
    let resultados = res.results;
    resultados.forEach((valor) => {
        const $tarjeta = document.createElement('div');
        $tarjeta.setAttribute("class","tarjeta");
        const $img = document.createElement('img');
        $img.setAttribute("src",valor.image);
        $img.setAttribute("alt",`Imagen de ${valor.name}`);
        const $gen = document.createElement("div");
        if(valor.gender === 'Female')
        {
            $gen.setAttribute('class','gen female')
            $gen.innerHTML = `<i class="fas fa-female"></i>`;
        }else if(valor.gender === 'Male'){
            $gen.setAttribute('class','gen male')
            $gen.innerHTML = `<i class="fas fa-male"></i>`;
        }else{
            $gen.setAttribute('class','gen unknow')
            $gen.innerHTML = `<i class="fas fa-question"></i>`;
        }
        const $div = document.createElement("div");
        $div.innerHTML = `
            <p>Nombre: <span class="datos">${valor.name}</span></p>
            <p>Estado: <span class="datos">${valor.status}</span></p>
            <p>G&eacute;nero: <span class="datos">${valor.gender}</span></p>
            <p>Especie: <span class="datos">${valor.species}</span></p>
            <p>Origen: <span class="datos">${valor.location.name}</span></p>
        `;
        $tarjeta.appendChild($gen);
        $tarjeta.appendChild($div);
        $tarjeta.appendChild($img);
        $fragmento.appendChild($tarjeta);
    });
    $divR.appendChild($fragmento)
    $contResul.appendChild($divR);

}

export const preUrl = (personaje = "") => {
    let url;
    if(personaje !== "" && $gender.value === 'gender' && $status.value === 'status')
    {
        url = `?name=${personaje}`;
    }
    else if(personaje !== '' && $gender.value !== 'gender' && $status.value === 'status'){
        url = `?name=${personaje}&gender=${$gender.value}`;
    }
    else if(personaje !== '' && $status.value !== 'status' && $gender.value === 'gender'){
        url = `?name=${personaje}&status=${$status.value}`;
    }
    else if($gender.value !== 'gender' && personaje === "" && $status.value === 'status')
    {
        url = `?gender=${$gender.value}`;
    }
    else if($gender.value !== 'gender' && personaje !== '' && $status.value === 'status')
    {
        url = `?name=${personaje}&gender=${$gender.value}`
    }
    else if($gender.value !== 'gender' && $status.value !== 'status' && personaje === '')
    {
        url = `?gender=${$gender.value}&status=${$status.value}`;
    }
    else if($status.value !== 'status' && personaje === "" && $gender.value === 'gender')
    {
        url = `?status=${$status.value}`;
    }
    else if($status.value !== 'status' && personaje !== '' && $gender.value === 'gender')
    {
        url = `?name=${personaje}&status=${$status.value}`;
    }
    else if(personaje !== '' && $status.value !== 'status' && $gender.value !== 'gender')
    {
        url = `?name=${personaje}&status=${$status.value}&gender=${$gender.value}`;
    }
    else{
        let $ultimo = $contResul.lastElementChild;
        $contResul.removeChild($ultimo);
        $total.textContent = "";
        swal("Ocurrío un Error", "Por favor Ingresar un nombre o seleccione una opción", "error");
        return;
    }
    conexion(url);
}