// Vetores para armazenar os valores
let historicoDespesas = [];
let qtdPecasMes = 0; // Variável para armazenar a quantidade de peças produzidas no mês

function limpar() {
    historicoDespesas = []; // Limpar o vetor de despesas
    qtdPecasMes = 0;
}

document.addEventListener('DOMContentLoaded', function() {
    const nomeUsuario = sessionStorage.getItem('nomeUsuario') || 'Usuário';
    const nomeProduto = sessionStorage.getItem('nomeProduto') || 'Produto';

    document.getElementById('tituloQtdPecas').textContent = `Excelente ${nomeUsuario}, vamos cadastrar a quantidade de peças produzidas no mês`;
    document.getElementById('tituloLeituraDespesa').textContent = `Só mais alguns dados ${nomeUsuario}, e estaremos prontos para te entregar o valor da despesa do seu produto!`;
    document.getElementById('tituloResultados').textContent = `Concluímos com sucesso, ${nomeUsuario}! A despesa total por produto é:`;
});

function capturarQtdPecasMes() {
    // Tenta capturar o valor como um número inteiro
    qtdPecasMes = parseInt(document.getElementById('qtdPecasMes').value);
    
    // Verifica e exibe no console o valor capturado
    console.log("Valor capturado para qtdPecasMes:", qtdPecasMes);

    // Validação para garantir que a quantidade é válida

    console.log("Quantidade de peças válida capturada:", qtdPecasMes);
    return true;
}


// Função de atualização que mantém valores nos vetores e limpa os campos
function atualizarValores() {

    let despesa = document.getElementById('despesaNome').value; // Atualizado
    let valorDespesa = parseFloat(document.getElementById('valorDespesa').value);

    if (despesa !== '' && !isNaN(valorDespesa)) {
        historicoDespesas.push({ despesa, valorDespesa });
    }
    limparCampos();
}

// Função para limpar os campos de entrada
function limparCampos() {
    document.getElementById('despesaNome').value = '';  // Esvazia o campo de despesa
    document.getElementById('valorDespesa').value = '';
}


function calcularDespesaPorPeca() {
    let totalDespesas = 0;

    // Somar os valores das despesas registradas
    historicoDespesas.forEach((despesa) => {
        totalDespesas += despesa.valorDespesa;
    });

    // Calcular a despesa por peça
    let despesaPorPeca = totalDespesas / qtdPecasMes;

    console.log('Despesa Total:', totalDespesas);
    console.log('Despesa por Peça:', despesaPorPeca.toFixed(2));

    return despesaPorPeca; // Retornar o valor calculado
}

function mostrarResultadosDespesas() {
    const resultadoDespesaTexto = document.getElementById('resultadoDespesaTexto');
    
    // Limpa o conteúdo anterior, caso exista
    resultadoDespesaTexto.innerHTML = '';
    // Calcula a despesa por peça
    let despesaPorPeca = calcularDespesaPorPeca();

    // Exibe o total de despesas por peça logo acima da tabela
    resultadoDespesaTexto.innerHTML = 
        `<h3><strong> R$ ${despesaPorPeca.toFixed(2)}</strong></h3>
        <h1>Para cada ${qtdPecasMes} peças produzidas por mês.</h1>
        `;

        if (historicoDespesas.length === 0) {
            return;
        }

    // Cria uma div para a tabela
    resultadoDespesaTexto.innerHTML += '<div class="tabela-container"></div>';
    const tabelaContainer = resultadoDespesaTexto.querySelector('.tabela-container');
    
    // Cria a tabela dinamicamente
    let tabela = '<table class="tabela-resultado">';
    tabela += 
        `<tr>
            <th>Despesa</th>
            <th>Valor</th>
        </tr>`;

    // Percorre o vetor de despesas para preencher a tabela
    historicoDespesas.forEach((despesa) => {
        tabela += 
        `<tr>
            <td>${despesa.despesa}</td>
            <td>R$ ${despesa.valorDespesa.toFixed(2)}</td>
        </tr>`;
    });

    tabela += '</table>';

    // Adiciona a tabela ao HTML
    tabelaContainer.innerHTML = tabela;
}


// Função para calcular a despesa
function calcularDespesa() {
    let despesaNome = document.getElementById('despesaNome').value.trim();
    let valorDespesa = parseFloat(document.getElementById('valorDespesa').value.trim());

    // Caso todos os campos estejam vazios
    if (despesaNome === '' && isNaN(valorDespesa)) {
        mostrarResultadosDespesas();
        return;  // Evita que valores vazios sejam inseridos no vetor
    }

    // Caso todos os campos estejam preenchidos
    if (despesaNome !== '' && !isNaN(valorDespesa)) {
        historicoDespesas.push({ despesa: despesaNome, valorDespesa });
        console.log('Histórico de Despesas:', historicoDespesas);
        document.getElementById('despesaNome').value = '';
        document.getElementById('valorDespesa').value = '';
        mostrarResultadosDespesas();
    } else {
        alert('Certifique-se de que todos os campos estão preenchidos ou vazios.');
    }
}

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


function validarFormulario2() {
    const formulario = document.getElementById('despesas');
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
        irParaProximaSecao('section3');
    } else {
        alert('Se este for seu último item, clique em Adicionar depois Próximo.');
    }
}


function irParaProximaSecao(proximaSecao) {
    document.querySelectorAll('.form-container').forEach(function(secao) {
        secao.style.display = 'none';
    });

    if (proximaSecao === 'section3') {
        calcularDespesa();
    }

    document.getElementById(proximaSecao).style.display = 'block';
}

function voltarParaSecao(prevSection) {
    mudarParaSecao(prevSection);
}

function mudarParaSecao(sectionId) {
    document.getElementById("section1").style.display = "none";
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