let notas = [];

let actualizarNotas = function () {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "notas");

  notas.forEach(function (nota) {
    let li = document.createElement("li");
    ul.appendChild(li);
    li.appendChild(document.createTextNode(nota.contenido));
  });

  let $notas = document.getElementById("notas");
  if ($notas.hasChildNodes()) {
    $notas.removeChild($notas.childNodes[0]);
  }
  $notas.appendChild(ul);
};

const traerNotas = async () => {
  try {
    let res = await fetch("/data.json");
    notas = await res.json();
    //console.log(notas);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    actualizarNotas();
  } catch (error) {
    let message = error.statusText || "Ocurrió un error";
    console.error(message);
  }
};

const altaNota = async (nota) => {
  try {    
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(nota),
    };
    let res = await fetch("/nueva_nota_spa", options); 
    let mensaje = await res.json();
    console.log(mensaje);   
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
     actualizarNotas();
  } catch (error) {
    let message = error.statusText || "Ocurrió un error";
    console.error(message);
  }
};
window.onload = function (e) {
  let form = document.getElementById("frm_notas");
  form.onsubmit = function (e) {
    e.preventDefault();

    let nota = {
      contenido: e.target.elements[0].value,
      fecha: new Date(),
    };

    notas.push(nota);
    e.target.elements[0].value = "";   
    altaNota(nota);
  };

  traerNotas();
};
