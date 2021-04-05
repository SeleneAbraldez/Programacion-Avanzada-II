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
    //estandar con encapsulamiento, 
    let res = await fetch("/data.json");
    //faltaria un fetch puro sin funciones asincronas
    //banca a que llegue y lo hacemos obketo
    notas = await res.json();
    //console.log(notas);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    actualizarNotas();
  } catch (error) {
    //operador alternario parecido, depende lo que exista. depende la apai no responde texto
    let message = error.statusText || "Ocurrió un error";
    console.error(message);
  }
};

const altaNota = async (nota) => {
  try {    
    const options = {
      method: "POST",
      //obligatorio ripo contenido
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      //si lepasamos un algo que no le guste, otra cosa que no se aobjeto, chilla
      body: JSON.stringify(nota),
    };
    let res = await fetch("/nueva_nota_spa", options); 
    //data me la da de forma nativa res
    console.log(res);
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
