const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownLista = document.getElementById('dropdown-lista');

if(dropdownBtn && dropdownLista){
    dropdownBtn.addEventListener('click', function(){
        dropdownLista.classList.toggle('aberto');
    });

    document.addEventListener('click', function(e){
        if(!dropdownBtn.contains(e.target) && !dropdownLista.contains(e.target)){
            dropdownLista.classList.remove('aberto');
        }
    });

    dropdownLista.querySelectorAll('.dropdown-item').forEach(function(item){
        item.addEventListener('click', function(){
            const valor = this.dataset.value;
            const listaFeitas = document.getElementById('Feitos');
            const listaPendentes = document.getElementById('Pendentes');

            dropdownLista.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('ativo'));
            this.classList.add('ativo');
            dropdownBtn.innerHTML = this.textContent + ' <span class="dropdown-seta">▼</span>';
            dropdownLista.classList.remove('aberto');

            if(valor === 'Pendentes'){
                listaPendentes.style.display = 'block';
                listaFeitas.style.display = 'none';
            } else if(valor === 'Feitas'){
                listaPendentes.style.display = 'none';
                listaFeitas.style.display = 'block';
            } else {
                listaPendentes.style.display = 'block';
                listaFeitas.style.display = 'block';
            }
        });
    });
}