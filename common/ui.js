"use strict";

const alerts = {
    success: document.getElementById("alertSuccess"),
    error: document.getElementById("alertError"),
    warning: document.getElementById("alertWarning")
};

const view = document.getElementById("view");

const clearAlerts = () => {
    // hide all the alerts
    for (let a in alerts) {
        alerts[a].classList.add("d-none");
    }
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

const showView = () => {
    view.classList.remove("d-none");
}

export { clearAlerts, displaySuccess, displayError, displayWarning, showView };