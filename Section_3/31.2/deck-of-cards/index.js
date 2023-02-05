const cardBtn = document.getElementById('draw-card-btn');
const cardSection = document.getElementById('card-section');

function drawCard(deckId) {
  axios
    .get(`https://deckofcardsapi.com/api/deck/${ deckId }/draw/?count=1`)
    .then(c => {
      if (c.data.remaining > 0) {
        const cardImg = c.data.cards[0]['images']['svg'];
        const img = document.createElement('img');
        img.src = cardImg;
        img.classList.add('overlay');
        cardSection.appendChild(img);
      } else {
        cardBtn.disabled = true;
      }
    })
    .catch(err => console.log('ERROR!', err));
}

axios
  .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(d => {
    cardBtn.addEventListener('click', e => drawCard(d.data.deck_id));
  })
  .catch(err => console.log('ERROR!', err));
