let arrOfOpenedElements = [];
let openedElementsData = [];
let openedCardsCount = 0;
let clickingAbilityToCard = true;
let numberOfCards;
let newImage = [];
const images = [
    'assets/america.jpg',
    'assets/armenia.png',
    'assets/canada.jpg',
    'assets/china.gif',
    'assets/corea.jpg',
    'assets/denmark.png',
    'assets/egypt.jpg',
    'assets/france.jpg',
    'assets/germany.jpg',
    'assets/iran.jpg',
    'assets/italy.jpg',
    'assets/japan.gif',
    'assets/russia.png',
    'assets/spain.png',
    'assets/uk.jpg',
];

window.onload = () => {
    document.getElementById('start').addEventListener('click', createCards);
};

const createCards = () => {
    numberOfCards = document.getElementById("difficulty-level").value;
    // clear board
    document.getElementById("board").innerHTML = '';
    document.getElementById("game-board").innerHTML = '';
    // add level and images of game
    chooseLevel(numberOfCards);
    // shuffle cards array
    arrayShuffle();
    // draw front picture
    drawCard();
}

const chooseLevel = (numberOfCards) => {
    const imagesCopy = [...images];
    if (+numberOfCards === 12) {
        newImage = imagesCopy.splice(0, +numberOfCards / 2);
    } else if (+numberOfCards === 20) {
        newImage = imagesCopy.splice(0, +numberOfCards / 2);
    } else {
        newImage = imagesCopy.splice(0, +numberOfCards / 2);
    }
    newImage = [ ...newImage, ...newImage];
}

const arrayShuffle = () => {
    for (let i = newImage.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = newImage[i];
        newImage[i] = newImage[j];
        newImage[j] = temp;
    }
}

const drawCard = () => {
    for (let i = 0; i < numberOfCards; i++) {
            const eachCard = document.createElement('div');
            const img = document.createElement('img');
            const imgBackFace = document.createElement('img');
            img.classList.add('front-face');
            imgBackFace.classList.add('back-face');
            img.classList.add('card-faces');
            imgBackFace.classList.add('card-faces');
            eachCard.classList.add('card-parent');
             if (+numberOfCards === 12) {
                eachCard.classList.add('easy');
            } else if (+numberOfCards === 20) {
                eachCard.classList.add('medium');
            } else {
                eachCard.classList.add('difficult');
            }
            // create card back face
            img.src = newImage[i];
            // create card front face
            imgBackFace.src = 'assets/backside.jpg';
            // put inside div card faces
            eachCard.appendChild(imgBackFace);
            eachCard.appendChild(img);
            eachCard.setAttribute('id', 'card-' + Math.round(Math.random() * 1000));
            // click to run cards turning function
            eachCard.addEventListener('click',  rotateCard);
            document.getElementById('game-board').appendChild(eachCard);
        }
}

const rotateCard = (event) => {
    // if two clicks have been done turn cards
    if (clickingAbilityToCard) {
        // console.log('event.currentTarget.childNodes[1]', event.currentTarget.childNodes);
        const elementSrc = event.currentTarget.childNodes[1].src;
        const elementId = event.currentTarget.getAttribute('id');

        if ((arrOfOpenedElements.length === 1 && elementId === arrOfOpenedElements[0].elementId)) {
            return
        }

        arrOfOpenedElements.push({ elementSrc, elementId });
        // make only 2 clicks before turning cards back
        if (arrOfOpenedElements.length === 2) {
            clickingAbilityToCard = false;
        } else {
            clickingAbilityToCard = true;
        }

        openedElementsData.push(event.currentTarget);
        if (Object.values(event.currentTarget.childNodes[0].classList).indexOf('back-face') > -1) {
            event.currentTarget.childNodes[0].classList.remove('back-face');
            event.currentTarget.childNodes[0].classList.add('front-face');
            event.currentTarget.childNodes[1].classList.remove('front-face');
            event.currentTarget.childNodes[1].classList.add('back-face');
        }

        if (arrOfOpenedElements.length === 2) {
            //  turning back automatically or keep cards
            setTimeout(() => {
                if (arrOfOpenedElements[0].elementSrc !== arrOfOpenedElements[1].elementSrc) {
                    // cards array 1st child, change faces of cards
                    openedElementsData[0].childNodes[0].classList.remove('front-face');
                    openedElementsData[0].childNodes[0].classList.add('back-face');
                    openedElementsData[0].childNodes[1].classList.remove('back-face');
                    openedElementsData[0].childNodes[1].classList.add('front-face');
                    // cards array 2nd child, change faces of cards
                    openedElementsData[1].childNodes[0].classList.remove('front-face');
                    openedElementsData[1].childNodes[0].classList.add('back-face');
                    openedElementsData[1].childNodes[1].classList.remove('back-face');
                    openedElementsData[1].childNodes[1].classList.add('front-face');
                    openedElementsData = [];
                    clickingAbilityToCard = true;
                } else {
                    // user wins
                    openedElementsData = [];
                    openedCardsCount++;
                    //todo
                    if (+openedCardsCount === +numberOfCards / 2) {
                        alert('congratulations, you won!!!');
                        openedCardsCount = 0;
                        // restart game
                        createCards();
                    }
                }
                arrOfOpenedElements = [];
                clickingAbilityToCard = true;
            }, 1500);
        }
    }
}
