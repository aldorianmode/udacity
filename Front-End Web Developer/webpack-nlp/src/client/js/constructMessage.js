function constructMessage(sentimentObj) {
    if (sentimentObj.error) {
        return "Couldn't analyze text. Try again!";
    }

    let msg = "You seem ";
    switch (sentimentObj.subjectivity) {
        case 'subjective':
            msg = msg.concat("subjectively ");
            break;
        case 'objective':
            msg = msg.concat("objectively ");
            break;    
    }

    msg = msg.concat(sentimentObj.polarity);
    return msg;
}

export { constructMessage }
