const numFactSection = document.querySelector('#num-fact-section');
let numFact = axios.get('http://numbersapi.com/42?json');

numFact
  .then(res => {
    const fact = res.data.text;
    numFactSection.insertAdjacentHTML('beforeend', `<p>${ fact }</p>`);
  })
  .catch(err => console.log('ERROR!', err));

const numsFactsSection = document.querySelector('#nums-facts-section');
let numsFacts = axios.get('http://numbersapi.com/7..9,24?json');

numsFacts
  .then(res => {
    const facts = Object.values(res.data);
    for(let i=0; i<facts.length; i++) {
      numsFactsSection.insertAdjacentHTML('beforeend', `<p>${ facts[i] }</p>`);
    }
  })
  .catch(err => console.log('ERROR!', err));

