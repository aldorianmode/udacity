// Ref: https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
function is_url(str) {
    const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    } else {
        return false;
    }
}

function getSentiment(text, isUrl) {
    return new Promise((resolve, reject) => {
        const queryParam = isUrl ? `url=${text}` : `text=${text}`;
        fetch(`http://localhost:8081/getSentiment?${queryParam}`)
        .then((res) => res.json())
        .then((resJson) => resolve(resJson));
    });    
};

function handleSubmit(event) {
    event.preventDefault()

    const results = document.getElementById('results');
    results.innerHTML = '';

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    const isUrl = is_url(formText);

    let conclusion = document.createElement('p');
    conclusion.innerText = 'Conclusion: ';
    if (!isUrl) {
        const alertMsg = 'You have entered an invalid URL. Try again.';
        alert(alertMsg);
        conclusion.innerText = conclusion.innerText + alertMsg;
    } else {
        console.log("::: Form Submitted :::")
        getSentiment(formText, isUrl)
        .then(function(res) {
            if (res.error === true) {
                conclusion.innerText = conclusion.innerText + 'Something went wrong. Try again.';
            } else {
                let inputText = document.createElement('p');
                inputText.innerText = `URL: ${formText}`;
                let resultText = document.createElement('p');
                resultText.innerText = `Text analyzed:\n ${res.text}`;
                let polarity = document.createElement('p');
                polarity.innerText = `Polarity: ${res.polarity}`;
                let subjectivity = document.createElement('p');
                subjectivity.innerText = `Subjectivity: ${res.subjectivity}`;
                conclusion.innerText = conclusion.innerText + `${Client.constructMessage(res)}`;
                results.appendChild(inputText);
                results.appendChild(polarity);
                results.appendChild(subjectivity);
                results.appendChild(resultText);
            }
        })
    }
    results.appendChild(conclusion);
}

export { handleSubmit, getSentiment };