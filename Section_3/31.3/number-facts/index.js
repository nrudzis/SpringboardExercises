//SINGLE NUMBER, SINGLE FACT
const numFactSection = document.querySelector('#num-fact-section');

const getNumFact = async function (num) {
  try {
    const { data: fact } = await axios.get(`http://numbersapi.com/${ num }?json`);
    return fact;
  } catch (err) {
    console.log('ERROR!', err);
  }
}

getNumFact(42).then(f => {
  numFactSection.insertAdjacentHTML('beforeend', `<p>${ f.text }</p>`);
});

//MULTIPLE NUMBERS, ONE FACT EACH
const numsFactsSection = document.querySelector('#nums-facts-section');

const getNumsFacts = async function () {
  try {
    const { data: facts } = await axios.get('http://numbersapi.com/7..9,24?json');
    const factVals = Object.values(facts);
    return factVals;
  } catch (err) {
    console.log('ERROR!', err);
  }
}

getNumsFacts().then(f => {
  for(let i=0; i<f.length; i++) {
    numsFactsSection.insertAdjacentHTML('beforeend', `<p>${ f[i] }</p>`);
  }
});

//SINGLE NUMBER, FOUR FACTS
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
