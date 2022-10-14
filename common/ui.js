"use strict";

const alerts = {
    prompt: document.getElementById("alertPrompt"),
    success: document.getElementById("alertSuccess"),
    error: document.getElementById("alertError"),
    warning: document.getElementById("alertWarning")
};

const results = document.getElementById("results");
const labIdHeading = document.getElementById("labIdHeading");
const labId = document.getElementById("labId");

const clearUI = () => {
    // hide all the alerts
    for (let a in alerts) {
        alerts[a].classList.add("d-none");
    }
    results.classList.add("d-none");
    labIdHeading.classList.add("d-none");
    labId.textContent = "";
};

const _display = (el = null, msg = "") => {
    if (typeof el !== "object" || el === null || !(el instanceof Element)) {
        return;
    }
    if (typeof msg === "string") {
        el.innerText = msg;
    } else if (typeof msg === "object" && msg instanceof Element) {
        el.appendChild(msg);
    }
    el.classList.remove("d-none");
};

const displaySuccess = (msg = "") => {
    _display(alerts.success, msg);
}

const displayError = (msg = "") => {
    _display(alerts.error, msg);
}

const displayWarning = (msg = "") => {
    _display(alerts.warning, msg);
}

const displayResults = () => {
    results.classList.remove("d-none");
}

const displayLabId = (id) => {
    labIdHeading.classList.remove("d-none");
    labId.textContent = id;
}

export { clearUI, displaySuccess, displayError, displayWarning, displayResults, displayLabId };