const cardBtn = document.getElementById('draw-card-btn');
const cardSection = document.getElementById('card-section');
const cardImgs = [];

axios
  .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(d => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${ d.data.deck_id }/draw/?count=52`)
      .then(c => {
        for (let i=0; i<c.data.cards.length; i++) {
          const cardSVG = c.data.cards[i]['images']['svg'];
          const img = document.createElement('img');
          img.src = cardSVG
          img.classList.add('overlay');
          cardImgs.push(img);
        }
      })
      .catch(err => console.log('ERROR!', err));
  })
  .catch(err => console.log('ERROR!', err));

const drawCard = () => {
  const cardImg = cardImgs[0];
  cardSection.appendChild(cardImg);
  cardImgs.shift();
  if (cardImgs.length == 0) {
    cardBtn.disabled = true;
  }
}

cardBtn.addEventListener('click', e => drawCard());
