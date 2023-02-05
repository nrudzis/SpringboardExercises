const cardBtn = document.getElementById('draw-card-btn');
const cardSection = document.getElementById('card-section');
const cardImgs = [];

axios
  .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(d => {
    for (let i=0; i<52; i++) {
      axios
        .get(`https://deckofcardsapi.com/api/deck/${ d.data.deck_id }/draw/?count=1`)
        .then(c => {
          const cardSVG = c.data.cards[0]['images']['svg'];
          const img = document.createElement('img');
          img.src = cardSVG
          img.classList.add('overlay');
          cardImgs.push(img);
        })
        .catch(err => console.log('ERROR!', err));
    }
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
