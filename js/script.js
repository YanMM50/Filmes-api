const apiKey = '392b7831';
const frmPesquisa = document.querySelector("form");

frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault();
    const pesquisa = ev.target.pesquisa.value;

    if (pesquisa == "") {
        alert("Campo pesquisa vazio");
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
        .then(result => result.json())
        .then(json => carregalista(json));
}

const carregalista = (json) => {
    const lista = document.querySelector("div.lista");
    lista.innerHTML = "";

    if (!json.Search) {
        lista.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }

    json.Search.forEach((element, idx) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
        <img src="${element.Poster}"/>
        <h2>${element.Title}</h2>
    `;
    item.style.animationDelay = `${idx * 0.08}s`;
    lista.appendChild(item);
    setTimeout(() => item.classList.add("animated"), 10);

    // Evento de clique para abrir o trailer no YouTube
    item.onclick = () => {
        // Monta a URL de busca do trailer no YouTube
        const query = encodeURIComponent(`${element.Title} trailer`);
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    };
});
}




