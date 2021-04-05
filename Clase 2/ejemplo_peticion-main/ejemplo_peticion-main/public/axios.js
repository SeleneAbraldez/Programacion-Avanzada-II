let notas = [];

//intectado en el indez, podria estar en servidor peore sta de cliente igual

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

//no el aclara nada y ya est parseado, ya no manejamos nosotros el error si no que lo trabaja axios
const traerNotas = async () => {
  try {
    let res = await axios.get("/data.json");   
    notas = await res.data;
    actualizarNotas();
  } catch (error) {
    let message = error.statusText || "Ocurrió un error";
    console.error(message);
  }
};

//data, sin stringifym trabaja solo, sale con fritas
const altaNota = async (nota) => {
  try {
    console.log(nota);
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      data: nota,
    };
    let res = await axios("/nueva_nota_spa", options);

    if(res.status >= 200 && res.status <= 300){     
      console.log(res.data);
    }
   
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
