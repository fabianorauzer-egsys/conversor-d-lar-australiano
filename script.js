const CACHE_KEY = 'conversor_cache';
const COTACAO = 3.50;

function getCache() {
    let cache = localStorage.getItem(CACHE_KEY);
    if (!cache) {
        cache = '[]';
    }
    return JSON.parse(cache);
}

function setCache(valores) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(valores));
}

function converterDolaresParaReais(valor) {
    return valor * COTACAO;
}

function adicionarLinha(reais, dolares, descricao, temAcomodacao) {
    const tbody = document.querySelector('#tabela tbody');
    const linha = document.createElement('tr');

    const colunaReais = document.createElement('td');
    colunaReais.textContent = reais.toFixed(2);

    const colunaDolares = document.createElement('td');
    colunaDolares.textContent = dolares.toFixed(2);

    const colunaDescricao = document.createElement('td');
    colunaDescricao.textContent = descricao;

    const colunaAcomodacao = document.createElement('td');
    colunaAcomodacao.textContent = temAcomodacao ? 'Sim' : 'Não';

    const colunaAcoes = document.createElement('td');
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.addEventListener('click', () => {
        linha.remove();
        const cache = getCache();
        const index = cache.findIndex(([r, d, desc, acom]) => r === reais && d === dolares && desc === descricao && acom === temAcomodacao);
        if (index !== -1) {
            cache.splice(index, 1);
            setCache(cache);
        }
    });
    colunaAcoes.appendChild(botaoExcluir);

    linha.appendChild(colunaReais);
    linha.appendChild(colunaDolares);
    linha.appendChild(colunaDescricao);
    linha.appendChild(colunaAcomodacao);
    linha.appendChild(colunaAcoes);
    tbody.appendChild(linha);
}

function atualizarTabela() {
    const cache = getCache();
    const tbody = document.querySelector('#tabela tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < cache.length; i++) {
        const [reais, dolares, descricao, acomodacao] = cache[i];
        adicionarLinha(reais, dolares, descricao, acomodacao);
    }
}

function onSubmitDolar(event) {
    event.preventDefault();
  
    const valorInput = document.querySelector('#valor-dolar');
    const valor = parseFloat(valorInput.value);
  
    const descricaoInput = document.querySelector('#descricao-dolar');
    const descricao = descricaoInput.value;
  
    const acomodacaoInput = document.querySelector('#acomodacao-dolar');
    const temAcomodacao = acomodacaoInput.checked;
  
    if (!isNaN(valor)) {
      const reais = converterDolaresParaReais(valor);
      adicionarLinha(reais, valor, descricao, temAcomodacao);
  
      const cache = getCache();
      cache.push([reais, valor, descricao, temAcomodacao]);
      setCache(cache);
  
      valorInput.value = '';
      descricaoInput.value = '';
      acomodacaoInput.checked = false;
    }
  }

document.addEventListener('DOMContentLoaded', () => {
    atualizarTabela();

    const formDolar = document.querySelector('#form-dolar');
    formDolar.addEventListener('submit', onSubmitDolar);
});