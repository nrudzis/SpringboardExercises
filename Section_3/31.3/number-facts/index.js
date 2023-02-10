const numFactSection = document.querySelector('#num-fact-section');

axios
  .get('http://numbersapi.com/42?json')
  .then(f => {
    numFactSection.insertAdjacentHTML('beforeend', `<p>${ f.data.text }</p>`);
  })
  .catch(err => console.log('ERROR!', err));

const numsFactsSection = document.querySelector('#nums-facts-section');

axios
  .get('http://numbersapi.com/7..9,24?json')
  .then(f => {
    const facts = Object.values(f.data);
    for(let i=0; i<facts.length; i++) {
      numsFactsSection.insertAdjacentHTML('beforeend', `<p>${ facts[i] }</p>`);
    }
  })
  .catch(err => console.log('ERROR!', err));

const numFourFactsSection = document.querySelector('#num-four-facts-section');
const fourNumFacts = [];

for(let i=0; i<4; i++) {
  fourNumFacts.push(
    axios.get('http://numbersapi.com/15?json')
  );
}

Promise
  .all(fourNumFacts)
  .then(factsArr => (
    factsArr.forEach(f => numFourFactsSection.insertAdjacentHTML('beforeend', `<p>${ f.data.text }</p>`))
  ))
  .catch(err => console.log('ERROR!', err));
