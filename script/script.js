const nomeAmigo = document.querySelector('#nomeAmigo')
const listaPessoas = document.querySelector('#listaPessoas')
const mostrarSorteio = document.querySelector('#mostrarSorteio')
const novoItem = document.createElement('li')
const btnSortear = document.querySelector('.sortear')
const resposta = document.querySelector('.resposta')
const btnAdicionar = document.querySelector('.btnAdicionar')

const nomes = [];
const nomesDisponiveis = []

const casal = []
const nomesEscolhidosOrdenados = []

function sortearComRestricao(nome) {
  //sortear o indice e o nome do índice
  const indiceSorteado = Math.floor(Math.random() * nomesDisponiveis.length);
  var nomeSorteado = nomesDisponiveis[indiceSorteado];
  console.log(nomesDisponiveis)

  if (nomeSorteado === nome) {
    return sortearComRestricao(nome);
  } else {
    nomesDisponiveis.splice(indiceSorteado, 1);
    return nomeSorteado;
  }
}


//Função que será executada quando usuário pressionar o botão "adicionar"
function adicionar() {
    const novoNome = nomeAmigo.value.trim();

    if (novoNome == '') {
        alert("Por favor, adicione um nome válido!")
    } else {
        nomes.push(novoNome);
        atualizarListaNomes()
    }
    nomeAmigo.value = ''
}

// função para criar a lista secundária antes de sortear
function criarLista() {
  for (let i = 0; i < nomes.length; i++) {
    nomesDisponiveis.push(nomes[i])
  }
}


// sorteia os nomes com o critério de restrição de não poder pegar o próprio nome
function sortear() {
    criarLista()

    for (const nome of nomes) {
        const nomeSorteado = sortearComRestricao(nome);
        casal.push(nome)
        casal.push(nomeSorteado)
        casalCopia = [...casal]
        nomesEscolhidosOrdenados.push(casalCopia)
        casal.pop()
        casal.pop()
        console.log(`${nome} sorteou ${nomeSorteado}`);
      }

      //remove o botão sortear
      btnSortear.remove()

      //cria o botão 'ver' e mostra quem tirou quem na tela
      resposta.innerHTML = "<button onClick='mostrar()'>Ver</button>"

      //desativa o botão adicionar
      btnAdicionar.disabled = true;

      //desativa o campo adicionar nome
      nomeAmigo.disabled = true;
}

//função que faz mostrar na tela um de cada vez quem tirou quem
function mostrar() {
      resposta.innerHTML = "<button onClick='ver()'>Ver</button>"
      listaPessoas.innerHTML = ''
      if (nomes.length == 0) {
        mostrarSorteio.innerHTML = ''
      }
      mostrarSorteio.innerHTML = `<span>${nomes[0]} TIROU :</span>`
      nomes.shift()
      if (nomesEscolhidosOrdenados.length == 0) {
        resposta.innerHTML = ''
      }
}

//botão para esconder o amigo secreto escolhido
function esconder() {
  mostrarSorteio.innerHTML = ''
  resposta.innerHTML = "<button onClick='mostrar()'>Próximo</button>"
}

function ver() {
  mostrarSorteio.innerHTML = `<span>${nomesEscolhidosOrdenados[0][1]}</span>`
  nomesEscolhidosOrdenados.shift()
  resposta.innerHTML = "<button onClick='esconder()'>Esconder</button>"
  if (nomesEscolhidosOrdenados.length == 0) {
    resposta.innerHTML = ''
  }
  if (nomes.length == 0) {
    resposta.innerHTML = "<button onClick='final()'>Esconder</button>"
  }
}

function final() {
  resposta.innerHTML = ''
  mostrarSorteio.innerHTML = '<span>sorteio Finalizado!</span>'
}


//função para aparecer na tela o os nomes adicionados
function atualizarListaNomes() {
    listaPessoas.innerHTML = ""; // Limpa a lista
    
    nomes.forEach(function(nome) {
      const novoItem = document.createElement("li");
      novoItem.textContent = nome;
      listaPessoas.appendChild(novoItem);
    });
  }


//evento para quando apertar 'enter' ele adicionar o nome
nomeAmigo.addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        adicionar()
    }
})
