
document.addEventListener('change', function(e){
    if(e.target && e.target.classList && e.target.classList.contains('check-tarefa')){
        const li = e.target.closest('li');
        if(li){
            if(e.target.checked) {
                li.classList.add('completed');
                updateTaskStatus(li, true);
            }
            else {
                li.classList.remove('completed');
                updateTaskStatus(li, false);
            }
        }
    }
});

const statusButton = document.getElementById('status-tarefa');
if(statusButton){
    statusButton.classList.add('status-pendente');
    statusButton.addEventListener('click', function(){
        const current = this.dataset.status === 'concluida' ? 'concluida' : 'pendente';
        const next = current === 'concluida' ? 'pendente' : 'concluida';
        this.dataset.status = next;
        this.textContent = next === 'concluida' ? 'Concluída' : 'Pendente';
        this.classList.toggle('status-concluida', next === 'concluida');
        this.classList.toggle('status-pendente', next === 'pendente');
        this.setAttribute('aria-pressed', next === 'concluida');
    });
}


function createStatusBadge(status){
    const badge = document.createElement('span');
    badge.className = 'task-status ' + (status === 'concluida' ? 'concluida' : 'pendente');
    badge.textContent = status === 'concluida' ? 'Concluída' : 'Pendente';
    return badge;
}

function updateTaskStatus(li, completed){
    const badge = li.querySelector('.task-status');
    if(!badge) return;
    if(completed){
        badge.classList.remove('pendente');
        badge.classList.add('concluida');
        badge.textContent = 'Concluída';
    } else {
        badge.classList.remove('concluida');
        badge.classList.add('pendente');
        badge.textContent = 'Pendente';
    }
}

document.getElementById('form-nova-tarefa').addEventListener('submit', function(e){
    e.preventDefault();
    const input = document.getElementById('nova-tarefa');
    const statusButton = document.getElementById('status-tarefa');
    const texto = input.value.trim();
    if(!texto) return;
    const li = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check-tarefa';
    const status = statusButton ? statusButton.dataset.status : 'pendente';
    if(status === 'concluida') checkbox.checked = true;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + texto));
    label.appendChild(createStatusBadge(status));
    li.appendChild(label);
    if(checkbox.checked) li.classList.add('completed');
    const alvo = document.querySelector('main section:nth-of-type(2) ul');
    if(alvo) alvo.appendChild(li);
    input.value = '';
    if(statusButton){
        statusButton.dataset.status = 'pendente';
        statusButton.textContent = 'Pendente';
        statusButton.classList.add('status-pendente');
        statusButton.classList.remove('status-concluida');
        statusButton.setAttribute('aria-pressed', 'false');
    }
    input.focus();
});
