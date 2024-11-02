function atualizarTituloComNome() {
    const nomeUsuario = sessionStorage.getItem('nomeUsuario');
    if (nomeUsuario) {
        document.getElementById('tituloCustosMateriais').innerText = `Excelente ${nomeUsuario}, vamos cadastrar mais alguns dados sobre você e seu produto!`;
        document.getElementById('tituloCustosMaodeObra').innerText = `Só mais alguns dados ${nomeUsuario}, e estaremos prontos para te entregar o preço do seu produto!`;
    }
}

window.onload = function() {
    atualizarTituloComNome();
    preencherResultados();
};

function validarFormulario(formId, proximaSecao) {
    const formulario = document.getElementById(formId);
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
        irParaProximaSecao(proximaSecao);
    } else {
        alert('Por favor, preencha todos os campos antes de prosseguir.');
    }
}

function irParaProximaSecao(proximaSecao) {
    document.querySelectorAll('.form-container').forEach(function(secao) {
        secao.style.display = 'none';
    });

    if (proximaSecao === 'section3') {
        calcularPrecoFinal();
        preencherResultados();
    }

    document.getElementById(proximaSecao).style.display = 'block';
}

function voltarParaSecao(prevSection) {
    mudarParaSecao(prevSection);
}

function mudarParaSecao(sectionId) {
    document.getElementById('section2').style.display = 'none';
    document.getElementById('section3').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

function apenasNumerosReais(input) {
    input.value = input.value.replace(/[^0-9.,]/g, '');
    const partes = input.value.split(/[.,]/);
    if (partes.length > 2) {
        input.value = partes[0] + '.' + partes.slice(1).join('');
    }
}

function salvarValoresMateriais() {
    const horaTrabalho = parseFloat(document.getElementById('horaTrabalho').value.replace(',', '.'));
    const custo = parseFloat(document.getElementById('custo').value.replace(',', '.'));
    sessionStorage.setItem('horaTrabalho', horaTrabalho);
    sessionStorage.setItem('custo', custo);
}

function salvarValoresMaodeObra() {
    const despesaProduto = parseFloat(document.getElementById('despesaProduto').value.replace(',', '.'));
    const margemLucro = parseFloat(document.getElementById('margemLucro').value.replace(',', '.'));
    sessionStorage.setItem('despesaProduto', despesaProduto);
    sessionStorage.setItem('margemLucro', margemLucro);
}

function calcularPrecoFinal() {
    const horaTrabalho = parseFloat(sessionStorage.getItem('horaTrabalho'));
    const custo = parseFloat(sessionStorage.getItem('custo'));
    const despesaProduto = parseFloat(sessionStorage.getItem('despesaProduto'));
    const margemLucro = parseFloat(sessionStorage.getItem('margemLucro'));

    const custoTotal = horaTrabalho + custo;
    const precoMargem = (custoTotal+despesaProduto) * (1 + (margemLucro / 100));
    const precoFinal = Math.ceil(precoMargem);

    sessionStorage.setItem('precoFinal', precoFinal.toFixed(2));
    sessionStorage.setItem('custoTotal', custoTotal.toFixed(2));
    sessionStorage.setItem('precoMargem', precoMargem.toFixed(2));
    
}

function preencherResultados() {
const nomeProduto = sessionStorage.getItem('nomeProduto');
const nomeUsuario = sessionStorage.getItem('nomeUsuario');

document.getElementById('tituloResultado').innerText = `Concluímos com sucesso, ${nomeUsuario || 'usuário'}!`;
document.querySelector('h2').innerText = `O preço do produto ${nomeProduto || 'produto'} é:`;

const custoTotal = parseFloat(sessionStorage.getItem('horaTrabalho')) + parseFloat(sessionStorage.getItem('custo'));
const valorTrabalho = parseFloat(sessionStorage.getItem('horaTrabalho')).toFixed(2);
const despesaPeca = parseFloat(sessionStorage.getItem('despesaProduto')).toFixed(2);
const precoMargem = parseFloat(sessionStorage.getItem('precoMargem')).toFixed(2);
const precoFinal = parseFloat(sessionStorage.getItem('precoFinal')).toFixed(2);

document.getElementById('nomeProduto').innerText = nomeProduto || 'Produto Exemplo';
document.getElementById('custoTotal').innerText = `R$ ${custoTotal.toFixed(2)}`;
document.getElementById('valorTrabalho').innerText = `R$ ${valorTrabalho}`;
document.getElementById('despesaPeca').innerText = `R$ ${despesaPeca}`;
document.getElementById('precoMargem').innerText = `R$ ${precoMargem}`;
document.getElementById('precoFinal').innerText = `R$ ${precoFinal}`;
document.getElementById('precoFinalTabela').innerText = `R$ ${precoFinal}`;
}