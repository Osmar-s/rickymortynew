import{remover,preUrl,conexion} from './funciones.js';


let d = document, $nombre = d.getElementById("bPersonaje"),$formulario = d.getElementById("formulario"),
    $gender = document.getElementById("gender"),$status = document.getElementById("status"),
    $next = d.getElementById("next"),$prev = d.getElementById("prev"),contador = 1;

    $formulario.addEventListener("submit",(e) => {
    e.preventDefault();
    remover($nombre.value);
});


$gender.addEventListener("change",() => {
    preUrl($nombre.value);
});

$status.addEventListener("change",() => {
    preUrl($nombre.value);
});

$next.addEventListener("click",(e)=> {
    e.preventDefault();
    contador++;
    conexion($next.href,contador);
});

$prev.addEventListener("click",(e)=>{
    e.preventDefault();
    contador--;
    conexion($prev.href,contador);
});