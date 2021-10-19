let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
    console.log(data);
    let ul = document.createElement("ul");
    ul.setAttribute("class", "notas");

    data.forEach(function (nota) {
      let li = document.createElement("li");
      ul.appendChild(li);
      li.appendChild(document.createTextNode(nota.contenido));
    });
    document.getElementById("notas").appendChild(ul);
  }
};
xhr.open("GET", "/data.json", true);
xhr.send();
