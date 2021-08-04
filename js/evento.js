import{remover,preUrl} from './funciones.js';


let d = document, $nombre = d.getElementById("bPersonaje"),$formulario = d.getElementById("formulario"),
    $gender = document.getElementById("gender"),$status = document.getElementById("status");
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