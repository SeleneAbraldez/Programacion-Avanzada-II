//no usar var, let o const
//const cuando es un punturo, no podemos cambair el puntero, pero no importa cambiar el valor
//ej:
//const c = [4,5,6]
// const y = x;
// y.push(9);
//CAMBIA EN LOS DOS PORQUE ES UNA REFEREBCIA; PUNTERO; OJITOOOO
// const z = x.concat(10)

const $txtTarea = document.getElementById("txtTarea");
//si el scrpti esta al principio todavia no s ecargo, por lo mucha gente lo amnda al final
//MALA PRACTICA, agregale defer
// console.log($txtTarea)
const $lista = document.getElementById("lista");

//par saber quien de la cascada
document.addEventListener("submit", (e)=> {
    //practica rara porque no hace falta especificar, ojo
    if(!e.target.matches("#frmTarea")) return false;
    e.preventDefault();
    if(!$txtTarea) return false;

    $lista.innerHTML += `<li>${$txtTarea.value}</li>`;
    $txtTarea.value = "";
    $txtTarea.focus();

})

