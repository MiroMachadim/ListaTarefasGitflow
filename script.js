document.addEventListener("change", function (evento) {
  if (
    evento.target &&
    evento.target.classList &&
    evento.target.classList.contains("check-tarefa")
  ) {
    const itemTarefa = evento.target.closest("li");
    if (itemTarefa) {
      if (evento.target.checked) {
        itemTarefa.classList.add("completed");
        atualizarStatusTarefa(itemTarefa, true);
      } else {
        itemTarefa.classList.remove("completed");
        atualizarStatusTarefa(itemTarefa, false);
      }
    }
  }
});
const theme = document.getElementById("tema");
let darkmode = localStorage.getItem("darkmmode");
function abilitarDarkMode() {
  theme.classList.add("dark-mode");
  localStorage.setItem("darkmmode", "enabled");
}
function desabilitarDarkMode() {
  theme.classList.remove("dark-mode");
  localStorage.setItem("darkmmode", "disabled");
}
if (darkmode == "enabled") {
  abilitarDarkMode();
}
document.addEventListener("change", function () {
  let valor = document.getElementById("checkbox").checked;
  if (valor) {
    abilitarDarkMode();
  } else {
    desabilitarDarkMode();
  }
});

const botaoStatus = document.getElementById("status-tarefa");
if (botaoStatus) {
  botaoStatus.classList.add("status-pendente");
  botaoStatus.addEventListener("click", function () {
    const atual =
      this.dataset.status === "concluida" ? "concluida" : "pendente";
    const proximo = atual === "concluida" ? "pendente" : "concluida";
    this.dataset.status = proximo;
    this.textContent = proximo === "concluida" ? "Concluída" : "Pendente";
    this.classList.toggle("status-concluida", proximo === "concluida");
    this.classList.toggle("status-pendente", proximo === "pendente");
    this.setAttribute("aria-pressed", proximo === "concluida");
  });
}

function criarEtiquetaStatus(status) {
  const etiqueta = document.createElement("span");
  etiqueta.className =
    "task-status " + (status === "concluida" ? "concluida" : "pendente");
  etiqueta.textContent = status === "concluida" ? "Concluída" : "Pendente";
  return etiqueta;
}

function atualizarStatusTarefa(itemLi, concluida) {
  const etiqueta = itemLi.querySelector(".task-status");
  if (!etiqueta) return;
  if (concluida) {
    etiqueta.classList.remove("pendente");
    etiqueta.classList.add("concluida");
    etiqueta.textContent = "Concluída";
  } else {
    etiqueta.classList.remove("concluida");
    etiqueta.classList.add("pendente");
    etiqueta.textContent = "Pendente";
  }
}

const formulario = document.getElementById("form-nova-tarefa");
const campoTarefa = document.getElementById("nova-tarefa");
const botaoAdicionar = document.getElementById("btn-adicionar");
const elementoSpinner = document.getElementById("spinner");
const mensagemErro = document.getElementById("error-msg");

function mostrarErro() {
  if (mensagemErro) {
    mensagemErro.removeAttribute("hidden");
    mensagemErro.style.display = "block";
  }
  if (campoTarefa) {
    campoTarefa.classList.add("input-error");
    campoTarefa.setAttribute("aria-invalid", "true");
    campoTarefa.focus();
  }
}

function esconderErro() {
  if (mensagemErro) {
    mensagemErro.setAttribute("hidden", "");
    mensagemErro.style.display = "none";
  }
  if (campoTarefa) {
    campoTarefa.classList.remove("input-error");
    campoTarefa.removeAttribute("aria-invalid");
  }
}

if (campoTarefa) {
  campoTarefa.addEventListener("input", function () {
    if (this.value.trim().length > 0) {
      esconderErro();
    }
  });
}

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const botaoStatusLocal = document.getElementById("status-tarefa");
    const textoTarefa = campoTarefa ? campoTarefa.value.trim() : "";

    if (!textoTarefa) {
      mostrarErro();
      return;
    }

    esconderErro();

    if (elementoSpinner) elementoSpinner.removeAttribute("hidden");
    if (botaoAdicionar) botaoAdicionar.disabled = true;
    if (campoTarefa) campoTarefa.disabled = true;

    setTimeout(() => {
      const statusLocal = botaoStatusLocal
        ? botaoStatusLocal.dataset.status
        : "pendente";
      const dados = {
        tarefa: textoTarefa,
        status: statusLocal,
      };

      let dadosSalvos = localStorage.getItem("Tarefas")
        ? JSON.parse(localStorage.getItem("Tarefas"))
        : [];
      dadosSalvos.push(dados);
      let dadosJson = JSON.stringify(dadosSalvos);
      localStorage.setItem("Tarefas", dadosJson);
      navigation.reload();
    }, 400);
  });
}

