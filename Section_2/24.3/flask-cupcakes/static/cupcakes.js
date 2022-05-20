function appendToList(cupcakes) {
    for(let i=0; i<cupcakes.length; i++) {
        li = `<li>${cupcakes[i].flavor}</li>`;
        $('#cupcake-list').append(li);
    }
}

async function getCupcakes() {
    const response = await axios.get('/api/cupcakes');
    let cupcakes = response.data.cupcakes;
    appendToList(cupcakes);
}

async function newCupcake() {
    axios
        .post('/api/cupcakes', {
            flavor: $('#flavor-input').val(),
            rating: $('#rating-select').val(),
            size: $('#size-select').val(),
            image: $('#image-input').val()
        })
        .then(() => {
            $('#cupcake-list').empty();
            $('#new-cupcake-form')[0].reset();
            getCupcakes();
        });
}

$('#new-cupcake-form').submit(e => {
    e.preventDefault();
    newCupcake();
})

getCupcakes();
