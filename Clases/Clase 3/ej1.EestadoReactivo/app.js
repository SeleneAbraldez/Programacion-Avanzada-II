const $lista = document.getElementById("lista");
const $txtTarea = document.getElementById("txtTarea");

//edtado inmutable y se actualizara por funcion
//comparar el viejo estado con el actual, para saber sia ctualizar o no
//la idea es que no reciba referencias, porque debe ser inmutable 

const setState = (nuevoEstado)=>{
    //forin para iterar y traer la key del objeto, con una carta de validacion con el contexto de la funcion
    for (const key in nuevoEstado) {
        //la tiene o no la tiene?
        if (Object.hasOwnProperty.call(state, key)) {
            state[key] = nuevoEstado[key];
            
        }
    }
    //cada vez que se actualice hay que llamarlo, de forma reactiva
    render();
}

const state = {
    listaTareas: []
}

const template = () => {
    $fragmento = document.createDocumentFragment();
    if (state.listaTareas.length == 0) {
        $item = document.createElement("li");
        $item.textContent = "No hay tareas pendientes";
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

const getState = ()=>{
    //desvinculado y genero nueva memoria, fotocopia pero distinta ref
    return JSON.parse(JSON.stringify(state));
}

const render = () => {
    $lista.innerHTML = "";
    $lista.appendChild(template());
}

document.addEventListener("submit", (e) => {
    if (!e.target.matches("#frmTarea")) return false;

    e.preventDefault();
    if (!$txtTarea) return false;

    // const lista = state.listaTareas.concat($txtTarea.value);
    const estadoActual = getState();
    estadoActual.listaTareas.push("aaaaa");

    // lista.push($txtTarea.value);
    //no deberiamos manejar dorectamente nunca el state, y el mismo deberia ser inmutable
    //apunte al nuevo estado
    setState(estadoActual);
    $txtTarea.value = "";
    $txtTarea.focus();

})

