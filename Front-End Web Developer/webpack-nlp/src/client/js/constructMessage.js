function constructMessage(sentimentObj) {
    console.log("::: Running constructMessage :::");

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

    console.log(`Message analysis = ${msg}`);
    return msg;
}

export { constructMessage }
