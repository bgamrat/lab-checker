"use strict";

const TEXT = 'text-';
const BORDER = 'border-';

const validatorResultsHeader = document.getElementById("validatorResultsHeader");
const validatorResultsCard = validatorResultsHeader.closest(".card");
const validatorResults = document.getElementById("validatorResults");
const validatorSummary = document.getElementById("validatorSummary");

async function validate(file) {

    let valid = true;
    validatorResultsCard.className = 'card'; // clear any earlier results colors
    validatorResultsHeader.className = 'card-header'; 
    validatorResults.textContent = '';
    validatorSummary.className = '';
    validatorSummary.textContent = '';

    const formData = new FormData();
    formData.append('out', 'text');
    formData.append('content', file);

    await fetch("https://html5.validator.nu/", {
        method: 'POST',
        body: formData
    }).then(response => response.text()).then(text => {
        validatorResults.textContent = text;
        const lines = text.trim().split('\n');
        const lastLine = lines.pop();
        validatorSummary.textContent = lastLine;
        let cardHeaderTextClass = TEXT + 'success';
        if (!text.includes('The document is valid')) {
            const matches = text.match(/^(warning|error)/im);
            const errorOrWarning = matches[1].toLowerCase().replace('error','danger');
            valid = matches[1] === 'warning';
            cardHeaderTextClass = TEXT + errorOrWarning;
            validatorResultsCard.classList.add(BORDER + errorOrWarning);
        }
        validatorResultsHeader.classList.add(cardHeaderTextClass);
        validatorSummary.classList.add(cardHeaderTextClass);
    }).catch(error => {
        console.error('Error:', error);
    });
    return valid;
}
;

export { validate }