function carregarDadosTarefa() {
  let dadosSalvos = localStorage.getItem("Tarefas")
    ? JSON.parse(localStorage.getItem("Tarefas"))
    : [];

  for (const tarefa of dadosSalvos) {
    const itemTarefa = document.createElement("li");
    itemTarefa.style.display = "flex";
    itemTarefa.style.alignItems = "center";
    itemTarefa.style.justifyContent = "space-between";

    const rotulo = document.createElement("label");
    rotulo.style.display = "flex";
    rotulo.style.alignItems = "center";
    rotulo.style.gap = "8px";

    const caixaChecagem = document.createElement("input");
    caixaChecagem.type = "checkbox";
    caixaChecagem.className = "check-tarefa";
    const statusLocal = tarefa.status;
    if (statusLocal === "concluida") caixaChecagem.checked = true;

    rotulo.appendChild(caixaChecagem);
    rotulo.appendChild(document.createTextNode(tarefa.tarefa));
    itemTarefa.appendChild(rotulo);
    itemTarefa.appendChild(criarEtiquetaStatus(statusLocal));

    if (caixaChecagem.checked) itemTarefa.classList.add("completed");

    const secaoDestino =
      statusLocal === "concluida"
        ? document.querySelector("#Feitos ul")
        : document.querySelector("#Pendentes ul");
    if (secaoDestino) secaoDestino.appendChild(itemTarefa);

    if (campoTarefa) campoTarefa.value = "";
    // if(botaoStatusLocal){
    //     botaoStatusLocal.dataset.status = 'pendente';
    //     botaoStatusLocal.textContent = 'Pendente';
    //     botaoStatusLocal.classList.add('status-pendente');
    //     botaoStatusLocal.classList.remove('status-concluida');
    //     botaoStatusLocal.setAttribute('aria-pressed', 'false');
    // }
    // if(elementoSpinner) elementoSpinner.hidden = true;
    // if(botaoAdicionar) botaoAdicionar.disabled = false;
    // if(campoTarefa){ campoTarefa.disabled = false; campoTarefa.focus(); }
  }
}

if(campoTarefa){
    campoTarefa.addEventListener('input', function(){
        if(this.value.trim().length > 0){
            esconderErro();
        }
    });
}

if(formulario){
    formulario.addEventListener('submit', function(evento){
        evento.preventDefault();
        const botaoStatusLocal = document.getElementById('status-tarefa');
        const textoTarefa = campoTarefa ? campoTarefa.value.trim() : '';

        if(!textoTarefa){
            mostrarErro();
            return;
        }

        esconderErro();

        if(elementoSpinner) elementoSpinner.removeAttribute('hidden');
        if(botaoAdicionar) botaoAdicionar.disabled = true;
        if(campoTarefa) campoTarefa.disabled = true;

        setTimeout(() => {
            const statusLocal = botaoStatusLocal ? botaoStatusLocal.dataset.status : 'pendente';
            const dados = {
                tarefa: textoTarefa,
                status: statusLocal,
            }
            

            let dadosSalvos = localStorage.getItem("Tarefas") ? JSON.parse(localStorage.getItem("Tarefas")) : []
            dadosSalvos.push(dados);
            let dadosJson = JSON.stringify(dadosSalvos);
            localStorage.setItem("Tarefas", dadosJson);
            navigation.reload()
        }, 400);
    });

}

function carregarDadosTarefa() { 
    let dadosSalvos = localStorage.getItem("Tarefas") ? JSON.parse(localStorage.getItem("Tarefas")) : []
    
    for(const tarefa of dadosSalvos) {
        const itemTarefa = document.createElement('li');
        itemTarefa.style.display = 'flex';
        itemTarefa.style.alignItems = 'center';
        itemTarefa.style.justifyContent = 'space-between';

        const rotulo = document.createElement('label');
        rotulo.style.display = 'flex';
        rotulo.style.alignItems = 'center';
        rotulo.style.gap = '8px';

        const caixaChecagem = document.createElement('input');
        caixaChecagem.type = 'checkbox';
        caixaChecagem.className = 'check-tarefa';
        const statusLocal = tarefa.status;
        if(statusLocal === 'concluida') caixaChecagem.checked = true;

        rotulo.appendChild(caixaChecagem);
        rotulo.appendChild(document.createTextNode(tarefa.tarefa));
        itemTarefa.appendChild(rotulo);
        itemTarefa.appendChild(criarEtiquetaStatus(statusLocal));

        if(caixaChecagem.checked) itemTarefa.classList.add('completed');
        
        const secaoDestino = statusLocal === 'concluida'
            ? document.querySelector('#Feitos ul')
            : document.querySelector('#Pendentes ul');
        if(secaoDestino) secaoDestino.appendChild(itemTarefa);

        if(campoTarefa) campoTarefa.value = '';
    }
    
}

carregarDadosTarefa();
