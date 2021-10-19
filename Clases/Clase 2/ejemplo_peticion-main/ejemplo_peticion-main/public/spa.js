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

let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    notas = JSON.parse(this.responseText);
    actualizarNotas();
  }
};

xhr.open("GET", "/data.json", true);
xhr.send();

let altaNota = function (nota) {
  let xhrPost = new XMLHttpRequest();
  xhrPost.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      console.log(this.responseText);
    }
  };

  xhrPost.open("POST", "/nueva_nota_spa", true);
  xhrPost.setRequestHeader("Content-type", "application/json");
  xhrPost.send(JSON.stringify(nota));
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
    actualizarNotas();
    altaNota(nota);
  };
};
