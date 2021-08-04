'use strict';

export const remover = (texto) =>{
    let newText = texto.trim();
    if(newText === "" && $gender.value === 'gender' && $status.value === 'status'){
        swal("Ocurrío un Error", "Por favor Ingresar un nombre", "error");
    }
    else{
        preUrl(newText);
    }
}

let $gender = document.getElementById("gender"),$status = document.getElementById("status"),
    $total = document.getElementById('totalResul'),$contResul = document.getElementById('resul'),
    $nextt = document.getElementById("next"),$prevv = document.getElementById("prev"),
    $pag = document.getElementById('pag'),$paginacion = document.getElementById("paginacion"),contadorInicial=1,
    $next = document.getElementById("next"),$prev = document.getElementById("prev");
export const conexion = async (url) => {
    console.log("desde conexion",contadorInicial);
    let $ultimo = $contResul.lastElementChild;
    const con = await fetch(url);
    if(con.status !== 200)
    {
        swal("Sin Resultados :(", "", "error");
        if($ultimo.className === 'resultados') $contResul.removeChild($ultimo);
        $total.textContent = "";
        $paginacion.classList.add("disabled");
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
        switch(valor.gender)
        {
            case 'Female':
                $gen.setAttribute('class','gen female')
                $gen.innerHTML = `<i class="fas fa-female"></i>`;
                break;
            case 'Male':
                $gen.setAttribute('class','gen male')
                $gen.innerHTML = `<i class="fas fa-male"></i>`;
                break;
            default:
                $gen.setAttribute('class','gen unknow')
                $gen.innerHTML = `<i class="fas fa-question"></i>`;
                break;
        }
        const $div = document.createElement("div");
        $div.innerHTML = `
            <p>Nombre: <span class="datos">${valor.name}</span></p>
            <p>Estado: ${estado(valor.status)}</p>
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
    $paginacion.classList.remove("disabled");
    $pag.textContent = `${contadorInicial}/${res.info.pages}`;

    switch(res.info.next){
        case null:
            $nextt.classList.add('disabled');
            break;
        default:
            $nextt.href=res.info.next;
            $nextt.classList.remove('disabled');
            break;
    }
    switch(res.info.prev){
        case null:
            $prevv.classList.add("disabled");
            break
        default:
            $prevv.href = res.info.prev;
            $prevv.classList.remove("disabled");
            break;
    }
}

const estado = (es) => {
    let respuesta;
    switch(es){
        case 'Alive':
            respuesta = `<span class="a alive">${es}</span>`;
            break;
        case 'Dead':
            respuesta = `<span class="a dead">${es}</span>`;
            break;
        default:
            respuesta = `<span class="a des">${es}</span>`;
            break;
    }
    return respuesta;
}

export const preUrl = (personaje = "") => {
    let url = `https://rickandmortyapi.com/api/character/`,contador=1;
    if(personaje !== "" && $gender.value === 'gender' && $status.value === 'status')
    {
        url += `?name=${personaje}`;
        contadorInicial =1;
    }
    else if(personaje !== '' && $gender.value !== 'gender' && $status.value === 'status'){
        url += `?name=${personaje}&gender=${$gender.value}`;
    }
    else if(personaje !== '' && $status.value !== 'status' && $gender.value === 'gender'){
        url += `?name=${personaje}&status=${$status.value}`;
        contadorInicial =1;
    }
    else if($gender.value !== 'gender' && personaje === "" && $status.value === 'status')
    {
        url += `?gender=${$gender.value}`;
        contadorInicial =1;
    }
    else if($gender.value !== 'gender' && personaje !== '' && $status.value === 'status')
    {
        url += `?name=${personaje}&gender=${$gender.value}`;
        contadorInicial =1;
    }
    else if($gender.value !== 'gender' && $status.value !== 'status' && personaje === '')
    {
        url += `?gender=${$gender.value}&status=${$status.value}`;
        contadorInicial =1;
    }
    else if($status.value !== 'status' && personaje === "" && $gender.value === 'gender')
    {
        url += `?status=${$status.value}`;
        contadorInicial =1;
    }
    else if($status.value !== 'status' && personaje !== '' && $gender.value === 'gender')
    {
        url += `?name=${personaje}&status=${$status.value}`;
        contadorInicial =1;
    }
    else if(personaje !== '' && $status.value !== 'status' && $gender.value !== 'gender')
    {
        url += `?name=${personaje}&status=${$status.value}&gender=${$gender.value}`;
        contadorInicial =1;
    }
    else{
        let $ultimo = $contResul.lastElementChild;
        if($ultimo.className === 'resultados') $contResul.removeChild($ultimo);
        $total.textContent = "";
        $paginacion.classList.add("disabled");
        swal("Ocurrío un Error", "Por favor Ingrese un nombre o seleccione una opción", "error");
        contadorInicial =1;
        return;
    }
    conexion(url);
}

$next.addEventListener("click",(e)=> {
    e.preventDefault();
    console.log("desde next",contadorInicial);
    contadorInicial++;
    console.log("desde next",contadorInicial);
    conexion($next.href);
});

$prev.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("desde prev",contadorInicial);
    contadorInicial--;
    console.log("desde prev",contadorInicial);
    conexion($prev.href);
});