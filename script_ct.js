// Vetores para armazenar os valores
let historicoCustos = [];

function limpar() {
    historicoCustos = [];
}

document.addEventListener('DOMContentLoaded', function() {
    const nomeUsuario = sessionStorage.getItem('nomeUsuario') || 'Usuário';
    const nomeProduto = sessionStorage.getItem('nomeProduto') || 'Produto';

    document.getElementById('tituloLeituraCusta').textContent = `Excelente ${nomeUsuario}, vamos cadastrar seus custos para o produto: ${nomeProduto}!`;
    document.getElementById('tituloResultados').textContent = `Concluímos com sucesso, ${nomeUsuario}! O custo total por produto é: `;
});

// Função de atualização que mantém valores nos vetores e limpa os campos
function atualizarValores() {
    // Armazena valores atuais de custo, se houverem
    let materiaPrima = document.getElementById('materiaPrima').value;
    let custoMP = parseFloat(document.getElementById('custoMP').value);
    let qtdPecas = parseInt(document.getElementById('qtdPecas').value);

    if (materiaPrima !== '' && !isNaN(custoMP) && !isNaN(qtdPecas)) {
        historicoCustos.push({ materiaPrima, custoMP, qtdPecas });
    }
    limparCampos();
}

// Função para limpar os campos de entrada
function limparCampos() {
    document.getElementById('materiaPrima').value = '';
    document.getElementById('custoMP').value = '';
    document.getElementById('qtdPecas').value = '';;
}

function calcularCustoTotal() {
    let custoTotal = 0; // Inicializa o custo total

    // Percorre o vetor de histórico de custos
    historicoCustos.forEach((custo) => {
        let custoPorPeca = custo.custoMP / custo.qtdPecas; // Calcula o custo por peça
        custoTotal += custoPorPeca; // Adiciona ao total
    });

    console.log('Custo Total por Peça:', custoTotal.toFixed(2)); // Exibe o resultado no console
    return custoTotal; // Retorna o custo total calculado
}

function mostrarResultados() {
    const resultadoCustoTexto = document.getElementById('resultadoCustoTexto');
    
    // Limpa o conteúdo anterior, caso exista
    resultadoCustoTexto.innerHTML = '';

    // Calcula o custo total por peça
    let custoTotal = calcularCustoTotal();

    // Exibe o custo total por peça logo acima da tabela
    resultadoCustoTexto.innerHTML = `
        <h3><strong>R$ ${custoTotal.toFixed(2)}</strong></h3>
    `;

    // Se o vetor de custos estiver vazio, exibe uma mensagem
    if (historicoCustos.length === 0) {
        return;
    }

    // Cria uma div para a tabela
    resultadoCustoTexto.innerHTML += `<div class="tabela-container"></div>`;
    const tabelaContainer = resultadoCustoTexto.querySelector('.tabela-container');
    
    // Cria a tabela dinamicamente
    let tabela = '<table class="tabela-resultado">';
    tabela += `
        <tr>
            <th>Matéria-prima</th>
            <th>Custo</th>
            <th>Rendimento</th>
        </tr>`;

    // Percorre o vetor de custos para preencher a tabela
    historicoCustos.forEach((custo) => {
        tabela += `
        <tr>
            <td>${custo.materiaPrima}</td>
            <td>R$ ${custo.custoMP.toFixed(2)}</td>
            <td>${custo.qtdPecas} peças</td>
        </tr>`;
    });

    tabela += '</table>';

    // Adiciona a tabela ao HTML
    tabelaContainer.innerHTML = tabela;
}

function calcularCusto() {
    let materiaPrima = document.getElementById('materiaPrima').value.trim();
    let custoMP = parseFloat(document.getElementById('custoMP').value.trim());
    let qtdPecas = parseInt(document.getElementById('qtdPecas').value.trim());

    // Caso todos os campos estejam vazios
    if (materiaPrima === '' && isNaN(custoMP) && isNaN(qtdPecas)) {
        mostrarResultados();
        return;  // Evita que os valores vazios sejam inseridos no vetor
    }

    // Caso todos os campos estejam preenchidos
    if (materiaPrima !== '' && !isNaN(custoMP) && !isNaN(qtdPecas)) {
        historicoCustos.push({ materiaPrima, custoMP, qtdPecas });
        console.log('Histórico de Custos:', historicoCustos);
        document.getElementById('materiaPrima').value = '';
        document.getElementById('custoMP').value = '';
        document.getElementById('qtdPecas').value = '';
        mostrarResultados();
    } else {
        alert('Certifique-se de que todos os campos estão preenchidos ou vazios.');
    }
}

function exibirResultadoCusto() {
    const corpoTabela = document.getElementById('corpoTabelaCusto');
    
    // Limpar a tabela antes de inserir novos dados
    corpoTabela.innerHTML = '';

    // Percorrer o vetor de custos e adicionar uma nova linha para cada item
    custos.forEach((custo, index) => {
        const novaLinha = document.createElement('tr');

        // Criar as células (td) com os valores de matéria-prima, custo e rendimento
        novaLinha.innerHTML = `
            <td>${custo.materiaPrima}</td>
            <td>R$ ${custo.custoMP.toFixed(2)}</td>
            <td>${custo.qtdPecas} peças</td>
        `;

        // Adicionar a nova linha à tabela
        corpoTabela.appendChild(novaLinha);
    });
}

function validarFormulario() {
    const formulario = document.getElementById('custos');
    const inputs = formulario.querySelectorAll('input[required]');
    let todosVazios = true;

    // Verifica se todos os campos obrigatórios estão vazios
    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            todosVazios = false; // Se algum campo não está vazio, altera para false
            input.style.borderColor = ''; // Limpa a borda de erro
        } else {
            input.style.borderColor = 'red'; // Colore a borda de vermelho se está vazio
        }
    });

    // Avança apenas se todos os campos estiverem vazios
    if (todosVazios) {
        irParaProximaSecao('section2');
    } else {
        alert('Por favor, deixe todos os campos vazios antes de prosseguir.');
    }
}


function irParaProximaSecao(proximaSecao) {
    document.querySelectorAll('.form-container').forEach(function(secao) {
        secao.style.display = 'none';
    });

    if (proximaSecao === 'section2') {
        calcularCusto();
    }

    document.getElementById(proximaSecao).style.display = 'block';
}

function apenasNumerosReais(input) {
    input.value = input.value.replace(/[^0-9.,]/g, '');
    const partes = input.value.split(/[.,]/);
    if (partes.length > 2) {
        input.value = partes[0] + '.' + partes.slice(1).join('');
    }
}