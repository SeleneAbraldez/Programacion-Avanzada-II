const $lista = document.getElementById("lista");
const $txtTarea = document.getElementById("txtTarea");

const setState = (nuevoEstado)=>{
    for (const key in nuevoEstado) {
        if (Object.hasOwnProperty.call(template.state, key)) {
            template.state[key] = nuevoEstado[key];
        }
    }
    render();
}

const template = () => {
    $fragmento = document.createDocumentFragment();
    if (template.state.listaTareas.length == 0) {
        $item = document.createElement("li");
        $item.textContent = "No hay tareas pendientes";
        $fragmento.appendChild($item);
    } else {
        template.state.listaTareas.forEach((tarea) => {
            $item = document.createElement("li");
            $item.textContent = tarea;
            $fragmento.appendChild($item);
        })
    }
    return $fragmento;
}

template.state = {
    listaTareas: [],
}

const getState = ()=>{
    return JSON.parse(JSON.stringify(template.state));
}

const render = () => {
    $lista.innerHTML = "";
    $lista.appendChild(template());
}

document.addEventListener("submit", (e) => {
    if (!e.target.matches("#frmTarea")) return false;

    e.preventDefault();
    if (!$txtTarea) return false;

    const estadoActual = getState();
    estadoActual.listaTareas.push("aaaaa");

    setState(estadoActual);
    $txtTarea.value = "";
    $txtTarea.focus();
})

