const spanPlayer = document.querySelector(".player");
const spanTimer = document.querySelector(".timer");
const spanPoints = document.querySelector(".points");
const grid = document.querySelector(".grid");

let currenttTime = 0;
let pontos = 0;

//Quando a janela for inicviada
window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem("player");
    startTime();
    loadGame();
};

//função para o tempo correr
const startTime = () => {
      this.loop = setInterval(() => {

        spanPoints.innerHTML = pontos;
        currenttTime++;
        if( currenttTime < 9) currenttTime = "0" + currenttTime;
        spanTimer.innerHTML = currenttTime;

     }, 1000);
};

//array dos personagens das cartas
const characters = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
];

//dobrando o tamanho do array
const duplicateArray = [...characters, ...characters];

//embaralhar as cartas
const shuffleadArray = duplicateArray.sort(() => Math.random() - 0.5);

//função para criar os elementos
const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    return element;

};


//criar cartas
const createCard = (character) => {
const card = createElement("div", "card");
const front = createElement("div", "face front");
const back = createElement("div", "face back");

card.appendChild(front);
card.appendChild(back);
card.addEventListener("click", revealCard);
front.style.backgroundImage = `url("../assets/images/${character}.png")`;

card.setAttribute("data-character", character);
return card;


};

//Função iniciar o jogo
const loadGame = () => {
    shuffleadArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);


    });

};

// Função para revelar as cartas
let firstCard = "";
let secondCard = ""; 

const revealCard = ( {target} ) => {
    if (target.parentNode.className.includes("reveal-card")) {
        return;
    }

    if (firstCard === "") {
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
        
    } else if(secondCard === ""){
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;

    }

    checkCards();
};

//função para checar as cartas
const checkCards = () => {

    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        //Quando as cartas forem iguais

        pontos += 10;

        firstCard.firstChild.classList.add("disabled-card")
        secondCard.firstChild.classList.add("disabled-card")
        
        firstCard = "";
        secondCard = "";
        
    } else {
       //Quando as cartas forem diferentes
       pontos -= 2;

       setTimeout(() => {
        firstCard.classList.remove("reveal-card");
        secondCard.classList.remove("reveal-card");
        firstCard = "";
        secondCard = "";
       }, 500);

    }

    checkEndGme();
};

// checar o fim do jogo
const checkEndGme = () => {
     
    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 20) {
        //acertou todas as cartas


        localStorage.setItem("score", pontos);
        localStorage.setItem("recordTimer", currenttTime);

        clearInterval(this.loop);

       setTimeout(() => {

        alert(` Parabéns ${spanPlayer.innerHTML}.
                Tempo total: ${currenttTime}.
                Pontos: ${pontos}.
            `);

            const dialog = confirm("Gostaria de contimuar?");

            if (dialog) {
                window.location.reload();
                
            } else {
                window.location.href = "../index.html"
                
            }

        }, 500); 
        
        
    } else {
        
    }


}
