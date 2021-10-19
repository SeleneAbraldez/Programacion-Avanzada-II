const $lista = document.getElementById("lista");
const $txtTarea = document.getElementById("txtTarea");


//el comportamiento se dividie en tres partes
//1 se actualiza el estado
//2 armar plantilla template
//3 renderizado (insercion en la UI)

//1
const state = {
    listaTareas: []
}
//2
//funcion anonima, no expresada (asignado a const) ni declarada(f1 sol)
const template = () => {
    //paquetedescartable, sin invadir con un div siendo no visible pero empaquetable
    $fragmento = document.createDocumentFragment();
    if (state.listaTareas.length == 0) {
        $item = document.createElement("li");
        $item.textContent = "No hay tareas pendientes";
        // const texto = document.createTextNode("No hay tareas pendientes");
        // $item.appendChild(texto);
        $fragmento.appendChild($item);
    } else {
        state.listaTareas.forEach((tarea) => {
            $item = document.createElement("li");
            $item.textContent = tarea;
            $fragmento.appendChild($item);
        })
    }
    return $fragmento;
}

//3
const render = () => {
    $lista.innerHTML = "";
    $lista.appendChild(template());
}

document.addEventListener("submit", (e) => {
    if (!e.target.matches("#frmTarea")) return false;
    e.preventDefault();
    if (!$txtTarea) return false;

    //actualiza
    state.listaTareas.push($txtTarea.value);
    render();
    $txtTarea.value = "";
    $txtTarea.focus();

})

