document.addEventListener('DOMContentLoaded', function() {
    const nomeuUsuariu = sessionStorage.getItem('nomeuUsuariu') || 'Usuário';

    document.getElementById('tituloValorHoraTrabalho').textContent = `Excelente ${nomeuUsuariu}, vamos cadastrar alguns dados sobre seu trabalho!`;
    document.getElementById('tituloCustosMaodeObra').textContent = `Concluímos com sucesso, ${nomeuUsuariu}!`;
    document.getElementById('h2').textContent = `O valor da sua hora de trabalho é: `;
});

function salvarValoresMateriais() {
    const salarioDesejado = document.getElementById('SD').value;
    const diasTrabalhadosMes = document.getElementById('DTM').value;
    const horasTrabalhadasDia = document.getElementById('HTD').value;

    sessionStorage.setItem('SD', salarioDesejado);
    sessionStorage.setItem('DTM', diasTrabalhadosMes);
    sessionStorage.setItem('HTD', horasTrabalhadasDia);
}

function validarFormulario() {
    const formulario = document.getElementById('valorHoraTrabalho');
    const inputs = formulario.querySelectorAll('input[required]');
    let todosPreenchidos = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            todosPreenchidos = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });

    if (todosPreenchidos) {
        salvarValoresMateriais();
        irParaProximaSecao('section2');
    } else {
        alert('Por favor, preencha todos os campos antes de prosseguir.');
    }
}

function irParaProximaSecao(proximaSecao) {
    document.querySelectorAll('.form-container').forEach(function(secao) {
        secao.style.display = 'none';
    });

    if (proximaSecao === 'section2') {
        calcularValorHora();
        preencherResultado();
    }

    document.getElementById(proximaSecao).style.display = 'block';
}

function calcularValorHora() {
    const salarioDesejado = parseFloat(sessionStorage.getItem('SD'));
    const diasTrabalhadosMes = parseFloat(sessionStorage.getItem('DTM'));
    const horasTrabalhadasDia = parseFloat(sessionStorage.getItem('HTD'));

    const valorTrabalho = (salarioDesejado / (diasTrabalhadosMes * horasTrabalhadasDia));
    sessionStorage.setItem('valorTrabalho', valorTrabalho.toFixed(2));
}

function preencherResultado() {
    const valorTrabalho = sessionStorage.getItem('valorTrabalho');
    document.getElementById('resultado').textContent = `R$ ${valorTrabalho}`;
}

function apenasNumerosReais(input) {
    input.value = input.value.replace(/[^0-9.,]/g, '');
    const partes = input.value.split(/[.,]/);
    if (partes.length > 2) {
        input.value = partes[0] + '.' + partes.slice(1).join('');
    }
}