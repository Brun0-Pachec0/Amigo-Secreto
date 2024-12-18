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
    //condição se já tiver esse nome na lista
    if (nomes.includes(novoNome)) {
      alert('Não é possível adicionar o mesmo nome duas vezes!')
      nomeAmigo.value = ''
    } else {
      if (novoNome == '') {
        alert("Por favor, adicione um nome válido!")
    } else {
        nomes.push(novoNome);
        atualizarListaNomes()
    }
    nomeAmigo.value = ''
    }



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

    if (nomes.length < 2) {
      alert('Adicione ao menos 2 amigos para poder sortear!')
      btnSortear.disabled = true;
    } else {
      btnSortear.disabled = false;
      for (const nome of nomes) {
          const nomeSorteado = sortearComRestricao(nome);
          casal.push(nome)
          casal.push(nomeSorteado)
          casalCopia = [...casal]
          nomesEscolhidosOrdenados.push(casalCopia)
          casal.pop()
          casal.pop()
        }

        //remove o botão sortear
        btnSortear.remove()

        //Ativa a função mostrar()
        mostrar()

        //desativa o botão adicionar
        btnAdicionar.disabled = true;

        //desativa o campo adicionar nome
        nomeAmigo.disabled = true;
    }
    }

//função que faz mostrar na tela um de cada vez quem tirou quem
function mostrar() {
      resposta.innerHTML = "<button onClick='ver()'>CLIQUE PARA VER</button>"
      listaPessoas.innerHTML = ''
      if (nomes.length == 0) {
        mostrarSorteio.innerHTML = ''
      }
      mostrarSorteio.innerHTML = `<span><h1 style="text-transform: uppercase;">${nomes[0]} TIROU</h1></span>`
      nomes.shift()
      if (nomesEscolhidosOrdenados.length == 0) {
        resposta.innerHTML = ''
      }
}

//botão para esconder o amigo secreto escolhido
function esconder() {
  mostrarSorteio.innerHTML = ''
  resposta.innerHTML = "<button onClick='mostrar()'>PRÓXIMO</button>"
}

function ver() {
  mostrarSorteio.innerHTML = `<span><h1 style="text-transform: uppercase;">${nomesEscolhidosOrdenados[0][1]}</h1></span>`
  nomesEscolhidosOrdenados.shift()
  resposta.innerHTML = `<button style="backgroud-color: #464646; color: white;" onClick='esconder()'>ESCONDER</button>`
  if (nomesEscolhidosOrdenados.length == 0) {
    resposta.innerHTML = ''
  }
  if (nomes.length == 0) {
    resposta.innerHTML = "<button onClick='final()'>ESCONDER</button>"
  }
}

function final() {
  resposta.innerHTML = ''
  mostrarSorteio.innerHTML = '<span><h1>SORTEIO FINALIZADO!</h1></span>'
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
