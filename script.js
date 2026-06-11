const nomeInput = document.getElementById("nome");
const imagemInput = document.getElementById("imagem");
const serieInput = document.getElementById("serie");
const repetidoInput = document.getElementById("repetido");

const adicionarBtn = document.getElementById("adicionar");

const colecao = document.getElementById("colecao");

const totalItens = document.getElementById("totalItens");
const totalRepetidos = document.getElementById("totalRepetidos");
const itensUnicos = document.getElementById("itensUnicos");

const pesquisa = document.getElementById("pesquisa");

let carros = JSON.parse(localStorage.getItem("hotwheels")) || [];

function salvarLocalStorage() {
    localStorage.setItem("hotwheels", JSON.stringify(carros));
}

function atualizarContadores() {

    let repetidos = 0;

    carros.forEach(carro => {
        if (carro.repetido) {
            repetidos++;
        }
    });

    totalItens.textContent = carros.length;
    totalRepetidos.textContent = repetidos;
    itensUnicos.textContent = carros.length - repetidos;
}

function criarCard(carro) {

    const card = document.createElement("div");
    card.classList.add("card");

    const classeSerie = carro.serie
        .toLowerCase()
        .replaceAll(" ", "-");

    card.classList.add(classeSerie);

    if (carro.favorito) {
        card.classList.add("favorito");
    }

    const img = document.createElement("img");
    img.src = carro.imagem;

    const info = document.createElement("div");
    info.classList.add("info");

    const titulo = document.createElement("h3");
    titulo.textContent = carro.nome;

    const serieTexto = document.createElement("p");
    serieTexto.textContent = "Série: " + carro.serie;

    const repetidoTexto = document.createElement("p");
    repetidoTexto.textContent =
        carro.repetido
            ? "Repetido: Sim"
            : "Repetido: Não";

    const botoes = document.createElement("div");
    botoes.classList.add("botoes");

    const favoritoBtn = document.createElement("button");
    favoritoBtn.textContent = "⭐ Favorito";
    favoritoBtn.classList.add("favoritoBtn");

    favoritoBtn.addEventListener("click", () => {

        card.classList.toggle("favorito");

        carro.favorito = !carro.favorito;

        salvarLocalStorage();
    });

    const excluirBtn = document.createElement("button");
    excluirBtn.textContent = "🗑 Excluir";
    excluirBtn.classList.add("excluirBtn");

    excluirBtn.addEventListener("click", () => {

        carros = carros.filter(item => item.id !== carro.id);

        salvarLocalStorage();

        card.remove();

        atualizarContadores();
    });

    botoes.appendChild(favoritoBtn);
    botoes.appendChild(excluirBtn);

    info.appendChild(titulo);
    info.appendChild(serieTexto);
    info.appendChild(repetidoTexto);
    info.appendChild(botoes);

    card.appendChild(img);
    card.appendChild(info);

    colecao.appendChild(card);
}

function carregarColecao() {

    colecao.innerHTML = "";

    carros.forEach(carro => {
        criarCard(carro);
    });

    atualizarContadores();
}

adicionarBtn.addEventListener("click", () => {

    const nome = nomeInput.value.trim();
    const imagem = imagemInput.value.trim();
    const serie = serieInput.value;
    const repetido = repetidoInput.checked;

    if (nome === "" || imagem === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const novoCarro = {
        id: Date.now(),
        nome,
        imagem,
        serie,
        repetido,
        favorito: false
    };

    carros.push(novoCarro);

    salvarLocalStorage();

    criarCard(novoCarro);

    atualizarContadores();

    nomeInput.value = "";
    imagemInput.value = "";
    repetidoInput.checked = false;
});

pesquisa.addEventListener("input", () => {

    const texto = pesquisa.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const nome = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (nome.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

carregarColecao();