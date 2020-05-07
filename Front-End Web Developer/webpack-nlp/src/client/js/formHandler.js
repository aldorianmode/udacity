function getSentiment(text) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/getSentiment?text=${text}`)
        .then((res) => res.json())
        .then((resJson) => resolve(resJson));
    });    
};

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    console.log("::: Form Submitted :::")
    getSentiment(formText)
    .then(function(res) {
        document.getElementById('results').innerHTML = Client.constructMessage(res);
    })
}

export { handleSubmit, getSentiment };