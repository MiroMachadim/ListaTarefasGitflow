document.getElementById("estados").onchange = function () {
  var valor = this.value;
  var feitas = document.getElementById("Feitos");
  var Pendentes = document.getElementById("Pendentes");
  console.log(valor);
  if (valor == "Pendentes") {
    feitas.style.visibility = "hidden";
    Pendentes.style.visibility = "visible";
  } else if (valor == "Feitas") {
    Pendentes.style.visibility = "hidden";
    feitas.style.visibility = "visible";
  } else {
    feitas.style.visibility = "visible";
    Pendentes.style.visibility = "visible";
  }
};
