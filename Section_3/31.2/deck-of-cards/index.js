const cardBtn = document.getElementById('draw-card-btn');

function drawCard(deckId) {
  axios
    .get(`https://deckofcardsapi.com/api/deck/${ deckId }/draw/?count=1`)
    .then(c => {
      console.log(`${ c.data.cards[0]['value'] } of ${ c.data.cards[0]['suit'] }`);
    })
    .catch(err => console.log('ERROR!', err));
}

axios
  .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(d => {
    cardBtn.addEventListener('click', e => drawCard(d.data.deck_id));
  })
  .catch(err => console.log('ERROR!', err));
