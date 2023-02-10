const cardBtn = document.getElementById('draw-card-btn');
const cardSection = document.getElementById('card-section');
const cardImgs = [];

const getCards = async function (cardsNum) {
  try {
    const { data: deck } = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const { data: c } = await axios.get(`https://deckofcardsapi.com/api/deck/${ deck.deck_id }/draw/?count=${ cardsNum }`);
    return c.cards;
  } catch (err) {
    console.log('ERROR!', err);
  }
}

const collectImages = (cards) => {
  for (let i=0; i<cards.length; i++) {
    const cardSVG = cards[i]['images']['svg'];
    const img = document.createElement('img');
    img.src = cardSVG
    img.classList.add('overlay');
    cardImgs.push(img);
  }
}

getCards(52).then(cards => {
  collectImages(cards);
});

const drawCard = () => {
  const cardImg = cardImgs[0];
  cardSection.appendChild(cardImg);
  cardImgs.shift();
  if (cardImgs.length == 0) {
    cardBtn.disabled = true;
  }
}

cardBtn.addEventListener('click', e => drawCard());
